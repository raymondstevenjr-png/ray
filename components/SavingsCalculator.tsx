"use client"

import { useState } from "react"
import { getProviders, calculateResults, BASELINE_MID_MARKET } from "@/lib/providers"

export default function SavingsCalculator() {
  const [amount, setAmount] = useState<number>(200)
  const [inputValue, setInputValue] = useState<string>("200")

  const providers = getProviders("US")
  const results = calculateResults(providers, amount, BASELINE_MID_MARKET.USD, BASELINE_MID_MARKET.USD)

  const best = results[0]
  const worst = results[results.length - 1]

  const savingsSle = best && worst ? best.recipientSle - worst.recipientSle : 0
  const savingsPct = worst && worst.recipientSle > 0
    ? ((savingsSle / worst.recipientSle) * 100).toFixed(1)
    : "0"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setInputValue(raw)
    const parsed = parseFloat(raw)
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed)
    }
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-navy text-center mb-2">
          Savings Calculator
        </h2>
        <p className="text-gray-500 text-center mb-8">
          See exactly how much more your family receives by choosing the best provider.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Amount input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send amount (USD)
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-1 max-w-xs">
                <span className="bg-gray-50 px-3 py-3 text-gray-500 font-medium border-r border-gray-200">$</span>
                <input
                  type="number"
                  min="1"
                  step="50"
                  value={inputValue}
                  onChange={handleChange}
                  className="px-3 py-3 w-full focus:outline-none focus:ring-2 focus:ring-navy/20 text-navy font-medium"
                  aria-label="Send amount in USD"
                />
              </div>
              <div className="flex gap-2">
                {[100, 200, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setAmount(amt); setInputValue(String(amt)) }}
                    className={`px-3 py-3 text-sm rounded-lg border transition-colors ${
                      amount === amt ? "bg-navy text-white border-navy" : "bg-white text-gray-600 border-gray-200 hover:border-navy"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison */}
          {best && worst && (
            <div className="space-y-4">
              {/* Best provider */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        Best
                      </span>
                      <span className="font-semibold text-navy">{best.name}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Fee: {best.fee} (={best.feeAmount > 0 ? `$${best.feeAmount.toFixed(2)}` : "$0.00"})
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-700">
                      {best.recipientSle.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-gray-500">SLE received</p>
                  </div>
                </div>
              </div>

              {/* Worst provider */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        Most Expensive
                      </span>
                      <span className="font-semibold text-navy">{worst.name}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Fee: {worst.fee} (=${worst.feeAmount.toFixed(2)})
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">
                      {worst.recipientSle.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-gray-500">SLE received</p>
                  </div>
                </div>
              </div>

              {/* Savings summary */}
              <div className="bg-gold/10 border-2 border-gold rounded-xl p-4">
                <p className="text-center text-navy font-bold text-lg">
                  With {best.name} your family receives{" "}
                  <span className="text-gold">
                    {savingsSle.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    SLE more
                  </span>{" "}
                  than {worst.name} —{" "}
                  <span className="text-gold">{savingsPct}% more</span>
                </p>
                <p className="text-center text-sm text-gray-500 mt-1">
                  That&apos;s money that stays in your family&apos;s hands.
                </p>
              </div>

              {/* All providers ranked */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">All providers ranked by SLE received:</p>
                <div className="space-y-2">
                  {results.map((r) => {
                    const pct = worst.recipientSle > 0
                      ? ((r.recipientSle / best.recipientSle) * 100).toFixed(0)
                      : "100"
                    return (
                      <div key={r.name} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-5 text-right">{r.rank}</span>
                        <span className="text-sm font-medium text-navy w-28 shrink-0">{r.name}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-navy to-gold"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-24 text-right">
                          {r.recipientSle.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })} SLE
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
