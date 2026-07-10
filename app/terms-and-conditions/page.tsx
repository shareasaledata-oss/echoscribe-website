import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of the Echos Scribes website.",
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using Echos Scribes."
      lastUpdated="July 10, 2026"
      sections={[
        {
          title: "Acceptance of Terms",
          content: (
            <p>
              By accessing and using Echos Scribes (echoscribes.com), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
            </p>
          ),
        },
        {
          title: "Use of Content",
          content: (
            <p>
              All content published on Echos Scribes is provided for informational and educational purposes only. You may read, share links to, and reference our content for personal, non-commercial use. You may not reproduce, distribute, republish, sell, or commercially exploit our content without prior written permission from Echos Scribes.
            </p>
          ),
        },
        {
          title: "Intellectual Property",
          content: (
            <p>
              All content on this website — including articles, photographs, graphics, logos, and design elements — is the intellectual property of Echos Scribes or its content contributors, unless otherwise stated. All rights are reserved.
            </p>
          ),
        },
        {
          title: "Disclaimer",
          content: (
            <p>
              Content on Echos Scribes is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. While we strive for accuracy, we make no guarantees about the completeness, reliability, or suitability of the information. You use the information at your own risk. We are not liable for decisions you make based on content on our site.
            </p>
          ),
        },
        {
          title: "External Links",
          content: (
            <p>
              Our site may contain links to third-party websites. These links are provided for your convenience. We are not responsible for the content, privacy practices, or accuracy of any third-party sites. Linking to an external site does not imply our endorsement.
            </p>
          ),
        },
        {
          title: "Affiliate Links",
          content: (
            <p>
              Our site contains affiliate links as described in detail in our{" "}
              <a href="/affiliate-disclosure" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                Affiliate Disclosure
              </a>
              . Affiliate commissions help support the operation of this site.
            </p>
          ),
        },
        {
          title: "Limitation of Liability",
          content: (
            <p>
              Echos Scribes, its owners, editors, and contributors shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from your use of this website or reliance on its content, including but not limited to purchasing decisions based on product recommendations.
            </p>
          ),
        },
        {
          title: "Changes to Terms",
          content: (
            <p>
              We reserve the right to update these Terms and Conditions at any time. Changes will be effective immediately upon posting to this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of the site after any changes constitutes your acceptance of the revised terms.
            </p>
          ),
        },
        {
          title: "Contact",
          content: (
            <p>
              If you have questions about these Terms and Conditions, please email us at{" "}
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
