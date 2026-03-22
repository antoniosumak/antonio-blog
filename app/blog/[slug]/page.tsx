import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAllPosts,
  getPostWithHtml,
  getRelatedPosts,
  getAuthor,
} from "@/lib/blog";
import { GridSection } from "@/components/layout/grid-section";
import { PostHeader } from "@/components/blog/post-header";
import { PostContent } from "@/components/blog/post-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { RelatedPosts } from "@/components/blog/related-posts";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostWithHtml(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostWithHtml(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 4);
  const author = getAuthor();

  return (
    <>
      {/* Post header */}
      <GridSection borderBottom>
        <PostHeader
          title={post.title}
          description={post.description}
          category={post.category}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
        />
      </GridSection>

      {/* Content area */}
      <GridSection borderBottom={false}>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Article body */}
          <div className="col-span-1 border-b border-b-grid-border bg-surface md:col-span-2 md:border-b-0 md:border-r md:border-r-grid-border">
            {/* Hero image or gradient fallback */}
            {post.heroImage ? (
              <div className="aspect-[1200/630] w-full overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  width={1200}
                  height={630}
                  priority
                  className="size-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[1200/630] w-full bg-gradient-to-br from-stone-100 via-stone-50 to-neutral-50" />
            )}

            {/* Prose content */}
            <div className="px-6 py-10 sm:px-12">
              <PostContent htmlContent={post.htmlContent} />
            </div>

            {/* Related posts */}
            <div className="border-t border-t-grid-border px-6 py-10 sm:px-12">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden border-l border-l-grid-border bg-page p-6 md:block md:p-10">
            <div className="sticky top-16 flex flex-col gap-8 pb-8 pt-4">
              {/* Table of Contents */}
              <TableOfContents headings={post.headings} />

              {/* Author card */}
              <div className="flex flex-col gap-3">
                <h3 className="text-[13px] font-medium uppercase tracking-wider text-text-muted">
                  Written by
                </h3>
                <Link
                  href="/blog"
                  className="group flex items-center gap-3"
                >
                  <Image src="/antonio.png" alt={author.name} width={36} height={36} quality={100} className="size-9 shrink-0 rounded-full ring-2 ring-surface object-cover transition-[filter] duration-150 group-hover:brightness-[0.92]" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {author.name}
                    </p>
                    <p className="text-[12px] text-text-muted">{author.role}</p>
                  </div>
                </Link>
              </div>

              {/* Tags */}
              {post.secondaryKeywords.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-[13px] font-medium uppercase tracking-wider text-text-muted">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {post.secondaryKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="rounded-md border-grid-border bg-surface px-2.5 py-0.5 text-[11px] font-normal text-text-muted"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </GridSection>
    </>
  );
}
