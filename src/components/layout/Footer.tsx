/* eslint-disable @next/next/no-img-element */
import { ORGANISATION_NAME, ORGANISATION_TAGLINE } from "@/lib/constants";
import { publicNavigation } from "@/lib/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { getAnnouncements } from "@/lib/content-data";

export async function Footer() {
  const announcements = (await getAnnouncements({ audience: "public" })).slice(
    0,
    3
  );

  return (
    <footer className="border-t border-indigoInk/10 bg-indigoInk text-white">
      {announcements.length ? (
        <section className="border-b border-white/10 bg-white/5">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-turmeric">
              Latest announcements
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {announcements.map((announcement) => (
                <article
                  key={announcement.id}
                  className="overflow-hidden rounded-lg border border-white/10 bg-white/10"
                >
                  {announcement.imageUrl ? (
                    <img
                      src={announcement.imageUrl}
                      alt=""
                      className="h-36 w-full object-cover"
                    />
                  ) : null}
                  <div className="p-4">
                    <h2 className="font-bold text-white">
                      {announcement.title}
                    </h2>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/70">
                      {announcement.body || "Community announcement"}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-turmeric">
                      {new Date(announcement.publishedAt).toLocaleDateString(
                        "en-AU"
                      )}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-bold">{ORGANISATION_NAME}</p>
          <p className="mt-1 max-w-2xl text-sm text-white/75">
            {ORGANISATION_TAGLINE}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <a
              href="mailto:mithilaculturalsoc@gmail.com"
              className="font-semibold text-white hover:text-lotus-100"
            >
              mithilaculturalsoc@gmail.com
            </a>
            <span className="text-white/70">
              Committee phone numbers are listed in the Leadership section.
            </span>
          </div>
        </div>

        <div className="-ml-3 [&_a]:text-white/75 [&_a:hover]:bg-white/10 [&_a:hover]:text-white">
          <Navigation items={publicNavigation} ariaLabel="Footer navigation" />
        </div>

        <p className="text-xs text-white/60">
          &copy; {new Date().getFullYear()} {ORGANISATION_NAME}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
