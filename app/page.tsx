import Hero from "@/components/Hero"
import ComparisonTable from "@/components/ComparisonTable"
import SavingsCalculator from "@/components/SavingsCalculator"
import RateTrendChart from "@/components/RateTrendChart"
import RateAlertForm from "@/components/RateAlertForm"
import HowItWorks from "@/components/HowItWorks"
import FaqSection from "@/components/FaqSection"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ComparisonTable />
      <SavingsCalculator />
      <HowItWorks />
      <RateTrendChart />

      {/* Rate Alert section */}
      <section className="py-16 px-4 bg-navy">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold text-white mb-3">
            Get Notified When Rates Rise
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Exchange rates fluctuate daily. Set a target rate and we&apos;ll email you the moment
            the mid-market rate hits your goal — so you can send at the perfect time.
          </p>
        </div>
        <RateAlertForm />
      </section>

      <FaqSection />

      {/* Chat CTA section */}
      <section className="py-16 px-4 bg-gradient-to-br from-navy to-[#0d2a5e] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-gold/10 border-2 border-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Have Questions? Ask Our AI Assistant
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Our AI assistant knows the current rates, fees, and best practices for sending money
            to Sierra Leone. Ask in English or Krio. Available 24/7 — just click the chat
            button in the bottom-right corner.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              "Which provider is best for $500?",
              "Is Sendwave available in the UK?",
              "How do I spot a remittance scam?",
              "What is the SLE exchange rate today?",
            ].map((q) => (
              <span
                key={q}
                className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-gray-200"
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
