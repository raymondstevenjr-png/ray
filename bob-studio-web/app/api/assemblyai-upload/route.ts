export const maxDuration = 120

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') ?? ''

    let body: BodyInit
    let videoContentType: string

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file') as File | null
      if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })
      body = Buffer.from(await file.arrayBuffer())
      videoContentType = file.type || 'video/mp4'
    } else {
      body = req.body!
      videoContentType = contentType || 'application/octet-stream'
    }

    const res = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        Authorization: process.env.ASSEMBLYAI_API_KEY!,
        'Content-Type': videoContentType,
      },
      body,
      // @ts-ignore — needed for streaming in Node.js fetch
      duplex: 'half',
    })

    const data = (await res.json()) as { upload_url?: string; error?: string }
    if (!data.upload_url) {
      return Response.json({ error: data.error ?? 'Upload failed' }, { status: 500 })
    }
    return Response.json({ url: data.upload_url })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return Response.json({ error: msg }, { status: 500 })
  }
}
