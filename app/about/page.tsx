import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Echos Scribes — our mission, values, and the team behind the journal.",
};

const values = [
  {
    icon: "auto_stories",
    title: "Editorial Integrity",
    description:
      "Every article we publish is written with honesty and independence. Affiliate relationships never influence our editorial judgment.",
  },
  {
    icon: "verified",
    title: "Rigorous Research",
    description:
      "We test products and research topics thoroughly before writing. Our recommendations are based on genuine hands-on experience.",
  },
  {
    icon: "groups",
    title: "Community First",
    description:
      "We write for real people with real questions. Our goal is to be the trusted friend who has already done the research.",
  },
  {
    icon: "eco",
    title: "Thoughtful Living",
    description:
      "We believe good choices — in home, technology, and style — lead to a more intentional, fulfilling life.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
        aria-label="About us hero"
      >
        <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 py-20 md:py-28 text-center">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "var(--color-primary-fixed)", color: "var(--color-on-primary-fixed-variant)" }}
          >
            Our Story
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}
          >
            Where Craftsmanship Meets Curiosity
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Echos Scribes was founded on a simple belief: that informed choices — in the home, in technology, and in personal style — lead to a richer, more intentional life.
          </p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Mission */}
        <section className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2
              className="text-3xl md:text-4xl font-semibold leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
            >
              Our Mission
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              We created Echos Scribes to be the resource we wished existed — one that combines genuine expertise with clear, trustworthy writing. In a world of sponsored content and algorithmic noise, we are committed to editorial independence.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              Our team researches and tests the products we cover. When we recommend something, it is because we genuinely believe in it — not because someone paid us to say so. Where we earn commissions through affiliate links, we disclose this clearly.
            </p>
            <blockquote
              className="pl-6 border-l-4 italic text-lg"
              style={{ borderColor: "var(--color-primary)", color: "var(--color-on-surface-variant)" }}
            >
              "The most valuable thing we can offer our readers is honesty."
            </blockquote>
          </div>
          <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden editorial-shadow">
            <Image
              src="https://picsum.photos/seed/about-office/800/600"
              alt="The Echos Scribes editorial space"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Values */}
        <section className="pb-16 md:pb-24">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-12 text-center"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-8 rounded-3xl editorial-shadow"
                style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: "var(--color-primary-fixed)" }}
                >
                  <span
                    style={{ fontFamily: "Material Symbols Outlined", fontSize: "28px", color: "var(--color-primary)" }}
                    aria-hidden="true"
                  >
                    {v.icon}
                  </span>
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories we cover */}
        <section className="pb-16 md:pb-24">
          <div
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{ backgroundColor: "var(--color-surface-container-low)" }}
          >
            <h2
              className="text-2xl md:text-3xl font-semibold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
            >
              What We Cover
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
              Four core categories, chosen because they represent the spaces where most people make meaningful purchasing decisions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
              {[
                { label: "Home & Garden", icon: "home_max", href: "/blog?category=home-garden" },
                { label: "Tools & Smart Machines", icon: "construction", href: "/blog?category=tools-smart-machines" },
                { label: "Computer & Electronics", icon: "laptop_mac", href: "/blog?category=computer-electronics" },
                { label: "Clothing & Accessories", icon: "checkroom", href: "/blog?category=clothing-accessories" },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="flex flex-col items-center p-4 rounded-2xl gap-3 transition-all hover:-translate-y-1 text-center"
                  style={{ backgroundColor: "white" }}
                >
                  <span
                    style={{ fontFamily: "Material Symbols Outlined", fontSize: "28px", color: "var(--color-primary)" }}
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </span>
                  <span className="text-sm font-semibold leading-snug" style={{ color: "var(--color-on-surface)" }}>
                    {cat.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 text-center">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
          >
            Have a Question or Tip?
          </h2>
          <p className="text-base md:text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
            We love hearing from our readers — whether it is a product tip, an article idea, or just a hello.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
          >
            Get In Touch
            <span style={{ fontFamily: "Material Symbols Outlined", fontSize: "18px" }} aria-hidden="true">arrow_forward</span>
          </Link>
        </section>
      </div>
    </>
  );
}
