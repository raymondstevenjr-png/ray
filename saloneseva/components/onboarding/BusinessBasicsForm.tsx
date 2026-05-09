"use client";

import type { OnboardingData } from "@/lib/types";
import type { BusinessType } from "@/lib/types";

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: "hair_braiding_salon", label: "Hair braiding salon" },
  { value: "beauty_salon", label: "Beauty salon" },
  { value: "catering_business", label: "Catering business" },
  { value: "cleaning_service", label: "Cleaning service" },
  { value: "other", label: "Other" },
];

export default function BusinessBasicsForm({ data, onChange, onNext }: Props) {
  const isValid =
    data.businessName &&
    data.businessType &&
    data.ownerFirstName &&
    data.businessEmail;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Tell us about your business
      </h2>
      <p className="text-gray-500 mb-8">
        This helps us set up your AI receptionist correctly.
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business name *
          </label>
          <input
            type="text"
            value={data.businessName}
            onChange={(e) => onChange({ businessName: e.target.value })}
            placeholder="Aminata Beauty"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ "--tw-ring-color": "#1a5c2e" } as React.CSSProperties}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business type *
          </label>
          <select
            value={data.businessType}
            onChange={(e) =>
              onChange({ businessType: e.target.value as BusinessType })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 bg-white"
          >
            <option value="">Select your business type</option>
            {BUSINESS_TYPES.map((bt) => (
              <option key={bt.value} value={bt.value}>
                {bt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your first name *
          </label>
          <input
            type="text"
            value={data.ownerFirstName}
            onChange={(e) => onChange({ ownerFirstName: e.target.value })}
            placeholder="Aminata"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your current phone number
          </label>
          <input
            type="tel"
            value={data.businessPhone}
            onChange={(e) => onChange({ businessPhone: e.target.value })}
            placeholder="+1 (202) 555-0100"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            Customers will call this number, and we&apos;ll forward it to your
            AI receptionist.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business email *
          </label>
          <input
            type="email"
            value={data.businessEmail}
            onChange={(e) => onChange({ businessEmail: e.target.value })}
            placeholder="aminata@aminatabeauty.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            We&apos;ll send call summaries here after every call.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="mt-8 w-full btn-primary py-4 rounded-xl text-lg disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue →
      </button>
    </div>
  );
}
