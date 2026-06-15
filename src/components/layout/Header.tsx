import Image from "next/image";
import Link from "next/link";
import { ORGANISATION_NAME, TIRHUTA_ORGANISATION_NAME } from "@/lib/constants";
import { publicNavigation } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="border-b border-indigoInk/10 bg-white/95 backdrop-blur">
      <div className="relative h-28 overflow-hidden border-b border-indigoInk/10 sm:h-36 lg:h-44">
        <Image
          src="/images/australia-mithila-banner.png"
          alt="Australian landmarks with Mithila inspired cultural motifs"
          width={1792}
          height={768}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/15 to-white/55" />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-14 place-items-center overflow-hidden rounded-md border border-lotus-100 bg-white p-1 shadow-sm">
              <Image
                src="/images/mcsa-logo.jpg"
                alt={`${ORGANISATION_NAME} logo`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="max-w-[22rem] leading-tight text-indigoInk">
              <span
                className="block text-xl font-bold"
                lang="mai-Tirh"
                title="Mithila sanskritik Sanstha Australia"
              >
                {TIRHUTA_ORGANISATION_NAME}
              </span>
              <span className="mt-1 block text-sm font-semibold text-indigoInk/70">
                {ORGANISATION_NAME}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button href="/member" variant="secondary">
              Member Portal
            </Button>
            <Button href="/membership">Join / Donate</Button>
          </div>
        </div>
        <Navigation items={publicNavigation} ariaLabel="Primary navigation" />
      </div>
    </header>
  );
}
