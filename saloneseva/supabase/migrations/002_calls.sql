create table if not exists calls (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  caller_number text,
  caller_name text,
  call_duration integer,
  transcript text,
  ai_summary text,
  outcome text,
  appointment_booked boolean default false,
  appointment_datetime timestamp with time zone,
  created_at timestamp with time zone default now()
);

alter table calls enable row level security;

create policy "Business owners can view their calls"
  on calls for select
  using (
    exists (
      select 1 from businesses
      where businesses.id = calls.business_id
        and businesses.owner_id = auth.uid()
    )
  );

create policy "Service role can insert calls"
  on calls for insert
  with check (true);

create index calls_business_id_idx on calls(business_id);
create index calls_created_at_idx on calls(created_at desc);
create index calls_outcome_idx on calls(outcome);
