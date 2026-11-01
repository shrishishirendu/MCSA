# Mithila Cultural Society Australia

Project foundation for the official website and web platform of **Mithila Cultural Society Australia**.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase-ready service structure
- PostgreSQL-ready domain and repository architecture
- Stripe-ready payment service placeholders

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current Scope

## Admin content and membership setup

Member approvals, blog publishing and announcements use Supabase. To activate
them:

1. Create or select a Supabase project.
2. Run `supabase/migrations/202606180001_admin_content.sql` in the Supabase SQL
   editor.
3. Add these environment variables to the Vercel project:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_ACCESS_KEY` (a long private password used for `/admin-login`)
4. Redeploy the application.

The service-role key is used only by server routes. Database tables have row
level security enabled, and admin write endpoints require an authenticated
admin cookie.

Payments and full member account authentication remain future integrations.

## Bhagwati Ashirwaad Items (Durga Puja 2026)

Items donated to the Puja are sold to devotees at
`/durga-puja-2026/bhagwati-ashirwaad-items`. Each item is single-quantity and
has its own Tyro payment link. The committee manages items in Admin Portal >
Bhagwati Ashirwaad Items (add, edit, mark as sold, release a reservation).

How a purchase works:

1. The devotee chooses an item and enters their name, email and phone.
2. `hold_puja_item` reserves the item for 2 hours in one conditional database
   update, so two devotees can never reserve the same item. Items without a
   payment link cannot be reserved and are not shown publicly.
3. The devotee is sent to the item's Tyro payment link. They and the
   committee are emailed the reservation details.
4. When the payment appears in Tyro, an admin clicks Mark as sold (the
   reserving devotee's details are pre-filled) and the buyer is emailed a
   thank-you. If nobody pays, the reservation lapses on its own, or an admin
   can release it.

Setup:

1. Run `supabase/migrations/202611010001_puja_items.sql` in the Supabase SQL
   editor. Photos use the existing `content-images` storage bucket.
2. `RESEND_API_KEY` and `EOI_FROM_EMAIL` must be set for the emails.
3. For each item, create a Tyro payment link for its price and paste it into
   the item in the admin portal. No items are seeded.
