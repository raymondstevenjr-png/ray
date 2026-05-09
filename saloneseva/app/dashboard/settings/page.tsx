"use client";

import { useState } from "react";
import type { OnboardingData } from "@/lib/types";
import { DEFAULT_BUSINESS_HOURS, BUSINESS_TYPE_LABELS } from "@/lib/types";
import type { BusinessType } from "@/lib/types";

const INITIAL_SETTINGS: OnboardingData = {
  businessName: "Aminata Beauty",
  businessType: "hair_braiding_salon",
  ownerFirstName: "Aminata",
  businessPhone: "+1 (202) 555-0100",
  businessEmail: "aminata@aminatabeauty.com",
  servicesAndPricing:
    "Box braids — $150\nKnotless braids — $180\nSilk press — $80\nKids braids — $60\nFaux locs — $200",
  businessHours: DEFAULT_BUSINESS_HOURS,
  acceptsWalkIns: "yes",
  customGreeting:
    "Thank you for calling Aminata Beauty. This is your AI assistant. How can I help you today?",
  specialInstructions:
    "We require a $50 deposit for appointments over $100. Hair must be detangled before braiding appointments.",
  selectedPlan: "pro",
};

const DAYS = [
  { key: "monday", label: "Mon" },
  { key: "tuesday", label: "Tue" },
  { key: "wednesday", label: "Wed" },
  { key: "thursday", label: "Thu" },
  { key: "friday", label: "Fri" },
  { key: "saturday", label: "Sat" },
  { key: "sunday", label: "Sun" },
] as const;

type DayKey = (typeof DAYS)[number]["key"];

const BUSINESS_TYPE_OPTIONS: { value: BusinessType; label: string }[] = [
  { value: "hair_braiding_salon", label: "Hair braiding salon" },
  { value: "beauty_salon", label: "Beauty salon" },
  { value: "catering_business", label: "Catering business" },
  { value: "cleaning_service", label: "Cleaning service" },
  { value: "other", label: "Other" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<OnboardingData>(INITIAL_SETTINGS);
  const [notifyText, setNotifyText] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (patch: Partial<OnboardingData>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
  };

  const ToggleSwitch = ({
    checked,
    onChange,
    label,
    description,
  }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
    description: string;
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-brand-green" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI settings</h1>
          <p className="text-gray-500 mt-1">
            Update your business info and how your AI behaves.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary px-6 py-2.5 rounded-xl text-sm disabled:opacity-60"
        >
          {saving ? "Saving..." : saved ? "✓ Saved" : "Save changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Business info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">Business information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Business name
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => update({ businessName: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Business type
              </label>
              <select
                value={settings.businessType}
                onChange={(e) =>
                  update({ businessType: e.target.value as BusinessType })
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white"
              >
                {BUSINESS_TYPE_OPTIONS.map((bt) => (
                  <option key={bt.value} value={bt.value}>
                    {bt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Your first name
              </label>
              <input
                type="text"
                value={settings.ownerFirstName}
                onChange={(e) => update({ ownerFirstName: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Business email
              </label>
              <input
                type="email"
                value={settings.businessEmail}
                onChange={(e) => update({ businessEmail: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">
            Services &amp; pricing
          </h2>
          <textarea
            value={settings.servicesAndPricing}
            onChange={(e) => update({ servicesAndPricing: e.target.value })}
            rows={6}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none"
          />
          <p className="text-xs text-gray-400 mt-2">
            One service per line. Include prices so the AI can answer
            accurately.
          </p>
        </div>

        {/* Hours */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">Business hours</h2>
          <div className="space-y-3">
            {DAYS.map(({ key, label }) => {
              const hours = settings.businessHours[key];
              return (
                <div key={key} className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      update({
                        businessHours: {
                          ...settings.businessHours,
                          [key]: { ...hours, isOpen: !hours.isOpen },
                        },
                      })
                    }
                    className={`w-20 text-xs py-2 px-3 rounded-lg font-semibold transition-colors flex-shrink-0 ${
                      hours.isOpen
                        ? "bg-green-100 text-brand-green"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {label} {hours.isOpen ? "·open" : "·off"}
                  </button>
                  {hours.isOpen ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={hours.openTime}
                        onChange={(e) =>
                          update({
                            businessHours: {
                              ...settings.businessHours,
                              [key]: { ...hours, openTime: e.target.value },
                            },
                          })
                        }
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2"
                      />
                      <span className="text-gray-400 text-xs">to</span>
                      <input
                        type="time"
                        value={hours.closeTime}
                        onChange={(e) =>
                          update({
                            businessHours: {
                              ...settings.businessHours,
                              [key]: { ...hours, closeTime: e.target.value },
                            },
                          })
                        }
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2"
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Closed</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Greeting */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">AI greeting &amp; personality</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Greeting message
              </label>
              <textarea
                value={settings.customGreeting}
                onChange={(e) => update({ customGreeting: e.target.value })}
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Special instructions
              </label>
              <textarea
                value={settings.specialInstructions}
                onChange={(e) => update({ specialInstructions: e.target.value })}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-2">Notifications</h2>
          <p className="text-sm text-gray-500 mb-4">
            Choose how you want to be notified after each call.
          </p>
          <ToggleSwitch
            checked={notifyText}
            onChange={setNotifyText}
            label="Notify me by text"
            description={`Text to ${settings.businessPhone || "your phone number"}`}
          />
          <ToggleSwitch
            checked={notifyEmail}
            onChange={setNotifyEmail}
            label="Notify me by email"
            description={`Email to ${settings.businessEmail || "your email"}`}
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full btn-primary py-4 rounded-xl text-lg disabled:opacity-60"
        >
          {saving ? "Saving..." : saved ? "✓ Changes saved" : "Save all changes"}
        </button>
      </div>
    </div>
  );
}
