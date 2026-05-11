"use client"

import { useState, useRef, useEffect } from "react"
import Script from "next/script"

type Tab = "sierraleone" | "domestic"

const DISCLAIMER =
  "Flight prices change constantly. All searches open live results from Skyscanner or Google Flights. RemitSL does not show or guarantee any specific price. Always verify on the provider's website before booking."

// ── Routes to Sierra Leone ──────────────────────────────────────────
const SL_ROUTES_US = [
  { label: "New York JFK → Freetown FNA", iata: "JFK.FNA" },
  { label: "New York Newark (EWR) → Freetown FNA", iata: "EWR.FNA" },
  { label: "Washington DC (IAD) → Freetown FNA", iata: "IAD.FNA" },
  { label: "Washington DC (DCA) → Freetown FNA", iata: "DCA.FNA" },
  { label: "Washington DC (BWI) → Freetown FNA", iata: "BWI.FNA" },
  { label: "Atlanta (ATL) → Freetown FNA", iata: "ATL.FNA" },
  { label: "Houston (IAH) → Freetown FNA", iata: "IAH.FNA" },
  { label: "Philadelphia (PHL) → Freetown FNA", iata: "PHL.FNA" },
  { label: "Boston (BOS) → Freetown FNA", iata: "BOS.FNA" },
  { label: "Dallas (DFW) → Freetown FNA", iata: "DFW.FNA" },
  { label: "Chicago (ORD) → Freetown FNA", iata: "ORD.FNA" },
  { label: "Charlotte (CLT) → Freetown FNA", iata: "CLT.FNA" },
  { label: "Miami (MIA) → Freetown FNA", iata: "MIA.FNA" },
  { label: "Los Angeles (LAX) → Freetown FNA", iata: "LAX.FNA" },
  { label: "Minneapolis (MSP) → Freetown FNA", iata: "MSP.FNA" },
  { label: "Providence (PVD) → Freetown FNA", iata: "PVD.FNA" },
  { label: "Hartford (BDL) → Freetown FNA", iata: "BDL.FNA" },
  { label: "Detroit (DTW) → Freetown FNA", iata: "DTW.FNA" },
  { label: "Baltimore (BWI) → Freetown FNA", iata: "BWI.FNA" },
  { label: "San Francisco (SFO) → Freetown FNA", iata: "SFO.FNA" },
]

const SL_ROUTES_UK = [
  { label: "London Heathrow (LHR) → Freetown FNA", iata: "LHR.FNA" },
  { label: "London Gatwick (LGW) → Freetown FNA", iata: "LGW.FNA" },
  { label: "London Stansted (STN) → Freetown FNA", iata: "STN.FNA" },
  { label: "Manchester (MAN) → Freetown FNA", iata: "MAN.FNA" },
  { label: "Birmingham (BHX) → Freetown FNA", iata: "BHX.FNA" },
  { label: "Bristol (BRS) → Freetown FNA", iata: "BRS.FNA" },
  { label: "Edinburgh (EDI) → Freetown FNA", iata: "EDI.FNA" },
  { label: "Glasgow (GLA) → Freetown FNA", iata: "GLA.FNA" },
]

const SL_ROUTES_CA = [
  { label: "Toronto (YYZ) → Freetown FNA", iata: "YYZ.FNA" },
  { label: "Ottawa (YOW) → Freetown FNA", iata: "YOW.FNA" },
  { label: "Montreal (YUL) → Freetown FNA", iata: "YUL.FNA" },
  { label: "Vancouver (YVR) → Freetown FNA", iata: "YVR.FNA" },
  { label: "Calgary (YYC) → Freetown FNA", iata: "YYC.FNA" },
]

const SL_ROUTES_OTHER = [
  { label: "Brussels (BRU) → Freetown FNA", iata: "BRU.FNA" },
  { label: "Paris (CDG) → Freetown FNA", iata: "CDG.FNA" },
  { label: "Amsterdam (AMS) → Freetown FNA", iata: "AMS.FNA" },
  { label: "Casablanca (CMN) → Freetown FNA", iata: "CMN.FNA" },
  { label: "Dubai (DXB) → Freetown FNA", iata: "DXB.FNA" },
  { label: "Nairobi (NBO) → Freetown FNA", iata: "NBO.FNA" },
  { label: "Accra (ACC) → Freetown FNA", iata: "ACC.FNA" },
  { label: "Abuja (ABV) → Freetown FNA", iata: "ABV.FNA" },
]

