/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Announcement } from "@/types/content";

function announcementDate(value: string) {
  return new Date(value).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function EventAnnouncementsStrip({
  announcements
}: {
  announcements: Announcement[];
}) {
  if (!announcements.length) return null;

  return (
    <section className="mt-10 border-t border-indigoInk/10 pt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
            Community noticeboard
          </p>
          <h2 className="mt-2 text-2xl font-bold text-indigoInk">
            Latest announcements
          </h2>
        </div>
        <Link
          href="/announcements"
          className="text-sm font-semibold text-lotus-700 hover:text-indigoInk"
        >
          View all announcements
        </Link>
      </div>

      <div className="grid gap-3">
        {announcements.slice(0, 3).map((announcement) => (
          <Link
            key={announcement.id}
            href={`/announcements#${announcement.id}`}
            className="grid gap-4 rounded-lg border border-indigoInk/10 bg-white p-3 shadow-soft transition hover:border-lotus-500 sm:grid-cols-[8rem_1fr]"
          >
            <div className="h-24 overflow-hidden rounded-md bg-lotus-50">
              {announcement.imageUrl ? (
                <img
                  src={announcement.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full place-items-center px-3 text-center text-xs font-semibold uppercase tracking-wide text-lotus-700">
                  Notice
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <time className="text-xs font-semibold uppercase tracking-wide text-lotus-700">
                  {announcementDate(announcement.publishedAt)}
                </time>
                <span className="text-xs text-indigoInk/40">•</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-indigoInk/50">
                  Read full news
                </span>
              </div>
              <h3 className="mt-2 line-clamp-1 text-lg font-bold text-indigoInk">
                {announcement.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-indigoInk/70">
                {announcement.body || "Community announcement"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
