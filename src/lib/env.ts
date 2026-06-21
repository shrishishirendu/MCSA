export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  adminAccessKey: process.env.ADMIN_ACCESS_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  eoiFromEmail: process.env.EOI_FROM_EMAIL,
  eoiNotificationEmail:
    process.env.EOI_NOTIFICATION_EMAIL || "mithilaculturalsoc@gmail.com",
  databaseUrl: process.env.DATABASE_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET
};
