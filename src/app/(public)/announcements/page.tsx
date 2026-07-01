/* eslint-disable @next/next/no-img-element */
import { PageLayout } from "@/components/layout/PageLayout";
import { getPublicAnnouncements } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
  const announcements = await getPublicAnnouncements();

  return (
    <PageLayout
      title="Announcements"
      eyebrow="Community noticeboard"
      description="Official updates, event notices and community information published by Mithila Cultural Society Australia."
    >
      {announcements.length ? (
        <div className="grid gap-6">
          {announcements.map((announcement, index) => (
            <article
              key={announcement.id}
              id={announcement.id}
              className={`overflow-hidden rounded-xl border border-indigoInk/10 bg-white shadow-soft ${
                index === 0 ? "lg:grid lg:grid-cols-[0.9fr_1.1fr]" : ""
              }`}
            >
              {announcement.imageUrl ? (
                <img
                  src={announcement.imageUrl}
                  alt=""
                  className={`w-full object-cover ${
                    index === 0 ? "h-72 lg:h-full" : "h-56"
                  }`}
                />
              ) : null}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  {index === 0 ? (
                    <span className="rounded-full bg-lotus-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      Latest
                    </span>
                  ) : null}
                  <time className="text-sm font-semibold text-lotus-700">
                    {new Date(announcement.publishedAt).toLocaleDateString(
                      "en-AU",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      }
                    )}
                  </time>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-indigoInk">
                  {announcement.title}
                </h2>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-indigoInk/70 sm:text-base">
                  {announcement.body || "Community announcement"}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-indigoInk/10 bg-white p-8 text-center shadow-soft">
          <h2 className="text-xl font-bold text-indigoInk">
            No public announcements
          </h2>
          <p className="mt-2 text-sm text-indigoInk/65">
            New community notices will appear here when published.
          </p>
        </div>
      )}
    </PageLayout>
  );
}
