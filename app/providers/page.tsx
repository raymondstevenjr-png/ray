import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Provider Reviews – RemitSL | Honest Remittance Ratings",
  description:
    "Honest, detailed reviews of all 8 remittance providers for Sierra Leone. Pros, cons, and real ratings to help you choose the best service.",
}

const providers = [
  {
    name: "Wave",
    rating: 4.8,
    reviews: 12400,
    affiliate:
      "https://www.wave.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
    review:
      "Wave is consistently the top-performing provider for Sierra Leone based on effective rate. Their 1% fee is small enough that their best-in-class exchange rate of 22.93 SLE per dollar almost always wins, particularly on transfers above $200. Delivery is genuinely instant via Orange Money and Africell. The app is well-designed and works reliably. Our top pick for regular senders.",
    pros: [
      "Highest exchange rate of all tested providers (22.93 SLE/USD)",
      "Instant mobile money delivery in minutes",
      "Clean, easy-to-use app for iOS and Android",
      "1% fee is low and transparent — no surprises",
    ],
    cons: [
      "1% fee means Sendwave wins for very small amounts under $100",
      "Recipient needs Orange Money or Africell mobile money account",
      "Not available in all US states yet",
    ],
  },
  {
    name: "Sendwave",
    rating: 4.6,
    reviews: 8200,
    affiliate:
      "https://www.sendwave.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
    review:
      "Sendwave's zero-fee model is hard to argue with — especially for amounts under $200. At 22.52 SLE per dollar with no fee, $100 lands as 2,252 SLE with nothing deducted. Now part of the Wave family of services, Sendwave has excellent regulatory backing and a long track record with the Sierra Leonean diaspora. The app experience is simple and designed for non-technical users.",
    pros: [
      "Zero fees on all transfers — genuinely free to send",
      "22.52 SLE/USD rate is among the best available",
      "Very simple app interface — ideal for less tech-savvy senders",
      "Fast delivery via mobile money networks",
    ],
    cons: [
      "Rate slightly below Wave's rate — Wave wins on larger amounts",
      "No bank transfer option — mobile money only",
      "Customer service can be slow during high-volume periods",
    ],
  },
  {
    name: "Wise",
    rating: 4.8,
    reviews: 14800,
    affiliate:
      "https://wise.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
    review:
      "Wise is the gold standard for transparent pricing. Their fee (0.6% + $0.50 on USD transfers) is shown clearly before you confirm, and they use the real mid-market exchange rate. For bank account delivery — not just mobile money — Wise is the best option. The 1–2 day processing time is the main limitation versus Wave and Sendwave. Excellent for larger amounts sent to bank accounts.",
    pros: [
      "Completely transparent pricing — see the real cost before confirming",
      "Mid-market exchange rate (22.47 SLE/USD) with only a small fee on top",
      "Supports bank account delivery in addition to mobile money",
      "Excellent regulatory reputation and customer support",
    ],
    cons: [
      "1–2 day delivery is slow versus mobile money options",
      "Small fixed fee ($0.50) makes it less ideal for tiny amounts",
      "Requires recipient to have a bank account for best experience",
    ],
  },
  {
    name: "Remitly",
    rating: 4.7,
    reviews: 20400,
    affiliate:
      "https://www.remitly.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
    review:
      "Remitly has a large user base and a professional app experience. Their economy tier offers better rates for next-day delivery; their express tier is faster. For Sierra Leone, the $3.99 flat fee under $500 makes them less competitive on small amounts but decent on mid-range transfers. Customer service is responsive and the app supports multiple delivery methods including bank, mobile money, and cash pickup.",
    pros: [
      "Large established network with strong reliability",
      "Multiple delivery options: bank, mobile money, cash pickup",
      "Responsive customer service — good for resolving issues quickly",
      "Promotional offers for first-time senders",
    ],
    cons: [
      "$3.99 flat fee makes small transfers relatively expensive",
      "Rate (22.36 SLE/USD) not as competitive as Wave or Sendwave",
      "Fee structure can be confusing for first-time users",
    ],
  },
  {
    name: "WorldRemit",
    rating: 4.5,
    reviews: 11900,
    affiliate:
      "https://www.worldremit.com/en?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
    review:
      "WorldRemit is a solid mid-tier option. Their $4.99 fee for transfers under $200 hurts at the small end, but for amounts over $200 their 2% fee model is comparable to others. They support cash pickup at multiple locations in Sierra Leone, which is useful for recipients without mobile money access. The app is functional but not as polished as Wave or Remitly.",
    pros: [
      "Supports cash pickup at multiple Sierra Leone locations",
      "Good option for recipients without mobile money accounts",
      "Available in US, UK, and Canada corridors",
      "Reasonable same-day delivery speed",
    ],
    cons: [
      "$4.99 fee for under-$200 transfers is expensive proportionally",
      "2% fee model not as good as Wave's 1% for larger amounts",
      "Exchange rate (22.24 SLE/USD) is below the market leaders",
    ],
  },
  {
    name: "Ria",
    rating: 4.3,
    reviews: 6700,
    affiliate:
      "https://www.riamoneytransfer.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
    review:
      "Ria's flat $2.99 fee is simple and not unreasonable, but their exchange rate of 22.13 SLE per dollar puts them behind Wave, Sendwave, and Wise even after accounting for the fee. Cash pickup delivery is fast — minutes — which matters for recipients who prefer it. Part of the Euronet Worldwide network. Solid but not the best choice for maximizing SLE delivered.",
    pros: [
      "Simple flat $2.99 fee — easy to understand",
      "Fast cash pickup delivery in minutes",
      "Wide availability — many pickup locations",
      "Established company with strong global network",
    ],
    cons: [
      "Exchange rate (22.13 SLE/USD) below the top providers",
      "Not competitive for mobile money delivery",
      "Only US corridor available for Sierra Leone",
    ],
  },
  {
    name: "Western Union",
    rating: 4.1,
    reviews: 18900,
    affiliate:
      "https://www.westernunion.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
    review:
      "Western Union's name recognition is their greatest asset — and their pricing is their greatest liability. At 3% plus $5, a $200 transfer costs $11 in fees alone, and then their 21.78 SLE/USD rate is one of the lowest of all tested providers. The result is your family receiving over 400 fewer SLE than if you had used Sendwave. The legacy cash pickup network remains useful in remote areas, but for Freetown and major towns, better options exist.",
    pros: [
      "Massive global footprint — pickup locations in remote areas",
      "Highly recognizable brand — some recipients feel more comfortable",
      "Fast cash pickup — minutes in most cases",
      "24/7 service availability including phone support",
    ],
    cons: [
      "3% + $5 fee destroys value — $11 on a $200 transfer",
      "21.78 SLE/USD rate is among the worst of all providers tested",
      "Family receives 400+ fewer SLE versus Sendwave on same amount",
      "Should be a last resort only when no better option is available",
    ],
  },
  {
    name: "MoneyGram",
    rating: 4.0,
    reviews: 15300,
    affiliate:
      "https://www.moneygram.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
    review:
      "MoneyGram suffers from the same structural problem as Western Union: a pricing model that prioritizes profit over value for the sender and recipient. The 2.5% plus $4 fee on $200 is $9, and the 21.67 SLE/USD rate is the lowest of any provider we tested. On a $200 transfer, your family receives nearly $20 less in equivalent purchasing power compared to using Sendwave. Use MoneyGram only if no other option reaches your recipient.",
    pros: [
      "Global pickup network in areas without digital infrastructure",
      "Fast cash pickup delivery in minutes",
      "Accepts multiple payment methods including credit and debit",
      "Recognizable brand with long operational history",
    ],
    cons: [
      "2.5% + $4 fee — $9 on a $200 transfer, highly expensive",
      "Lowest exchange rate tested (21.67 SLE/USD)",
      "Recipient receives the least SLE of any provider compared",
      "Digital alternatives are almost always cheaper and faster",
    ],
  },
]

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)

  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalf && (
        <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
          <path fill="#c9952a" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

export default function ProvidersPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl font-bold mb-4">
            Provider Reviews
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Honest, independent reviews of every major remittance provider for Sierra Leone.
            No sponsored content. No bias. Just the numbers.
          </p>
        </div>
      </section>

      {/* Provider list */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {providers.map((provider, index) => (
            <div
              key={provider.name}
              id={provider.name.toLowerCase().replace(/\s+/g, "-")}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Provider header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-gold font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="font-playfair text-2xl font-bold text-navy">{provider.name}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating rating={provider.rating} />
                      <span className="text-sm text-gray-500">
                        {provider.rating}/5 · {provider.reviews.toLocaleString()} reviews
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href={provider.affiliate}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="bg-gold hover:bg-gold-light text-navy font-bold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap hidden sm:block"
                >
                  Send Money →
                </a>
              </div>

              {/* Provider body */}
              <div className="p-5">
                <p className="text-gray-600 leading-relaxed mb-5">{provider.review}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Pros */}
                  <div>
                    <h3 className="font-semibold text-green-700 flex items-center gap-1.5 mb-3 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Pros
                    </h3>
                    <ul className="space-y-2">
                      {provider.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <h3 className="font-semibold text-red-600 flex items-center gap-1.5 mb-3 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Cons
                    </h3>
                    <ul className="space-y-2">
                      {provider.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mobile CTA */}
                <a
                  href={provider.affiliate}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-5 block sm:hidden text-center bg-gold hover:bg-gold-light text-navy font-bold text-sm px-4 py-3 rounded-lg transition-colors"
                >
                  Send Money with {provider.name} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Compare all CTA */}
        <div className="max-w-4xl mx-auto mt-10 text-center">
          <div className="bg-navy rounded-2xl p-6 text-center">
            <h3 className="font-playfair text-2xl font-bold text-white mb-3">
              Compare all providers side by side
            </h3>
            <p className="text-gray-300 text-sm mb-5">
              Enter your amount and corridor to see exactly how much SLE each provider delivers.
            </p>
            <a
              href="/#compare"
              className="inline-block bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Go to Comparison Table →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
