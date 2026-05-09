# SaloneSeva — Your business never misses a call again

SaloneSeva is an AI-powered phone receptionist built specifically for Sierra Leonean small business owners in the United States. It answers missed calls, has a natural conversation with the caller, and books appointments automatically — so the business owner never loses a customer to a missed call again.

**Tagline:** Your business never misses a call again.

**Target customers:** Hair braiding salons, catering businesses, cleaning services — owned by Sierra Leonean Americans.

---

## What it does

1. A customer calls the business phone number
2. The AI receptionist answers in professional American English
3. It answers questions, books appointments, and takes messages
4. The business owner gets a text + email summary of every call
5. Appointments appear in the dashboard and (soon) Google Calendar

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Database & Auth | Supabase |
| Payments | Stripe |
| Voice AI | VAPI |
| AI model | Claude claude-sonnet-4-20250514 via Anthropic API |
| Voice | ElevenLabs |
| Phone numbers | Twilio |
| Email | Resend |
| Deployment | Vercel |

---

## Local development

### Prerequisites
- Node.js 18+
- A Supabase project
- A Stripe account
- (Optional for full functionality) VAPI, Twilio, ElevenLabs, Resend accounts

### Setup

```bash
# Clone the repo
git clone https://github.com/raymondstevenjr-png/ray
cd ray/saloneseva

# Install dependencies
npm install

# Copy env file
cp .env.example .env.local

# Fill in your environment variables (see below)
# then start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to see the dashboard (uses mock data).

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in each value:

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | From [console.anthropic.com](https://console.anthropic.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | From Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase project settings (keep secret) |
| `STRIPE_SECRET_KEY` | From Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | From Stripe webhook configuration |
| `STRIPE_PRICE_ID_STARTER` | Price ID for the $49/month Starter plan |
| `STRIPE_PRICE_ID_PRO` | Price ID for the $99/month Pro plan |
| `VAPI_API_KEY` | From [vapi.ai](https://vapi.ai) dashboard |
| `VAPI_WEBHOOK_SECRET` | Set in VAPI webhook configuration |
| `TWILIO_ACCOUNT_SID` | From [twilio.com](https://twilio.com) console |
| `TWILIO_AUTH_TOKEN` | From Twilio console |
| `TWILIO_FROM_NUMBER` | Your Twilio phone number |
| `ELEVENLABS_API_KEY` | From [elevenlabs.io](https://elevenlabs.io) |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) |
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g. `https://saloneseva.com`) |

---

## Supabase setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy your URL and anon key into `.env.local`
3. Go to **SQL Editor** and run each migration file in order:

```sql
-- Run these in Supabase SQL Editor
-- 1. supabase/migrations/001_businesses.sql
-- 2. supabase/migrations/002_calls.sql
-- 3. supabase/migrations/003_appointments.sql
```

Or use the Supabase CLI:
```bash
npx supabase db push
```

4. Enable **Email auth** in Authentication → Providers

---

## Stripe setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to **Products** and create two products:
   - **SaloneSeva Starter** — $49/month recurring
   - **SaloneSeva Pro** — $99/month recurring
3. Copy each Price ID into `.env.local`
4. Set up a webhook endpoint pointing to `https://yourdomain.com/api/stripe/webhook`
5. Subscribe to these events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
6. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`

For local testing, use the Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## VAPI setup

1. Create an account at [vapi.ai](https://vapi.ai)
2. Copy your API key into `VAPI_API_KEY`
3. In VAPI, create an assistant with the model set to `claude-sonnet-4-20250514` via Anthropic
4. Set the server URL to `https://yourdomain.com/api/vapi/webhook`
5. Connect to Twilio for phone number provisioning
6. Store the VAPI assistant ID in the business record in Supabase

The assistant configuration is dynamically built per business via `/api/vapi/assistant-config`.

---

## ElevenLabs voice setup

1. Create an account at [elevenlabs.io](https://elevenlabs.io)
2. Copy your API key into `ELEVENLABS_API_KEY`
3. The default voice ID in `lib/vapi.ts` is `21m00Tcm4TlvDq8ikWAM` (Rachel — professional American English female)
4. Browse ElevenLabs voices and update the `voiceId` in `lib/vapi.ts` to your preference

---

## Twilio setup

1. Create a Twilio account at [twilio.com](https://twilio.com)
2. Buy a US phone number
3. Copy your Account SID and Auth Token into `.env.local`
4. Set `TWILIO_FROM_NUMBER` to your Twilio number
5. In Twilio, forward calls to your VAPI number (VAPI will give you a SIP endpoint)

---

## Resend setup

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your sending domain
3. Copy your API key into `RESEND_API_KEY`
4. Update the `from` address in `lib/resend.ts` to use your verified domain

---

## Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# or use:
vercel env add ANTHROPIC_API_KEY
# (repeat for each variable)
```

Set `NEXT_PUBLIC_APP_URL` to your production Vercel URL.

Update your Stripe webhook endpoint URL to the production URL after deployment.

---

## Pricing model

| Plan | Price | Calls | Notes |
|------|-------|-------|-------|
| Trial | Free | Unlimited | 14 days, then auto-upgrades |
| Starter | $49/month | 100/month | Best for new businesses |
| Pro | $99/month | Unlimited | Best for active businesses |

Unit economics:
- Average hair braiding appointment = $120–$200
- SaloneSeva pays for itself with 1 booked appointment per month
- Typical business loses 5–10 calls/day without answering

---

## How to get your first customer

1. Join Sierra Leonean community Facebook groups and WhatsApp groups in your city
2. Post a simple message: "I built an AI receptionist for Sierra Leonean businesses. It answers your calls, books appointments, and texts you after every call. First 10 businesses get 3 months free."
3. Do a personal demo — call their number and show them the AI answering
4. Help them set up in person the first time
5. Ask them to introduce you to 3 other Sierra Leonean business owners

The best marketing is one business owner telling another.

---

## File structure

```
saloneseva/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx
│   ├── globals.css
│   ├── onboard/
│   │   └── page.tsx                # Multi-step onboarding
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Overview
│   │   ├── calls/page.tsx          # Call log
│   │   ├── appointments/page.tsx   # Appointments
│   │   ├── settings/page.tsx       # AI settings
│   │   ├── billing/page.tsx        # Billing
│   │   └── support/page.tsx        # Support
│   └── api/
│       ├── vapi/
│       │   ├── webhook/route.ts    # VAPI call events
│       │   └── assistant-config/route.ts
│       └── stripe/
│           ├── webhook/route.ts
│           ├── create-checkout/route.ts
│           └── portal/route.ts
├── components/
│   ├── landing/                    # Landing page sections
│   ├── dashboard/                  # Dashboard components
│   └── onboarding/                 # Onboarding step forms
├── lib/
│   ├── types.ts                    # TypeScript types
│   ├── supabase.ts
│   ├── stripe.ts
│   ├── vapi.ts
│   ├── resend.ts
│   └── mockData.ts                 # Demo data for dashboard
└── supabase/
    └── migrations/                 # SQL migration files
```

---

## Built with love for the Sierra Leonean community

SaloneSeva — Salone is the Krio word for Sierra Leone. Seva means service.

*Your business never misses a call again.*
