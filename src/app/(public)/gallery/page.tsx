import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const galleryAlbums = [
  {
    id: "mithila-mahotsav-2025",
    title: "Mithila Mahotsav 2025",
    label: "Featured album",
    description:
      "A community album capturing the people, performances, culture, food, colours and shared moments from Mithila Mahotsav 2025.",
    driveFolderId: "1tT1QnmJ4TZnLWoc-Evh7PBIOmnlGYzz0",
    albumUrl:
      "https://drive.google.com/drive/folders/1tT1QnmJ4TZnLWoc-Evh7PBIOmnlGYzz0?usp=drive_link"
  },
  {
    id: "jud-sheetal-2026",
    title: "Jud Sheetal 2026",
    label: "Community album",
    description:
      "Photos and memories from the Jud Sheetal 2026 community celebration.",
    driveFolderId: "1ElzX660zTL3_xPxwru6Z-BD9h3lHq6mm",
    albumUrl:
      "https://drive.google.com/drive/folders/1ElzX660zTL3_xPxwru6Z-BD9h3lHq6mm?usp=drive_link"
  }
];

const getDriveEmbedUrl = (folderId: string) =>
  `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;

export default function GalleryPage() {
  return (
    <PageLayout
      title="Gallery"
      eyebrow="Community moments"
      description="Photos and memories from Mithila Cultural Society Australia events, cultural gatherings and community celebrations."
    >
      <div className="grid gap-8">
        <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Card className="bg-lotus-50/70">
            <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">
              Albums
            </p>
            <h2 className="mt-3 text-3xl font-bold text-indigoInk">
              Community photo albums
            </h2>
            <p className="mt-4 text-sm leading-6 text-indigoInk/70">
              Browse event photos from Mithila Cultural Society Australia
              celebrations and community gatherings.
            </p>
            <div className="mt-6 grid gap-3">
              {galleryAlbums.map((album) => (
                <a
                  key={album.id}
                  href={`#${album.id}`}
                  className="rounded-md border border-indigoInk/10 bg-white p-4 text-sm font-bold text-indigoInk transition hover:border-lotus-500 hover:text-lotus-700"
                >
                  {album.title}
                </a>
              ))}
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

        {galleryAlbums.map((album) => (
          <section key={album.id} id={album.id}>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">
                  {album.label}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-indigoInk">
                  {album.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-indigoInk/70">
                  {album.description}
                </p>
              </div>
              <Button href={album.albumUrl} variant="secondary">
                Open full album
              </Button>
            </div>

            <div className="overflow-hidden rounded-lg border border-indigoInk/10 bg-white shadow-soft">
              <iframe
                src={getDriveEmbedUrl(album.driveFolderId)}
                title={`${album.title} Google Drive photo album`}
                className="h-[70vh] min-h-[520px] w-full"
                loading="lazy"
              />
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
