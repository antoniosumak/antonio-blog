import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/blog-shared";

interface PostHeaderProps {
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: string;
}

export function PostHeader({
  title,
  description,
  category,
  publishedAt,
  readingTime,
}: PostHeaderProps) {
  return (
    <div className="mx-auto max-w-[var(--max-width-narrow)] px-6 pt-16 pb-12 sm:px-12">
      {/* Category + Date */}
      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className="rounded-lg border-grid-border bg-surface px-4 py-1.5 text-sm font-medium text-text-muted"
        >
          {category}
        </Badge>
        <span className="text-sm text-text-muted/50">&middot;</span>
        <time className="text-sm text-text-muted">
          {formatDate(publishedAt)}
        </time>
        <span className="text-sm text-text-muted/50">&middot;</span>
        <span className="text-sm text-text-muted">{readingTime}</span>
      </div>

      {/* Title */}
      <h1 className="mt-6 font-heading text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[36px] sm:leading-[1.25]">
        {title}
      </h1>

      {/* Description */}
      <p className="mt-4 text-lg leading-relaxed text-text-muted">
        {description}
      </p>
    </div>
  );
}
