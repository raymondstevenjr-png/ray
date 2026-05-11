"use client"

import { useState, useEffect, useCallback } from "react"
import type { Corridor, Currency } from "@/lib/types"
import { getProviders, calculateResults, BASELINE_MID_MARKET } from "@/lib/providers"
import ProviderRow from "./ProviderRow"

const CORRIDOR_CURRENCY: Record<Corridor, Currency> = {
  US: "USD",
  UK: "GBP",
  CA: "CAD",
}

const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
  CAD: "C$",
}

const CORRIDOR_LABELS: Record<Corridor, string> = {
  US: "🇺🇸 USD",
  UK: "🇬🇧 GBP",
  CA: "🇨🇦 CAD",
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="py-4 px-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
        </td>
      ))}
    </tr>
  )
}

export default function ComparisonTable() {
  const [corridor, setCorridor] = useState<Corridor>("US")
  const [sendAmount, setSendAmount] = useState<number>(200)
  const [inputValue, setInputValue] = useState<string>("200")
  const [liveMidMarket, setLiveMidMarket] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [rateTimestamp, setRateTimestamp] = useState<number | null>(null)

  const currency = CORRIDOR_CURRENCY[corridor]
  const symbol = CURRENCY_SYMBOL[currency]

  const fetchRate = useCallback(async (curr: Currency) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/rates?currency=${curr}`)
      const data = await res.json()
      setLiveMidMarket(data.midMarket)
      setRateTimestamp(data.timestamp)
    } catch {
      setLiveMidMarket(BASELINE_MID_MARKET[curr])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRate(currency)
  }, [currency, fetchRate])

  const handleCorridorChange = (c: Corridor) => {
    setCorridor(c)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setInputValue(raw)
    const parsed = parseFloat(raw)
    if (!isNaN(parsed) && parsed > 0) {
      setSendAmount(parsed)
    }
  }

  const providers = getProviders(corridor)
  const baseline = BASELINE_MID_MARKET[currency]
  const results = calculateResults(providers, sendAmount, liveMidMarket ?? baseline, baseline)

  const lastUpdated = rateTimestamp
    ? new Date(rateTimestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null

  return (
    <section id="compare" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-navy text-center mb-2">
          Compare Providers
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Enter your send amount and select your corridor to compare all providers instantly.
          {lastUpdated && (
            <span className="ml-2 text-xs text-gray-400">
              Rates as of {lastUpdated}
            </span>
          )}
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-end">
          {/* Corridor tabs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sending from
            </label>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {(Object.keys(CORRIDOR_LABELS) as Corridor[]).map((c) => (
                <button
                  key={c}
                  onClick={() => handleCorridorChange(c)}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                    corridor === c
                      ? "bg-navy text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {CORRIDOR_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send amount ({currency})
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <span className="bg-gray-50 px-3 py-2.5 text-gray-500 font-medium border-r border-gray-200">
                {symbol}
              </span>
              <input
                type="number"
                min="1"
                step="50"
                value={inputValue}
                onChange={handleAmountChange}
                className="px-3 py-2.5 w-32 focus:outline-none focus:ring-2 focus:ring-navy/20 text-navy font-medium"
                aria-label={`Send amount in ${currency}`}
              />
            </div>
          </div>

          {/* Quick amounts */}
          <div className="flex gap-2 flex-wrap">
            {[50, 100, 200, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setSendAmount(amt)
                  setInputValue(String(amt))
                }}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  sendAmount === amt
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy"
                }`}
              >
                {symbol}{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Mid-market info */}
        {liveMidMarket && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6 flex flex-wrap gap-2 items-center justify-between">
            <div className="text-sm text-blue-700">
              <span className="font-semibold">Live mid-market rate:</span>{" "}
              1 {currency} = {liveMidMarket.toFixed(4)} SLE
            </div>
            <div className="text-xs text-blue-500">
              Provider rates include their margin and fees
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-navy text-white text-sm">
                <th className="py-3 px-3 text-center font-medium">Rank</th>
                <th className="py-3 px-3 text-left font-medium">Provider</th>
                <th className="py-3 px-3 text-left font-medium">Fee</th>
                <th className="py-3 px-3 text-left font-medium">Recipient Gets</th>
                <th className="py-3 px-3 text-left font-medium">Rate</th>
                <th className="py-3 px-3 text-left font-medium">Speed</th>
                <th className="py-3 px-3 text-left font-medium hidden md:table-cell">Method</th>
                <th className="py-3 px-3 text-left font-medium hidden lg:table-cell">Rating</th>
                <th className="py-3 px-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : (
                results.map((result) => (
                  <ProviderRow
                    key={result.name}
                    result={result}
                    currencySymbol={symbol}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Rates are indicative and may vary. Always verify on the provider&apos;s site before sending.
          Affiliate links help keep this service free.
        </p>
      </div>
    </section>
  )
}
