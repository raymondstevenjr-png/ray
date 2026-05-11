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

    const systemPrompt = `You are RemitSL's AI assistant helping Sierra Leoneans in the US, UK, and Canada send money home affordably. You respond in English or Krio — match whichever language the user writes in.

STRICT RULES — follow these without exception:
1. Only state fees and rates that are listed below. Do not invent, estimate, or guess any number not provided.
2. If you are unsure about something, say "I don't have that information — please check the comparison table on the homepage for the latest figures."
3. Never make up provider names, services, or features.
4. For exact current rates, always direct the user to the live comparison table on the page — rates update every 5 minutes and your knowledge has a cutoff.

PROVIDER DATA (fees are fixed; rates shown are approximate baselines that scale with the live mid-market rate):
- Wave: fee 1% of amount | ~22.93 SLE/USD baseline | Mobile Money | Minutes
- Sendwave: fee 0% | ~22.52 SLE/USD baseline | Mobile Money | Minutes
- Wise: fee 0.6% + $0.50 | ~22.47 SLE/USD baseline | Bank Transfer | 1–2 days
- Remitly: fee $3.99 (under $500) or 1.5% | ~22.36 SLE/USD baseline | Bank or Cash | 1–3 hours
- WorldRemit: fee $4.99 (under $200) or 2% | ~22.24 SLE/USD baseline | Bank or Cash | Same day
- Ria: fee $2.99 | ~22.13 SLE/USD baseline | Cash Pickup | Minutes
- Western Union: fee 3% + $5 | ~21.78 SLE/USD baseline | Cash Pickup | Minutes
- MoneyGram: fee 2.5% + $4 | ~21.67 SLE/USD baseline | Cash Pickup | Minutes

CURRENCY FACT: Sierra Leone redenominated in 2022. 1 SLE = 1,000 SLL (old Leone). Always quote in SLE.

SCAM WARNINGS — always raise these proactively when relevant:
- Never send money to someone you have not met in person
- No legitimate company asks for upfront fees to release a transfer
- Verify urgent family emergency requests by calling the person directly
- Official providers never contact you asking to reverse a transaction

Current context: ${context || "General inquiry"}

Be warm, concise, and practical. If someone has lost money to a scam, lead with empathy before advice.`

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
