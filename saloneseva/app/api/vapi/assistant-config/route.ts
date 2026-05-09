import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { buildVapiAssistantConfig } from "@/lib/vapi";
import type { Business } from "@/lib/types";

export async function GET(request: NextRequest) {
  const businessId = request.nextUrl.searchParams.get("businessId");
  const assistantId = request.nextUrl.searchParams.get("assistantId");

  if (!businessId && !assistantId) {
    return NextResponse.json(
      { error: "businessId or assistantId required" },
      { status: 400 }
    );
  }

  try {
    const supabase = createSupabaseServerClient();
    let query = supabase.from("businesses").select("*");

    if (businessId) {
      query = query.eq("id", businessId);
    } else {
      query = query.eq("vapi_assistant_id", assistantId);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const config = buildVapiAssistantConfig(data as Business);
    return NextResponse.json(config);
  } catch (err) {
    console.error("assistant-config error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
