"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(#1a5c2e 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-brand-green px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-brand-green rounded-full inline-block" />
            AI Receptionist for Sierra Leonean Business Owners
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Your business{" "}
            <span className="text-brand-green">never misses</span>
            <br />a call again
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            SaloneSeva is an AI receptionist built for Sierra Leonean business
            owners in the US. It answers every call, books appointments, and
            notifies you instantly — while you focus on your work.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/onboard"
              className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start free 14-day trial
            </Link>
            <a
              href="#how-it-works"
              className="btn-outline text-lg px-8 py-4 rounded-xl"
            >
              See how it works
            </a>
          </div>

          {/* Trust line */}
          <p className="text-sm text-gray-500">
            No credit card required · Cancel anytime · Setup in under 10
            minutes
          </p>

          {/* Social proof */}
          <div className="mt-12 pt-10 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-6">
              Trusted by Sierra Leonean business owners across the US
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { emoji: "💇🏾‍♀️", label: "Hair Braiding" },
                { emoji: "🍲", label: "Catering" },
                { emoji: "🏠", label: "Cleaning" },
                { emoji: "💅🏾", label: "Beauty" },
              ].map(({ emoji, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
