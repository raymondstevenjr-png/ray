"use client"

import { useState, useMemo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from "recharts"

type ChartCurrency = "USD" | "GBP" | "CAD"

const BASELINES: Record<ChartCurrency, number> = {
  USD: 22.52,
  GBP: 28.55,
  CAD: 16.58,
}

function generateData(baseCurrency: ChartCurrency) {
  const baseline = BASELINES[baseCurrency]
  const today = new Date()
  const data = []

  // Use a seeded-like pattern so it looks realistic but consistent
  const seed = baseCurrency === "USD" ? 1 : baseCurrency === "GBP" ? 2 : 3
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    // Pseudo-random variation ±0.3 around baseline
    const noise = Math.sin((i * seed * 3.7) + seed) * 0.15 + Math.cos((i * seed * 2.1)) * 0.12
    const rate = parseFloat((baseline + noise).toFixed(4))

    data.push({ date: label, rate })
  }

  return data
}

interface TooltipPayload {
  value: number
  name: string
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy text-white px-3 py-2 rounded-lg shadow-lg text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-gold font-bold">{payload[0].value.toFixed(4)} SLE</p>
      </div>
    )
  }
  return null
}

export default function RateTrendChart() {
  const [currency, setCurrency] = useState<ChartCurrency>("USD")

  const data = useMemo(() => generateData(currency), [currency])
  const currentRate = BASELINES[currency]

  const tabs: ChartCurrency[] = ["USD", "GBP", "CAD"]

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-navy text-center mb-2">
          30-Day Rate Trend
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Sendwave rate (SLE per {currency}) over the past 30 days. Send when the rate is high.
        </p>

        {/* Currency tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {tabs.map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-5 py-2 text-sm font-medium transition-colors ${
                  currency === c
                    ? "bg-navy text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {c === "USD" ? "🇺🇸" : c === "GBP" ? "🇬🇧" : "🇨🇦"} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickLine={false}
                interval={4}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => v.toFixed(2)}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={currentRate}
                stroke="#c9952a"
                strokeDasharray="4 4"
                strokeWidth={2}
                label={{
                  value: `Current: ${currentRate.toFixed(2)}`,
                  fill: "#c9952a",
                  fontSize: 11,
                  position: "right",
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#0a1f44"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#c9952a", stroke: "#0a1f44", strokeWidth: 2 }}
                name={`${currency} to SLE`}
              />
              <Legend
                wrapperStyle={{ paddingTop: 12, fontSize: 12, color: "#6b7280" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-gray-400 mt-3 text-center">
          Chart shows Sendwave indicative rates. Actual rates may vary. Historical data is illustrative.
        </p>
      </div>
    </section>
  )
}
