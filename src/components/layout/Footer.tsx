import Link from "next/link";
import { ORGANISATION_NAME, ORGANISATION_TAGLINE } from "@/lib/constants";
import { footerNavigation } from "@/lib/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { getPublicAnnouncements } from "@/lib/content-data";

export async function Footer() {
  const announcementCount = (await getPublicAnnouncements()).length;

  return (
    <footer className="border-t border-indigoInk/10 bg-indigoInk text-white">
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
