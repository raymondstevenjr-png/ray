import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY! })

// Map BCP-47 codes to AssemblyAI base codes where supported
const LANG_MAP: Record<string, string> = {
  'en-US': 'en', 'en-GB': 'en',
  'fr-FR': 'fr', 'es-ES': 'es',
  'de-DE': 'de', 'pt-BR': 'pt',
  'zh': 'zh', 'ja-JP': 'ja',
  'ko-KR': 'ko',
}

export async function POST(req: Request) {
  try {
    const { videoUrl, language } = await req.json()
    if (!videoUrl) return Response.json({ error: 'No video URL provided' }, { status: 400 })

    const mappedLang = language ? LANG_MAP[language] : null

    const transcript = await client.transcripts.transcribe({
      audio: videoUrl,
      speech_models: ['universal-3-pro', 'universal-2'],
      punctuate: true,
      format_text: true,
      ...(mappedLang
        ? { language_code: mappedLang }
        : { language_detection: true }),
    })

    if (transcript.status === 'error') {
      return Response.json({ error: transcript.error }, { status: 500 })
    }

    const [srt, vtt] = await Promise.all([
      client.transcripts.subtitles(transcript.id, 'srt'),
      client.transcripts.subtitles(transcript.id, 'vtt'),
    ])

    return Response.json({
      transcript: transcript.text,
      srt,
      vtt,
      words: transcript.words,
      detectedLanguage: transcript.language_code,
    })
  } catch (error) {
    return Response.json({ error: 'Transcription failed' }, { status: 500 })
  }
}
