"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
        aria-label="Contact hero"
      >
        <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 py-20 text-center">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: "var(--color-primary-fixed)", color: "var(--color-on-primary-fixed-variant)" }}
          >
            Contact
          </span>
          <h1
            className="text-4xl md:text-5xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-on-surface)" }}
          >
            Get In Touch
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
            We would love to hear from you — whether it is a question, a collaboration idea, or feedback on our content.
          </p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <aside className="space-y-8 lg:col-span-1">
            <div
              className="p-8 rounded-3xl editorial-shadow"
              style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
            >
              <h2
                className="text-xl font-semibold mb-6"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Contact Information
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span
                    className="mt-0.5"
                    style={{ fontFamily: "Material Symbols Outlined", fontSize: "22px", color: "var(--color-primary)" }}
                    aria-hidden="true"
                  >
                    mail
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-on-surface)" }}>Email</p>
                    <a
                      href="mailto:admin@echosscribes.com"
                      className="text-sm transition-colors hover:underline"
                      style={{ color: "var(--color-primary)" }}
                    >
                      admin@echosscribes.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span
                    className="mt-0.5"
                    style={{ fontFamily: "Material Symbols Outlined", fontSize: "22px", color: "var(--color-primary)" }}
                    aria-hidden="true"
                  >
                    schedule
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-on-surface)" }}>Response Time</p>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      We typically respond within 1–2 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div
              className="p-8 rounded-3xl editorial-shadow"
              style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
            >
              <h2
                className="text-xl font-semibold mb-6"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Follow Us
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Instagram", icon: "photo_camera", href: "https://instagram.com" },
                  { label: "Facebook", icon: "thumb_up", href: "https://facebook.com" },
                  { label: "Pinterest", icon: "push_pin", href: "https://pinterest.com" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:opacity-80"
                    style={{ backgroundColor: "var(--color-surface-container-low)" }}
                  >
                    <span
                      style={{ fontFamily: "Material Symbols Outlined", fontSize: "20px", color: "var(--color-primary)" }}
                      aria-hidden="true"
                    >
                      {s.icon}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div
              className="p-8 md:p-10 rounded-3xl editorial-shadow"
              style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
            >
              <h2
                className="text-2xl font-semibold mb-8"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Send Us a Message
              </h2>

              {status === "success" ? (
                <div
                  className="flex flex-col items-center text-center py-12 space-y-4"
                >
                  <span
                    className="text-5xl"
                    style={{ fontFamily: "Material Symbols Outlined", color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  <h3
                    className="text-xl font-semibold"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--color-on-surface-variant)" }}>
                    Thank you for reaching out. We will get back to you within 1–2 business days.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2 rounded-full text-sm font-semibold mt-4"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold mb-2"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        Full Name <span aria-hidden="true" style={{ color: "var(--color-error)" }}>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: "var(--color-surface-container-low)",
                          borderColor: "var(--color-outline-variant)",
                          color: "var(--color-on-surface)",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold mb-2"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        Email Address <span aria-hidden="true" style={{ color: "var(--color-error)" }}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: "var(--color-surface-container-low)",
                          borderColor: "var(--color-outline-variant)",
                          color: "var(--color-on-surface)",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      Subject <span aria-hidden="true" style={{ color: "var(--color-error)" }}>*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="What is this about?"
                      className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "var(--color-surface-container-low)",
                        borderColor: "var(--color-outline-variant)",
                        color: "var(--color-on-surface)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      Message <span aria-hidden="true" style={{ color: "var(--color-error)" }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us what is on your mind..."
                      className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 transition-all resize-none"
                      style={{
                        backgroundColor: "var(--color-surface-container-low)",
                        borderColor: "var(--color-outline-variant)",
                        color: "var(--color-on-surface)",
                      }}
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-sm" style={{ color: "var(--color-error)" }}>
                      Something went wrong. Please try again or email us directly at admin@echosscribes.com.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto px-10 py-4 rounded-full text-sm font-bold tracking-wide transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
