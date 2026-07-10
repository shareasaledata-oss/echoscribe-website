"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type GridPost = { slug: string; image: string };

const GRID_POSTS: GridPost[] = [
  { slug: "anti-stress-lifestyle-design-creating-a-balanced-and-peaceful-modern-life", image: "/images/blog/pexels-karola-g-5899096-scaled.jpg" },
  { slug: "automated-hydroponic-systems-the-future-of-smart-and-sustainable-farming", image: "/images/blog/pexels-shvetsa-5831012-scaled.jpg" },
  { slug: "backyard-farming-a-complete-guide-to-growing-food-and-living-sustainably-at-home", image: "/images/blog/pexels-helenalopes-27176761-scaled.jpg" },
  { slug: "best-cordless-drill-2026", image: "https://picsum.photos/seed/cordless-drill/600/600" },
  { slug: "best-indoor-air-purifying-plants-for-a-healthier-and-fresher-home", image: "/images/blog/pexels-elgolovchenko-11010505-scaled.jpg" },
  { slug: "best-laptops-2026", image: "https://picsum.photos/seed/laptop-2026/600/600" },
  { slug: "capsule-wardrobe-essentials", image: "https://picsum.photos/seed/capsule-wardrobe/600/600" },
  { slug: "cordless-garden-tools-the-smart-choice-for-modern-gardening", image: "/images/blog/pexels-anete-lusina-4792512-scaled.jpg" },
  { slug: "creative-garden-landscaping-ideas-for-a-beautiful-outdoor-space", image: "/images/blog/pexels-pichazapompy-12383803-scaled.jpg" },
  { slug: "diy-fashion-and-upcycling-transforming-old-clothes-into-trendy-sustainable-style", image: "/images/blog/pexels-jdgromov-8312017-scaled.jpg" },
  { slug: "fashion-accessories-styling-the-ultimate-guide-to-elevating-your-everyday-look", image: "/images/blog/pexels-kenzero14-21928749-scaled.jpg" },
  { slug: "fashion-for-short-height-styling-the-ultimate-guide-to-looking-stylish-and-confident", image: "/images/blog/pexels-shvetsa-5012039-scaled.jpg" },
  { slug: "home-energy-storage-systems-the-future-of-smart-efficient-and-independent-living", image: "/images/blog/pexels-pixabay-267391-scaled.jpg" },
  { slug: "home-spa-and-self-care-routines-the-ultimate-guide-to-relaxation-and-wellness-at-home", image: "/images/blog/pexels-ivan-s-4491158-scaled.jpg" },
  { slug: "indoor-sanctuary-guide", image: "https://picsum.photos/seed/indoor-plants/600/600" },
  { slug: "mind-body-balance-practices-a-complete-guide-to-yoga-meditation-and-holistic-wellness", image: "/images/blog/pexels-yankrukov-8436726-scaled.jpg" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ShuffleHero() {
  const [items, setItems] = useState<GridPost[]>(GRID_POSTS);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const id = setInterval(() => setItems((prev) => shuffle(prev)), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{ backgroundColor: "#FDEAE1" }}
      className="w-full"
    >
      <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left: text */}
        <div className="flex-1 space-y-6 order-2 lg:order-1">
          <p
            className="uppercase tracking-widest text-sm font-semibold"
            style={{ color: "#C9683A" }}
          >
            ECHOS SCRIBES
          </p>
          <h1
            className="font-bold text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#2A2320" }}
          >
            Real Reviews. Honest Guides.
            <br />
            Straight to the Point.
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "#2A2320", opacity: 0.8 }}
          >
            We test, research and write about home, tech, tools and style so you don&apos;t have to waste time figuring it out yourself.
          </p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="border rounded-full px-6 py-3 flex-1 bg-transparent focus:outline-none"
              style={{ borderColor: "#C9683A" }}
            />
            <button
              onClick={() => setEmail("")}
              className="rounded-full px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#C9683A" }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Right: shuffle grid */}
        <div className="flex-1 order-1 lg:order-2 w-full">
          <div
            className="grid gap-1 overflow-hidden rounded-2xl w-full"
            style={{ gridTemplateColumns: "repeat(4, 1fr)", height: "450px" }}
          >
            {items.map((item) => (
              <motion.div
                key={item.slug}
                layout
                transition={{ duration: 1.5, type: "spring" }}
                className="relative group overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 25vw, 12.5vw"
                  className="object-cover"
                />
                <Link
                  href={`/blog/${item.slug}`}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{ background: "rgba(0,0,0,0)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.6)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0)")}
                >
                  <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read More →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
