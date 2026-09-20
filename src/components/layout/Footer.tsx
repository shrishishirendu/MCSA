import Link from "next/link";
import { ORGANISATION_NAME, ORGANISATION_TAGLINE } from "@/lib/constants";
import { footerNavigation } from "@/lib/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { getPublicAnnouncements } from "@/lib/content-data";

export async function Footer() {
  const announcementCount = (await getPublicAnnouncements()).length;

  return (
    <footer className="border-t border-indigoInk/10 bg-indigoInk pb-24 text-white md:pb-16">
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
              Please use the Contact Us page for committee or membership queries.
            </span>
            {announcementCount ? (
              <Link
                href="/announcements"
                className="font-semibold text-turmeric hover:text-white"
              >
                View {announcementCount} announcement
                {announcementCount === 1 ? "" : "s"}
              </Link>
            ) : null}
          </div>
        </div>

        <section aria-labelledby="mithila-gunj-heading" className="rounded-xl border border-white/15 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-turmeric">Our weekly Maithili radio program</p>
          <h2 id="mithila-gunj-heading" className="mt-2 text-xl font-bold">Mithila Gunj</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
            Bringing the Mithila diaspora together through radio. A shared voice
            for our community, connecting people with Mithila and with one another.
          </p>
          <p className="mt-3 text-sm font-semibold text-white">Sundays, 8–9 am Sydney time · 2TripleO 98.5 FM</p>
          <Link href="/mithila-gunj" className="mt-4 inline-block font-bold text-turmeric underline underline-offset-4 hover:text-white">Discover and listen to Mithila Gunj</Link>
        </section>

        <div className="-ml-3 [&_a]:text-white/75 [&_a:hover]:bg-white/10 [&_a:hover]:text-white">
          <Navigation items={footerNavigation} ariaLabel="Footer navigation" />
        </div>

        <p className="text-xs text-white/60">
          &copy; {new Date().getFullYear()} {ORGANISATION_NAME}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
