import "server-only";
import fs from "fs";
import path from "path";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

// Re-export client-safe types and utils
export type { BlogCategory, BlogPost, BlogPostWithHtml } from "./blog-shared";
export { formatDate } from "./blog-shared";

import type { BlogCategory, BlogPost, BlogPostWithHtml } from "./blog-shared";

// ─── Constants ───

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const HERO_DIR = path.join(process.cwd(), "public", "hero");

const AUTHOR = {
  name: "Antonio Sumak",
  role: "Software Engineer & Writer",
  avatar: "/antonio.png",
};

// ─── Category Inference ───

const CATEGORY_PATTERNS: Record<BlogCategory, RegExp[]> = {
  "AI & Agents": [
    /\bai\b/i,
    /\bagent/i,
    /\bclaude/i,
    /\bgpt/i,
    /\bllm/i,
    /\bmachine learning/i,
    /\bagentic/i,
  ],
  Design: [
    /\bdesign/i,
    /\btypography/i,
    /\bui\b/i,
    /\bux\b/i,
    /\bvisual/i,
    /\bhomepage/i,
    /\bwebsite\b/i,
    /\bweb design/i,
  ],
  Development: [
    /\bcoding/i,
    /\bdevelop/i,
    /\bcodebase/i,
    /\bworkflow/i,
    /\bengineering/i,
    /\btechnical debt/i,
    /\bcomprehension/i,
  ],
  Tools: [
    /\btool/i,
    /\bcursor/i,
    /\bcopilot/i,
    /\bide\b/i,
    /\bplugin/i,
    /\bskill/i,
    /\bmcp\b/i,
  ],
  Strategy: [
    /\bstrategy/i,
    /\bbusiness/i,
    /\bproductivity/i,
    /\beval/i,
    /\bmetric/i,
    /\bconversion/i,
  ],
  All: [],
};

function inferCategory(
  targetKeyword: string,
  secondaryKeywords: string[]
): BlogCategory {
  const text = [targetKeyword, ...secondaryKeywords].join(" ");
  const scores: Record<string, number> = {};

  for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    if (category === "All") continue;
    scores[category] = patterns.reduce(
      (score, pattern) => score + (pattern.test(text) ? 1 : 0),
      0
    );
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return (best && best[1] > 0 ? best[0] : "Development") as BlogCategory;
}

// ─── Markdown Parsing ───

function parseMarkdownMeta(raw: string): {
  title: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  wordCountTarget: number;
  description: string;
  content: string;
} {
  const lines = raw.split("\n");

  const titleLine = lines.find((l) => l.startsWith("# "));
  const title = titleLine ? titleLine.replace(/^# /, "").trim() : "Untitled";

  const targetKeywordLine = lines.find((l) =>
    l.startsWith("## Target Keyword:")
  );
  const targetKeyword = targetKeywordLine
    ? targetKeywordLine.replace("## Target Keyword:", "").trim()
    : "";

  const secondaryLine = lines.find((l) =>
    l.startsWith("## Secondary Keywords:")
  );
  const secondaryKeywords = secondaryLine
    ? secondaryLine
        .replace("## Secondary Keywords:", "")
        .trim()
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  const wordCountLine = lines.find((l) =>
    l.startsWith("## Word Count Target:")
  );
  const wordCountTarget = wordCountLine
    ? parseInt(wordCountLine.replace("## Word Count Target:", "").trim(), 10)
    : 1000;

  let contentStart = 0;
  let hrCount = 0;
  let inMetaDescription = false;
  const descriptionLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "---") {
      hrCount++;
      if (inMetaDescription) {
        inMetaDescription = false;
        contentStart = i + 1;
        break;
      }
      continue;
    }

    if (hrCount === 1 && line === "## Meta Description") {
      inMetaDescription = true;
      continue;
    }

    if (inMetaDescription && line) {
      descriptionLines.push(line);
    }
  }

  const description = descriptionLines.join(" ");
  const content = lines.slice(contentStart).join("\n").trim();

  return {
    title,
    targetKeyword,
    secondaryKeywords,
    wordCountTarget,
    description,
    content,
  };
}

