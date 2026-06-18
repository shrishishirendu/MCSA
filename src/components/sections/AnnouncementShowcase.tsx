/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Announcement } from "@/types/content";

function announcementDate(value: string) {
  return new Date(value).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export function AnnouncementShowcase({
  announcements
}: {
  announcements: Announcement[];
}) {
  if (!announcements.length) return null;

  const [featured, ...secondary] = announcements;

  return (
    <section className="relative overflow-hidden bg-indigoInk text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,155,43,0.24),transparent_34rem)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-turmeric">
              Community noticeboard
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Latest announcements
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Important society updates, community notices and event
              information published by the MCSA admin team.
            </p>
          </div>
          <Link
            href="/announcements"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-turmeric hover:bg-white hover:text-indigoInk"
          >
            View all announcements
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-sm">
            {featured.imageUrl ? (
              <img
                src={featured.imageUrl}
                alt=""
                className="h-64 w-full object-cover sm:h-80"
              />
            ) : null}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-turmeric px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigoInk">
                  New announcement
                </span>
                <time className="text-sm font-semibold text-white/60">
                  {announcementDate(featured.publishedAt)}
                </time>
              </div>
              <h3 className="mt-5 text-2xl font-bold sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-4 line-clamp-5 whitespace-pre-wrap text-sm leading-7 text-white/75 sm:text-base">
                {featured.body || "Community announcement"}
              </p>
            </div>
          </article>

          <div className="grid gap-5">
            {secondary.slice(0, 2).map((announcement) => (
              <article
                key={announcement.id}
                className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
              >
                <time className="text-xs font-semibold uppercase tracking-wide text-turmeric">
                  {announcementDate(announcement.publishedAt)}
                </time>
                <h3 className="mt-3 text-xl font-bold">
                  {announcement.title}
                </h3>
                <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-white/70">
                  {announcement.body || "Community announcement"}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
