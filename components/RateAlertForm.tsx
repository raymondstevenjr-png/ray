"use client"

import { useState } from "react"
import type { Corridor, Currency } from "@/lib/types"

const CORRIDOR_CURRENCY: Record<Corridor, Currency> = {
  US: "USD",
  UK: "GBP",
  CA: "CAD",
}

const BASELINE_RATES: Record<Currency, number> = {
  USD: 22.93,
  GBP: 29.05,
  CAD: 16.88,
}

export default function RateAlertForm() {
  const [email, setEmail] = useState("")
  const [targetRate, setTargetRate] = useState("")
  const [country, setCountry] = useState<Corridor>("US")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const currency = CORRIDOR_CURRENCY[country]
  const currentBaseline = BASELINE_RATES[currency]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const parsed = parseFloat(targetRate)
    if (isNaN(parsed) || parsed <= 0 || parsed > 100) {
      setStatus("error")
      setErrorMsg("Please enter a valid target rate (e.g. 23.50)")
      return
    }

    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          target_rate: parsed,
          country,
          currency,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to set alert")
      }

      setStatus("success")
      setEmail("")
      setTargetRate("")
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 max-w-xl mx-auto">
      {status === "success" ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-playfair text-2xl font-bold text-navy mb-2">Alert Set!</h3>
          <p className="text-gray-500">
            We&apos;ll email you when the {currency} → SLE rate reaches your target.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-navy underline text-sm hover:text-gold transition-colors"
          >
            Set another alert
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sending from
            </label>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {(["US", "UK", "CA"] as Corridor[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCountry(c)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    country === c
                      ? "bg-navy text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {c === "US" ? "🇺🇸 US" : c === "UK" ? "🇬🇧 UK" : "🇨🇦 Canada"}
                </button>
              ))}
            </div>
          </div>

          {/* Target rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alert me when 1 {currency} = X SLE
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <input
                type="number"
                step="0.01"
                min="1"
                max="99"
                value={targetRate}
                onChange={(e) => setTargetRate(e.target.value)}
                placeholder={`e.g. ${(currentBaseline + 0.5).toFixed(2)}`}
                className="flex-1 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-navy/20 text-navy"
                required
              />
              <span className="bg-gray-50 px-3 py-3 text-gray-500 text-sm border-l border-gray-200">
                SLE/{currency}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Current baseline: {currentBaseline.toFixed(2)} SLE per {currency}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 text-navy"
              required
            />
          </div>

          {/* Error */}
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Setting alert…" : "Set Rate Alert"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            No spam. Unsubscribe anytime. We only email when your rate target is reached.
          </p>
        </form>
      )}
    </div>
  )
}
