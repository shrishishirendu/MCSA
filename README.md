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
`/durga-puja-2026/bhagwati-ashirwaad-items`. Each item is single-quantity: the
first devotee to start paying reserves it, and it is marked Sold once Stripe
confirms payment. The committee manages items in Admin Portal > Bhagwati
Ashirwaad Items (add, edit, release a hold, mark as sold manually for cash or
bank transfer sales).

How a purchase works:

1. The devotee enters their name, email and phone and continues to payment.
2. `hold_puja_item` reserves the item for 36 minutes in one conditional
   database update, so two devotees can never reserve the same item.
3. A Stripe Checkout session is created with a 31-minute expiry, so the
   reservation always outlasts the session.
4. The Stripe webhook marks the item Sold on `checkout.session.completed`, or
   releases it on `checkout.session.expired`. The buyer receives a receipt and
   the committee a notification. If a payment arrives for an item that is no
   longer reserved for that buyer, the item is not changed and the committee is
   emailed to arrange a manual refund.

Setup:

1. Run `supabase/migrations/202611010001_puja_items.sql` in the Supabase SQL
   editor. Photos use the existing `content-images` storage bucket.
2. In the Stripe Dashboard, add a webhook endpoint
   `https://<your-domain>/api/stripe/webhook` listening for
   `checkout.session.completed` and `checkout.session.expired`.
3. Add these environment variables to the Vercel project and redeploy:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET` (the webhook endpoint's signing secret)
   - `RESEND_API_KEY` and `EOI_FROM_EMAIL` for receipts and committee emails
4. Add items in the admin portal. No items are seeded.

To test locally with Stripe test keys:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Use the `whsec_...` secret it prints as `STRIPE_WEBHOOK_SECRET`.
