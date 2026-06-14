import type { Metadata } from "next";
import "@/app/globals.css";
import { ORGANISATION_NAME, ORGANISATION_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: ORGANISATION_NAME,
    template: `%s | ${ORGANISATION_NAME}`
  },
  description: ORGANISATION_TAGLINE
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
