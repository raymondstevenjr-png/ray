import { AssemblyAI } from 'assemblyai'
import { rateLimit } from '../../../lib/ratelimit'

export const maxDuration = 300

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!
})

export async function POST(req: Request) {
  const limited = rateLimit(req, 20, 10 * 60 * 1000)
  if (limited) return limited
  try {
    let videoUrl: string | null = null
    let language = ''

    const contentType = req.headers.get('content-type') ?? ''

    if (contentType.includes('multipart/form-data')) {
      // File sent directly — upload to AssemblyAI storage first
      const formData = await req.formData()
      const file = formData.get('file') as File | null
      language = (formData.get('language') as string) ?? ''
      if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })
      const arrayBuffer = await file.arrayBuffer()
      videoUrl = await client.files.upload(Buffer.from(arrayBuffer))
    } else {
      const body = await req.json()
      videoUrl = body.videoUrl ?? null
      language = body.language ?? ''
    }

    if (!videoUrl) return Response.json({ error: 'No video URL provided' }, { status: 400 })
    if (videoUrl.startsWith('blob:')) {
      return Response.json({ error: 'Video is still uploading — wait a moment and try again.' }, { status: 400 })
    }

    // AssemblyAI accepts base language codes only (e.g. 'en', not 'en-US')
    const baseLanguage = language ? language.split('-')[0] : null

    const transcript = await client.transcripts.transcribe({
      audio: videoUrl,
      speech_models: ['universal-3-pro', 'universal-2'],
      ...(baseLanguage ? { language_code: baseLanguage } : { language_detection: true }),
      speaker_labels: true,
    })

    return Response.json({
      subtitles: transcript.text,
      srt: await client.transcripts.subtitles(transcript.id, 'srt'),
      vtt: await client.transcripts.subtitles(transcript.id, 'vtt'),
      words: transcript.words,
      utterances: transcript.utterances ?? [],
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return Response.json({ error: `Subtitle generation failed: ${msg}` }, { status: 500 })
  }
}
