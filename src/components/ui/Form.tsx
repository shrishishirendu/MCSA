import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";

export function FieldGroup({ children }: { children: ReactNode }) {
  return <div className="grid gap-2">{children}</div>;
}

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={clsx("text-sm font-semibold text-indigoInk", className)}
      {...props}
    />
  );
}

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "min-h-11 rounded-md border border-indigoInk/15 bg-white px-3 text-sm text-indigoInk outline-none transition placeholder:text-indigoInk/45 focus:border-lotus-500 focus:ring-2 focus:ring-lotus-100",
        className
      )}
      {...props}
    />
  );
}

export function TextArea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        "min-h-32 rounded-md border border-indigoInk/15 bg-white px-3 py-3 text-sm text-indigoInk outline-none transition placeholder:text-indigoInk/45 focus:border-lotus-500 focus:ring-2 focus:ring-lotus-100",
        className
      )}
      {...props}
    />
  );
}
