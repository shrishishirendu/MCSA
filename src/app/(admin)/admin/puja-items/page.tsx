import { PujaItemEditor } from "@/components/admin/PujaItemEditor";
import { PageLayout } from "@/components/layout/PageLayout";
import { getAdminPujaItems } from "@/lib/puja-items-server";

export const dynamic = "force-dynamic";

export default async function AdminPujaItemsPage() {
  const items = await getAdminPujaItems();

  return (
    <PageLayout
      title="Bhagwati Ashirwaad Items"
      description="Add the donated Puja items devotees can buy online. Each item is one of a kind: it shows as Being reserved while a devotee pays, and Sold once payment is complete."
      className="px-0 py-0"
    >
      {items ? (
        <PujaItemEditor items={items} />
      ) : (
        <p className="rounded-lg bg-lotus-50 p-5 text-sm text-indigoInk/70">
          The items database is not available. Add the Supabase environment variables and run the migration
          supabase/migrations/202611010001_puja_items.sql in the Supabase SQL editor.
        </p>
      )}
    </PageLayout>
  );
}
