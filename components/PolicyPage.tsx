import Link from "next/link";

type Section = {
  title: string;
  content: React.ReactNode;
};

type Props = {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  highlightBox?: React.ReactNode;
  sections: Section[];
};

export default function PolicyPage({ title, subtitle, lastUpdated, highlightBox, sections }: Props) {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
        aria-label={`${title} header`}
      >
        <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24 text-center">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
              {subtitle}
            </p>
          )}
          <p className="text-sm" style={{ color: "var(--color-outline)" }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Highlight box */}
        {highlightBox && (
          <div
            className="p-6 rounded-2xl border mb-10"
            style={{
              backgroundColor: "var(--color-primary-fixed)",
              borderColor: "var(--color-primary-fixed-dim)",
              color: "var(--color-on-primary-fixed-variant)",
            }}
          >
            {highlightBox}
          </div>
        )}

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2
                className="text-xl md:text-2xl font-semibold mb-4"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                {section.title}
              </h2>
              <div
                className="text-base leading-relaxed space-y-3"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div
          className="mt-14 pt-8 border-t flex flex-wrap gap-4"
          style={{ borderColor: "var(--color-outline-variant)" }}
        >
          <p className="text-sm w-full" style={{ color: "var(--color-outline)" }}>
            Questions? Email us at{" "}
            <a href="mailto:admin@echosscribes.com" className="hover:underline" style={{ color: "var(--color-primary)" }}>
              admin@echosscribes.com
            </a>
          </p>
          <Link href="/" className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
