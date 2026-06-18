import type { ReactNode } from "react";
import Link from "next/link";
import { ORGANISATION_NAME } from "@/lib/constants";
import type { NavigationItem } from "@/types/navigation";

type PortalShellProps = {
  title: string;
  navigation: NavigationItem[];
  children: ReactNode;
};

export function PortalShell({ title, navigation, children }: PortalShellProps) {
  return (
    <div className="min-h-screen bg-lotus-50/45">
      <header className="border-b border-indigoInk/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <Link href="/" className="text-sm font-bold text-indigoInk">
              {ORGANISATION_NAME}
            </Link>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-lotus-700">
              {title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-turmeric/15 px-3 py-1.5 text-xs font-semibold text-indigoInk sm:inline-flex">
              Admin workspace
            </span>
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-semibold text-lotus-700 hover:bg-lotus-50"
            >
              Public website
            </Link>
            <form action="/api/admin/session" method="post">
              <input type="hidden" name="action" value="logout" />
              <button
                type="submit"
                className="rounded-md px-3 py-2 text-sm font-semibold text-indigoInk/65 hover:bg-lotus-50 hover:text-lotus-700"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="h-fit rounded-lg border border-indigoInk/10 bg-white p-4 shadow-soft lg:sticky lg:top-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-indigoInk/55">
            Manage
          </p>
          <nav className="grid gap-1" aria-label={`${title} navigation`}>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-indigoInk/75 transition hover:bg-lotus-50 hover:text-lotus-700 focus:outline-none focus:ring-2 focus:ring-lotus-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 border-t border-indigoInk/10 pt-4">
            <p className="text-xs leading-5 text-indigoInk/50">
              Administrative actions remain subject to final committee
              approval.
            </p>
          </div>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