// ─── Public API ───

export function getAuthor() {
  return AUTHOR;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const meta = parseMarkdownMeta(raw);
    const stats = readingTime(meta.content);
    const category = inferCategory(meta.targetKeyword, meta.secondaryKeywords);
    const stat = fs.statSync(path.join(BLOG_DIR, file));

    const heroPng = path.join(HERO_DIR, `${slug}.png`);
    const heroImage = fs.existsSync(heroPng) ? `/hero/${slug}.png` : null;

    return {
      slug,
      title: meta.title,
      description: meta.description,
      targetKeyword: meta.targetKeyword,
      secondaryKeywords: meta.secondaryKeywords,
      wordCountTarget: meta.wordCountTarget,
      category,
      readingTime: stats.text,
      publishedAt: stat.mtime.toISOString().split("T")[0],
      content: meta.content,
      heroImage,
    } satisfies BlogPost;
  });

  // Assign deterministic dates: alphabetical order, then spread backwards from today
  posts.sort((a, b) => a.title.localeCompare(b.title));
  const today = new Date("2026-03-22");
  posts.forEach((post, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i * 2);
    post.publishedAt = date.toISOString().split("T")[0];
  });

  // Default: latest first
  posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const meta = parseMarkdownMeta(raw);
  const stats = readingTime(meta.content);
  const category = inferCategory(meta.targetKeyword, meta.secondaryKeywords);

  const allPosts = getAllPosts();
  const matchedPost = allPosts.find((p) => p.slug === slug);

  const heroPng = path.join(HERO_DIR, `${slug}.png`);
  const heroImage = fs.existsSync(heroPng) ? `/hero/${slug}.png` : null;

  return {
    slug,
    title: meta.title,
    description: meta.description,
    targetKeyword: meta.targetKeyword,
    secondaryKeywords: meta.secondaryKeywords,
    wordCountTarget: meta.wordCountTarget,
    category,
    readingTime: stats.text,
    publishedAt: matchedPost?.publishedAt ?? "2026-03-22",
    content: meta.content,
    heroImage,
  };
}

export async function renderMarkdown(content: string): Promise<{
  html: string;
  headings: { id: string; text: string; level: number }[];
}> {
  const headings: { id: string; text: string; level: number }[] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }

  let processedContent = content;
  for (const heading of headings) {
    const headingPattern = new RegExp(
      `^(#{${heading.level}})\\s+${escapeRegExp(heading.text)}$`,
      "m"
    );
    processedContent = processedContent.replace(
      headingPattern,
      `$1 <a id="${heading.id}"></a>${heading.text}`
    );
  }

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedContent);

  return {
    html: String(result),
    headings,
  };
}

export async function getPostWithHtml(
  slug: string
): Promise<BlogPostWithHtml | null> {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const { html, headings } = await renderMarkdown(post.content);

  return {
    ...post,
    htmlContent: html,
    headings,
  };
}

export function getRelatedPosts(currentSlug: string, count = 4): BlogPost[] {
  const allPosts = getAllPosts();
  const current = allPosts.find((p) => p.slug === currentSlug);
  if (!current) return allPosts.slice(0, count);

  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      let score = 0;
      if (post.category === current.category) score += 3;

      const currentKeywords = [
        current.targetKeyword,
        ...current.secondaryKeywords,
      ];
      const postKeywords = [post.targetKeyword, ...post.secondaryKeywords];
      for (const kw of currentKeywords) {
        if (
          postKeywords.some((pk) =>
            pk.toLowerCase().includes(kw.toLowerCase())
          )
        ) {
          score += 1;
        }
      }

      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.post);
}

export function getCategories(): BlogCategory[] {
  return ["All", "AI & Agents", "Design", "Development", "Tools", "Strategy"];
}

// ─── Helpers ───

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
