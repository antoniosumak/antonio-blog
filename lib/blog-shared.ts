// Client-safe types and utilities — no Node.js dependencies

export type BlogCategory =
  | "All"
  | "AI & Agents"
  | "Design"
  | "Development"
  | "Tools"
  | "Strategy";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  wordCountTarget: number;
  category: BlogCategory;
  readingTime: string;
  publishedAt: string;
  content: string;
  heroImage: string | null;
}

export interface BlogPostWithHtml extends BlogPost {
  htmlContent: string;
  headings: { id: string; text: string; level: number }[];
}

export type BlogSortOption = "latest" | "oldest" | "a-z" | "z-a";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
