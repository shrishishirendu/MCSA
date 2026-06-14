import Link from "next/link";
import type { NavigationItem } from "@/types/navigation";

type NavigationProps = {
  items: NavigationItem[];
  ariaLabel: string;
};

export function Navigation({ items, ariaLabel }: NavigationProps) {
  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm font-medium text-indigoInk/80 transition hover:bg-lotus-50 hover:text-lotus-700"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
