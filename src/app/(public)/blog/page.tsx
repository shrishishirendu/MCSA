/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { getBlogPosts } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayout
      title="Blog"
      eyebrow="Stories and updates"
      description="Cultural articles, community updates and society news."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-lg border border-indigoInk/10 bg-white shadow-soft"
          >
            {post.imageUrls?.[0] ? (
              <img
                src={post.imageUrls[0]}
                alt=""
                className="h-56 w-full object-cover"
              />
            ) : null}
            <div className="p-6">
              <p className="text-sm font-semibold text-lotus-700">
                {new Date(post.publishedAt).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
              <h2 className="mt-3 text-xl font-bold text-indigoInk">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-indigoInk/70">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug ?? post.id}`}
                className="mt-5 inline-flex font-semibold text-lotus-700 hover:underline"
              >
                Read article <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
