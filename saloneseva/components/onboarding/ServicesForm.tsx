"use client";

import type { OnboardingData, DayHours } from "@/lib/types";

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DAYS = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
] as const;

type DayKey = (typeof DAYS)[number]["key"];

export default function ServicesForm({ data, onChange, onNext, onBack }: Props) {
  const updateDayHours = (day: DayKey, update: Partial<DayHours>) => {
    onChange({
      businessHours: {
        ...data.businessHours,
        [day]: { ...data.businessHours[day], ...update },
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Services, pricing &amp; hours
      </h2>
      <p className="text-gray-500 mb-8">
        Your AI will use this to answer customer questions accurately.
      </p>

      <div className="space-y-6">
        {/* Services */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your services and prices
          </label>
          <textarea
            value={data.servicesAndPricing}
            onChange={(e) => onChange({ servicesAndPricing: e.target.value })}
            placeholder="Box braids — $150&#10;Knotless braids — $180&#10;Silk press — $80&#10;Kids braids — $60"
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 resize-none"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            List each service on a new line with the price.
          </p>
        </div>

        {/* Business hours */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Business hours
          </label>
          <div className="space-y-2">
            {DAYS.map(({ key, label }) => {
              const hours = data.businessHours[key];
              return (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-28 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        updateDayHours(key, { isOpen: !hours.isOpen })
                      }
                      className={`w-full text-xs py-2 px-3 rounded-lg font-semibold transition-colors ${
                        hours.isOpen
                          ? "bg-green-100 text-brand-green"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {label}
                      <span className="ml-1">
                        {hours.isOpen ? "Open" : "Closed"}
                      </span>
                    </button>
                  </div>
                  {hours.isOpen ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={hours.openTime}
                        onChange={(e) =>
                          updateDayHours(key, { openTime: e.target.value })
                        }
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2"
                      />
                      <span className="text-gray-400 text-sm">to</span>
                      <input
                        type="time"
                        value={hours.closeTime}
                        onChange={(e) =>
                          updateDayHours(key, { closeTime: e.target.value })
                        }
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Closed</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Walk-ins */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Do you take walk-ins?
          </label>
          <div className="flex gap-3">
            {[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "call_to_check", label: "Call to check" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  onChange({
                    acceptsWalkIns: option.value as OnboardingData["acceptsWalkIns"],
                  })
                }
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-colors ${
                  data.acceptsWalkIns === option.value
                    ? "border-brand-green bg-green-50 text-brand-green"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
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
