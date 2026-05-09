import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { OnboardingData } from "@/lib/types";

export async function POST(request: NextRequest) {
  let body: { plan: "starter" | "pro"; businessData: OnboardingData };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { plan, businessData } = body;
  const planConfig = PLANS[plan];

  if (!planConfig) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  try {
    const supabase = createSupabaseServerClient();

    const { data: business } = await supabase
      .from("businesses")
      .insert({
        business_name: businessData.businessName,
        business_type: businessData.businessType,
        owner_first_name: businessData.ownerFirstName,
        email: businessData.businessEmail,
        phone: businessData.businessPhone,
        services_and_pricing: businessData.servicesAndPricing,
        business_hours: businessData.businessHours,
        accepts_walk_ins: businessData.acceptsWalkIns,
        custom_greeting: businessData.customGreeting,
        special_instructions: businessData.specialInstructions,
        plan: "trial",
        trial_ends_at: new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })
      .select()
      .single();

    const customer = await stripe.customers.create({
      email: businessData.businessEmail,
      name: businessData.businessName,
      metadata: {
        businessId: business?.id || "",
        ownerName: businessData.ownerFirstName,
      },
    });

    if (business) {
      await supabase
        .from("businesses")
        .update({ stripe_customer_id: customer.id })
        .eq("id", business.id);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          businessId: business?.id || "",
          plan,
        },
      },
      success_url: `${appUrl}/dashboard?setup=complete`,
      cancel_url: `${appUrl}/onboard?cancelled=true`,
      metadata: {
        businessId: business?.id || "",
        plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout creation error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
