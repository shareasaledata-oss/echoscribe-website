import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How Echos Scribes uses affiliate links and how they affect our editorial independence.",
};

export default function AffiliateDisclosurePage() {
  return (
    <PolicyPage
      title="Affiliate Disclosure"
      lastUpdated="July 10, 2026"
      highlightBox={
        <p className="text-sm md:text-base font-semibold leading-relaxed">
          Some of the links on Echos Scribes are affiliate links. This means we may earn a small commission if you click through and make a purchase — at no additional cost to you. This helps support our work and keeps our content free.
        </p>
      }
      sections={[
        {
          title: "How Affiliate Links Work",
          content: (
            <p>
              When you click certain links on our site and proceed to buy a product or service, we may receive a commission from the retailer or affiliate network. This commission comes at no extra cost to you — the price you pay is exactly the same whether or not you use our link.
            </p>
          ),
        },
        {
          title: "Networks We Participate In",
          content: (
            <>
              <p>
                We may participate in affiliate programs including, but not limited to, the Amazon Associates program and other retail and technology affiliate networks.
              </p>
              <p>
                <strong>Amazon Associates Disclosure:</strong> Echos Scribes is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
              </p>
            </>
          ),
        },
        {
          title: "Our Editorial Independence",
          content: (
            <p>
              Affiliate relationships <strong>never</strong> dictate our editorial opinions or content. We recommend products based on genuine research, hands-on testing, and honest editorial judgment. Our reviews reflect our real assessment of a product&apos;s quality and value, regardless of whether we earn a commission from it.
            </p>
          ),
        },
        {
          title: "How to Identify Affiliate Content",
          content: (
            <p>
              We disclose the presence of affiliate links within relevant articles. You will typically see a note near the beginning of articles that contain affiliate links. Sponsored content, where it exists, is always labeled as such.
            </p>
          ),
        },
        {
          title: "Your Choices",
          content: (
            <p>
              You are never obligated to use our affiliate links. If you prefer, you can search for any product we recommend directly on the retailer&apos;s website. We appreciate your support when you choose to use our links, as it helps us continue producing high-quality, independent content.
            </p>
          ),
        },
        {
          title: "Questions",
          content: (
            <p>
              If you have any questions about our affiliate relationships or how they affect our content, please reach out at{" "}
              <a href="mailto:admin@echosscribes.com" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                admin@echosscribes.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
