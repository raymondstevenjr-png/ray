export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "📞",
      title: "Get your number",
      description:
        "We give you a dedicated US phone number for your business. Forward your existing number or use the new one.",
    },
    {
      number: "02",
      icon: "🧠",
      title: "Train your AI",
      description:
        "Tell us your business name, services, prices, and hours. The AI learns everything about your business in minutes.",
    },
    {
      number: "03",
      icon: "🤖",
      title: "AI answers every call",
      description:
        "When a customer calls, the AI greets them professionally, answers questions, and books appointments directly into your calendar.",
    },
    {
      number: "04",
      icon: "📱",
      title: "You get notified",
      description:
        "After every call you receive a text and email summary with the caller's name, number, what they wanted, and whether an appointment was booked.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Set up in 10 minutes. Works while you work.
          </h2>
          <p className="section-subheading">
            No technical skills needed. If you can use a smartphone, you can
            set up SaloneSeva.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: "#f0f7f2" }}
                >
                  {step.icon}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-brand-green uppercase tracking-widest mb-2">
                  Step {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Demo call visual */}
        <div className="mt-16 bg-gray-950 rounded-3xl p-8 md:p-12 text-white max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-gray-400 text-sm">Live call example</span>
          </div>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex gap-3">
              <span className="text-brand-gold font-bold flex-shrink-0">AI:</span>
              <span className="text-gray-300">
                Thank you for calling Aminata Beauty. This is your AI
                assistant. How can I help you today?
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 font-bold flex-shrink-0">Caller:</span>
              <span className="text-gray-300">
                Hi, I&apos;d like to book a knotless braids appointment for next
                Saturday.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-brand-gold font-bold flex-shrink-0">AI:</span>
              <span className="text-gray-300">
                I&apos;d love to help with that! We have Saturday the 15th
                available. What time works best for you?
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 font-bold flex-shrink-0">Caller:</span>
              <span className="text-gray-300">10am if possible.</span>
            </div>
            <div className="flex gap-3">
              <span className="text-brand-gold font-bold flex-shrink-0">AI:</span>
              <span className="text-gray-300">
                Perfect! Can I get your name for the appointment?
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-3">
              <span className="text-green-400 text-xs">✓ Appointment booked</span>
              <span className="text-gray-600">•</span>
              <span className="text-blue-400 text-xs">✓ Owner notified by text & email</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
