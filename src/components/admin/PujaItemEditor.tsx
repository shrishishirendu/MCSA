"use client";

/* eslint-disable @next/next/no-img-element */
import { FormEvent, useState } from "react";
import { ContentImagePicker } from "@/components/admin/ContentImagePicker";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";
import { formatAud, pujaItemLimits, type AdminPujaItem } from "@/lib/puja-items";
import { readJsonResponse } from "@/lib/response";

const stateLabel = { available: "Available", reserved: "Being reserved", sold: "Sold" } as const;
const stateClass = { available: "bg-leaf/10 text-leaf", reserved: "bg-amber-100 text-amber-800", sold: "bg-lotus-50 text-lotus-700" } as const;

function formatTime(value: string | null) {
  return value ? new Date(value).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short", timeZone: "Australia/Sydney" }) : "";
}

export function PujaItemEditor({ items }: { items: AdminPujaItem[] }) {
  const [selected, setSelected] = useState<AdminPujaItem | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [sellingId, setSellingId] = useState<string | null>(null);
  const priceLocked = Boolean(selected && selected.state !== "available");

  function edit(item: AdminPujaItem) {
    setSelected(item);
    setImageUrls(item.imageUrl ? [item.imageUrl] : []);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset(form?: HTMLFormElement) {
    setSelected(null);
    setImageUrls([]);
    form?.reset();
  }

  async function call(url: string, init: RequestInit, success: string) {
    const response = await fetch(url, { headers: { "Content-Type": "application/json" }, ...init });
    const result = await readJsonResponse<Record<string, never>>(response);
    if (!response.ok) {
      setMessage(result.error ?? "The change could not be saved.");
      return false;
    }
    setMessage(success);
    window.location.reload();
    return true;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const data = new FormData(event.currentTarget);
    const ok = await call(selected ? `/api/admin/puja-items/${selected.id}` : "/api/admin/puja-items", {
      method: selected ? "PATCH" : "POST",
      body: JSON.stringify({
        name: data.get("name"),
        description: data.get("description"),
        priceDollars: priceLocked && selected ? selected.priceCents / 100 : data.get("priceDollars"),
        sortOrder: Number(data.get("sortOrder") || 0),
        active: data.get("active") === "on",
        paymentUrl: data.get("paymentUrl"),
        imageUrl: imageUrls[0] ?? null
      })
    }, selected ? "Item updated." : "Item added.");
    if (!ok) setSaving(false);
  }

  async function release(item: AdminPujaItem) {
    if (!window.confirm(`Release the reservation on "${item.name}"? Only do this if the devotee has not paid. The item becomes available to others again.`)) return;
    await call(`/api/admin/puja-items/${item.id}`, { method: "POST", body: JSON.stringify({ action: "release" }) }, "Hold released.");
  }

  async function markSold(event: FormEvent<HTMLFormElement>, item: AdminPujaItem) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await call(`/api/admin/puja-items/${item.id}`, {
      method: "POST",
      body: JSON.stringify({ action: "mark-sold", buyerName: data.get("buyerName"), buyerEmail: data.get("buyerEmail"), buyerPhone: data.get("buyerPhone"), sendEmail: data.get("sendEmail") === "on" })
    }, "Item marked as sold.");
  }

  async function remove(item: AdminPujaItem) {
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    await call(`/api/admin/puja-items/${item.id}`, { method: "DELETE" }, "Item deleted.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form onSubmit={submit} className="grid h-fit gap-5 rounded-lg border border-indigoInk/10 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-bold text-indigoInk">{selected ? "Edit item" : "Add item"}</h2>
        <FieldGroup><Label htmlFor="item-name">Item name</Label><TextInput key={`n-${selected?.id}`} id="item-name" name="name" maxLength={pujaItemLimits.itemName} defaultValue={selected?.name ?? ""} required /></FieldGroup>
        <FieldGroup><Label htmlFor="item-description">Short description (1–2 lines)</Label><TextArea key={`d-${selected?.id}`} id="item-description" name="description" maxLength={pujaItemLimits.itemDescription} className="min-h-20" defaultValue={selected?.description ?? ""} /></FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldGroup>
            <Label htmlFor="item-price">Price (AUD)</Label>
            <TextInput key={`p-${selected?.id}-${priceLocked}`} id="item-price" name="priceDollars" type="number" min="0.01" step="0.01" defaultValue={selected ? (selected.priceCents / 100).toFixed(2) : ""} disabled={priceLocked} required={!priceLocked} />
            {priceLocked ? <p className="text-xs text-indigoInk/60">The price is locked while the item is being reserved or after it is sold.</p> : null}
          </FieldGroup>
          <FieldGroup><Label htmlFor="item-sort">Sort order</Label><TextInput key={`s-${selected?.id}`} id="item-sort" name="sortOrder" type="number" step="1" defaultValue={selected?.sortOrder ?? 0} /></FieldGroup>
        </div>
        <FieldGroup>
          <Label htmlFor="item-payment">Tyro payment link</Label>
          <TextInput key={`l-${selected?.id}`} id="item-payment" name="paymentUrl" type="url" placeholder="https://" maxLength={pujaItemLimits.paymentUrl} defaultValue={selected?.paymentUrl ?? ""} />
          <p className="text-xs text-indigoInk/60">Create a payment link in Tyro for this item&apos;s price and paste it here. Devotees are sent to it after reserving. Required to show the item publicly.</p>
        </FieldGroup>
        <label className="flex items-center gap-3 text-sm font-semibold text-indigoInk"><input key={`a-${selected?.id}`} type="checkbox" name="active" defaultChecked={selected?.active ?? true} className="size-4" /> Show on the public page</label>
        <FieldGroup><Label>Photo</Label><ContentImagePicker urls={imageUrls} onChange={setImageUrls} /></FieldGroup>
        {message ? <p className="text-sm font-semibold text-lotus-700">{message}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={saving} className="min-h-11 rounded-md bg-lotus-500 px-5 text-sm font-semibold text-white">{selected ? "Save changes" : "Add item"}</button>
          {selected ? <button type="button" onClick={() => reset()} className="px-4 text-sm font-semibold text-indigoInk/65">Cancel edit</button> : null}
        </div>
      </form>

      <section>
        <h2 className="text-xl font-bold text-indigoInk">Items</h2>
        <div className="mt-4 grid gap-3">
          {items.map(item => (
            <article key={item.id} className="rounded-lg border border-indigoInk/10 bg-white p-5 shadow-soft">
              <div className="flex gap-4">
                {item.imageUrl ? <img src={item.imageUrl} alt="" className="size-20 shrink-0 rounded-md object-cover" /> : null}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${stateClass[item.state]}`}>{stateLabel[item.state]}</span>
                    {!item.paymentUrl ? <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">No payment link</span> : null}
                    {!item.active ? <span className="rounded-full bg-indigoInk/10 px-2.5 py-1 text-xs font-bold text-indigoInk/70">Hidden</span> : null}
                    <span className="text-xs text-indigoInk/50">Sort {item.sortOrder}</span>
                  </div>
                  <h3 className="mt-2 font-bold text-indigoInk">{item.name}</h3>
                  <p className="text-sm font-semibold text-indigoInk/80">{formatAud(item.priceCents)}</p>
                </div>
              </div>

              {item.state !== "available" || item.claimantName ? (
                <dl className="mt-3 grid gap-1 rounded-md bg-lotus-50 p-3 text-sm text-indigoInk">
                  <div><dt className="inline font-semibold">{item.state === "available" ? "Last reserved by: " : "Buyer: "}</dt><dd className="inline">{item.claimantName ?? "—"}</dd></div>
                  {item.claimantEmail ? <div><dt className="inline font-semibold">Email: </dt><dd className="inline break-all">{item.claimantEmail}</dd></div> : null}
                  {item.claimantPhone ? <div><dt className="inline font-semibold">Phone: </dt><dd className="inline">{item.claimantPhone}</dd></div> : null}
                  {item.state === "reserved" ? <div><dt className="inline font-semibold">Held until: </dt><dd className="inline">{formatTime(item.heldUntil)}</dd></div> : null}
                  {item.state === "sold" ? <div><dt className="inline font-semibold">Sold: </dt><dd className="inline">{formatTime(item.claimedAt)}</dd></div> : null}
                </dl>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => edit(item)} className="rounded-md border border-lotus-500 px-4 py-2 text-sm font-semibold text-lotus-700 hover:bg-lotus-50">Edit</button>
                {item.state !== "sold" ? <button type="button" onClick={() => setSellingId(sellingId === item.id ? null : item.id)} className="rounded-md bg-lotus-500 px-4 py-2 text-sm font-semibold text-white">Mark as sold</button> : null}
                {item.status === "held" ? <button type="button" onClick={() => release(item)} className="rounded-md border border-indigoInk/15 px-4 py-2 text-sm font-semibold text-indigoInk">Release reservation</button> : null}
                {!item.everHeld ? <button type="button" onClick={() => remove(item)} className="px-3 py-2 text-sm font-semibold text-lotus-700">Delete</button> : null}
              </div>

              {sellingId === item.id ? (
                <form onSubmit={event => markSold(event, item)} className="mt-4 grid gap-3 rounded-md border border-indigoInk/10 p-4">
                  <p className="text-sm text-indigoInk/70">{item.state === "reserved" ? "Confirm once the payment shows in Tyro. The reserving devotee's details are filled in." : "For a sale paid in Tyro, cash or bank transfer."} The item will show as Sold on the public page.</p>
                  <FieldGroup><Label htmlFor={`buyer-${item.id}`}>Buyer name *</Label><TextInput id={`buyer-${item.id}`} name="buyerName" maxLength={pujaItemLimits.name} defaultValue={item.state === "reserved" ? item.claimantName ?? "" : ""} required /></FieldGroup>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <FieldGroup><Label htmlFor={`buyer-email-${item.id}`}>Email</Label><TextInput id={`buyer-email-${item.id}`} name="buyerEmail" type="email" maxLength={pujaItemLimits.email} defaultValue={item.state === "reserved" ? item.claimantEmail ?? "" : ""} /></FieldGroup>
                    <FieldGroup><Label htmlFor={`buyer-phone-${item.id}`}>Phone</Label><TextInput id={`buyer-phone-${item.id}`} name="buyerPhone" maxLength={pujaItemLimits.phone} defaultValue={item.state === "reserved" ? item.claimantPhone ?? "" : ""} /></FieldGroup>
                  </div>
                  <label className="flex items-center gap-3 text-sm text-indigoInk"><input type="checkbox" name="sendEmail" defaultChecked className="size-4" /> Email the buyer a thank-you (if an email is given)</label>
                  <button type="submit" className="min-h-11 rounded-md bg-lotus-500 px-5 text-sm font-semibold text-white">Mark as sold</button>
                </form>
              ) : null}
            </article>
          ))}
          {!items.length ? <p className="rounded-lg bg-lotus-50 p-5 text-sm text-indigoInk/65">No items yet. Add the first donated item using the form.</p> : null}
        </div>
      </section>
    </div>
  );
}
