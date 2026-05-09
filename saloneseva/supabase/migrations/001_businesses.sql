-- Enable UUID generation
create extension if not exists "pgcrypto";

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  business_name text not null,
  business_type text not null,
  owner_first_name text not null,
  email text not null,
  phone text,
  services_and_pricing text,
  business_hours jsonb,
  accepts_walk_ins text default 'yes',
  custom_greeting text,
  special_instructions text,
  vapi_assistant_id text,
  twilio_phone_number text,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'trial',
  trial_ends_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Row level security
alter table businesses enable row level security;

create policy "Users can view their own business"
  on businesses for select
  using (auth.uid() = owner_id);

create policy "Users can insert their own business"
  on businesses for insert
  with check (auth.uid() = owner_id);

create policy "Users can update their own business"
  on businesses for update
  using (auth.uid() = owner_id);

create index businesses_owner_id_idx on businesses(owner_id);
create index businesses_stripe_customer_id_idx on businesses(stripe_customer_id);
create index businesses_vapi_assistant_id_idx on businesses(vapi_assistant_id);
