import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import { getAllPosts, getPostBySlug } from '@/lib/content';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildMetadata({ noIndex: true });
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.image?.src,
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <SiteNav active="journal" tone="surface-low" />
      <Script
        id={`ld-article-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.description,
              slug: post.slug,
              publishedAt: post.publishedAt,
              image: post.image?.src,
            }),
          ),
        }}
      />
      <Script
        id={`ld-breadcrumb-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Journal', url: '/blog' },
              { name: post.title, url: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />
      <main id="main" className="pt-32 bg-background">
        <article className="px-6 md:px-12 pb-32 max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 manrope-label text-white/40">
            <Link href="/blog" className="hover:text-white focus-ring">
              ← Journal
            </Link>
          </nav>
          <header className="mb-16">
            <span className="manrope-label text-primary italic">
              {post.category} • {post.readingTime}
            </span>
            <h1 className="baskerville italic text-4xl md:text-7xl text-white mt-6 leading-[1.05]">
              {post.title}
            </h1>
            <p className="font-body font-light text-white/60 text-lg mt-8 max-w-2xl leading-relaxed">
              {post.description}
            </p>
          </header>
          {post.image && (
            <div className="relative aspect-[16/9] bg-surface-container-high mb-16 overflow-hidden">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="prose prose-invert max-w-none prose-headings:baskerville prose-headings:italic prose-headings:text-white prose-p:font-body prose-p:font-light prose-p:text-white/70 prose-p:leading-relaxed prose-a:text-primary">
            <MDXRemote source={post.body} />
          </div>
        </article>
      </main>
      <SiteFooter tone="primary" accentWord="Journal" />
    </>
  );
}
