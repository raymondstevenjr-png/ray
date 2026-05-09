const businessTypes = [
  {
    emoji: "💇🏾‍♀️",
    title: "Hair braiding and beauty salons",
    description:
      "Book appointments, answer questions about services and prices, handle cancellations — all without you lifting a finger.",
  },
  {
    emoji: "🍲",
    title: "Catering and food businesses",
    description:
      "Take event inquiries, collect date and guest count, schedule consultations while you focus on the food.",
  },
  {
    emoji: "🏠",
    title: "Cleaning services",
    description:
      "Provide quotes, book recurring appointments, handle new client inquiries while you're on the job.",
  },
];

export default function BusinessTypes() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-heading">
            Built for the businesses that built our community
          </h2>
          <p className="section-subheading">
            SaloneSeva is made for the hard-working Sierra Leonean business
            owners who show up every day and build something real.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {businessTypes.map((bt) => (
            <div
              key={bt.title}
              className="card hover:shadow-md transition-shadow"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                style={{ backgroundColor: "#f0f7f2" }}
              >
                {bt.emoji}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {bt.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{bt.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
