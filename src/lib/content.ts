import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type PostFrontmatter = {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  featured?: boolean;
  image?: { src: string; alt: string };
};

export type Post = PostFrontmatter & { slug: string; body: string };

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

function readPostFile(file: string): Post {
  const slug = file.replace(/\.mdx$/, '');
  const full = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    body: content,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    category: String(data.category ?? 'EDITORIAL'),
    readingTime: String(data.readingTime ?? '5 MIN READ'),
    publishedAt: String(data.publishedAt ?? new Date().toISOString().slice(0, 10)),
    featured: Boolean(data.featured ?? false),
    image: data.image
      ? { src: String(data.image.src), alt: String(data.image.alt) }
      : undefined,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(readPostFile)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const file = `${slug}.mdx`;
  const full = path.join(POSTS_DIR, file);
  if (!fs.existsSync(full)) return null;
  return readPostFile(file);
}

export function getFeaturedPost(): Post | null {
  return getAllPosts().find((p) => p.featured) ?? null;
}
