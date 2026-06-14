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
      <header className="border-b border-indigoInk/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm font-bold text-indigoInk">
            {ORGANISATION_NAME}
          </Link>
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-semibold text-lotus-700 hover:bg-lotus-50"
          >
            Public website
          </Link>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-lg border border-indigoInk/10 bg-white p-4 shadow-soft">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-indigoInk/55">
            {title}
          </p>
          <nav className="grid gap-1" aria-label={`${title} navigation`}>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-indigoInk/75 hover:bg-lotus-50 hover:text-lotus-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
