create table if not exists public.mahotsav_eoi (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  age_group text not null,
  city text not null,
  contributions text[] not null default '{}',
  preferred_days text[] not null default '{}',
  participation_format text not null default 'individual',
  group_name text,
  participant_details text,
  performance_duration text,
  music_link text,
  description text not null,
  requirements text,
  guardian_name text,
  guardian_phone text,
  meeting_requested boolean not null default false,
  meeting_purpose text,
  meeting_preference_1 text,
  meeting_preference_2 text,
  meeting_preference_3 text,
  status text not null default 'submitted'
    check (status in ('submitted','under_review','approved','waitlisted','rejected','withdrawn')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.mahotsav_eoi enable row level security;
