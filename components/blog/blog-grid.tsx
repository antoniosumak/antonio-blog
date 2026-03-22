import type { BlogPost } from "@/lib/blog-shared";
import { BlogCard } from "./blog-card";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-6 py-20">
        <p className="text-center text-sm text-text-muted">
          No posts found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {posts.map((post, i) => {
        const isFirstRow = i < 3;
        const isLastInRow = (i + 1) % 3 === 0;

        return (
          <div
            key={post.slug}
            className={[
              !isLastInRow ? "md:border-r md:border-r-grid-border" : "",
              !isFirstRow ? "border-t border-t-grid-border" : "",
              i > 0 ? "max-md:border-t max-md:border-t-grid-border" : "",
            ].join(" ")}
          >
            <BlogCard post={post} index={i} />
          </div>
        );
      })}
    </div>
  );
}
