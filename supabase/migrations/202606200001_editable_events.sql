create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  time text not null default '',
  venue text not null,
  city text not null default 'Australia',
  summary text not null,
  ticketing_url text not null default '',
  price_label text not null default 'See event details',
  audience text not null default 'Members, families and guests',
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events add column if not exists time text not null default '';
alter table public.events add column if not exists venue text not null default '';
alter table public.events add column if not exists city text not null default 'Australia';
alter table public.events add column if not exists summary text not null default '';
alter table public.events add column if not exists ticketing_url text not null default '';
alter table public.events add column if not exists price_label text not null default 'See event details';
alter table public.events add column if not exists audience text not null default 'Members, families and guests';
alter table public.events add column if not exists image_url text;
alter table public.events add column if not exists created_at timestamptz not null default now();
alter table public.events add column if not exists updated_at timestamptz not null default now();

alter table public.events enable row level security;

insert into public.events (
  title,
  date,
  time,
  venue,
  city,
  summary,
  ticketing_url,
  price_label,
  audience,
  status
)
select
  'Dandiya Nights',
  current_date,
  'See ticketing page',
  'See Humanitix page',
  'Official event',
  'Register and pay through Humanitix. MCSA uses the external event page for ticketing, attendee management and event updates.',
  'https://events.humanitix.com/dandiya-nights',
  'Tickets via Humanitix',
  'Members, families and guests',
  'published'
where not exists (
  select 1 from public.events where title = 'Dandiya Nights'
);

insert into public.events (
  title,
  date,
  time,
  venue,
  city,
  summary,
  ticketing_url,
  price_label,
  audience,
  status
)
select
  'Durga Puja',
  current_date,
  'See ticketing page',
  'See Humanitix page',
  'Official event',
  'Register and pay through Humanitix. MCSA uses the external event page for ticketing, attendee management and event updates.',
  'https://events.humanitix.com/durga-puja',
  'Tickets via Humanitix',
  'Members, families and guests',
  'published'
where not exists (
  select 1 from public.events where title = 'Durga Puja'
);
