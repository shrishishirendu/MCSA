import { AnnouncementEditor } from "@/components/admin/AnnouncementEditor";
import { PageLayout } from "@/components/layout/PageLayout";
import { getAnnouncements } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements({ includeUnpublished: true });

  return (
    <PageLayout
      title="Announcements"
      description="Create a notice with an optional image. Public announcements appear prominently on the homepage and in the public announcements archive."
      className="px-0 py-0"
    >
      <AnnouncementEditor announcements={announcements} />
    </PageLayout>
  );
}
