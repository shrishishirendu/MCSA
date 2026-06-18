alter table public.members
add column if not exists payment_confirmed boolean not null default false;
