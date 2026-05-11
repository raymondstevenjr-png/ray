import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Credit Cards for Immigrants – RemitSL",
  description:
    "Top credit card recommendations for Sierra Leoneans and other immigrants building credit in the US. No SSN required options included.",
}

const cards = [
  {
    name: "Discover it® Secured",
    tagline: "Best for building credit — no SSN required",
    badge: "Most Accessible",
    badgeColor: "bg-green-600",
    benefits: [
      "No Social Security Number required to apply (ITIN accepted)",
      "Earn 2% cash back at gas stations and restaurants, 1% everywhere else",
      "Discover matches all cash back earned in your first year — automatically",
      "Automatic reviews for upgrade to unsecured card after 7 months",
    ],
    note: "Security deposit as low as $200. No annual fee.",
    href: "#",
  },
  {
    name: "Capital One Platinum Secured",
    tagline: "Low deposit, automatic upgrade reviews",
    badge: "Low Barrier",
    badgeColor: "bg-blue-600",
    benefits: [
      "Security deposit as low as $49, $99, or $200 depending on creditworthiness",
      "Automatic credit line reviews starting at 6 months",
      "Reports to all three major credit bureaus monthly",
      "Access to Capital One's CreditWise tool to track your score",
    ],
    note: "No annual fee. No foreign transaction fees.",
    href: "#",
  },
  {
    name: "OpenSky® Secured Visa®",
    tagline: "No credit check — approval for almost everyone",
    badge: "No Credit Check",
    badgeColor: "bg-purple-600",
    benefits: [
      "No credit check required — just a bank account and ID",
      "Helps establish or rebuild credit with three bureau reporting",
      "Credit limit equals your deposit ($200–$3,000)",
      "Accepted by any Visa merchant worldwide",
    ],
    note: "Annual fee of $35. Good option when other cards decline.",
    href: "#",
  },
  {
    name: "Self Credit Builder Account + Visa®",
    tagline: "Build credit while saving money",
    badge: "Save While Building",
    badgeColor: "bg-gold",
    benefits: [
      "Combines a credit-builder loan with a secured Visa card",
      "Monthly payments build savings and your credit score simultaneously",
      "No hard credit pull to open the Credit Builder Account",
      "Receive your savings at the end (minus fees and interest)",
    ],
    note: "Monthly fee from $25. Not a traditional credit card — more of a savings + credit tool.",
    href: "#",
  },
]

export default function CreditCardsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl font-bold mb-4">
            Credit Cards for Immigrants
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
            Building credit in the US can feel impossible when you&apos;re just arriving.
            These cards are designed for people with no US credit history.
          </p>
          <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 inline-block text-sm text-gray-200">
            These recommendations are for informational purposes. We may earn a commission if you apply through our links.
          </div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <div
                key={card.name}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card header */}
                <div className="bg-navy p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-playfair text-xl font-bold text-white mb-1">
                        {card.name}
                      </h2>
                      <p className="text-gray-300 text-sm">{card.tagline}</p>
                    </div>
                    <span className={`${card.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0`}>
                      {card.badge}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <ul className="space-y-3 mb-5">
                    {card.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-gray-400 mb-4 bg-gray-50 rounded-lg px-3 py-2">
                    {card.note}
                  </p>

                  <a
                    href={card.href}
                    className="block w-full text-center bg-navy hover:bg-navy/90 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Tips section */}
          <div className="mt-12 bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8">
            <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
              Tips for Building Credit as a New Immigrant
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              {[
                {
                  title: "Start with a secured card",
                  desc: "A secured card is the fastest way to start building a credit history. Use it for one or two small monthly purchases and pay it off in full.",
                },
                {
                  title: "Pay on time, every time",
                  desc: "Payment history is the single biggest factor in your credit score — about 35%. Set up autopay for at least the minimum payment.",
                },
                {
                  title: "Keep utilization below 30%",
                  desc: "If your credit limit is $500, try not to carry a balance above $150. Low utilization signals responsible credit use.",
                },
                {
                  title: "Don't close old accounts",
                  desc: "The length of your credit history matters. Once you open a card and build a history, keep it open even if you don't use it much.",
                },
              ].map((tip) => (
                <div key={tip.title} className="flex gap-3">
                  <div className="w-1.5 bg-gold rounded-full flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-navy mb-1">{tip.title}</p>
                    <p>{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
