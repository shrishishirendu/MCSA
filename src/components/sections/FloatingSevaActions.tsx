"use client";

import { usePathname } from "next/navigation";
import { HUMANITIX_CONTRIBUTION_URL } from "@/lib/constants";

const floatingOptions = [
  { label: "Community Seva", amount: "$51+", style: "community" },
  { label: "Family Seva", amount: "$111", style: "popular" },
  { label: "Yajman Seva", amount: "$501", style: "yajman" }
] as const;

export function FloatingSevaActions() {
  const pathname = usePathname();
  if (pathname === "/durga-puja-2026" || pathname.startsWith("/durga-puja-2026/")) return null;

  return (
    <nav
      aria-label="Maa Bhagwati Puja contribution options"
      className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1.5 rounded-xl border border-turmeric/35 bg-white/95 p-2 shadow-2xl backdrop-blur-md md:inset-x-auto md:bottom-6 md:right-4 md:w-48 md:grid-cols-1 md:gap-2 md:rounded-2xl md:p-3"
    >
      <p className="hidden px-1 pb-1 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-lotus-700 md:block">
        Offer Your Seva
      </p>
      {floatingOptions.map((option) => (
        <a
          key={option.label}
          href={HUMANITIX_CONTRIBUTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-h-12 flex-col items-center justify-center rounded-lg px-1.5 py-2 text-center leading-tight shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-turmeric/40 motion-reduce:transition-none md:min-h-14 md:flex-row md:justify-between md:px-3 ${
            option.style === "popular"
              ? "bg-lotus-500 text-white"
              : option.style === "yajman"
                ? "bg-[#7b2f2f] text-white"
                : "border border-lotus-500 bg-[#fffaf3] text-lotus-700"
          }`}
          aria-label={`${option.label} ${option.amount} contribution through Humanitix`}
        >
          <span className="text-[10px] font-bold sm:text-xs">{option.label}</span>
          <span className="mt-0.5 text-xs font-bold md:mt-0 md:text-sm">{option.amount}</span>
        </a>
      ))}
    </nav>
  );
}
