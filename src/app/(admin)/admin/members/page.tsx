import { MemberReviewList } from "@/components/admin/MemberReviewList";
import { PageLayout } from "@/components/layout/PageLayout";
import { getMembers } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const members = await getMembers();

  return (
    <PageLayout
      title="Members"
      description="Open an application to review its details, then approve or reject it. Approved members receive a joining date."
      className="px-0 py-0"
    >
      <MemberReviewList initialMembers={members} />
    </PageLayout>
  );
}
