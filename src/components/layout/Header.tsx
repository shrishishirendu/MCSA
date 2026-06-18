import Image from "next/image";
import Link from "next/link";
import { ORGANISATION_NAME, TIRHUTA_ORGANISATION_NAME } from "@/lib/constants";
import { publicNavigation } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { Navigation } from "@/components/layout/Navigation";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/groups/189257265814842",
    icon: "facebook"
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/explore/search/keyword/?q=Mithila%20Cultural%20Society%20Australia",
    icon: "instagram"
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/results?search_query=Mithila+Cultural+Society+Australia",
    icon: "youtube"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/search/results/all/?keywords=Mithila%20Cultural%20Society%20Australia",
    icon: "linkedin"
  }
];

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "facebook") {
    return <span className="text-lg leading-none">f</span>;
  }

  if (icon === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "youtube") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M10 9.5v5l5-2.5-5-2.5Z" fill="currentColor" />
      </svg>
    );
  }

  return <span className="text-sm leading-none">in</span>;
}

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
            <span className="max-w-[22rem] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]">
              <span
                className="block text-xl font-extrabold text-white transition-colors hover:text-turmeric"
                lang="mai-Tirh"
                title="Mithila sanskritik Sanstha Australia"
              >
                {TIRHUTA_ORGANISATION_NAME}
              </span>
              <span className="mt-1 block text-sm font-bold text-white/90 transition-colors hover:text-turmeric">
                {ORGANISATION_NAME}
              </span>
            </span>
          </Link>
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button href="/member" variant="secondary" className="bg-white/92">
                Member Portal
              </Button>
              <Button href="/membership">Join / Donate</Button>
            </div>
            <div className="flex items-center justify-center gap-2 self-center">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  title={link.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-10 place-items-center rounded-full border border-white/35 bg-black/20 text-sm font-extrabold text-white shadow-soft backdrop-blur-sm transition hover:border-turmeric hover:bg-white hover:text-indigoInk"
                >
                  <SocialIcon icon={link.icon} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 [&_a]:bg-transparent [&_a]:font-bold [&_a]:text-white [&_a]:drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)] [&_a:hover]:bg-white/15 [&_a:hover]:text-turmeric">
          <Navigation items={publicNavigation} ariaLabel="Primary navigation" />
        </div>
      </div>
    </header>
  );
}
