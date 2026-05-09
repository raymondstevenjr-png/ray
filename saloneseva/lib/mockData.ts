import type { Call, Appointment, DashboardMetrics } from "./types";

export const MOCK_CALLS: Call[] = [
  {
    id: "1",
    business_id: "demo",
    caller_number: "+1 (202) 555-0142",
    caller_name: "Kezia Bangura",
    call_duration: 187,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: Hi, I'd like to book a knotless braids appointment.\nAI: I'd be happy to help you book that. What day works best for you?\nCaller: Saturday the 15th around 10am?\nAI: Perfect. And can I get your name?\nCaller: Kezia Bangura.\nAI: Great, Kezia! I've booked you for knotless braids on Saturday the 15th at 10am. You'll receive a confirmation shortly.",
    ai_summary:
      "Caller booked a knotless braids appointment for Saturday the 15th at 10:00 AM. Name: Kezia Bangura. No deposit issues raised.",
    outcome: "appointment_booked",
    appointment_booked: true,
    appointment_datetime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    business_id: "demo",
    caller_number: "+1 (301) 555-0189",
    caller_name: "Marcus Thompson",
    call_duration: 94,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: Yeah, what time do you close on Fridays?\nAI: We close at 6pm on Fridays. Is there anything else I can help you with?\nCaller: No that's all, thanks.\nAI: You're welcome! Have a great day.",
    ai_summary: "Caller asked about Friday closing time. Informed them: 6pm. No appointment booked.",
    outcome: "inquiry_answered",
    appointment_booked: false,
    appointment_datetime: null,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    business_id: "demo",
    caller_number: "+1 (240) 555-0201",
    caller_name: "Fatmata Kamara",
    call_duration: 215,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: I need to book a silk press for next Tuesday.\nAI: I can help with that. We have openings on Tuesday. What time works for you?\nCaller: 2pm if possible.\nAI: 2pm on Tuesday works great. Can I get your name?\nCaller: Fatmata Kamara.\nAI: Perfect, Fatmata! You're booked for a silk press on Tuesday at 2pm.",
    ai_summary:
      "Caller booked a silk press for Tuesday at 2:00 PM. Name: Fatmata Kamara.",
    outcome: "appointment_booked",
    appointment_booked: true,
    appointment_datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    business_id: "demo",
    caller_number: "+1 (703) 555-0167",
    caller_name: null,
    call_duration: 142,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: I was calling to ask about box braids pricing.\nAI: Our box braids start at $150. The price may vary depending on length and thickness. Would you like to book an appointment?\nCaller: I'll think about it. Can I leave my number?\nAI: Of course! Please go ahead.\nCaller: It's 703-555-0167.\nAI: Got it. The owner will reach out to you. Is there anything else?\nCaller: No, that's it. Thanks.",
    ai_summary:
      "Caller asked about box braids pricing. Informed: starting at $150. Caller left number for callback.",
    outcome: "message_taken",
    appointment_booked: false,
    appointment_datetime: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    business_id: "demo",
    caller_number: "+1 (571) 555-0134",
    caller_name: "Adama Koroma",
    call_duration: 301,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: Hi, I want to book knotless braids for my daughter. She's 8.\nAI: Absolutely! We do children's braids. What day would work for you?\nCaller: Next Saturday around noon?\nAI: Noon on Saturday works. And your name?\nCaller: Adama Koroma.\nAI: Perfect, Adama! Your daughter is booked for knotless braids on Saturday at noon.",
    ai_summary:
      "Caller booked knotless braids for their daughter on Saturday at noon. Name: Adama Koroma.",
    outcome: "appointment_booked",
    appointment_booked: true,
    appointment_datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    business_id: "demo",
    caller_number: "+1 (410) 555-0178",
    caller_name: "Grace Johnson",
    call_duration: 67,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: Do you do natural hair only or also relaxers?\nAI: We specialize in natural hair styles — braids, twists, silk press, and protective styles. We do not currently offer relaxer services.\nCaller: Ok, thanks!",
    ai_summary:
      "Caller asked whether we offer relaxers. Informed: natural hair only — braids, twists, silk press.",
    outcome: "inquiry_answered",
    appointment_booked: false,
    appointment_datetime: null,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    business_id: "demo",
    caller_number: "+1 (301) 555-0211",
    caller_name: "Mariama Sesay",
    call_duration: 198,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: I want to cancel my appointment for tomorrow.\nAI: I can note that for you. Can I get your name?\nCaller: Mariama Sesay.\nAI: Thank you, Mariama. I'll pass on the cancellation request to the owner, who will confirm with you shortly.",
    ai_summary:
      "Caller requested to cancel appointment for tomorrow. Name: Mariama Sesay. Owner notified.",
    outcome: "message_taken",
    appointment_booked: false,
    appointment_datetime: null,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "8",
    business_id: "demo",
    caller_number: "+1 (202) 555-0245",
    caller_name: "Sandra Williams",
    call_duration: 156,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: Hi, how long does a full head of box braids take?\nAI: A full head of box braids typically takes between 4 to 8 hours depending on length and thickness. Would you like to book an appointment?\nCaller: Yes, can I book for next Friday?\nAI: Absolutely! What time works for you?\nCaller: 9am.\nAI: 9am Friday is confirmed. What name should I put this under?\nCaller: Sandra Williams.\nAI: Perfect! Sandra Williams, Friday at 9am for box braids.",
    ai_summary:
      "Caller booked box braids appointment for Friday at 9:00 AM. Name: Sandra Williams.",
    outcome: "appointment_booked",
    appointment_booked: true,
    appointment_datetime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "9",
    business_id: "demo",
    caller_number: "+1 (443) 555-0189",
    caller_name: null,
    call_duration: 43,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: I'll call back later.\nAI: Of course! We're here whenever you're ready. Have a great day!",
    ai_summary: "Caller said they would call back later. No action needed.",
    outcome: "other",
    appointment_booked: false,
    appointment_datetime: null,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "10",
    business_id: "demo",
    caller_number: "+1 (571) 555-0099",
    caller_name: "Isatu Conteh",
    call_duration: 225,
    transcript:
      "AI: Thank you for calling Aminata Beauty, how can I help you today?\nCaller: Do you offer kids styling? My daughter needs braids for her birthday party.\nAI: Yes, we love doing children's styles! What date is her birthday party?\nCaller: The 22nd, so we need it done by the 21st.\nAI: We have Saturday the 21st available. What time works?\nCaller: 11am.\nAI: 11am on the 21st is booked! Name for the appointment?\nCaller: Isatu Conteh.",
    ai_summary:
      "Caller booked kids braiding for the 21st at 11:00 AM for daughter's birthday party. Name: Isatu Conteh.",
    outcome: "appointment_booked",
    appointment_booked: true,
    appointment_datetime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = MOCK_CALLS.filter(
  (c) => c.appointment_booked
).map((c, i) => ({
  id: `apt-${i + 1}`,
  business_id: "demo",
  call_id: c.id,
  caller_name: c.caller_name,
  caller_number: c.caller_number,
  service_requested: ["Knotless braids", "Silk press", "Box braids", "Children's braids", "Kids braiding"][i % 5],
  appointment_datetime: c.appointment_datetime,
  notes: null,
  status: "confirmed" as const,
  created_at: c.created_at,
}));

export const MOCK_METRICS: DashboardMetrics = {
  totalCallsThisMonth: 47,
  appointmentsBooked: 31,
  missedCallsHandled: 43,
  estimatedRevenueSaved: 3720,
};