// ── Domestic US routes ───────────────────────────────────────────────
const US_ROUTES_NY = [
  { label: "New York (JFK) → Washington DC", iata: "JFK.DCA" },
  { label: "New York (JFK) → Atlanta", iata: "JFK.ATL" },
  { label: "New York (JFK) → Houston", iata: "JFK.IAH" },
  { label: "New York (JFK) → Philadelphia", iata: "JFK.PHL" },
  { label: "New York (JFK) → Boston", iata: "JFK.BOS" },
  { label: "New York (JFK) → Chicago", iata: "JFK.ORD" },
  { label: "New York (JFK) → Charlotte", iata: "JFK.CLT" },
  { label: "New York (JFK) → Miami", iata: "JFK.MIA" },
  { label: "New York (JFK) → Dallas", iata: "JFK.DFW" },
  { label: "New York (JFK) → Minneapolis", iata: "JFK.MSP" },
  { label: "New York (JFK) → Los Angeles", iata: "JFK.LAX" },
  { label: "New York (EWR) → Washington DC", iata: "EWR.DCA" },
  { label: "New York (EWR) → Atlanta", iata: "EWR.ATL" },
]

const US_ROUTES_DC = [
  { label: "Washington DC (IAD) → Atlanta", iata: "IAD.ATL" },
  { label: "Washington DC (IAD) → Houston", iata: "IAD.IAH" },
  { label: "Washington DC (IAD) → Philadelphia", iata: "IAD.PHL" },
  { label: "Washington DC (IAD) → Boston", iata: "IAD.BOS" },
  { label: "Washington DC (IAD) → Chicago", iata: "IAD.ORD" },
  { label: "Washington DC (IAD) → Charlotte", iata: "IAD.CLT" },
  { label: "Washington DC (IAD) → Miami", iata: "IAD.MIA" },
  { label: "Washington DC (IAD) → Dallas", iata: "IAD.DFW" },
  { label: "Washington DC (IAD) → Minneapolis", iata: "IAD.MSP" },
  { label: "Washington DC (DCA) → Atlanta", iata: "DCA.ATL" },
  { label: "Washington DC (DCA) → Houston", iata: "DCA.IAH" },
  { label: "Washington DC (BWI) → Atlanta", iata: "BWI.ATL" },
]

const US_ROUTES_ATL = [
  { label: "Atlanta (ATL) → Houston", iata: "ATL.IAH" },
  { label: "Atlanta (ATL) → Philadelphia", iata: "ATL.PHL" },
  { label: "Atlanta (ATL) → Boston", iata: "ATL.BOS" },
  { label: "Atlanta (ATL) → Chicago", iata: "ATL.ORD" },
  { label: "Atlanta (ATL) → Charlotte", iata: "ATL.CLT" },
  { label: "Atlanta (ATL) → Miami", iata: "ATL.MIA" },
  { label: "Atlanta (ATL) → Dallas", iata: "ATL.DFW" },
  { label: "Atlanta (ATL) → Minneapolis", iata: "ATL.MSP" },
  { label: "Atlanta (ATL) → Detroit", iata: "ATL.DTW" },
  { label: "Atlanta (ATL) → Los Angeles", iata: "ATL.LAX" },
]

const US_ROUTES_OTHER = [
  { label: "Philadelphia (PHL) → Houston", iata: "PHL.IAH" },
  { label: "Philadelphia (PHL) → Boston", iata: "PHL.BOS" },
  { label: "Philadelphia (PHL) → Chicago", iata: "PHL.ORD" },
  { label: "Boston (BOS) → Chicago", iata: "BOS.ORD" },
  { label: "Boston (BOS) → Houston", iata: "BOS.IAH" },
  { label: "Boston (BOS) → Miami", iata: "BOS.MIA" },
  { label: "Houston (IAH) → Chicago", iata: "IAH.ORD" },
  { label: "Houston (IAH) → Miami", iata: "IAH.MIA" },
  { label: "Houston (IAH) → Dallas", iata: "IAH.DFW" },
  { label: "Charlotte (CLT) → Houston", iata: "CLT.IAH" },
  { label: "Charlotte (CLT) → Miami", iata: "CLT.MIA" },
  { label: "Charlotte (CLT) → Chicago", iata: "CLT.ORD" },
  { label: "Minneapolis (MSP) → Chicago", iata: "MSP.ORD" },
  { label: "Minneapolis (MSP) → Houston", iata: "MSP.IAH" },
  { label: "Providence (PVD) → Atlanta", iata: "PVD.ATL" },
  { label: "Hartford (BDL) → Atlanta", iata: "BDL.ATL" },
]

