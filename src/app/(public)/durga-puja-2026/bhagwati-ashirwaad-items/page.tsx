import type { Metadata } from "next";
import Link from "next/link";
import { PujaItemGrid } from "@/components/events/PujaItemGrid";
import styles from "@/components/events/PujaItems.module.css";
import { durgaPuja } from "@/data/durga-puja-2026";
import { getPublicPujaItems } from "@/lib/puja-items-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Bhagwati Ashirwaad Items · Durga Puja 2026",
  description: "Items donated to the Durga Puja, available to our devotees. Each item is one of a kind."
};

export default async function BhagwatiAshirwaadItemsPage() {
  const items = await getPublicPujaItems();

  return <main className={styles.page}>
    <div className={styles.inner}>
      <Link href={`${durgaPuja.path}#seva`} className={styles.backLink}>← Back to Durga Puja 2026</Link>
      <p className={styles.eyebrow}>Durga Puja 2026 · Blessings to take home</p>
      <h1 className={styles.title}>Bhagwati Ashirwaad Items</h1>
      <p className={styles.intro}>Items donated to the Puja, available to our devotees. Choose an item and complete your purchase online — each item is one of a kind, so it is reserved for the first devotee who chooses it.</p>

      {items === null
        ? <div className={styles.empty}><h2>Unavailable right now</h2><p>Bhagwati Ashirwaad Items cannot be shown at the moment. Please try again later, or contact <a href={`mailto:${durgaPuja.email}`} className={styles.backLink}>{durgaPuja.email}</a>.</p></div>
        : items.length === 0
          ? <div className={styles.empty}><h2>Coming soon</h2><p>Items will appear here once they are ready. Please check back soon.</p></div>
          : <PujaItemGrid items={items} />}
    </div>
  </main>;
}
