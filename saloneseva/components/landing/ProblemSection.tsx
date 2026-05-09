export default function ProblemSection() {
  const problems = [
    {
      icon: "💇🏾‍♀️",
      scenario:
        "You are elbow deep in a client's hair. Your phone rings. You cannot answer. They call the next salon.",
    },
    {
      icon: "🍳",
      scenario:
        "You are cooking for a catering order. A new client calls to book. They hang up after four rings.",
    },
    {
      icon: "🧹",
      scenario:
        "You are cleaning a home. A customer wants a quote. They move on before you call back.",
    },
  ];

  return (
    <section className="bg-gray-950 text-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Every missed call is a lost customer
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            You work too hard to lose business because you could not pick up the
            phone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {problems.map((p, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {p.scenario}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block bg-brand-green text-white px-8 py-4 rounded-2xl">
            <p className="text-xl font-semibold">
              SaloneSeva answers every single one of those calls.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
