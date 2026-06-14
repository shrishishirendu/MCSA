import { blogPosts } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function BlogPage() {
  return (
    <PageLayout
      title="Blog"
      eyebrow="Stories and updates"
      description="A publishing foundation for cultural articles, community updates and society news."
    >
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
