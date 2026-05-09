import { Resend } from "resend";
import type { Call, Business } from "./types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCallSummaryEmail(
  business: Business,
  call: Call
): Promise<void> {
  const outcomeLabel: Record<string, string> = {
    appointment_booked: "Appointment Booked",
    message_taken: "Message Taken",
    inquiry_answered: "Inquiry Answered",
    voicemail: "Voicemail Left",
    other: "Other",
  };

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Inter, system-ui, sans-serif; background: #f9fafb; padding: 40px 20px; color: #1a1a1a;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="margin-bottom: 32px;">
      <div style="display: inline-block; background: #1a5c2e; color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; margin-bottom: 16px;">
        SaloneSeva
      </div>
      <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">New call for ${business.business_name}</h1>
      <p style="color: #6b7280; margin: 0;">${new Date(call.created_at).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</p>
    </div>

    <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <div style="display: grid; gap: 12px;">
        <div><span style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Caller</span>
          <p style="margin: 4px 0 0; font-weight: 600;">${call.caller_name || "Unknown"}</p></div>
        <div><span style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Phone number</span>
          <p style="margin: 4px 0 0; font-weight: 600;">${call.caller_number || "Unknown"}</p></div>
        <div><span style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Duration</span>
          <p style="margin: 4px 0 0; font-weight: 600;">${call.call_duration ? `${Math.floor(call.call_duration / 60)}m ${call.call_duration % 60}s` : "Unknown"}</p></div>
        <div><span style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Outcome</span>
          <p style="margin: 4px 0 0; font-weight: 600; color: ${call.appointment_booked ? "#1a5c2e" : "#1a1a1a"};">${outcomeLabel[call.outcome || "other"] || "Other"}</p></div>
        ${call.appointment_datetime ? `<div><span style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Appointment</span>
          <p style="margin: 4px 0 0; font-weight: 600; color: #1a5c2e;">${new Date(call.appointment_datetime).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</p></div>` : ""}
      </div>
    </div>

    ${call.ai_summary ? `
    <div style="margin-bottom: 24px;">
      <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 12px;">AI Summary</h2>
      <p style="color: #374151; line-height: 1.6; margin: 0;">${call.ai_summary}</p>
    </div>
    ` : ""}

    ${call.transcript ? `
    <div style="margin-bottom: 24px;">
      <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 12px;">Call Transcript</h2>
      <div style="background: #f9fafb; border-radius: 8px; padding: 16px; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${call.transcript}</div>
    </div>
    ` : ""}

    <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: #1a5c2e; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 14px;">View in Dashboard</a>
    </div>

    <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 24px;">SaloneSeva — Your business never misses a call again</p>
  </div>
</body>
</html>
  `;

  await resend.emails.send({
    from: "SaloneSeva <notifications@saloneseva.com>",
    to: business.email,
    subject: `New call from ${call.caller_name || call.caller_number || "a customer"} — ${business.business_name}`,
    html,
  });
}
