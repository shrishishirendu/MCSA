"use client";

import Image from "next/image";
import { useState } from "react";

type UpcomingEventPopupProps = {
  yajmaanUrl: string;
};

export function UpcomingEventPopup({ yajmaanUrl }: UpcomingEventPopupProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-indigoInk/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upcoming-event-popup-title"
    >
      <div className="relative w-full max-w-5xl">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute -right-2 -top-2 z-10 grid size-10 place-items-center rounded-full bg-white text-xl font-bold text-indigoInk shadow-soft transition hover:bg-lotus-50"
          aria-label="Close upcoming event popup"
        >
          ×
        </button>
        <div className="relative overflow-hidden rounded-lg border border-lotus-100 bg-lotus-50 shadow-2xl">
          <h2 id="upcoming-event-popup-title" className="sr-only">
            Upcoming event invitation
          </h2>
          <Image
            src="/images/mahotsav-invitation-card.png"
            alt="Upcoming event invitation for Celebrate Durga Puja and Mithila Mahotsav 2026"
            width={1104}
            height={579}
            priority
            className="h-auto w-full"
          />
          <a
            href={yajmaanUrl}
            aria-label="Become Our Yajmaan"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-[6%] left-[12%] h-[16%] w-[35%] rounded-md focus:outline-none focus:ring-4 focus:ring-turmeric/80"
          >
            <span className="sr-only">Become Our Yajmaan</span>
          </a>
        </div>
      </div>
    </div>
  );
}