// ── Airlines ─────────────────────────────────────────────────────────
const AIRLINES = [
  {
    name: "Brussels Airlines",
    description:
      "The primary carrier to Freetown, operating via Brussels with connections from North America, the UK, and Europe.",
  },
  {
    name: "Royal Air Maroc",
    description:
      "Serves Freetown via Casablanca, with connections from the US, UK, and Canada through its Moroccan hub.",
  },
  {
    name: "Air France",
    description:
      "Operates connections to Freetown via Paris Charles de Gaulle, often in partnership with Brussels Airlines.",
  },
  {
    name: "British Airways",
    description:
      "Provides connections to Freetown via London Heathrow in codeshare with partner airlines.",
  },
  {
    name: "Kenya Airways",
    description:
      "Serves Freetown via Nairobi, offering an alternative East African routing.",
  },
]

// ── Travel tips ───────────────────────────────────────────────────────
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

// ── Best price tips ───────────────────────────────────────────────────
const BEST_PRICE_TIPS = [
  {
    heading: "Compare across platforms",
    body: "Check Skyscanner, Google Flights, and the airline's own website before booking. Prices vary between platforms.",
  },
  {
    heading: "Use flexible date search",
    body: "Flexible travel dates almost always reduce cost. Use the calendar view on Google Flights to see prices across a full month.",
  },
  {
    heading: "Book directly with the airline",
    body: "After finding the best price, consider booking directly with the airline to avoid third-party booking fees.",
  },
]

function DisclaimerBox() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
      <span className="font-semibold">Disclaimer: </span>
      {DISCLAIMER}
    </div>
  )
}

function RouteGrid({
  routes,
}: {
  routes: { label: string; iata: string }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
      {routes.map((route) => (
        <a
          key={route.iata}
          href={`https://www.google.com/flights#flt=${route.iata}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-gold hover:shadow-sm transition-all group"
        >
          <span className="text-navy font-medium text-sm group-hover:text-gold transition-colors leading-snug">
            {route.label}
          </span>
          <span className="text-xs text-gold font-semibold whitespace-nowrap ml-2 flex-shrink-0">
            Search →
          </span>
        </a>
      ))}
    </div>
  )
}

function RouteSection({
  title,
  routes,
}: {
  title: string
  routes: { label: string; iata: string }[]
}) {
  const [expanded, setExpanded] = useState(false)
  const PREVIEW = 6
  const visible = expanded ? routes : routes.slice(0, PREVIEW)

  return (
    <div>
      <h3 className="font-semibold text-navy mb-3 text-base">{title}</h3>
      <RouteGrid routes={visible} />
      {routes.length > PREVIEW && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 text-sm text-gold hover:text-gold-light font-medium transition-colors"
        >
          {expanded
            ? "Show fewer routes ↑"
            : `Show all ${routes.length} routes ↓`}
        </button>
      )}
    </div>
  )
}

function FlightSearchWidget({
  origin,
  destination,
}: {
  origin: string
  destination?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
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

export default function FlightsPage() {
  const [tab, setTab] = useState<Tab>("sierraleone")

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
          Search real live prices for flights to Sierra Leone and domestic US travel.
        </p>
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

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">

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

            {/* Routes */}
            <section className="space-y-8">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-navy mb-1">
                  All routes to Freetown
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Each button opens a live Google Flights search. No prices are shown here.
                </p>
              </div>
              <RouteSection title="From the United States" routes={SL_ROUTES_US} />
              <RouteSection title="From the United Kingdom" routes={SL_ROUTES_UK} />
              <RouteSection title="From Canada" routes={SL_ROUTES_CA} />
              <RouteSection title="From Europe & Africa" routes={SL_ROUTES_OTHER} />
            </section>

            {/* Airlines */}
            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                Airlines serving Freetown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AIRLINES.map((airline) => (
                  <div
                    key={airline.name}
                    className="bg-white border border-gray-100 rounded-xl px-5 py-4"
                  >
                    <span className="font-semibold text-navy">{airline.name}</span>
                    <p className="text-gray-500 text-sm mt-1">{airline.description}</p>
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
                    <h3 className="font-semibold text-navy mb-2 text-sm">{tip.heading}</h3>
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

            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                Search domestic flights
              </h2>
              <div className="bg-white rounded-2xl shadow border border-gray-100 p-4 min-h-[200px]">
                <FlightSearchWidget origin="JFK" />
              </div>
            </section>

            <section className="space-y-8">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-navy mb-1">
                  All domestic routes
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Routes between US cities with large Sierra Leonean communities. Opens live Google Flights results.
                </p>
              </div>
              <RouteSection title="From New York" routes={US_ROUTES_NY} />
              <RouteSection title="From Washington DC" routes={US_ROUTES_DC} />
              <RouteSection title="From Atlanta" routes={US_ROUTES_ATL} />
              <RouteSection title="Other routes" routes={US_ROUTES_OTHER} />
            </section>
          </>
        )}

        {/* ── HOW TO GET THE BEST PRICE ── */}
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
