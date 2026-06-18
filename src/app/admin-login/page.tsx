import { redirect } from "next/navigation";
import {
  isAdminAccessConfigured,
  isAdminAuthenticated
} from "@/lib/admin-auth";
import { ORGANISATION_NAME } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { FieldGroup, Label, TextInput } from "@/components/ui/Form";

export default function AdminLoginPage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  if (isAdminAuthenticated()) {
    redirect("/admin");
  }

  const configured = isAdminAccessConfigured();

  return (
    <main className="grid min-h-screen place-items-center bg-lotus-50/50 px-4 py-12">
      <Card className="w-full max-w-md">
        <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
          {ORGANISATION_NAME}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-indigoInk">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-indigoInk/65">
          Enter the private admin access key to manage members, blog posts and
          announcements.
        </p>

        {!configured ? (
          <div className="mt-6 rounded-md border border-turmeric/40 bg-turmeric/10 p-4 text-sm leading-6 text-indigoInk">
            Admin access is not configured. Add <code>ADMIN_ACCESS_KEY</code> to
            the deployment environment before using this portal.
          </div>
        ) : (
          <form action="/api/admin/session" method="post" className="mt-6 grid gap-4">
            <input type="hidden" name="action" value="login" />
            <FieldGroup>
              <Label htmlFor="accessKey">Admin access key</Label>
              <TextInput
                id="accessKey"
                name="accessKey"
                type="password"
                autoComplete="current-password"
                required
              />
            </FieldGroup>
            {searchParams.error ? (
              <p className="text-sm font-semibold text-lotus-700">
                The access key was not accepted.
              </p>
            ) : null}
            <button
              type="submit"
              className="min-h-11 rounded-md bg-lotus-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-lotus-700 focus:outline-none focus:ring-2 focus:ring-lotus-500 focus:ring-offset-2"
            >
              Open admin portal
            </button>
          </form>
        )}
      </Card>
    </main>
  );
}
