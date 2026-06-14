import type { ReactNode } from "react";
import { PortalShell } from "@/components/layout/PortalShell";
import { memberNavigation } from "@/lib/navigation";

export default function MemberLayout({ children }: { children: ReactNode }) {
  return (
    <PortalShell title="Member portal" navigation={memberNavigation}>
      {children}
    </PortalShell>
  );
}
