import { PageLayout } from "@/components/layout/PageLayout";

export default function GalleryPage() {
  const items = ["Festival", "Art", "Community", "Workshop", "Food", "Performance"];

  return (
    <PageLayout
      title="Gallery"
      eyebrow="Community moments"
      description="A responsive gallery foundation for future event photos, Madhubani artwork and community albums."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="grid aspect-[4/3] place-items-center rounded-lg border border-indigoInk/10 bg-lotus-50 text-sm font-semibold text-indigoInk/70"
          >
            {item}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
