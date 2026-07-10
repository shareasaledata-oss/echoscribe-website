"use client";

import { useState } from "react";

type Variant = "sidebar" | "band";

export default function NewsletterForm({ variant = "band" }: { variant?: Variant }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: Connect to email service (Mailchimp, ConvertKit, Resend, etc.)
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <p className="text-sm font-semibold py-2" style={{ color: variant === "sidebar" ? "var(--color-on-primary-container)" : "var(--color-primary)" }}>
        ✓ You&apos;re subscribed! Check your inbox for a welcome email.
      </p>
    );
  }

  if (variant === "sidebar") {
    return (
      <form onSubmit={handleSubmit} className="space-y-3 pt-1" aria-label="Newsletter signup">
        <input
          type="email"
          placeholder="Your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 border"
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderColor: "rgba(255,255,255,0.3)",
            color: "var(--color-on-primary-container)",
          }}
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-xl text-sm font-bold transition-colors hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: "white", color: "var(--color-primary)" }}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe Now"}
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 pt-2"
      aria-label="Newsletter signup band"
    >
      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full px-6 py-3 text-sm border focus:outline-none focus:ring-2"
        style={{
          backgroundColor: "white",
          borderColor: "var(--color-outline-variant)",
          color: "var(--color-on-surface)",
        }}
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all hover:opacity-90 whitespace-nowrap disabled:opacity-60"
        style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
      >
        {status === "loading" ? "Subscribing..." : "Subscribe Free"}
      </button>
    </form>
  );
}
