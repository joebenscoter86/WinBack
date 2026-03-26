create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  source text default 'landing_page',
  created_at timestamptz default now()
);
