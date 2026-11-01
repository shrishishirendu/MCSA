import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/events/PujaItems.module.css";
import { durgaPuja } from "@/data/durga-puja-2026";
import { createStripeClient } from "@/lib/payments/stripe";
import { formatAud, pujaItemsPath } from "@/lib/puja-items";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Thank you · Bhagwati Ashirwaad Items",
  robots: { index: false }
};

// Only the item name, amount and payment status are read; nothing else from Stripe is shown.
async function loadPurchase(sessionId: string | undefined) {
  if (!sessionId || !/^cs_[A-Za-z0-9_]{10,255}$/.test(sessionId)) return null;
  try {
    const session = await createStripeClient().checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
    if (!session.metadata?.puja_item_id) return null;
    return {
      paid: session.payment_status === "paid",
      itemName: session.line_items?.data[0]?.description ?? "Your Bhagwati Ashirwaad item",
      amount: formatAud(session.amount_total ?? 0)
    };
  } catch (error) {
    console.error("Bhagwati Ashirwaad thank-you page could not load the session:", error);
    return null;
  }
}

export default async function PujaItemThankYouPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const purchase = await loadPurchase(searchParams.session_id);

  return <main className={styles.page}>
    <div className={styles.inner}>
      <Link href={pujaItemsPath} className={styles.backLink}>← Back to Bhagwati Ashirwaad Items</Link>
      <div className={styles.thanks}>
        {purchase?.paid
          ? <>
            <h2>Thank you for your purchase</h2>
            <p>With the blessings of Maa Bhagwati, your Bhagwati Ashirwaad item is yours. A receipt is on its way to your email, and the organising team will contact you about collecting it.</p>
            <dl><div><dt>Item</dt><dd>{purchase.itemName}</dd></div><div><dt>Amount paid</dt><dd>{purchase.amount}</dd></div></dl>
          </>
          : <>
            <h2>Your payment is processing</h2>
            <p>Thank you. We have not received confirmation of your payment yet. Once it is confirmed, the item is yours and a receipt will be emailed to you.</p>
            <p>If you do not receive an email within an hour, please contact <a href={`mailto:${durgaPuja.email}`} className={styles.backLink}>{durgaPuja.email}</a>.</p>
          </>}
        <div className={styles.thanksActions}>
          <Link href={pujaItemsPath} className={`${styles.button} ${styles.buttonSecondary}`}>See more items</Link>
          <Link href={durgaPuja.path} className={styles.button}>Durga Puja 2026</Link>
        </div>
      </div>
    </div>
  </main>;
}
