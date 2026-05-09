import type { Business } from "./types";

export function buildVapiAssistantConfig(business: Business) {
  const hoursText = business.business_hours
    ? formatBusinessHours(business.business_hours)
    : "Please call during normal business hours.";

  const systemPrompt = `You are a professional AI receptionist for ${business.business_name}, a ${business.business_type.replace(/_/g, " ")} in the United States. You speak in professional, warm American English. Your job is to answer the phone, help callers with their questions, and book appointments.

Here is what you know about this business:
Services and pricing: ${business.services_and_pricing || "Please ask the owner for current services and pricing."}
Business hours: ${hoursText}
Special instructions: ${business.special_instructions || "None."}

Your greeting when you answer: ${business.custom_greeting || `Thank you for calling ${business.business_name}. How can I help you today?`}

How to handle calls:
- Greet the caller warmly using the custom greeting
- Ask how you can help them
- Answer questions about services, prices, and availability
- If they want to book an appointment, collect their name, preferred date and time, and the service they want
- If you cannot answer something, take their name and number and let them know the owner will call back
- Always be warm, professional, and helpful
- End every call by thanking them and confirming next steps

You represent a Sierra Leonean owned business. Be respectful and professional at all times.`;

  return {
    name: `${business.business_name} AI Receptionist`,
    model: {
      provider: "anthropic",
      model: "claude-sonnet-4-20250514",
      systemPrompt,
    },
    voice: {
      provider: "elevenlabs",
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      stability: 0.5,
      similarityBoost: 0.75,
    },
    firstMessage: business.custom_greeting || `Thank you for calling ${business.business_name}. How can I help you today?`,
    endCallMessage: "Thank you for calling. Have a wonderful day!",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en",
    },
    serverUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/webhook`,
    serverUrlSecret: process.env.VAPI_WEBHOOK_SECRET,
  };
}

function formatBusinessHours(hours: Business["business_hours"]): string {
  if (!hours) return "Contact the business for hours.";
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  return days
    .map((day) => {
      const h = hours[day];
      if (!h.isOpen) return `${capitalize(day)}: Closed`;
      return `${capitalize(day)}: ${h.openTime} - ${h.closeTime}`;
    })
    .join(", ");
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
