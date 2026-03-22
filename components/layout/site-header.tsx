"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/blog?category=AI+%26+Agents", label: "AI & Agents" },
  { href: "/blog?category=Design", label: "Design" },
  { href: "/blog?category=Development", label: "Development" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-100 bg-white/75 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-14 max-w-[var(--max-width-grid)] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/blog"
          className="font-heading text-[15px] font-extrabold tracking-tight text-text-primary transition-opacity hover:opacity-70"
        >
          antonio sumak
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-0.5 sm:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/blog"
                ? pathname === "/blog"
                : pathname === "/blog" &&
                  typeof window !== "undefined" &&
                  window.location.search.includes(
                    link.href.split("?")[1] || ""
                  );

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-100",
                  isActive
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu */}
        <button
          className="inline-flex size-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-secondary hover:text-text-primary sm:hidden"
          aria-label="Menu"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="2" y1="4" x2="13" y2="4" />
            <line x1="2" y1="7.5" x2="13" y2="7.5" />
            <line x1="2" y1="11" x2="13" y2="11" />
          </svg>
        </button>
      </div>
    </header>
  );
}
