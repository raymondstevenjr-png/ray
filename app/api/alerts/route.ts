import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, target_rate, country, currency } = body as {
      email: string
      target_rate: number
      country: string
      currency: string
    }

    if (!email || !target_rate || !country || !currency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    if (target_rate <= 0 || target_rate > 100) {
      return NextResponse.json(
        { error: "Invalid target rate" },
        { status: 400 }
      )
    }

    // Save to Supabase
    const supabase = getSupabaseServerClient()
    const { error: dbError } = await supabase.from("rate_alerts").insert({
      email,
      target_rate,
      country,
      currency,
      active: true,
    })

    if (dbError) {
      console.error("Supabase insert error:", dbError)
      return NextResponse.json(
        { error: "Failed to save alert" },
        { status: 500 }
      )
    }

    // Send confirmation email
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "RemitSL Alerts <alerts@remitsl.com>",
        to: email,
        subject: "Rate Alert Set – RemitSL",
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1f44; padding: 32px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #c9952a; font-size: 28px; margin: 0;">RemitSL</h1>
              <p style="color: #ffffff; margin: 4px 0 0;">Sierra Leone Remittance Comparison</p>
            </div>
            <div style="background: #ffffff; border-radius: 8px; padding: 24px;">
              <h2 style="color: #0a1f44; margin-top: 0;">Rate Alert Confirmed</h2>
              <p style="color: #374151;">Your rate alert has been set successfully.</p>
              <div style="background: #f3f4f6; border-left: 4px solid #c9952a; padding: 16px; margin: 16px 0; border-radius: 4px;">
                <p style="margin: 0; color: #0a1f44; font-weight: bold;">
                  You'll be notified when the rate reaches ${target_rate} SLE per ${currency}.
                </p>
              </div>
              <p style="color: #6b7280; font-size: 14px;">
                We check rates every 5 minutes. When the mid-market rate for ${currency} to SLE reaches your target,
                we'll send you an email so you can send at the best time.
              </p>
              <p style="color: #6b7280; font-size: 14px;">
                To cancel this alert, reply to this email with "CANCEL" in the subject line.
              </p>
            </div>
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 16px;">
              © 2026 RemitSL. Not affiliated with any provider.
            </p>
          </div>
        `,
      })
    } catch (emailErr) {
      // Log but don't fail — alert was saved to DB
      console.error("Email send error:", emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Alert API error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
