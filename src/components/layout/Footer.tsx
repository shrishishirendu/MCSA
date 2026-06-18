import { ORGANISATION_NAME, ORGANISATION_TAGLINE } from "@/lib/constants";
import { publicNavigation } from "@/lib/navigation";
import { Navigation } from "@/components/layout/Navigation";

export function Footer() {
  return (
    <footer className="border-t border-indigoInk/10 bg-indigoInk text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-lg font-bold">{ORGANISATION_NAME}</p>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              {ORGANISATION_TAGLINE}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-bold">Contact</p>
            <p className="mt-2 text-sm text-white/75">
              For membership, events, donations and community enquiries.
            </p>
            <a
              href="mailto:mithilaculturalsoc@gmail.com"
              className="mt-3 inline-block text-sm font-semibold text-white hover:text-lotus-100"
            >
              mithilaculturalsoc@gmail.com
            </a>
            <p className="mt-3 text-sm leading-6 text-white/75">
              You may also contact an elected committee member directly using
              the phone numbers listed in the Leadership section on the home
              page.
            </p>
          </div>
        </div>
        <div className="[&_a]:text-white/75 [&_a:hover]:bg-white/10 [&_a:hover]:text-white">
          <Navigation items={publicNavigation} ariaLabel="Footer navigation" />
        </div>
        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} {ORGANISATION_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
