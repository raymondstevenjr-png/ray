export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { text, targetLanguage } = await req.json()
    if (!text) return Response.json({ error: 'No text provided' }, { status: 400 })

    const res = await fetch('https://llm-gateway.assemblyai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': process.env.ASSEMBLYAI_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the following transcript to ${targetLanguage}. Return only the translated text, preserving paragraph structure. No explanations.`,
          },
          { role: 'user', content: text },
        ],
        max_tokens: 4000,
      }),
    })

    const data = await res.json()
    if (!res.ok) return Response.json({ error: data.error?.message ?? 'Translation failed' }, { status: 500 })

    return Response.json({ translated: data.choices[0].message.content })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return Response.json({ error: `Translation failed: ${msg}` }, { status: 500 })
  }
}
