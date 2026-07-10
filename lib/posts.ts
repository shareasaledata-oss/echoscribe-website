import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  readTime?: string;
};

export type Post = PostFrontmatter & {
  content: string;
};

export function getAllPosts(): PostFrontmatter[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith(".mdx"))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      return data as PostFrontmatter;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostsByCategory(category: string): PostFrontmatter[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...(data as PostFrontmatter), content };
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export const CATEGORIES = [
  {
    slug: "home-garden",
    label: "Home & Garden",
    icon: "home_max",
    description: "Interior design, gardening, and home improvement",
  },
  {
    slug: "tools-smart-machines",
    label: "Tools & Smart Machines",
    icon: "construction",
    description: "Power tools, smart home gadgets, and automation",
  },
  {
    slug: "computer-electronics",
    label: "Computer & Electronics",
    icon: "laptop_mac",
    description: "Laptops, smartphones, audio, and accessories",
  },
  {
    slug: "clothing-accessories",
    label: "Clothing & Accessories",
    icon: "checkroom",
    description: "Fashion, style, and personal accessories",
  },
];
