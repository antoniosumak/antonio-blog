import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-cta-bg">
      <div className="mx-auto max-w-[var(--max-width-grid)] px-4 py-20 text-center sm:px-12 sm:py-28">
        <h2 className="font-heading text-3xl font-medium tracking-tight text-cta-foreground sm:text-5xl sm:leading-[1.1]">
          Let&apos;s build something
          <br />
          worth talking about
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base text-cta-foreground/60">
          Ideas on AI, design engineering, and crafting software that makes a
          difference.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/blog"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-grid-border bg-surface px-5 text-sm font-medium text-text-primary transition-colors hover:bg-surface/90"
          >
            Read the blog
          </Link>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-white/20 px-5 text-sm font-medium text-cta-foreground transition-colors hover:bg-white/30"
          >
            Follow along
          </a>
        </div>
      </div>
    </section>
  );
}
