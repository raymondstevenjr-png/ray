import { NextRequest, NextResponse } from "next/server"

interface CacheEntry {
  midMarket: number
  currency: string
  timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in ms

const FALLBACKS: Record<string, number> = {
  USD: 23.03,
  GBP: 29.20,
  CAD: 16.95,
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const currency = (searchParams.get("currency") || "USD").toUpperCase()

  if (!["USD", "GBP", "CAD"].includes(currency)) {
    return NextResponse.json({ error: "Invalid currency" }, { status: 400 })
  }

  // Check cache
  const cached = cache.get(currency)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached)
  }

  const apiKey = process.env.EXCHANGERATE_API_KEY
  if (!apiKey) {
    const fallback: CacheEntry = {
      midMarket: FALLBACKS[currency],
      currency,
      timestamp: Date.now(),
    }
    return NextResponse.json(fallback)
  }

  try {
    // Always fetch from USD base, then convert if needed
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`,
      { next: { revalidate: 300 } }
    )

    if (!res.ok) {
      throw new Error(`Exchange rate API returned ${res.status}`)
    }

    const data = await res.json()

    if (data.result !== "success") {
      throw new Error("Exchange rate API returned error result")
    }

    // Try SLE first, then SLL
    let rawRate: number = data.conversion_rates?.SLE ?? data.conversion_rates?.SLL

    if (!rawRate) {
      throw new Error("SLE/SLL rate not found in response")
    }

    // If value > 1000, it's SLL (old Leone) — divide by 1000 to get SLE
    if (rawRate > 1000) {
      rawRate = rawRate / 1000
    }

    // Safety check: if rate > 100 something is very wrong
    if (rawRate > 100) {
      throw new Error(`Suspicious rate value: ${rawRate}`)
    }

    const entry: CacheEntry = {
      midMarket: parseFloat(rawRate.toFixed(4)),
      currency,
      timestamp: Date.now(),
    }

    cache.set(currency, entry)
    return NextResponse.json(entry)
  } catch (err) {
    console.error("Rate fetch error:", err)
    const fallback: CacheEntry = {
      midMarket: FALLBACKS[currency],
      currency,
      timestamp: Date.now(),
    }
    return NextResponse.json(fallback)
  }
}
