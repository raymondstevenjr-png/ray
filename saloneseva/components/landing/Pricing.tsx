import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: 49,
    recommended: false,
    features: [
      "1 business phone number",
      "Up to 100 calls per month",
      "Appointment booking",
      "Call summaries by text and email",
      "English language only",
      "Email support",
    ],
    cta: "Start free trial",
    href: "/onboard?plan=starter",
  },
  {
    name: "Pro",
    price: 99,
    recommended: true,
    features: [
      "1 business phone number",
      "Unlimited calls",
      "Appointment booking",
      "Call summaries by text and email",
      "Custom AI personality and greeting",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/onboard?plan=pro",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-heading">Simple, honest pricing</h2>
          <p className="section-subheading">
            Start free for 14 days. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 ${
                plan.recommended
                  ? "bg-brand-green text-white shadow-2xl scale-105"
                  : "bg-white text-gray-900 shadow-sm border border-gray-200"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span
                    className="text-brand-green text-xs font-bold px-4 py-2 rounded-full"
                    style={{ backgroundColor: "#c9952a", color: "white" }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-bold mb-2 ${
                    plan.recommended ? "text-green-200" : "text-gray-500"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span
                    className={`text-lg mb-1 ${
                      plan.recommended ? "text-green-200" : "text-gray-400"
                    }`}
                  >
                    /month
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        plan.recommended
                          ? "bg-white text-brand-green"
                          : "bg-green-100 text-brand-green"
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      className={
                        plan.recommended ? "text-green-100" : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                  plan.recommended
                    ? "bg-white text-brand-green hover:bg-green-50"
                    : "bg-brand-green text-white hover:opacity-90"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          You will never be charged during your 14-day free trial. Cancel
          anytime.
        </p>
      </div>
    </section>
  );
}
