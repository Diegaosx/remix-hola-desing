import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { getAllPosts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.baseUrl;
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/marcas',
    '/como-trabalhamos',
    '/sobre',
    '/blog',
    '/contato',
  ].map((p) => ({
    url: new URL(p, base).toString(),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '/' ? 1 : 0.8,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, base).toString(),
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts];
}
