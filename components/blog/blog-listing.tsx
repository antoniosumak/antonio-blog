"use client";

import { useState, useMemo } from "react";
import type { BlogPost, BlogCategory, BlogSortOption } from "@/lib/blog-shared";
import { CategoryTabs } from "./category-tabs";
import { BlogGrid } from "./blog-grid";

const SORT_OPTIONS: { value: BlogSortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "a-z", label: "A → Z" },
  { value: "z-a", label: "Z → A" },
];

function sortPosts(posts: BlogPost[], sort: BlogSortOption): BlogPost[] {
  const sorted = [...posts];
  switch (sort) {
    case "latest":
      return sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    case "oldest":
      return sorted.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
    case "a-z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "z-a":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
  }
}

interface BlogListingProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  initialCategory?: BlogCategory;
}

export function BlogListing({
  posts,
  categories,
  initialCategory = "AI & Agents",
}: BlogListingProps) {
  const [activeCategory, setActiveCategory] =
    useState<BlogCategory>(initialCategory);
  const [sort, setSort] = useState<BlogSortOption>("latest");

  const filteredPosts = useMemo(() => {
    const byCategory =
      activeCategory === "All"
        ? posts
        : posts.filter((p) => p.category === activeCategory);
    return sortPosts(byCategory, sort);
  }, [posts, activeCategory, sort]);

  return (
    <>
      {/* Category tabs + sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 pb-8 sm:px-12">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as BlogSortOption)}
          className="h-9 cursor-pointer rounded-lg border border-grid-border bg-surface px-3 text-sm text-text-secondary outline-none transition-colors hover:border-text-muted focus:border-text-muted"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Post grid */}
      <BlogGrid posts={filteredPosts} />
    </>
  );
}
