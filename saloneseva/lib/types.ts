export type BusinessType =
  | "hair_braiding_salon"
  | "beauty_salon"
  | "catering_business"
  | "cleaning_service"
  | "other";

export type Plan = "trial" | "starter" | "pro" | "cancelled";

export type CallOutcome =
  | "appointment_booked"
  | "message_taken"
  | "inquiry_answered"
  | "voicemail"
  | "other";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface Business {
  id: string;
  owner_id: string;
  business_name: string;
  business_type: BusinessType;
  owner_first_name: string;
  email: string;
  phone: string | null;
  services_and_pricing: string | null;
  business_hours: BusinessHours | null;
  custom_greeting: string | null;
  special_instructions: string | null;
  accepts_walk_ins: string | null;
  vapi_assistant_id: string | null;
  twilio_phone_number: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: Plan;
  trial_ends_at: string | null;
  created_at: string;
}

export interface Call {
  id: string;
  business_id: string;
  caller_number: string | null;
  caller_name: string | null;
  call_duration: number | null;
  transcript: string | null;
  ai_summary: string | null;
  outcome: CallOutcome | null;
  appointment_booked: boolean;
  appointment_datetime: string | null;
  created_at: string;
}

export interface Appointment {
  id: string;
  business_id: string;
  call_id: string | null;
  caller_name: string | null;
  caller_number: string | null;
  service_requested: string | null;
  appointment_datetime: string | null;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
}

export interface OnboardingData {
  businessName: string;
  businessType: BusinessType | "";
  ownerFirstName: string;
  businessPhone: string;
  businessEmail: string;
  servicesAndPricing: string;
  businessHours: BusinessHours;
  acceptsWalkIns: "yes" | "no" | "call_to_check";
  customGreeting: string;
  specialInstructions: string;
  selectedPlan: "starter" | "pro" | null;
}

export interface DashboardMetrics {
  totalCallsThisMonth: number;
  appointmentsBooked: number;
  missedCallsHandled: number;
  estimatedRevenueSaved: number;
}

export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  monday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
  tuesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
  wednesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
  thursday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
  friday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
  saturday: { isOpen: true, openTime: "10:00", closeTime: "16:00" },
  sunday: { isOpen: false, openTime: "10:00", closeTime: "16:00" },
};

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  hair_braiding_salon: "Hair braiding salon",
  beauty_salon: "Beauty salon",
  catering_business: "Catering business",
  cleaning_service: "Cleaning service",
  other: "Other",
};
