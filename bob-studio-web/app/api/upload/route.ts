import { fal } from "@fal-ai/client"

fal.config({ credentials: process.env.FAL_KEY })

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    if (!file) return Response.json({ error: "No file provided" }, { status: 400 })
    const url = await fal.storage.upload(file)
    return Response.json({ url })
  } catch (error) {
    return Response.json({ error: "Upload failed" }, { status: 500 })
  }
}
