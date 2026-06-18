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
