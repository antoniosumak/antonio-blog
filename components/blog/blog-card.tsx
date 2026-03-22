import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog-shared";
import { formatDate } from "@/lib/blog-shared";

// Deterministic gradient from slug
function getGradient(slug: string): {
  bg: string;
  accent: string;
} {
  const palettes = [
    { bg: "from-amber-50 via-orange-50 to-yellow-50", accent: "text-amber-300/60" },
    { bg: "from-sky-50 via-blue-50 to-indigo-50", accent: "text-sky-300/60" },
    { bg: "from-violet-50 via-purple-50 to-fuchsia-50", accent: "text-violet-300/60" },
    { bg: "from-emerald-50 via-green-50 to-teal-50", accent: "text-emerald-300/60" },
    { bg: "from-rose-50 via-pink-50 to-red-50", accent: "text-rose-300/60" },
    { bg: "from-stone-100 via-stone-50 to-neutral-50", accent: "text-stone-300/60" },
    { bg: "from-teal-50 via-cyan-50 to-sky-50", accent: "text-teal-300/60" },
    { bg: "from-fuchsia-50 via-pink-50 to-rose-50", accent: "text-fuchsia-300/60" },
    { bg: "from-lime-50 via-green-50 to-emerald-50", accent: "text-lime-300/60" },
    { bg: "from-indigo-50 via-blue-50 to-violet-50", accent: "text-indigo-300/60" },
  ];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palettes[Math.abs(hash) % palettes.length];
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const palette = getGradient(post.slug);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col transition-colors duration-150 ease-out hover:bg-neutral-50"
    >
      {/* Hero image or gradient fallback */}
      <div
        className={`aspect-[1200/670] w-full overflow-hidden ${post.heroImage ? "" : `bg-gradient-to-br ${palette.bg} flex items-center justify-center`}`}
      >
        {post.heroImage ? (
          <Image
            src={post.heroImage}
            alt={post.title}
            width={1200}
            height={670}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <span
            className={`font-heading text-xl font-bold tracking-tight ${palette.accent} select-none`}
          >
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h2 className="font-heading text-lg font-bold leading-snug tracking-[-0.01em] text-text-primary line-clamp-2">
            {post.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-2">
            {post.description}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-2">
          <Image src="/antonio.png" alt="Antonio Sumak" width={32} height={32} quality={100} className="size-8 shrink-0 rounded-full ring-2 ring-surface object-cover transition-[filter] duration-150 group-hover:brightness-[0.92]" />
          <time className="text-sm text-text-muted">
            {formatDate(post.publishedAt)}
          </time>
          <span className="text-text-muted/30">&middot;</span>
          <span className="text-sm text-text-muted">
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
