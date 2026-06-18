import { AnnouncementEditor } from "@/components/admin/AnnouncementEditor";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/Card";
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
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <AnnouncementEditor />
        <section>
          <h2 className="text-xl font-bold text-indigoInk">
            Existing announcements
          </h2>
          <div className="mt-4 grid gap-3">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-lotus-700">
                    {announcement.audience}
                  </span>
                  <span className="text-xs text-indigoInk/45">
                    {announcement.isPublished === false ? "Draft" : "Published"}
                  </span>
                </div>
                <h3 className="mt-3 font-bold text-indigoInk">
                  {announcement.title}
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-indigoInk/65">
                  {announcement.body || "Announcement details"}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
