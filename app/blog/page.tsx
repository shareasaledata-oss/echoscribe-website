import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, CATEGORIES } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Articles & Guides",
  description: "Browse all articles, guides, and product reviews across home & garden, tools, electronics, and clothing.",
};

const POSTS_PER_PAGE = 9;

type SearchParams = Promise<{ category?: string; page?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { category, page } = await searchParams;
  const currentPage = parseInt(page ?? "1", 10);

  let posts = getAllPosts();

  if (category) {
    const match = CATEGORIES.find((c) => c.slug === category);
    if (match) {
      posts = posts.filter((p) =>
        p.category.toLowerCase().replace(/[^a-z]+/g, "-") === category ||
        p.category === match.label
      );
    }
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagePosts = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);
  const activeCategory = CATEGORIES.find((c) => c.slug === category);

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-12 md:py-16">
      {/* Header */}
      <header className="mb-12 text-center md:text-left">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
        >
          {activeCategory ? activeCategory.label : "Articles & Guides"}
        </h1>
        <p className="text-base md:text-lg max-w-2xl" style={{ color: "var(--color-on-surface-variant)" }}>
          {activeCategory
            ? activeCategory.description
            : "Browse our curated collection of articles, in-depth guides, and honest product reviews."}
        </p>
      </header>

      {/* Category filter pills */}
      <nav
        className="flex flex-wrap gap-3 mb-12"
        aria-label="Filter by category"
      >
        <Link
          href="/blog"
          className="px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all"
          style={
            !category
              ? { backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }
              : { backgroundColor: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }
          }
        >
          All Posts
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog?category=${cat.slug}`}
            className="px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all"
            style={
              category === cat.slug
                ? { backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }
                : { backgroundColor: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }
            }
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      {/* Posts grid */}
      {pagePosts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-xl" style={{ color: "var(--color-on-surface-variant)" }}>No posts found in this category yet.</p>
          <Link
            href="/blog"
            className="mt-6 inline-flex px-8 py-3 rounded-full text-sm font-bold"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
          >
            View All Posts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pagePosts.map((post) => (
            <article key={post.slug} className="group bg-white rounded-3xl overflow-hidden editorial-shadow flex flex-col">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.featuredImage || '/images/blog-placeholder.jpg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    {post.category}
                  </div>
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-1 space-y-3">
                <div
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  {post.readTime && (
                    <>
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-outline-variant)" }} aria-hidden="true" />
                      <span>{post.readTime}</span>
                    </>
                  )}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2
                    className="text-lg font-semibold leading-snug group-hover:text-[var(--color-primary)] transition-colors"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                  >
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: "var(--color-on-surface-variant)" }}>
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide mt-2 transition-all hover:gap-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  Read Article
                  <span style={{ fontFamily: "Material Symbols Outlined", fontSize: "14px" }} aria-hidden="true">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center items-center gap-3 mt-14" aria-label="Pagination">
          {currentPage > 1 && (
            <Link
              href={`/blog?${category ? `category=${category}&` : ""}page=${currentPage - 1}`}
              className="px-5 py-2 rounded-full text-sm font-semibold border transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent"
              style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface)" }}
            >
              ← Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/blog?${category ? `category=${category}&` : ""}page=${p}`}
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
              style={
                p === currentPage
                  ? { backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }
                  : { backgroundColor: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }
              }
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={`/blog?${category ? `category=${category}&` : ""}page=${currentPage + 1}`}
              className="px-5 py-2 rounded-full text-sm font-semibold border transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent"
              style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface)" }}
            >
              Next →
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
