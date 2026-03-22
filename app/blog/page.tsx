import { getAllPosts, getCategories } from "@/lib/blog";
import { GridSection } from "@/components/layout/grid-section";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogListing } from "@/components/blog/blog-listing";

export const metadata = {
  title: "Blog",
  description:
    "Thoughts on AI, design engineering, and building better software.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <>
      {/* Hero header */}
      <GridSection borderBottom>
        <BlogHero />
      </GridSection>

      {/* Category tabs + grid */}
      <GridSection borderBottom>
        <div className="pt-8">
          <BlogListing posts={posts} categories={categories} />
        </div>
      </GridSection>
    </>
  );
}
