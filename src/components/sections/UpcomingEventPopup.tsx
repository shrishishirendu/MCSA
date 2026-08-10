"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type UpcomingEventPopupProps = {
  yajmaanUrl: string;
};

const fundraising = {
  raised: 3945,
  goal: 30000
};

const contributionOptions = [
  {
    name: "Yajman Seva",
    amount: "$501",
    badge: "Sacred Yajman Experience",
    description: "Take Sankalp and participate in Maa Bhagwati Puja with your family.",
    benefits: [
      "Family Sankalp and Puja participation",
      "Opportunity for the family to sit together during the Puja",
      "5 complimentary Dandiya Night tickets",
      "5 complimentary Mithila Mahotsav tickets",
      "Mata Ki Chowki Prasad for the family",
      "Prominent recognition on the Top Contributors list",
      "Recognition may remain private if preferred",
      "Direct support for Puja, Bhog, venue and essential arrangements"
    ],
    cta: "Become a Yajman — $501",
    style: "yajman",
    mobileOrder: "order-3 lg:order-3"
  },
  {
    name: "Shubh Family Seva",
    amount: "$111",
    badge: "Most Popular",
    description: "Make an auspicious family offering to Maa Bhagwati and celebrate together.",
    benefits: [
      "Supports Maa Bhagwati Puja",
      "4 complimentary Dandiya Night tickets",
      "4 complimentary Mithila Mahotsav tickets",
      "Mata Ki Chowki Prasad for the family",
      "Family recognised as a community contributor",
      "Public recognition is optional"
    ],
    cta: "Choose Family Seva — $111",
    style: "popular",
    mobileOrder: "order-1 lg:order-2"
  },
  {
    name: "Community Seva",
    amount: "From $51",
    badge: null,
    description: "Every offering helps bring Maa Bhagwati Puja and our community celebration to life.",
    benefits: [
      "Contribute any amount from $51",
      "Supports Puja, Bhog and essential arrangements",
      "Recognition as a community contributor",
      "Option to contribute privately"
    ],
    cta: "Offer Seva From $51",
    style: "community",
    mobileOrder: "order-2 lg:order-1"
  }
] as const;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0
  }).format(amount);

function BhagwatiImage({ compact = false }: { compact?: boolean }) {
  return (
    <div className="text-center">
      <div className="relative mx-auto w-full max-w-[220px] overflow-hidden rounded-t-[6rem] rounded-b-2xl border-2 border-turmeric/70 bg-[#3a1d20] p-1 shadow-[0_0_28px_rgba(217,155,43,0.24)] sm:max-w-[240px]">
        <Image
          src="/images/maa-durga-mahashakti-sticker.png"
          alt="Maa Bhagwati blessing the community"
          width={656}
          height={565}
          priority
          className={`w-full rounded-t-[5.5rem] rounded-b-xl object-cover ${
            compact ? "h-32 sm:h-40" : "h-36 xl:h-40"
          }`}
        />
      </div>
      <p className="mx-auto mt-3 max-w-xs font-serif text-sm italic leading-5 text-turmeric">
        “With Maa Bhagwati’s blessings, every offering becomes sacred.”
      </p>
    </div>
  );
}

