import { blogPosts } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function AdminBlogPostsPage() {
  return (
    <PageLayout title="Blog posts" description="Admin publishing foundation for society news and cultural articles." className="px-0 py-0">
      <FeatureGrid
        features={blogPosts.map((post) => ({
          title: post.title,
          description: post.excerpt,
          meta: post.publishedAt
        }))}
      />
    </PageLayout>
  );
}
