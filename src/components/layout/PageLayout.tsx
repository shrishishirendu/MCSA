import type { ReactNode } from "react";
import { clsx } from "clsx";

type PageLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
  eyebrow?: string;
  className?: string;
};

export function PageLayout({
  title,
  description,
  children,
  eyebrow,
  className
}: PageLayoutProps) {
  return (
    <main className={clsx("mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8", className)}>
      <header className="max-w-3xl">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-3xl font-bold text-indigoInk sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-base leading-7 text-indigoInk/70">
            {description}
          </p>
        ) : null}
      </header>
      <div className="mt-8">{children}</div>
    </main>
  );
}
