import { PageLayout } from "@/components/layout/PageLayout";
import { FieldGroup, Label, TextInput } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";

export default function MyProfilePage() {
  return (
    <PageLayout
      title="My profile"
      description="Placeholder profile fields for future Supabase-authenticated member records."
      className="px-0 py-0"
    >
      <form className="grid max-w-2xl gap-5 rounded-lg border border-indigoInk/10 bg-white p-6 shadow-soft">
        <FieldGroup>
          <Label htmlFor="fullName">Full name</Label>
          <TextInput id="fullName" name="fullName" placeholder="Member name" />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="email">Email</Label>
          <TextInput id="email" name="email" type="email" placeholder="member@example.com" />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="phone">Phone</Label>
          <TextInput id="phone" name="phone" placeholder="+61" />
        </FieldGroup>
        <Button type="button">Save profile</Button>
      </form>
    </PageLayout>
  );
}
