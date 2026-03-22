import Link from "next/link";
import type { BlogPost } from "@/lib/blog-shared";

// Generate a deterministic gradient from the slug
function getGradient(slug: string): string {
  const gradients = [
    "from-amber-100 to-orange-50",
    "from-sky-100 to-blue-50",
    "from-violet-100 to-purple-50",
    "from-emerald-100 to-green-50",
    "from-rose-100 to-pink-50",
    "from-stone-200 to-stone-100",
    "from-teal-100 to-cyan-50",
    "from-fuchsia-100 to-pink-50",
  ];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div>
      <h3 className="mb-6 font-heading text-xl font-medium text-text-primary">
        Read more
      </h3>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4 sm:flex-row"
          >
            {/* Thumbnail */}
            <div
              className={`aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-grid-border bg-gradient-to-br ${getGradient(post.slug)} sm:w-[200px]`}
            />

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h4 className="font-heading text-base font-medium text-text-secondary transition-colors group-hover:text-text-primary line-clamp-2">
                {post.title}
              </h4>
              <p className="mt-1 text-sm text-text-muted line-clamp-2">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
