import type { ReactNode } from "react";
import { clsx } from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={clsx(
        "rounded-lg border border-indigoInk/10 bg-white p-6 shadow-soft",
        className
      )}
    >
      {children}
    </article>
  );
}