export function UpcomingEventPopup({ yajmaanUrl }: UpcomingEventPopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const remaining = fundraising.goal - fundraising.raised;
  const exactPercentage = (fundraising.raised / fundraising.goal) * 100;
  const roundedPercentage = Math.round(exactPercentage);

  const closePopup = useCallback(() => {
    sessionStorage.setItem("mcsa-contribution-popup-dismissed", "true");
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (sessionStorage.getItem("mcsa-contribution-popup-dismissed") === "true") {
      setIsOpen(false);
      return;
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopup();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [closePopup, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-indigoInk/85 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5 motion-reduce:backdrop-blur-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contribution-appeal-title"
      aria-describedby="contribution-appeal-description"
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          ref={modalRef}
          className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-turmeric/30 bg-[#fffaf3] shadow-2xl lg:max-h-[calc(100vh-2.5rem)] lg:overflow-y-auto"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closePopup}
            className="absolute right-3 top-3 z-30 grid size-11 place-items-center rounded-full border border-indigoInk/15 bg-white text-2xl leading-none text-indigoInk shadow-md transition hover:bg-lotus-50 focus:outline-none focus:ring-4 focus:ring-turmeric/50 motion-reduce:transition-none"
            aria-label="Close contribution appeal"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_310px]">
            <div className="p-5 sm:p-7 lg:p-7 xl:p-8">
              <header className="pr-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-lotus-700">
                  Mithila Mahotsav 2026
                </p>
                <h2
                  id="contribution-appeal-title"
                  className="mt-2 max-w-3xl text-2xl font-bold leading-tight text-indigoInk sm:text-3xl xl:text-4xl"
                >
                  Will Your Family Help Welcome Maa Bhagwati to Sydney?
                </h2>
                <p
                  id="contribution-appeal-description"
                  className="mt-3 max-w-3xl text-sm leading-6 text-indigoInk/75"
                >
                  Join our community in welcoming Maa Bhagwati. Every offering
                  helps us conduct the Puja with devotion and create a memorable
                  celebration for every family.
                </p>
              </header>

              <div className="mt-5 lg:hidden">
                <BhagwatiImage compact />
              </div>

              <h3 className="mt-6 text-xl font-bold text-indigoInk">Choose Your Seva</h3>
              <div className="mt-3 flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:items-stretch">
                {contributionOptions.map((option) => {
                  const isPopular = option.style === "popular";
                  const isYajman = option.style === "yajman";

                  return (
                    <article
                      key={option.name}
                      className={`${option.mobileOrder} flex flex-col rounded-xl border p-4 ${
                        isPopular
                          ? "border-2 border-turmeric bg-[#fff1cc] shadow-[0_16px_35px_rgba(135,53,31,0.18)] lg:-translate-y-1"
                          : isYajman
                            ? "border-[#8f563e]/45 bg-[#fff8ef] shadow-md"
                            : "border-indigoInk/10 bg-white/80"
                      }`}
                    >
                      {option.badge ? (
                        <span
                          className={`mb-2 w-fit rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${
                            isPopular
                              ? "bg-turmeric text-indigoInk"
                              : "border border-[#8f563e]/30 bg-[#7b2f2f] text-white"
                          }`}
                        >
                          {option.badge}
                        </span>
                      ) : null}
                      <h4 className={`text-sm font-bold ${isYajman ? "text-[#7b2f2f]" : "text-lotus-700"}`}>
                        {option.name}
                      </h4>
                      <p className="mt-1 text-2xl font-bold text-indigoInk">{option.amount}</p>
                      <p className="mt-2 text-xs leading-[1.15rem] text-indigoInk/70">
                        {option.description}
                      </p>
                      <ul className="mt-3 space-y-1 text-[11px] leading-4 text-indigoInk/75">
                        {option.benefits.map((benefit) => (
                          <li key={benefit} className="flex gap-1.5">
                            <span aria-hidden="true" className={isYajman ? "text-[#9a6a28]" : "text-leaf"}>◆</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={yajmaanUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-4 flex min-h-11 items-center justify-center rounded-lg px-3 py-2 text-center text-xs font-bold transition focus:outline-none focus:ring-4 focus:ring-turmeric/40 motion-reduce:transition-none lg:mt-auto lg:translate-y-2 ${
                          isPopular
                            ? "bg-lotus-500 text-white hover:bg-lotus-700"
                            : isYajman
                              ? "border border-[#7b2f2f] bg-[#7b2f2f] text-white hover:bg-[#642525]"
                              : "border border-lotus-500 text-lotus-700 hover:bg-lotus-50"
                        }`}
                      >
                        {option.cta}
                      </a>
                    </article>
                  );
                })}
              </div>

              <section className="mt-6 rounded-xl border border-turmeric/30 bg-white p-4" aria-labelledby="fundraising-progress-title">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <h3 id="fundraising-progress-title" className="text-sm font-bold text-indigoInk">
                      {formatCurrency(fundraising.raised)} raised towards our {formatCurrency(fundraising.goal)} goal
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-lotus-700">
                      {roundedPercentage}% raised · {formatCurrency(remaining)} still needed
                    </p>
                  </div>
                  <p className="text-xs text-indigoInk/55">Together, every offering matters.</p>
                </div>
                <div
                  className="mt-3 h-2.5 overflow-hidden rounded-full bg-lotus-100"
                  role="progressbar"
                  aria-label={`${roundedPercentage}% of the fundraising goal raised`}
                  aria-valuemin={0}
                  aria-valuemax={fundraising.goal}
                  aria-valuenow={fundraising.raised}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-lotus-500 to-turmeric"
                    style={{ width: `${exactPercentage}%` }}
                  />
                </div>
                <p className="mt-3 text-[11px] leading-4 text-indigoInk/60">
                  Public recognition is entirely optional. You may contribute
                  privately when completing your contribution on Humanitix.
                </p>
              </section>

              <footer className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-indigoInk/10 pt-3 text-xs font-semibold text-indigoInk/65">
                <span>17–19 October 2026</span>
                <span>Quakers Hill Community Hall, Sydney</span>
              </footer>
            </div>

            <aside className="flex flex-col items-center justify-center bg-gradient-to-b from-[#35213a] to-indigoInk p-6 text-center text-white sm:p-8 lg:p-5 xl:p-7">
              <div className="hidden lg:block">
                <BhagwatiImage />
              </div>
              <div className="mt-1 rounded-xl bg-white p-2.5 shadow-xl lg:mt-5">
                <Image
                  src="/images/durga-puja-humanitix-qr.png"
                  alt="QR code linking to the Maa Bhagwati Puja contribution page on Humanitix"
                  width={210}
                  height={210}
                  className="size-40 object-contain xl:size-44"
                  priority
                />
              </div>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.15em] text-white">
                Scan to Contribute
              </h3>
              <p className="mt-1 text-xs leading-5 text-white/65">
                Secure contribution through Humanitix
              </p>
              <a
                href={yajmaanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-turmeric px-5 py-3 text-sm font-bold text-indigoInk transition hover:bg-[#edb64d] focus:outline-none focus:ring-4 focus:ring-white/30 motion-reduce:transition-none"
              >
                Contribute Now <span aria-hidden="true" className="ml-2">→</span>
              </a>
              <p className="mt-4 text-[11px] leading-4 text-white/55">
                With faith, devotion and community spirit
              </p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
