import Image from "next/image";
import Link from "next/link";
import { ORGANISATION_NAME, TIRHUTA_ORGANISATION_NAME } from "@/lib/constants";
import { publicNavigation } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="relative overflow-hidden border-b border-indigoInk/10 bg-white">
      <div className="absolute inset-0">
        <Image
          src="/images/australia-mithila-banner.png"
          alt="Australian landmarks with Mithila inspired cultural motifs"
          width={1792}
          height={768}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/78 via-white/24 to-white/58" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-14 place-items-center overflow-hidden rounded-md bg-white/92 p-1 shadow-soft">
              <Image
                src="/images/mcsa-logo.jpg"
                alt={`${ORGANISATION_NAME} logo`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="max-w-[22rem] leading-tight text-indigoInk drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)]">
              <span
                className="block text-xl font-bold"
                lang="mai-Tirh"
                title="Mithila sanskritik Sanstha Australia"
              >
                {TIRHUTA_ORGANISATION_NAME}
              </span>
              <span className="mt-1 block text-sm font-semibold text-indigoInk/75">
                {ORGANISATION_NAME}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button href="/member" variant="secondary" className="bg-white/92">
              Member Portal
            </Button>
            <Button href="/membership">Join / Donate</Button>
          </div>
        </div>
        <div className="mt-4 [&_a]:bg-white/0 [&_a]:font-semibold [&_a]:drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] [&_a:hover]:bg-white/70">
          <Navigation items={publicNavigation} ariaLabel="Primary navigation" />
        </div>
      </div>
    </header>
  );
}
