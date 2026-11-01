-- Bhagwati Ashirwaad Items: donated Puja items sold to devotees, one of each.
-- All access goes through the server's service-role client; there are no public policies.

create table if not exists public.puja_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price_cents integer not null check (price_cents > 0),
  image_url text,
  sort_order integer not null default 0,
  active boolean not null default true,
  status text not null default 'available'
    check (status in ('available','held','claimed')),
  held_until timestamptz,
  claimant_name text,
  claimant_email text,
  claimant_phone text,
  stripe_session_id text,
  stripe_payment_intent text,
  claimed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists puja_items_stripe_session_id_key
  on public.puja_items (stripe_session_id)
  where stripe_session_id is not null;

create index if not exists puja_items_sort_idx on public.puja_items (sort_order, created_at);

alter table public.puja_items enable row level security;

-- Reserve an item for one devotee. A single conditional UPDATE, so two devotees can never
-- hold the same item: the row is returned only if this call won it.
create or replace function public.hold_puja_item(
  p_item_id uuid,
  p_name text,
  p_email text,
  p_phone text,
  p_minutes integer
)
returns setof public.puja_items
language sql
as $$
  update public.puja_items
  set status = 'held',
      held_until = now() + make_interval(mins => p_minutes),
      claimant_name = p_name,
      claimant_email = p_email,
      claimant_phone = p_phone,
      stripe_session_id = null,
      stripe_payment_intent = null,
      claimed_at = null,
      updated_at = now()
  where id = p_item_id
    and active
    and (status = 'available' or (status = 'held' and held_until < now()))
  returning *;
$$;

-- Return a held item to available. When a session id is given, only that checkout's hold is
-- released. The last claimant's details are kept so the admin can see the item was reserved.
create or replace function public.release_puja_item(
  p_item_id uuid,
  p_session_id text default null
)
returns setof public.puja_items
language sql
as $$
  update public.puja_items
  set status = 'available',
      held_until = null,
      stripe_session_id = null,
      updated_at = now()
  where id = p_item_id
    and status = 'held'
    and (p_session_id is null or stripe_session_id = p_session_id)
  returning *;
$$;

revoke all on function public.hold_puja_item(uuid, text, text, text, integer) from public, anon, authenticated;
revoke all on function public.release_puja_item(uuid, text) from public, anon, authenticated;
grant execute on function public.hold_puja_item(uuid, text, text, text, integer) to service_role;
grant execute on function public.release_puja_item(uuid, text) to service_role;
