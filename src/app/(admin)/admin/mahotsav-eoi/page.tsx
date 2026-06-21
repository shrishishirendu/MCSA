import { MahotsavEoiManager, type EoiRecord } from "@/components/admin/MahotsavEoiManager";
import { PageLayout } from "@/components/layout/PageLayout";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MahotsavEoiAdminPage() {
  let records: EoiRecord[] = [];
  try {
    const { data } = await createServerSupabaseClient().from("mahotsav_eoi").select("*").order("created_at", { ascending: false });
    records = (data ?? []) as EoiRecord[];
  } catch {}
  return <PageLayout title="MM2026 Expressions of Interest" description="Review participation proposals, committee meeting requests and approval status." className="px-0 py-0"><MahotsavEoiManager initialRecords={records} /></PageLayout>;
}
