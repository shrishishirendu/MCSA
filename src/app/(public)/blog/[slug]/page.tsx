/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { getBlogPostBySlug } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function BlogArticlePage({
  params
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <PageLayout
      title={post.title}
      eyebrow={new Date(post.publishedAt).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })}
      description={post.excerpt}
    >
      {post.imageUrls?.length ? (
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {post.imageUrls.map((url) => (
            <img
              key={url}
              src={url}
              alt=""
              className="max-h-[30rem] w-full rounded-lg object-cover shadow-soft"
            />
          ))}
        </div>
      ) : null}
      <article className="max-w-3xl whitespace-pre-wrap text-base leading-8 text-indigoInk/75">
        {post.body ?? post.excerpt}
      </article>
    </PageLayout>
  );
}
