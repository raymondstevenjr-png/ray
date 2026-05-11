"use client"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"

type Tab = "sierraleone" | "domestic"

const DISCLAIMER =
  "Flight prices change constantly. All searches open live results from Skyscanner or Google Flights. RemitSL does not show or guarantee any specific price. Always verify on the provider's website before booking."

const SL_ROUTES = [
  { label: "New York (JFK) → Freetown (FNA)", iata: "JFK.FNA" },
  { label: "Washington DC (IAD) → Freetown (FNA)", iata: "IAD.FNA" },
  { label: "Atlanta (ATL) → Freetown (FNA)", iata: "ATL.FNA" },
  { label: "London (LHR) → Freetown (FNA)", iata: "LHR.FNA" },
  { label: "Toronto (YYZ) → Freetown (FNA)", iata: "YYZ.FNA" },
]

const US_ROUTES = [
  { label: "New York → Washington DC", iata: "JFK.DCA" },
  { label: "New York → Atlanta", iata: "JFK.ATL" },
  { label: "Washington DC → Atlanta", iata: "DCA.ATL" },
  { label: "Atlanta → Houston", iata: "ATL.HOU" },
]

const AIRLINES = [
  {
    name: "Brussels Airlines",
    description:
      "The primary European hub carrier to Freetown, operating via Brussels with connections from North America.",
  },
  {
    name: "Royal Air Maroc",
    description:
      "Serves Freetown via Casablanca, offering connections from the US, UK, and Canada through its Moroccan hub.",
  },
  {
    name: "Air France",
    description:
      "Operates connections to Freetown via Paris Charles de Gaulle, partnered with Brussels Airlines on some routes.",
  },
  {
    name: "British Airways",
    description:
      "Provides connections to Freetown via London Heathrow, often in codeshare with partner airlines.",
  },
  {
    name: "Kenya Airways",
    description:
      "Serves Freetown via Nairobi, offering an alternative routing particularly useful for travelers from East Africa.",
  },
]

const TRAVEL_TIPS = [
  {
    heading: "Lungi Airport transfer",
    body: "Lungi International Airport (FNA) is located across the Sierra Leone River from Freetown. A ferry or helicopter transfer is required to reach the city center. Factor this into your travel time and budget.",
  },
  {
    heading: "Visa requirement for US citizens",
    body: "US citizens require a visa to enter Sierra Leone. Apply in advance through the Sierra Leone Embassy or consulate. Check the embassy website for current processing times.",
  },
  {
    heading: "Time zone",
    body: "Freetown operates on Greenwich Mean Time (GMT+0) year-round. Sierra Leone does not observe daylight saving time.",
  },
]

const BEST_PRICE_TIPS = [
  {
    heading: "Compare across platforms",
    body: "Check Skyscanner, Google Flights, and the airline's own website before booking. Prices vary between platforms and booking directly with the airline sometimes costs less.",
  },
  {
    heading: "Use flexible date search",
    body: "Flexible travel dates almost always reduce cost. Use the calendar view on Google Flights to see prices across a full month and identify the cheapest travel windows.",
  },
  {
    heading: "Book directly with the airline",
    body: "After finding the best price on a comparison site, consider booking directly with the airline to avoid third-party booking fees and simplify any changes or cancellations.",
  },
]

function FlightSearchWidget({
  origin,
  destination,
}: {
  origin: string
  destination?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Re-initialize widget when tab changes by forcing a remount key
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as Record<string, unknown>)["skyscanner_widget"]
    ) {
      // If Skyscanner loader is already present, trigger re-render
      const evt = new Event("skyscanner-widget-ready")
      window.dispatchEvent(evt)
    }
  }, [origin, destination])

  return (
    <div ref={ref}>
      <div
        data-skyscanner-widget="FlightSearchWidget"
        data-locale="en-US"
        data-origin-iata={origin}
        {...(destination ? { "data-destination-iata": destination } : {})}
        data-adults="1"
        data-currency="USD"
      />
    </div>
  )
}

function DisclaimerBox() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
      <span className="font-semibold">Disclaimer: </span>
      {DISCLAIMER}
    </div>
  )
}

