import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About RemitSL – Built by Someone Who Knows",
  description:
    "The story behind RemitSL — built by Raymond Bobson Steven to help Sierra Leoneans stop losing money to unnecessary fees when sending money home.",
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-[#0d2a5e] to-[#0a1f44] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-navy border-4 border-gold mx-auto mb-8 flex items-center justify-center">
            <span className="font-playfair text-3xl font-bold text-gold">RS</span>
          </div>

          <h1 className="font-playfair text-4xl md:text-5xl font-bold leading-tight mb-6 text-balance">
            Built by someone who knows what it costs{" "}
            <span className="text-gold">when the money doesn&apos;t arrive</span>
          </h1>

          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
            RemitSL is not a fintech startup. It is a personal project born from watching too
            many transfers arrive smaller than they should have.
          </p>
        </div>
      </section>

      {/* Story sections */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Chapter 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gold/10 border-2 border-gold rounded-xl flex items-center justify-center">
                <span className="font-playfair text-gold font-bold text-lg">1</span>
              </div>
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                Bo, Sierra Leone
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>
                  Growing up in Bo, Sierra Leone, I walked to school each morning past the same
                  money transfer queue. It formed early — women in market cloth, men in pressed
                  trousers, all waiting for the same thing. A number. A receipt. Proof that the
                  money their family abroad had sent had actually arrived.
                </p>
                <p>
                  I watched my grandmother count out crumpled leones on the kitchen table after
                  each transfer. She would do the math out loud, dividing what arrived by what she
                  had been told to expect. The numbers never quite matched. There was always a
                  shortfall — a few thousand here, ten thousand there — that nobody could fully
                  explain.
                </p>
                <p>
                  Nobody told her about exchange rate margins. Nobody explained that the &quot;free&quot;
                  transfer had already taken its cut before it left the sender&apos;s country. She
                  simply trusted the process and counted what arrived.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gold/10 border-2 border-gold rounded-xl flex items-center justify-center">
                <span className="font-playfair text-gold font-bold text-lg">2</span>
              </div>
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                Moving to the US in 2021
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>
                  When I moved to the United States in 2021, I became the person on the sending
                  end. I opened apps. I compared fees — the ones listed, anyway. I sent money
                  home for the first time and waited for the call confirming it arrived.
                </p>
                <p>
                  The call came. My family had received the money. But when I calculated what
                  they should have received versus what they got, I discovered that for every
                  $100 I sent, $8 to $15 was disappearing — consumed by fees I had not seen
                  and exchange rate margins I had not understood.
                </p>
                <p>
                  I spent a weekend building a spreadsheet to compare providers properly. Not
                  just fees, but effective rates — the total SLE received divided by the dollars
                  sent. The differences were striking. Some providers delivered nearly 20% more
                  than others on the same amount. The information existed but it was buried,
                  scattered, and designed to be compared only in isolation.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gold/10 border-2 border-gold rounded-xl flex items-center justify-center">
                <span className="font-playfair text-gold font-bold text-lg">3</span>
              </div>
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                Why I Built This
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>
                  I built RemitSL so my family — and yours — stops losing money to fees that
                  do not have to exist.
                </p>
                <p>
                  The technology to compare providers transparently is not complicated. What was
                  missing was a site built specifically for Sierra Leoneans, showing the right
                  numbers in the right currency, with honest context about which providers are
                  actually worth using.
                </p>
                <p>
                  Every leone that does not arrive is a leone that could have bought medicine,
                  paid school fees, or kept the lights on. RemitSL exists to close that gap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio card */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-20 h-20 rounded-full bg-navy border-4 border-gold flex items-center justify-center flex-shrink-0">
              <span className="font-playfair text-2xl font-bold text-gold">RS</span>
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-bold text-navy mb-1">
                Raymond Bobson Steven
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "MPA Candidate, BYU",
                  "Founder, Ray Foundation",
                  "World Bank Consultant",
                  "UN ECOSOC Youth Forum 2026",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-gold/10 text-navy text-xs font-medium px-3 py-1 rounded-full border border-gold/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Raymond is a Sierra Leonean public policy professional and founder of RemitSL.
                His work spans international development, public finance, and diaspora economic
                empowerment. He built RemitSL as a public good — a transparent, honest tool
                to help his community keep more of the money they work hard to send home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gold/10 border-2 border-gold rounded-2xl p-8 text-center">
            <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
              Our Mission
            </h2>
            <p className="text-navy text-lg leading-relaxed font-medium">
              To make the true cost of sending money to Sierra Leone transparent and
              understandable — so every member of our diaspora can make informed decisions
              and keep more money in the hands of the people they love.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
                No hidden agenda
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
                Affiliate links fund the site honestly
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
                We never handle your money
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
