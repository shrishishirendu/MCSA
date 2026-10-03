import type { ReactNode } from "react";

export const stepButton = {
  primary: "inline-flex min-h-12 items-center justify-center rounded-md bg-[#761c25] px-5 py-3 text-sm font-bold text-white hover:bg-[#55141d] disabled:opacity-60",
  secondary: "inline-flex min-h-12 items-center justify-center rounded-md border border-[#761c25]/40 bg-white px-5 py-3 text-sm font-bold text-[#761c25] hover:border-[#761c25]",
  back: "mt-6 text-sm font-semibold text-[#761c25] underline underline-offset-4"
};

export function StepQuestion({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return <div>
    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#9b6430]">{step}</p>
    <h2 className="mt-2 font-serif text-2xl text-[#761c25]">{title}</h2>
    {children}
  </div>;
}
