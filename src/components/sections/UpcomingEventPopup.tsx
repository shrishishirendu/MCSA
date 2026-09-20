"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { durgaPuja } from "@/data/durga-puja-2026";

const dismissalKey = "mcsa-durga-puja-2026-invitation-dismissed";

export function UpcomingEventPopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(dismissalKey) === "true") return;
    } catch { /* The invitation still works when browser storage is unavailable. */ }
    const modal = dialog.current;
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const restoreScroll = () => { document.body.style.overflow = previousOverflow; };
    modal.addEventListener("close", restoreScroll);
    return () => {
      modal.removeEventListener("close", restoreScroll);
      modal.close();
      restoreScroll();
    };
  }, []);

  function rememberDismissal() {
    try { sessionStorage.setItem(dismissalKey, "true"); } catch { /* Storage is optional. */ }
  }

  function close() {
    rememberDismissal();
    dialog.current?.close();
  }

  return (
    <dialog ref={dialog} onCancel={rememberDismissal} aria-labelledby="festival-invitation-title" aria-describedby="festival-invitation-description" className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-xl border border-[#c5953d] bg-[#fff9ec] p-0 text-[#342820] shadow-2xl backdrop:bg-[#201617]/75 backdrop:backdrop-blur-sm">
      <button ref={closeButton} type="button" onClick={close} aria-label="Close festival invitation" className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full border border-[#761c25]/20 bg-[#fff9ec] text-2xl text-[#761c25] shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27716c]">×</button>
      <div className="grid sm:grid-cols-[0.8fr_1.2fr]">
        <div className="relative hidden min-h-[440px] sm:block"><Image src="/images/durga-puja-2026/family-devotion.webp" alt="A family offering prayers before Maa Durga" fill sizes="750px" className="object-cover" /></div>
        <div className="px-6 py-9 sm:px-8 sm:py-10">
          <p className="pr-9 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9b6430]">An invitation for you & your family</p>
          <h2 id="festival-invitation-title" className="mt-5 font-serif text-4xl leading-tight text-[#761c25]">Durga Puja <span className="block">2026</span></h2>
          <p className="mt-3 font-serif text-lg italic text-[#761c25]">Mithila welcomes Mahashakti.</p>
          <p className="mt-5 text-sm font-bold">{durgaPuja.dates}</p>
          <p className="mt-1 text-xs leading-5">{durgaPuja.venue}, Sydney</p>
          <p id="festival-invitation-description" className="mt-5 text-sm leading-7 text-[#725e4b]">Puja, Mithila Mahotsav, Mata ki Chowki, Dandiya and Mithila Haat. Find the programme, event links and everything you need to plan your visit.</p>
          <Link href={durgaPuja.path} onClick={close} className="mt-6 flex min-h-12 items-center justify-center rounded-md bg-[#761c25] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#55141d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27716c]">Explore Durga Puja 2026 →</Link>
          <a href={durgaPuja.donationUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-11 items-center justify-center rounded-md border border-[#761c25]/25 px-4 py-2 text-sm font-semibold text-[#761c25] hover:bg-[#f2e5d0]">Support the celebration ↗</a>
        </div>
      </div>
    </dialog>
  );
}
