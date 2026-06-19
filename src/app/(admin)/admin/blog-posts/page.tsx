import { BlogEditor } from "@/components/admin/BlogEditor";
import { PageLayout } from "@/components/layout/PageLayout";
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
      <BlogEditor posts={posts} />
    </PageLayout>
  );
}
