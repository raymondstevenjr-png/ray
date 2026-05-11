create table if not exists rate_alerts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  target_rate numeric not null,
  country text not null,
  currency text not null,
  created_at timestamptz default now(),
  active boolean default true
);
create index on rate_alerts (email);
create index on rate_alerts (active);
