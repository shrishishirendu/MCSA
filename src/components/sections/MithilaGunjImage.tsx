import Image from "next/image";
import { getPublishedBlogPosts } from "@/lib/content-data";

export async function MithilaGunjImage() {
  const posts = await getPublishedBlogPosts();
  const post = posts.find((item) => item.title.trim().toLowerCase() === "mithila gunj");
  const uploadedImage = post?.imageUrls?.[0];
  return (
    <figure>
      <Image
        src={uploadedImage || "/images/mithila-gunj-radio.jpg"}
        alt={uploadedImage ? "Mithila Gunj community radio" : "Broadcast microphone in a recording studio"}
        width={1200}
        height={800}
        unoptimized={Boolean(uploadedImage)}
        className="aspect-[3/2] w-full rounded-xl object-cover"
      />
      {!uploadedImage && (
        <figcaption className="mt-2 text-xs opacity-75">
          Studio photograph by <a className="underline" href="https://unsplash.com/photos/black-and-gray-microphone-with-stand-5ULLwpOS5V8">Jacob Hodgson / Unsplash</a>
        </figcaption>
      )}
    </figure>
  );
}
