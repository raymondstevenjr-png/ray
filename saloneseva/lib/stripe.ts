import Stripe from "stripe";

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2024-06-20",
    typescript: true,
  });
}

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {
    apiVersion: "2024-06-20",
    typescript: true,
  }
);

export const PLANS = {
  starter: {
    name: "Starter",
    price: 49,
    priceId: process.env.STRIPE_PRICE_ID_STARTER || "",
    features: [
      "1 business phone number",
      "Up to 100 calls per month",
      "Appointment booking",
      "Call summaries by text and email",
      "English language only",
      "Email support",
    ],
  },
  pro: {
    name: "Pro",
    price: 99,
    priceId: process.env.STRIPE_PRICE_ID_PRO || "",
    features: [
      "1 business phone number",
      "Unlimited calls",
      "Appointment booking",
      "Call summaries by text and email",
      "Custom AI personality and greeting",
      "Priority support",
    ],
  },
} as const;
