import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.featuredImage ? { images: [{ url: post.featuredImage }] } : {}),
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="max-w-[1280px] mx-auto px-6 md:px-8 py-12 md:py-20">
      {/* Article header */}
      <header className="max-w-3xl mx-auto text-center mb-12">
        <span
          className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
        >
          {post.category}
        </span>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-8"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)", letterSpacing: "-0.01em" }}
        >
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: "var(--color-primary-fixed)", color: "var(--color-on-primary-fixed-variant)" }}
            aria-hidden="true"
          >
            ES
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
              By {post.author}
            </p>
            <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              {formattedDate}
              {post.readTime && ` • ${post.readTime}`}
            </p>
          </div>
        </div>
      </header>

      {/* Featured image */}
      <div className="w-full mb-14 px-0 md:px-8 lg:px-16">
        <div className="relative aspect-video rounded-3xl overflow-hidden editorial-shadow">
          <Image
            src={post.featuredImage || '/images/blog-placeholder.jpg'}
            alt={post.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto">
        {/* Affiliate disclosure */}
        <div
          className="flex items-start gap-3 p-5 rounded-xl border mb-10"
          style={{
            backgroundColor: "var(--color-surface-container-low)",
            borderColor: "var(--color-outline-variant)",
          }}
        >
          <span
            style={{ fontFamily: "Material Symbols Outlined", color: "var(--color-tertiary)", fontSize: "20px", flexShrink: 0 }}
            aria-hidden="true"
          >
            info
          </span>
          <p className="text-sm italic leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
            This article may contain affiliate links. If you purchase through them, we may earn a small commission at no extra cost to you.{" "}
            <Link href="/affiliate-disclosure" style={{ color: "var(--color-primary)" }}>
              Learn more.
            </Link>
          </p>
        </div>

        {/* MDX Content */}
        <div className="prose-article">
          <MDXRemote source={post.content} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t" style={{ borderColor: "var(--color-outline-variant)" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                style={{ backgroundColor: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share / back */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-10 pt-8 border-t" style={{ borderColor: "var(--color-outline-variant)" }}>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
            style={{ color: "var(--color-primary)" }}
          >
            <span style={{ fontFamily: "Material Symbols Outlined", fontSize: "16px" }} aria-hidden="true">arrow_back</span>
            Back to Articles
          </Link>
          <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>
            By {post.author}
          </p>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-20" aria-label="Related articles">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-8"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
          >
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <article key={rel.slug} className="group bg-white rounded-3xl overflow-hidden editorial-shadow">
                <Link href={`/blog/${rel.slug}`}>
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={rel.featuredImage || '/images/blog-placeholder.jpg'}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {rel.category}
                    </span>
                    <h3
                      className="text-base font-semibold leading-snug group-hover:text-[var(--color-primary)] transition-colors"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      {rel.title}
                    </h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
