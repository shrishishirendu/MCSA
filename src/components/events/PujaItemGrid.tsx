"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FieldGroup, Label, TextInput } from "@/components/ui/Form";
import { formatAud, pujaItemLimits, type PublicPujaItem } from "@/lib/puja-items";
import { readJsonResponse } from "@/lib/response";
import styles from "./PujaItems.module.css";

export function PujaItemGrid({ items }: { items: PublicPujaItem[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<PublicPujaItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape" && !submitting) setSelected(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selected, submitting]);

  function open(item: PublicPujaItem) {
    setNotice("");
    setError("");
    setSelected(item);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || submitting) return;
    const data = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");
    let redirecting = false;
    try {
      const response = await fetch(`/api/puja-items/${selected.id}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), email: data.get("email"), phone: data.get("phone") })
      });
      const result = await readJsonResponse<{ url?: string }>(response);
      if (response.status === 409) {
        setSelected(null);
        setNotice("Sorry, someone just bought or reserved this item.");
        router.refresh();
        return;
      }
      if (!response.ok || !result.url) {
        setError(result.error ?? "We could not reserve this item. Please try again.");
        return;
      }
      redirecting = true;
      window.location.href = result.url;
    } catch {
      setError("We could not reserve this item. Please check your connection and try again.");
    } finally {
      // Stay disabled while the browser leaves for the payment page, so a second click cannot re-submit.
      if (!redirecting) setSubmitting(false);
    }
  }

  return <>
    {notice && <p role="status" className={styles.notice}>{notice}</p>}
    <ul className={styles.grid}>
      {items.map(item => <li key={item.id} className={`${styles.card} ${item.state === "sold" ? styles.sold : ""}`}>
        <div className={styles.imageWrap}>
          {item.imageUrl ? <img src={item.imageUrl} alt={item.name} loading="lazy" /> : <div className={styles.placeholder} aria-hidden="true">✺</div>}
          {item.state === "reserved" && <span className={`${styles.badge} ${styles.badgeReserved}`}>Being reserved</span>}
          {item.state === "sold" && <span className={`${styles.badge} ${styles.badgeSold}`}>Sold</span>}
        </div>
        <div className={styles.body}>
          <h2 className={styles.name}>{item.name}</h2>
          <p className={styles.price}>{formatAud(item.priceCents)}</p>
          {item.description && <p className={styles.description}>{item.description}</p>}
          <div className={styles.cardAction}>
            {item.state === "available"
              ? <button type="button" className={styles.button} onClick={() => open(item)}>Buy this item</button>
              : <button type="button" className={styles.button} disabled>{item.state === "sold" ? "Sold" : "Being reserved"}</button>}
          </div>
        </div>
      </li>)}
    </ul>

    {selected && <div className={styles.overlay} onClick={event => { if (event.target === event.currentTarget && !submitting) setSelected(null); }}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="buy-title">
        <h2 id="buy-title">{selected.name}</h2>
        <p className={styles.dialogMeta}>{formatAud(selected.priceCents)} · one of a kind</p>
        <form onSubmit={submit} className={styles.form}>
          <FieldGroup><Label htmlFor="buyer-name">Full name *</Label><TextInput id="buyer-name" name="name" autoComplete="name" maxLength={pujaItemLimits.name} required autoFocus /></FieldGroup>
          <FieldGroup><Label htmlFor="buyer-email">Email *</Label><TextInput id="buyer-email" name="email" type="email" autoComplete="email" maxLength={pujaItemLimits.email} required /></FieldGroup>
          <FieldGroup><Label htmlFor="buyer-phone">Phone *</Label><TextInput id="buyer-phone" name="phone" type="tel" autoComplete="tel" maxLength={pujaItemLimits.phone} pattern="\+?[\d\s()\-]{8,20}" title="Enter a phone number" required /></FieldGroup>
          <p className={styles.holdNote}>When you continue, this item is reserved for you for about 2 hours and you are taken to our secure Tyro payment page. We will also email you the payment link. The organising team confirms your purchase once payment is received; if it is not received in time, the item becomes available to other devotees again.</p>
          {error && <p role="alert" className={styles.error}>{error}</p>}
          <div className={styles.dialogActions}>
            <button type="button" className={`${styles.button} ${styles.buttonSecondary}`} onClick={() => setSelected(null)} disabled={submitting}>Cancel</button>
            <button type="submit" className={styles.button} disabled={submitting}>{submitting ? "Reserving…" : "Continue to payment"}</button>
          </div>
        </form>
      </div>
    </div>}
  </>;
}
