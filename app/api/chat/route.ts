import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, context } = body as {
      messages: Array<{ role: "user" | "assistant"; content: string }>
      context?: string
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 })
    }

    const systemPrompt = `You are RemitSL's AI assistant helping Sierra Leoneans in the US, UK, and Canada send money home affordably. You know the current provider rates and fees. You can respond in English or Krio if the user writes in Krio. Always warn about common scams: never send money to someone you haven't met in person, no legitimate company asks for upfront fees, be careful of fake emergency requests.

Key facts about the providers:
- Wave: 1% fee, rate ~22.93 SLE/USD, mobile money, minutes delivery
- Sendwave: 0% fee, rate ~22.52 SLE/USD, mobile money, minutes delivery
- Wise: 0.6% + $0.50 fee, rate ~22.47 SLE/USD, bank transfer, 1-2 days
- Remitly: $3.99 fee (<$500) or 1.5%, rate ~22.36 SLE/USD, bank or cash, 1-3 hours
- WorldRemit: $4.99 fee (<$200) or 2%, rate ~22.24 SLE/USD, bank or cash, same day
- Ria: $2.99 fee, rate ~22.13 SLE/USD, cash pickup, minutes
- Western Union: 3% + $5 fee, rate ~21.78 SLE/USD, cash pickup, minutes
- MoneyGram: 2.5% + $4 fee, rate ~21.67 SLE/USD, cash pickup, minutes

Sierra Leone currency: 1 SLE = 1,000 SLL (old Leone). Always quote in SLE.

Current context: ${context || "General inquiry"}

Be helpful, concise, and warm. If someone is in distress about a scam or lost money, be empathetic first, then practical.`

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    })

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text))
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch (err) {
    console.error("Chat API error:", err)
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    )
  }
}
