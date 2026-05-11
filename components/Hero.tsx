"use client"

export default function Hero() {
  const scrollToCompare = () => {
    const el = document.getElementById("compare")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-gradient-to-br from-navy via-[#0d2a5e] to-[#0a1f44] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Sierra Leone flag inline SVG */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 40"
            className="w-16 h-11 rounded shadow-lg"
            aria-label="Sierra Leone flag"
          >
            <rect width="60" height="40" fill="#1eb53a" />
            <rect y="13.3" width="60" height="13.4" fill="#ffffff" />
            <rect y="26.7" width="60" height="13.3" fill="#0072c6" />
          </svg>
        </div>

        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
          Compare Remittance Rates to{" "}
          <span className="text-gold">Sierra Leone</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Find the cheapest way to send money home. Updated live.
        </p>

        {/* Stat pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            💰 Save up to 18% in fees
          </span>
          <span className="bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            🏦 8 providers compared
          </span>
          <span className="bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            🔄 Rates updated every 5 minutes
          </span>
        </div>

        <button
          onClick={scrollToCompare}
          className="bg-gold hover:bg-gold-light text-navy font-bold text-lg px-10 py-4 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
        >
          Compare Now
        </button>
      </div>
    </section>
  )
}
