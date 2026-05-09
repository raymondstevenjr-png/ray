"use client";

import type { OnboardingData } from "@/lib/types";
import { useState } from "react";

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

const PLANS = [
  {
    id: "starter" as const,
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
  },
  {
    id: "pro" as const,
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
  },
];

export default function PlanSelector({ data, onChange, onBack, onSubmit, loading }: Props) {
  const [selected, setSelected] = useState<"starter" | "pro">(
    data.selectedPlan || "pro"
  );

  const handleSelect = (plan: "starter" | "pro") => {
    setSelected(plan);
    onChange({ selectedPlan: plan });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Choose your plan
      </h2>
      <p className="text-gray-500 mb-8">
        Start free for 14 days. No credit card charged until your trial ends.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => handleSelect(plan.id)}
            className={`relative text-left rounded-2xl border-2 p-6 transition-all ${
              selected === plan.id
                ? "border-brand-green bg-green-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-4">
                <span className="text-white text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "#c9952a" }}>
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-start justify-between mb-1">
                <span className="font-bold text-gray-900">{plan.name}</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selected === plan.id
                      ? "border-brand-green bg-brand-green"
                      : "border-gray-300"
                  }`}
                >
                  {selected === plan.id && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-400 text-sm mb-0.5">/month</span>
              </div>
            </div>

            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-brand-green font-bold">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-600 text-center">
          🔒 Your 14-day free trial starts today. You won&apos;t be charged
          until {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. Cancel anytime.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 btn-outline py-4 rounded-xl text-lg"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-2 btn-primary py-4 px-8 rounded-xl text-lg disabled:opacity-60 disabled:cursor-not-allowed flex-1"
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Setting up...
            </span>
          ) : (
            "Start my free trial →"
          )}
        </button>
      </div>
    </div>
  );
}
