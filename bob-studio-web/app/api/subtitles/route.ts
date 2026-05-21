import { fal } from "@fal-ai/client"

fal.config({ credentials: process.env.FAL_KEY })

export async function POST(req: Request) {
  try {
    const { videoUrl, preset, language } = await req.json()
    const result = await fal.subscribe("veed/subtitles", {
      input: {
        video_url: videoUrl,
        preset: preset || "glass",
        language: language || "en-US",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log)
        }
      },
    })
    return Response.json({
      videoUrl: (result.data as any).video.url,
      contentType: (result.data as any).video.content_type,
      fileSize: (result.data as any).video.file_size,
    })
  } catch (error) {
    return Response.json({ error: "Subtitle generation failed" }, { status: 500 })
  }
}
