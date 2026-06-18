/* eslint-disable @next/next/no-img-element */
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/Card";
import { getAnnouncements } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function MemberAnnouncementsPage() {
  const announcements = await getAnnouncements({ audience: "members" });

  return (
    <PageLayout
      title="Announcements"
      description="Member-facing announcements for events, volunteering, committee updates and community notices."
      className="px-0 py-0"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="overflow-hidden p-0">
            {announcement.imageUrl ? (
              <img
                src={announcement.imageUrl}
                alt=""
                className="h-48 w-full object-cover"
              />
            ) : null}
            <div className="p-6">
              <p className="text-sm font-semibold text-lotus-700">
                {new Date(announcement.publishedAt).toLocaleDateString("en-AU")}
              </p>
              <h2 className="mt-2 text-xl font-bold text-indigoInk">
                {announcement.title}
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-indigoInk/70">
                {announcement.body || "Member announcement"}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}
