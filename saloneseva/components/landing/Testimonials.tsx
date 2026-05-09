const testimonials = [
  {
    name: "Aminata Koroma",
    business: "Aminata Beauty, Silver Spring MD",
    quote:
      "I used to miss at least 5 calls a day while I was braiding. Now SaloneSeva handles every single one. Last month I booked 12 new clients I would have lost. It paid for itself in the first week.",
    initials: "AK",
  },
  {
    name: "Fatmata Bangura",
    business: "Mama Fatmata Catering, Atlanta GA",
    quote:
      "People call me when I'm in the kitchen, in the car, setting up an event. SaloneSeva takes the call, answers their questions, and schedules consultations. My customers think I have a whole office. I'm just me.",
    initials: "FB",
  },
  {
    name: "Mariama Sesay",
    business: "Mariama Clean Pro, Houston TX",
    quote:
      "Setting it up took me about 15 minutes on my lunch break. Now I get a text after every call telling me exactly what the person wanted. I know my business like never before. This is real technology for real people.",
    initials: "MS",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-heading">What business owners are saying</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="card flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-brand-gold text-lg">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed flex-1 mb-6 text-lg">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: "#1a5c2e" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
