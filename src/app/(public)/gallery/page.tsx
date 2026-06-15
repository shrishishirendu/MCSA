import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const mithilaMahotsavDriveFolderId = "1tT1QnmJ4TZnLWoc-Evh7PBIOmnlGYzz0";
const mithilaMahotsavAlbumUrl =
  "https://drive.google.com/drive/folders/1tT1QnmJ4TZnLWoc-Evh7PBIOmnlGYzz0?usp=drive_link";
const mithilaMahotsavEmbedUrl = `https://drive.google.com/embeddedfolderview?id=${mithilaMahotsavDriveFolderId}#grid`;

export default function GalleryPage() {
  return (
    <PageLayout
      title="Gallery"
      eyebrow="Community moments"
      description="Photos and memories from Mithila Cultural Society Australia events, cultural gatherings and community celebrations."
    >
      <div className="grid gap-8">
        <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="bg-lotus-50/70">
            <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">
              Featured album
            </p>
            <h2 className="mt-3 text-3xl font-bold text-indigoInk">
              Mithila Mahotsav 2025
            </h2>
            <p className="mt-4 text-sm leading-6 text-indigoInk/70">
              A community album capturing the people, performances, culture,
              food, colours and shared moments from Mithila Mahotsav 2025.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={mithilaMahotsavAlbumUrl}>
                Open full album
              </Button>
              <Button href="#mithila-mahotsav-2025" variant="secondary">
                View photos
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-indigoInk">
              Album access
            </h2>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-indigoInk/70">
              <p>
                The gallery below is loaded from the official Google Drive
                folder shared by the community.
              </p>
              <p>
                If the embedded gallery does not appear, open the full album.
                The Drive folder must be shared publicly or with the intended
                audience for visitors to view the photos.
              </p>
            </div>
          </Card>
        </section>

        <section id="mithila-mahotsav-2025">
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">
              Mithila Mahotsav 2025
            </p>
            <h2 className="mt-2 text-2xl font-bold text-indigoInk">
              Photo album
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg border border-indigoInk/10 bg-white shadow-soft">
            <iframe
              src={mithilaMahotsavEmbedUrl}
              title="Mithila Mahotsav 2025 Google Drive photo album"
              className="h-[70vh] min-h-[520px] w-full"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
