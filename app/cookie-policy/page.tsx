import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Echos Scribes uses cookies and similar tracking technologies.",
};

export default function CookiePolicyPage() {
  return (
    <PolicyPage
      title="Cookie Policy"
      subtitle="This policy explains how and why we use cookies on Echos Scribes."
      lastUpdated="July 10, 2026"
      sections={[
        {
          title: "What Are Cookies?",
          content: (
            <p>
              Cookies are small text files stored on your device (computer, phone, or tablet) when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners. Cookies do not directly identify you as a person, but they may allow us to recognize your browser or device.
            </p>
          ),
        },
        {
          title: "How We Use Cookies",
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>To ensure essential website functions work correctly</li>
              <li>To understand how visitors use our site through analytics</li>
              <li>To remember your preferences and settings</li>
              <li>To improve the overall user experience over time</li>
            </ul>
          ),
        },
        {
          title: "Types of Cookies We Use",
          content: (
            <>
              <p>
                <strong>Essential cookies:</strong> Required for the website to function. These cannot be disabled without affecting core site functionality.
              </p>
              <p>
                <strong>Analytics cookies:</strong> Used to collect anonymous data about how visitors navigate our site — pages visited, time on site, and traffic sources. This data helps us improve our content and user experience.
              </p>
              <p>
                <strong>Affiliate tracking cookies:</strong> When you click affiliate links on our site, the retailer or affiliate network may set tracking cookies to attribute any resulting purchase to our referral. See our{" "}
                <a href="/affiliate-disclosure" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                  Affiliate Disclosure
                </a>{" "}
                for more information.
              </p>
            </>
          ),
        },
        {
          title: "Managing Cookies",
          content: (
            <p>
              You can control and manage cookies through your browser settings. Most browsers allow you to refuse new cookies, delete existing cookies, or receive a warning before a cookie is stored. Please note that disabling certain cookies may affect the functionality of our website. Refer to your browser&apos;s help documentation for instructions on how to manage cookies.
            </p>
          ),
        },
        {
          title: "Third-Party Cookies",
          content: (
            <p>
              Third-party services we use — such as web analytics providers and affiliate networks — may set their own cookies on your device when you visit our site. These cookies are governed by the third party&apos;s privacy and cookie policies, not ours. We do not control these third-party cookies.
            </p>
          ),
        },
        {
          title: "Updates to This Policy",
          content: (
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology or our practices. The &ldquo;Last updated&rdquo; date at the top of this page will reflect the most recent revision.
            </p>
          ),
        },
        {
          title: "Contact",
          content: (
            <p>
              If you have questions about our use of cookies, please email us at{" "}
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
