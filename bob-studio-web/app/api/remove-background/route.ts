import { fal } from "@fal-ai/client"

fal.config({ credentials: process.env.FAL_KEY })

export async function POST(req: Request) {
  try {
    const { videoUrl, subjectIsPerson, outputCodec } = await req.json()
    const result = await fal.subscribe("veed/video-background-removal/fast", {
      input: {
        video_url: videoUrl,
        output_codec: outputCodec || "h264",
        refine_foreground_edges: true,
        subject_is_person: subjectIsPerson ?? true,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log)
        }
      },
    })
    return Response.json({
      videos: (result.data as any).video,
      primaryUrl: (result.data as any).video[0].url,
      contentType: (result.data as any).video[0].content_type,
    })
  } catch (error) {
    return Response.json({ error: "Background removal failed" }, { status: 500 })
  }
}
