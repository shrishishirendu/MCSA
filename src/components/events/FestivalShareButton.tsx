"use client";

import { useState } from "react";
import { durgaPuja } from "@/data/durga-puja-2026";

export function FestivalShareButton({ className }: { className?: string }) {
  const [message, setMessage] = useState("");

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Durga Puja 2026 · MCSA", text: "Celebrate with us in Sydney, 17–19 October 2026.", url: durgaPuja.url });
      } else {
        await navigator.clipboard.writeText(durgaPuja.url);
        setMessage("Page link copied.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setMessage(`Share this link: ${durgaPuja.url}`);
    }
  }

  return <div>
    <button type="button" className={className} onClick={share}>Share with family & friends <span aria-hidden="true">↗</span></button>
    <p role="status" className="mt-2 break-words text-sm">{message}</p>
  </div>;
}
