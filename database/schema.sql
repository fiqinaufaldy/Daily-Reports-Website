-- DailyFlow Supabase schema
-- Run this in Supabase Dashboard > SQL Editor after creating a project.
-- The schema is user-scoped and uses Row Level Security (RLS).

create extension if not exists pgcrypto;

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  activity_time time,
  name text not null,
  description text,
  output text,
  status text not null default 'Pending' check (status in ('Done','On Progress','Pending')),
  priority text not null default 'Medium' check (priority in ('Low','Medium','High')),
  business_unit text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  reminder_date date not null,
  reminder_time time,
  priority text not null default 'Medium' check (priority in ('Low','Medium','High')),
  is_done boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_units (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique(user_id, name)
);

create table if not exists public.daily_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  note_date date not null,
  win text,
  challenge text,
  focus text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, note_date)
);

create table if not exists public.activity_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_id uuid references public.activities(id) on delete cascade,
  storage_path text not null,
  original_filename text,
  content_type text,
  created_at timestamptz not null default now()
);

alter table public.activities enable row level security;
alter table public.reminders enable row level security;
alter table public.business_units enable row level security;
alter table public.daily_notes enable row level security;
alter table public.activity_photos enable row level security;

create policy "Users manage own activities" on public.activities
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own reminders" on public.reminders
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own business units" on public.business_units
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own daily notes" on public.daily_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own activity photos" on public.activity_photos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Create a private Storage bucket named "dailyflow-documents" in Storage > Buckets.
-- Keep it private; store the object path in activity_photos.storage_path.
-- Add storage policies before uploading files. Never expose a service_role key in frontend code.
