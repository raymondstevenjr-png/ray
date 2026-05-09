"use client";

import type { OnboardingData } from "@/lib/types";

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function GreetingForm({ data, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Customize your AI&apos;s greeting
      </h2>
      <p className="text-gray-500 mb-8">
        This is the first thing callers will hear. Make it sound like you.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Greeting message
          </label>
          <textarea
            value={data.customGreeting}
            onChange={(e) => onChange({ customGreeting: e.target.value })}
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 resize-none"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            Your AI will say this exactly when they answer.
          </p>
        </div>

        {/* Preview */}
        <div className="bg-gray-950 rounded-2xl p-6 text-white">
          <div className="text-xs text-gray-500 mb-3 uppercase tracking-widest font-medium">
            Preview — what callers will hear
          </div>
          <div className="flex gap-3">
            <span className="text-brand-gold font-bold flex-shrink-0">AI:</span>
            <p className="text-gray-300 italic">
              &ldquo;
              {data.customGreeting ||
                `Thank you for calling ${data.businessName || "your business"}. How can I help you today?`}
              &rdquo;
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Special instructions for your AI
          </label>
          <textarea
            value={data.specialInstructions}
            onChange={(e) => onChange({ specialInstructions: e.target.value })}
            placeholder="We require a $50 deposit for appointments over $100. We are closed on all federal holidays. For braiding, hair must be detangled before the appointment."
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 resize-none"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            Anything else you want the AI to know or tell customers.
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="flex-1 btn-outline py-4 rounded-xl text-lg"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 btn-primary py-4 rounded-xl text-lg"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
