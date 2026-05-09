"use client";

import { useState } from "react";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  const handleManageBilling = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  const currentPlan = {
    name: "Pro",
    price: 99,
    status: "trial",
    trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    nextBilling: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    callsUsed: 47,
    callLimit: null,
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500 mt-1">Manage your subscription and billing.</p>
      </div>

      {/* Current plan */}
      <div
        className="rounded-2xl text-white p-6 mb-6"
        style={{ backgroundColor: "#1a5c2e" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-green-200 text-sm font-medium mb-1">
              Current plan
            </div>
            <div className="text-3xl font-bold">{currentPlan.name}</div>
          </div>
          <div className="text-right">
            <div className="text-green-200 text-sm">Price</div>
            <div className="text-2xl font-bold">${currentPlan.price}/mo</div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <div className="text-green-100 text-sm mb-1">Free trial active</div>
          <div className="font-semibold">
            Trial ends{" "}
            {currentPlan.trialEnd.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-green-200 text-sm mt-1">
            You will not be charged until your trial ends.
          </div>
        </div>

        <div className="text-green-200 text-sm">
          <span className="font-medium text-white">
            {currentPlan.callsUsed} calls
          </span>{" "}
          handled this month ·{" "}
          {currentPlan.callLimit
            ? `${currentPlan.callLimit - currentPlan.callsUsed} remaining`
            : "Unlimited plan"}
        </div>
      </div>

      {/* Plan features */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">What&apos;s included in Pro</h2>
        <ul className="space-y-3">
          {[
            "1 dedicated business phone number",
            "Unlimited calls per month",
            "Automatic appointment booking",
            "Call summaries by text and email after every call",
            "Custom AI personality and greeting",
            "Priority support",
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-5 h-5 rounded-full bg-green-100 text-brand-green flex items-center justify-center text-xs font-bold flex-shrink-0">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Billing info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Billing information</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-sm text-gray-500">Next billing date</span>
            <span className="text-sm font-semibold text-gray-900">
              {currentPlan.nextBilling.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-sm text-gray-500">Amount</span>
            <span className="text-sm font-semibold text-gray-900">
              $99.00 / month
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-gray-500">Payment method</span>
            <span className="text-sm font-semibold text-gray-900">
              •••• •••• •••• 4242
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleManageBilling}
          disabled={loading}
          className="w-full btn-primary py-4 rounded-xl font-semibold disabled:opacity-60"
        >
          {loading ? "Loading..." : "Manage billing →"}
        </button>
        <p className="text-xs text-gray-400 text-center">
          Update payment method, download invoices, or cancel subscription
        </p>
        <button className="w-full py-3 text-sm text-red-500 hover:text-red-600 font-medium transition-colors">
          Cancel subscription
        </button>
      </div>
    </div>
  );
}
