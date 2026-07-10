import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Large 404 */}
      <div className="relative mb-8 select-none" aria-hidden="true">
        <span
          className="text-[8rem] md:text-[12rem] font-bold leading-none opacity-10"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
        >
          404
        </span>
      </div>

      <span
        className="text-5xl md:text-6xl mb-6"
        style={{ fontFamily: "Material Symbols Outlined", color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
        aria-hidden="true"
      >
        search_off
      </span>

      <h1
        className="text-3xl md:text-4xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
      >
        Page Not Found
      </h1>
      <p
        className="text-base md:text-lg mb-10 max-w-md leading-relaxed"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        The page you are looking for may have been moved, deleted, or never existed. Let us help you find your way.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="px-8 py-4 rounded-full text-sm font-bold tracking-wide border-2 transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent"
          style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
        >
          Browse Articles
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-14">
        <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-outline)" }}>
          Popular Sections
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { href: "/blog?category=home-garden", label: "Home & Garden" },
            { href: "/blog?category=computer-electronics", label: "Electronics" },
            { href: "/blog?category=tools-smart-machines", label: "Tools" },
            { href: "/blog?category=clothing-accessories", label: "Clothing" },
            { href: "/about", label: "About Us" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all hover:opacity-80"
              style={{ backgroundColor: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
