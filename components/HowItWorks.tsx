export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Enter Amount & Corridor",
      description:
        "Type how much you want to send and choose whether you're sending from the US, UK, or Canada. We'll immediately show you live rates.",
    },
    {
      step: "02",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Compare All Providers Instantly",
      description:
        "We calculate exactly how many SLE your family receives from each provider — accounting for all fees and exchange rate margins. No hidden surprises.",
    },
    {
      step: "03",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      ),
      title: "Click to Send With the Best Rate",
      description:
        "Click \"Send Money\" on the best-value provider. You'll go directly to their secure site. We never handle your money — we just help you find the best deal.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-navy text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-center mb-2">
          How RemitSL Works
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Three simple steps to make sure every leone counts when you send money home.
        </p>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gold/30" />

          {steps.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {/* Step number + icon */}
              <div className="w-20 h-20 bg-gold/10 border-2 border-gold rounded-2xl flex flex-col items-center justify-center mb-5 text-gold relative z-10">
                {step.icon}
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gold text-navy text-xs font-bold rounded-full flex items-center justify-center z-20">
                {step.step}
              </div>

              <h3 className="font-playfair text-xl font-bold mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            We never handle your money
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Independent comparison — no bias
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Rates refreshed every 5 minutes
          </div>
        </div>
      </div>
    </section>
  )
}
