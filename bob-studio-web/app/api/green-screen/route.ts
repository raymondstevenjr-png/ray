import { fal } from "@fal-ai/client"

fal.config({ credentials: process.env.FAL_KEY })

export async function POST(req: Request) {
  try {
    const { videoUrl, spillSuppressionStrength, outputCodec } = await req.json()
    const result = await fal.subscribe("veed/video-background-removal/green-screen", {
      input: {
        video_url: videoUrl,
        output_codec: outputCodec || "vp9",
        spill_suppression_strength: spillSuppressionStrength ?? 0.8,
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
    return Response.json({ error: "Green screen removal failed" }, { status: 500 })
  }
}
