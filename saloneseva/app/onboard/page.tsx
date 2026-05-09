"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StepIndicator from "@/components/onboarding/StepIndicator";
import BusinessBasicsForm from "@/components/onboarding/BusinessBasicsForm";
import ServicesForm from "@/components/onboarding/ServicesForm";
import GreetingForm from "@/components/onboarding/GreetingForm";
import CalendarStep from "@/components/onboarding/CalendarStep";
import PlanSelector from "@/components/onboarding/PlanSelector";
import type { OnboardingData } from "@/lib/types";
import { DEFAULT_BUSINESS_HOURS } from "@/lib/types";

const STEP_TITLES = [
  "Business",
  "Services",
  "Greeting",
  "Calendar",
  "Choose plan",
];

const INITIAL_DATA: OnboardingData = {
  businessName: "",
  businessType: "",
  ownerFirstName: "",
  businessPhone: "",
  businessEmail: "",
  servicesAndPricing: "",
  businessHours: DEFAULT_BUSINESS_HOURS,
  acceptsWalkIns: "yes",
  customGreeting: "",
  specialInstructions: "",
  selectedPlan: "pro",
};

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);

  const updateData = (update: Partial<OnboardingData>) => {
    setData((prev) => {
      const updated = { ...prev, ...update };
      if (
        update.businessName !== undefined &&
        !prev.customGreeting
      ) {
        updated.customGreeting = `Thank you for calling ${update.businessName || ""}. This is your AI assistant. How can I help you today?`;
      }
      return updated;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: data.selectedPlan,
          businessData: data,
        }),
      });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
      } else {
        router.push("/dashboard");
      }
    } catch {
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "#1a5c2e" }}
            >
              SS
            </div>
            <span className="font-bold text-gray-900">SaloneSeva</span>
          </Link>
          <span className="text-sm text-gray-400">
            Step {step} of {STEP_TITLES.length}
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <StepIndicator
          currentStep={step}
          totalSteps={STEP_TITLES.length}
          stepTitles={STEP_TITLES}
        />

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {step === 1 && (
            <BusinessBasicsForm
              data={data}
              onChange={updateData}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <ServicesForm
              data={data}
              onChange={updateData}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <GreetingForm
              data={data}
              onChange={updateData}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <CalendarStep
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
              onSkip={() => setStep(5)}
            />
          )}
          {step === 5 && (
            <PlanSelector
              data={data}
              onChange={updateData}
              onBack={() => setStep(4)}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/dashboard" className="text-brand-green font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}
