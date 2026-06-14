import type { ReactNode } from "react";
import { PortalShell } from "@/components/layout/PortalShell";
import { adminNavigation } from "@/lib/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <PortalShell title="Admin portal" navigation={adminNavigation}>
      {children}
    </PortalShell>
  );
}
