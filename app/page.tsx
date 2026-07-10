import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, CATEGORIES } from "@/lib/posts";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Echos Scribes | Curated Lifestyle & Tech Journal",
  description:
    "A premium digital journal covering home & garden, tools, electronics, and clothing — where artisanal lifestyle meets forward-thinking technology.",
};

const categoryIcons: Record<string, string> = {
  "home-garden": "home_max",
  "tools-smart-machines": "construction",
  "computer-electronics": "laptop_mac",
  "clothing-accessories": "checkroom",
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPost = allPosts[0];
  const latestPosts = allPosts.slice(1, 7);
  const trendingPosts = allPosts.slice(0, 4);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden mb-20"
        style={{ backgroundColor: "var(--color-surface-container-low)", borderRadius: "0 0 2.5rem 2.5rem" }}
        aria-label="Featured article"
      >
        <div className="absolute inset-0 dot-pattern opacity-40" aria-hidden="true" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 px-6 md:px-8 py-12 lg:py-20 max-w-[1280px] mx-auto">
          {/* Text side */}
          <div className="space-y-5 order-2 lg:order-1">
            <span
              className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: "var(--color-primary-fixed)", color: "var(--color-on-primary-fixed-variant)" }}
            >
              {featuredPost?.category ?? "Featured"}
            </span>
            <h1
              className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}
            >
              {featuredPost?.title ?? "The Art of Slow Living in a Fast Digital World"}
            </h1>
            <div
              className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              <span>{featuredPost?.author ?? "Echos Scribes Team"}</span>
              <span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: "var(--color-outline-variant)" }}
                aria-hidden="true"
              />
              <span>{featuredPost ? new Date(featuredPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}</span>
              {featuredPost?.readTime && (
                <>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-outline-variant)" }} aria-hidden="true" />
                  <span>{featuredPost.readTime}</span>
                </>
              )}
            </div>
            <p
              className="text-base md:text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {featuredPost?.excerpt}
            </p>
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
              >
                Read Feature Article
                <span style={{ fontFamily: "Material Symbols Outlined", fontSize: "18px" }} aria-hidden="true">arrow_forward</span>
              </Link>
            )}
          </div>
          {/* Image side */}
          <div className="relative h-72 sm:h-96 lg:h-[500px] w-full order-1 lg:order-2">
            {featuredPost && (
              <Image
                src={featuredPost.featuredImage || '/images/blog-placeholder.jpg'}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover editorial-shadow"
                style={{ borderRadius: "2rem" }}
                priority
              />
            )}
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8">

        {/* ── Categories ── */}
        <section className="mb-20" aria-label="Browse categories">
          <div className="flex justify-between items-end mb-8">
            <h2
              className="text-2xl md:text-3xl font-semibold"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              Explore Categories
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide transition-all hover:gap-2"
              style={{ color: "var(--color-primary)" }}
            >
              View All
              <span style={{ fontFamily: "Material Symbols Outlined", fontSize: "16px" }} aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className="group bg-white p-6 md:p-8 rounded-3xl text-center editorial-shadow hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-[var(--color-primary-fixed)]"
                  style={{ backgroundColor: "var(--color-surface-container-low)" }}
                >
                  <span
                    style={{ fontFamily: "Material Symbols Outlined", fontSize: "28px", color: "var(--color-primary)" }}
                    aria-hidden="true"
                  >
                    {categoryIcons[cat.slug]}
                  </span>
                </div>
                <h3
                  className="text-base md:text-lg font-semibold mb-1 leading-snug"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  {cat.label}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Main content: Latest + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Latest posts */}
          <section className="lg:col-span-2" aria-label="Latest stories">
            <h2
              className="text-2xl md:text-3xl font-semibold mb-8"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              Latest Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {latestPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-3xl overflow-hidden editorial-shadow group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
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
                    <div className="p-5 space-y-3">
                      <div
                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        <span>{post.author}</span>
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-outline-variant)" }} aria-hidden="true" />
                        <span>{post.readTime ?? "5 min read"}</span>
                      </div>
                      <h3
                        className="text-lg font-semibold leading-snug group-hover:text-[var(--color-primary)] transition-colors"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--color-on-surface-variant)" }}>
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex px-10 py-3 rounded-full text-sm font-bold tracking-wide border-2 transition-all hover:text-white hover:bg-[var(--color-primary)]"
                style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
              >
                View All Articles
              </Link>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-10" aria-label="Trending posts and newsletter">
            {/* Trending */}
            <div
              className="p-6 md:p-8 rounded-3xl editorial-shadow"
              style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
            >
              <h3
                className="text-xl font-semibold mb-6 pb-4 border-b"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "var(--color-on-surface)",
                  borderColor: "var(--color-surface-variant)",
                }}
              >
                Trending Now
              </h3>
              <div className="space-y-6">
                {trendingPosts.map((post, i) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-4 group">
                    <div
                      className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: "var(--color-primary-fixed)", color: "var(--color-on-primary-fixed-variant)" }}
                    >
                      {i + 1}
                    </div>
                    <div className="space-y-1">
                      <h4
                        className="text-sm font-semibold leading-snug group-hover:text-[var(--color-primary)] transition-colors"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        {post.title}
                      </h4>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div
              className="p-6 md:p-8 rounded-3xl relative overflow-hidden"
              style={{ backgroundColor: "var(--color-primary-container)" }}
              id="newsletter"
            >
              <div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", filter: "blur(16px)" }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-4">
                <h3
                  className="text-xl font-semibold leading-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-primary-container)" }}
                >
                  Join the Inner Circle
                </h3>
                <p className="text-sm leading-relaxed opacity-90" style={{ color: "var(--color-on-primary-container)" }}>
                  Weekly curated insights on lifestyle, smart tech, and the art of living well.
                </p>
                <NewsletterForm variant="sidebar" />
                <p className="text-xs text-center italic opacity-60" style={{ color: "var(--color-on-primary-container)" }}>
                  No spam, ever.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Newsletter band (full-width) ── */}
        <section
          className="rounded-3xl p-8 md:p-14 mb-20 text-center dot-pattern relative overflow-hidden"
          style={{ backgroundColor: "var(--color-surface-container-low)" }}
          aria-label="Newsletter signup"
          id="newsletter-band"
        >
          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
            >
              Stay in the Know
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              Join thousands of readers who get our weekly roundup of the best articles, guides, and product reviews.
            </p>
            <NewsletterForm variant="band" />
          </div>
        </section>
      </div>
    </>
  );
}
