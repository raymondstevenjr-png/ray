import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { sendCallSummaryEmail } from "@/lib/resend";
import type { Business, Call } from "@/lib/types";

interface VapiCallPayload {
  message: {
    type: string;
    call?: {
      id: string;
      assistantId?: string;
      customer?: {
        number?: string;
        name?: string;
      };
      startedAt?: string;
      endedAt?: string;
      transcript?: string;
      summary?: string;
      analysis?: {
        summary?: string;
        structuredData?: {
          appointmentBooked?: boolean;
          appointmentDatetime?: string;
          callerName?: string;
          outcome?: string;
        };
      };
      duration?: number;
    };
  };
}

function parseOutcome(raw: string | undefined): Call["outcome"] {
  const map: Record<string, Call["outcome"]> = {
    appointment_booked: "appointment_booked",
    message_taken: "message_taken",
    inquiry_answered: "inquiry_answered",
    voicemail: "voicemail",
  };
  return map[raw || ""] || "other";
}

export async function POST(request: NextRequest) {
  let body: VapiCallPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.message?.type !== "end-of-call-report") {
    return NextResponse.json({ received: true });
  }

  const call = body.message.call;
  if (!call) return NextResponse.json({ received: true });

  const supabase = createSupabaseServerClient();

  const { data: business, error: bizError } = await supabase
    .from("businesses")
    .select("*")
    .eq("vapi_assistant_id", call.assistantId)
    .single();

  if (bizError || !business) {
    console.error("Business not found for assistant:", call.assistantId);
    return NextResponse.json({ received: true });
  }

  const analysis = call.analysis;
  const structured = analysis?.structuredData;

  const callRecord: Omit<Call, "id" | "created_at"> = {
    business_id: business.id,
    caller_number: call.customer?.number || null,
    caller_name: structured?.callerName || call.customer?.name || null,
    call_duration: call.duration || null,
    transcript: call.transcript || null,
    ai_summary: analysis?.summary || call.summary || null,
    outcome: parseOutcome(structured?.outcome),
    appointment_booked: structured?.appointmentBooked || false,
    appointment_datetime: structured?.appointmentDatetime || null,
  };

  const { data: savedCall, error: callError } = await supabase
    .from("calls")
    .insert(callRecord)
    .select()
    .single();

  if (callError) {
    console.error("Error saving call:", callError);
    return NextResponse.json({ error: "Failed to save call" }, { status: 500 });
  }

  if (structured?.appointmentBooked && structured?.appointmentDatetime) {
    await supabase.from("appointments").insert({
      business_id: business.id,
      call_id: savedCall.id,
      caller_name: callRecord.caller_name,
      caller_number: callRecord.caller_number,
      appointment_datetime: structured.appointmentDatetime,
      status: "confirmed",
    });
  }

  if (business.email) {
    try {
      await sendCallSummaryEmail(business as Business, savedCall as Call);
    } catch (err) {
      console.error("Email notification failed:", err);
    }
  }

  if (business.phone && process.env.TWILIO_ACCOUNT_SID) {
    try {
      const twilio = (await import("twilio")).default;
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      const summary = callRecord.ai_summary || "New call handled";
      const from = callRecord.caller_name || callRecord.caller_number || "A customer";
      await client.messages.create({
        body: `SaloneSeva: New call from ${from}. ${summary.slice(0, 140)}`,
        from: process.env.TWILIO_FROM_NUMBER || "+15551234567",
        to: business.phone,
      });
    } catch (err) {
      console.error("SMS notification failed:", err);
    }
  }

  return NextResponse.json({ received: true, callId: savedCall.id });
}
