"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <h3 className="mb-4 text-sm text-gray-500">
        On this page
      </h3>
      <ul className="flex max-h-[58vh] flex-col gap-2 overflow-y-auto border-l border-grid-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block border-l-2 py-0.5 pl-4 text-base leading-snug transition-colors duration-100",
                heading.level === 3 && "pl-6",
                activeId === heading.id
                  ? "border-text-primary font-medium text-text-primary"
                  : "border-transparent text-text-muted hover:text-text-secondary"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
