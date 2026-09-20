import Image from "next/image";
import { getPublishedBlogPosts } from "@/lib/content-data";

export async function MithilaGunjImage() {
  const posts = await getPublishedBlogPosts();
  const post = posts.find((item) => item.title.trim().toLowerCase() === "mithila gunj");
  const uploadedImage = post?.imageUrls?.[0];
  return (
    <figure>
      <Image
        src={uploadedImage || "/images/mithila-gunj-community.jpeg"}
        alt={uploadedImage ? "Mithila Gunj community radio" : "Three Mithila Gunj participants seated together at studio microphones"}
        width={2040}
        height={1536}
        unoptimized={Boolean(uploadedImage)}
        className="h-auto w-full rounded-xl"
      />
      {!uploadedImage && (
        <figcaption className="mt-2 text-xs opacity-75">
          Community voices in the Mithila Gunj studio.
        </figcaption>
      )}
    </figure>
  );
}
