create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  call_id uuid references calls(id) on delete set null,
  caller_name text,
  caller_number text,
  service_requested text,
  appointment_datetime timestamp with time zone,
  notes text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

alter table appointments enable row level security;

create policy "Business owners can view their appointments"
  on appointments for select
  using (
    exists (
      select 1 from businesses
      where businesses.id = appointments.business_id
        and businesses.owner_id = auth.uid()
    )
  );

create policy "Service role can insert appointments"
  on appointments for insert
  with check (true);

create policy "Business owners can update their appointments"
  on appointments for update
  using (
    exists (
      select 1 from businesses
      where businesses.id = appointments.business_id
        and businesses.owner_id = auth.uid()
    )
  );

create index appointments_business_id_idx on appointments(business_id);
create index appointments_appointment_datetime_idx on appointments(appointment_datetime);
create index appointments_status_idx on appointments(status);
