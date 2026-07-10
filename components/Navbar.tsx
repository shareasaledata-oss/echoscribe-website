"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog?category=home-garden", label: "Home & Garden" },
  { href: "/blog?category=tools-smart-machines", label: "Tools & Smart Machines" },
  { href: "/blog?category=computer-electronics", label: "Computer & Electronics" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 glass-nav"
      style={{ backgroundColor: "color-mix(in srgb, var(--color-surface) 80%, transparent)" }}
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-[1280px] mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-3xl select-none"
            style={{ fontFamily: "Material Symbols Outlined", color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            eco
          </span>
          <span
            className="text-xl font-semibold"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
          >
            Echos Scribes
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-[var(--color-primary)]"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm"
            style={{ color: "var(--color-on-surface-variant)" }}
            aria-label="Search"
          >
            <span
              style={{ fontFamily: "Material Symbols Outlined", fontSize: "20px" }}
              aria-hidden="true"
            >
              search
            </span>
          </Link>
          <Link
            href="#newsletter"
            className="hidden md:inline-flex px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
          >
            Subscribe
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              style={{ fontFamily: "Material Symbols Outlined", color: "var(--color-on-surface-variant)" }}
            >
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t px-6 py-4 space-y-3"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-outline-variant)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-semibold tracking-wide transition-colors hover:text-[var(--color-primary)]"
              style={{ color: "var(--color-on-surface-variant)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#newsletter"
            className="block w-full text-center mt-2 px-5 py-2 rounded-full text-sm font-semibold"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            onClick={() => setMenuOpen(false)}
          >
            Subscribe
          </Link>
        </div>
      )}
    </nav>
  );
}
