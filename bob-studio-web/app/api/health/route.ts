export async function GET() {
  return Response.json({
    status: 'ok',
    app: 'Bob Studio',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
}
