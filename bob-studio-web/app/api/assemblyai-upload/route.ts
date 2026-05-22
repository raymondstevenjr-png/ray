export const maxDuration = 120

export async function POST(req: Request) {
  try {
    const res = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        'Authorization': process.env.ASSEMBLYAI_API_KEY!,
        'Content-Type': req.headers.get('content-type') || 'application/octet-stream',
      },
      body: req.body,
      // @ts-ignore
      duplex: 'half',
    })
    const data = await res.json() as { upload_url?: string; error?: string }
    if (!data.upload_url) {
      return Response.json({ error: data.error ?? 'Upload failed' }, { status: 500 })
    }
    return Response.json({ url: data.upload_url })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return Response.json({ error: msg }, { status: 500 })
  }
}
