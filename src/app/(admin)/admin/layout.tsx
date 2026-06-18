import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { PortalShell } from "@/components/layout/PortalShell";
import { adminNavigation } from "@/lib/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  if (!isAdminAuthenticated()) {
    redirect("/admin-login");
  }

  return (
    <PortalShell title="Admin portal" navigation={adminNavigation}>
      {children}
    </PortalShell>
  );
}
