import { AssemblyAI } from 'assemblyai'

export const maxDuration = 300

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!
})

export async function POST(req: Request) {
  try {
    const { videoUrl, language } = await req.json()

    if (!videoUrl) return Response.json({ error: 'No video URL provided' }, { status: 400 })
    if (videoUrl.startsWith('blob:')) {
      return Response.json({ error: 'Video is still uploading — wait a moment and try again.' }, { status: 400 })
    }

    const transcript = await client.transcripts.transcribe({
      audio: videoUrl,
      language_code: language || 'en',
    })

    return Response.json({
      subtitles: transcript.text,
      srt: await client.transcripts.subtitles(transcript.id, 'srt'),
      vtt: await client.transcripts.subtitles(transcript.id, 'vtt'),
      words: transcript.words,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return Response.json({ error: `Subtitle generation failed: ${msg}` }, { status: 500 })
  }
}
