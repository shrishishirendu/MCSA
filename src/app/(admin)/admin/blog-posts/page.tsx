import { BlogEditor } from "@/components/admin/BlogEditor";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/Card";
import { getBlogPosts } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function AdminBlogPostsPage() {
  const posts = await getBlogPosts({ includeDrafts: true });

  return (
    <PageLayout
      title="Blog posts"
      description="Write an article, upload up to two images, save a draft or publish it directly to the public blog."
      className="px-0 py-0"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <BlogEditor />
        <section>
          <h2 className="text-xl font-bold text-indigoInk">Existing posts</h2>
          <div className="mt-4 grid gap-3">
            {posts.map((post) => (
              <Card key={post.id} className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-lotus-700">
                    {post.status ?? "published"}
                  </span>
                  <span className="text-xs text-indigoInk/45">
                    {new Date(post.publishedAt).toLocaleDateString("en-AU")}
                  </span>
                </div>
                <h3 className="mt-3 font-bold text-indigoInk">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-indigoInk/65">
                  {post.excerpt}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
