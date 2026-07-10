import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Echos Scribes collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      subtitle="We respect your privacy. This policy explains what information we collect, how we use it, and your rights."
      lastUpdated="July 10, 2026"
      sections={[
        {
          title: "Introduction",
          content: (
            <p>
              Echos Scribes (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy explains what information we collect when you visit echoscribes.com, how we use that information, and the choices you have. By using our site, you agree to the practices described here.
            </p>
          ),
        },
        {
          title: "Information We Collect",
          content: (
            <>
              <p>
                <strong>Information you provide voluntarily:</strong> When you contact us via our contact form or subscribe to our newsletter, we collect your name and email address.
              </p>
              <p>
                <strong>Information collected automatically:</strong> When you visit our site, we may automatically collect your IP address, browser type, operating system, pages visited, time spent on pages, and referring URLs via analytics tools and cookies.
              </p>
            </>
          ),
        },
        {
          title: "How We Use Your Information",
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to inquiries and support requests</li>
              <li>To send newsletters and updates you have opted into</li>
              <li>To improve our content and website performance through analytics</li>
              <li>To comply with legal obligations</li>
            </ul>
          ),
        },
        {
          title: "Cookies and Tracking",
          content: (
            <p>
              We use cookies and similar technologies to understand how visitors use our site and to improve your experience. You can control cookies through your browser settings. Note that disabling cookies may affect some site functionality. See our{" "}
              <a href="/cookie-policy" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                Cookie Policy
              </a>{" "}
              for details.
            </p>
          ),
        },
        {
          title: "Third-Party Services",
          content: (
            <p>
              We may use third-party services such as web analytics providers (e.g., Google Analytics), email service providers, and affiliate networks. These providers may collect data in accordance with their own privacy policies. We encourage you to review the privacy policies of any third-party service you interact with.
            </p>
          ),
        },
        {
          title: "Affiliate Links",
          content: (
            <p>
              Some pages on our site contain affiliate links. If you click these links and make a purchase, we may earn a commission. See our{" "}
              <a href="/affiliate-disclosure" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                Affiliate Disclosure
              </a>{" "}
              for full details. Affiliate relationships do not influence our editorial content.
            </p>
          ),
        },
        {
          title: "Data Security",
          content: (
            <p>
              We take reasonable technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of data transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          title: "Your Rights",
          content: (
            <p>
              Depending on your location, you may have the right to access, correct, or delete your personal data. To make a request, please contact us at{" "}
              <a href="mailto:admin@echosscribes.com" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                admin@echosscribes.com
              </a>
              . We will respond to verified requests within 30 days.
            </p>
          ),
        },
        {
          title: "Children&apos;s Privacy",
          content: (
            <p>
              Our site is not directed at children under the age of 13, and we do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
            </p>
          ),
        },
        {
          title: "Changes to This Policy",
          content: (
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this policy regularly.
            </p>
          ),
        },
        {
          title: "Contact Us",
          content: (
            <p>
              If you have questions, concerns, or requests related to this Privacy Policy, please email us at{" "}
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
