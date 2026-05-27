interface Entry { count: number; resetAt: number }

const cache = new Map<string, Entry>()

export function rateLimit(
  req: Request,
  limit = 10,
  windowMs = 10 * 60 * 1000,
): Response | null {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const now = Date.now()
  const entry = cache.get(ip)

  if (!entry || now > entry.resetAt) {
    if (entry) cache.delete(ip)
    cache.set(ip, { count: 1, resetAt: now + windowMs })
    return null
  }

  if (entry.count >= limit) {
    return Response.json(
      { error: 'Too many requests — please wait a few minutes and try again.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)) } },
    )
  }

  entry.count++
  return null
}
