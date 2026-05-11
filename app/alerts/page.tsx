import type { Metadata } from "next"
import RateAlertForm from "@/components/RateAlertForm"

export const metadata: Metadata = {
  title: "Rate Alerts – RemitSL | Get Notified When SLE Rates Rise",
  description:
    "Set a target exchange rate for USD, GBP, or CAD to SLE. We'll email you when the rate hits your goal so you can send money at the perfect moment.",
}

export default function AlertsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-navy text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-4xl font-bold mb-4">
            Rate Alerts
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Exchange rates move daily. Set your target and we&apos;ll email you the moment
            the rate is right — so you send at the best possible time.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-xl mx-auto">
          <RateAlertForm />
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-navy text-center mb-8">
            How Rate Alerts Work
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Set your target",
                desc: "Choose the SLE rate you want per USD, GBP, or CAD. We recommend setting a target 2–5% above the current rate.",
              },
              {
                icon: "🔍",
                title: "We monitor 24/7",
                desc: "We check the mid-market exchange rate every 6 hours using live data from global currency APIs.",
              },
              {
                icon: "📧",
                title: "Get emailed instantly",
                desc: "When the rate reaches or exceeds your target, you receive an email with a direct link to the best provider.",
              },
            ].map((step) => (
              <div key={step.title} className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center">
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-semibold text-navy mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good target rate guide */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-navy text-center mb-6">
            What&apos;s a Good Target Rate?
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                <h3 className="font-semibold text-navy">USD → SLE</h3>
                <span className="bg-navy text-white text-xs px-2 py-1 rounded-full">Baseline: 22.93</span>
              </div>
              <p className="text-gray-500 text-sm mb-3">
                The mid-market rate has historically ranged between 21.50 and 24.00 SLE per USD.
                A target of <strong className="text-navy">23.50 or above</strong> represents a genuinely favorable rate
                that would put meaningfully more money in your family&apos;s hands.
              </p>
              <div className="flex gap-3">
                <div className="flex-1 text-center bg-red-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Poor rate</p>
                  <p className="text-red-600 font-bold">Below 22.00</p>
                </div>
                <div className="flex-1 text-center bg-yellow-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Average rate</p>
                  <p className="text-yellow-600 font-bold">22.00–23.00</p>
                </div>
                <div className="flex-1 text-center bg-green-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Good rate</p>
                  <p className="text-green-600 font-bold">Above 23.00</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                <h3 className="font-semibold text-navy">GBP → SLE</h3>
                <span className="bg-navy text-white text-xs px-2 py-1 rounded-full">Baseline: 29.05</span>
              </div>
              <p className="text-gray-500 text-sm">
                GBP rates track the USD rate adjusted for the GBP/USD exchange rate. A target of{" "}
                <strong className="text-navy">29.50 or above</strong> is worth waiting for.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                <h3 className="font-semibold text-navy">CAD → SLE</h3>
                <span className="bg-navy text-white text-xs px-2 py-1 rounded-full">Baseline: 16.88</span>
              </div>
              <p className="text-gray-500 text-sm">
                Canadian dollar rates are lower per unit but the same principles apply. A target of{" "}
                <strong className="text-navy">17.20 or above</strong> represents a favorable moment to send.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gold/10 border border-gold/30 rounded-xl p-4 text-sm text-navy">
            <strong>Tip:</strong> Don&apos;t wait for a perfect rate. If you need to send money for an
            emergency, send immediately. Rate alerts work best for planned, non-urgent transfers where
            timing flexibility lets you capture an extra 2–5% in value.
          </div>
        </div>
      </section>
    </div>
  )
}
