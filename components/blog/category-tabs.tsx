"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import type { BlogCategory } from "@/lib/blog-shared";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: BlogCategory[];
  activeCategory: BlogCategory;
  onCategoryChange: (category: BlogCategory) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const updatePill = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeButton = container.querySelector<HTMLButtonElement>(
      `[data-category="${CSS.escape(activeCategory)}"]`
    );
    if (!activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    setPillStyle({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
    });
  }, [activeCategory]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex flex-wrap items-center gap-x-0.5 gap-y-2"
    >
      {/* Animated pill background */}
      {pillStyle.width > 0 && (
        <motion.div
          className="absolute z-0 rounded-lg bg-primary"
          animate={{
            left: pillStyle.left,
            width: pillStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
          }}
          style={{ height: "calc(100%)", top: 0 }}
          layoutId="category-pill"
        />
      )}

      {categories.map((category) => (
        <button
          key={category}
          data-category={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "relative z-10 cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition-colors duration-150",
            activeCategory === category
              ? "text-primary-foreground"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