export default function FlightsPage() {
  const [tab, setTab] = useState<Tab>("sierraleone")

  const googleFlightsUrl = (iata: string) =>
    `https://www.google.com/flights#flt=${iata}`

  return (
    <>
      <Script
        src="https://widgets.skyscanner.net/widget-server/js/loader.js"
        strategy="lazyOnload"
      />

      {/* Hero */}
      <section className="bg-navy py-16 px-4 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3">
          Fly home. Fly smart.
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
          Search real live prices for flights to Sierra Leone and domestic US
          travel.
        </p>

        {/* Tabs */}
        <div className="inline-flex rounded-xl overflow-hidden border border-white/20">
          <button
            onClick={() => setTab("sierraleone")}
            className={`px-6 py-2.5 text-sm font-semibold transition-colors ${
              tab === "sierraleone"
                ? "bg-gold text-navy"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            ✈️ Flights to Sierra Leone
          </button>
          <button
            onClick={() => setTab("domestic")}
            className={`px-6 py-2.5 text-sm font-semibold transition-colors ${
              tab === "domestic"
                ? "bg-gold text-navy"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            🇺🇸 Domestic US
          </button>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* ── SIERRA LEONE TAB ── */}
        {tab === "sierraleone" && (
          <>
            <DisclaimerBox />

            {/* Skyscanner widget */}
            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                Search flights to Freetown
              </h2>
              <div className="bg-white rounded-2xl shadow border border-gray-100 p-4 min-h-[200px]">
                <FlightSearchWidget origin="JFK" destination="FNA" />
              </div>
            </section>

            {/* Quick search routes */}
            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-2">
                Popular routes
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Opens live search results on Google Flights. No prices are shown here — click to see current fares.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SL_ROUTES.map((route) => (
                  <a
                    key={route.iata}
                    href={googleFlightsUrl(route.iata)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-gold hover:shadow-sm transition-all group"
                  >
                    <span className="text-navy font-medium text-sm group-hover:text-gold transition-colors">
                      {route.label}
                    </span>
                    <span className="text-xs text-gold font-semibold whitespace-nowrap ml-3">
                      Search now →
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* Airlines */}
            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                Airlines serving Freetown
              </h2>
              <div className="space-y-3">
                {AIRLINES.map((airline) => (
                  <div
                    key={airline.name}
                    className="bg-white border border-gray-100 rounded-xl px-5 py-4"
                  >
                    <span className="font-semibold text-navy">{airline.name}</span>
                    <span className="text-gray-500 text-sm"> — {airline.description}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Travel tips */}
            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                Travel tips for Sierra Leone
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TRAVEL_TIPS.map((tip) => (
                  <div
                    key={tip.heading}
                    className="bg-navy/5 border border-navy/10 rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-navy mb-2 text-sm">
                      {tip.heading}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tip.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── DOMESTIC US TAB ── */}
        {tab === "domestic" && (
          <>
            <DisclaimerBox />

            {/* Skyscanner widget — no destination */}
            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                Search domestic flights
              </h2>
              <div className="bg-white rounded-2xl shadow border border-gray-100 p-4 min-h-[200px]">
                <FlightSearchWidget origin="JFK" />
              </div>
            </section>

            {/* Quick routes */}
            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-2">
                Routes between Sierra Leonean communities
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Opens live search results on Google Flights. No prices are shown here — click to see current fares.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {US_ROUTES.map((route) => (
                  <a
                    key={route.iata}
                    href={googleFlightsUrl(route.iata)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-gold hover:shadow-sm transition-all group"
                  >
                    <span className="text-navy font-medium text-sm group-hover:text-gold transition-colors">
                      {route.label}
                    </span>
                    <span className="text-xs text-gold font-semibold whitespace-nowrap ml-3">
                      Search now →
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── HOW TO GET THE BEST PRICE (both tabs) ── */}
        <section>
          <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
            How to get the best price
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BEST_PRICE_TIPS.map((tip, i) => (
              <div
                key={tip.heading}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
              >
                <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-navy mb-2 text-sm">{tip.heading}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── AFFILIATE DISCLOSURE ── */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-600">Affiliate disclosure: </span>
          RemitSL earns a commission from some booking partners when you complete a purchase. This never affects the prices you see.
        </section>

      </div>
    </>
  )
}
