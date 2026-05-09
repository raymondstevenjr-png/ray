export default function SupportPage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Support</h1>
        <p className="text-gray-500 mt-1">
          We&apos;re here to help you succeed.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {[
          {
            icon: "📧",
            title: "Email support",
            description: "Send us a message and we'll reply within 24 hours.",
            action: "Email us",
            href: "mailto:support@saloneseva.com",
          },
          {
            icon: "💬",
            title: "WhatsApp",
            description:
              "Message us on WhatsApp for fast, personal support in English or Krio.",
            action: "Message on WhatsApp",
            href: "#",
          },
          {
            icon: "📖",
            title: "Help guides",
            description:
              "Step-by-step guides for setting up your phone number, training your AI, and more.",
            action: "Browse guides",
            href: "#",
          },
          {
            icon: "🎥",
            title: "Video tutorials",
            description:
              "Watch short videos that walk you through the setup in plain English.",
            action: "Watch videos",
            href: "#",
          },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{item.description}</p>
            <a
              href={item.href}
              className="text-sm text-brand-green font-semibold hover:underline"
            >
              {item.action} →
            </a>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl text-white p-6"
        style={{ backgroundColor: "#1a5c2e" }}
      >
        <div className="text-xl font-bold mb-2">Talk to Raymond</div>
        <p className="text-green-200 text-sm mb-4">
          I&apos;m the founder of SaloneSeva. If you have feedback, questions, or
          just need help getting set up — reach out directly. I read every
          message.
        </p>
        <a
          href="mailto:raymond@saloneseva.com"
          className="inline-flex items-center gap-2 bg-white text-brand-green px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-50 transition-colors"
        >
          Email Raymond
        </a>
      </div>
    </div>
  );
}
