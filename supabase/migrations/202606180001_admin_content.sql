create extension if not exists "pgcrypto";

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  phone text,
  membership_type text not null default 'annual',
  payment_confirmed boolean not null default false,
  notes text,
  membership_status text not null default 'pending'
    check (membership_status in ('pending', 'approved', 'rejected')),
  joined_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  body text not null,
  image_urls text[] not null default '{}',
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image_url text,
  audience text not null default 'public'
    check (audience in ('public', 'members')),
  is_published boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.members enable row level security;
alter table public.blog_posts enable row level security;
alter table public.announcements enable row level security;

insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do update set public = excluded.public;

insert into public.members (
  full_name,
  email,
  membership_type,
  membership_status,
  joined_at
)
values
  ('Anita Jha', 'anita@example.com', 'annual', 'approved', now()),
  ('Ramesh Mishra', 'ramesh@example.com', 'annual', 'pending', null)
on conflict (email) do nothing;
