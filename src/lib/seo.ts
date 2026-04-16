import type { Metadata } from 'next';
import { site } from '@/content/site';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/images/og/default.jpg',
  noIndex = false,
}: BuildMetadataInput = {}): Metadata {
  const resolvedTitle = title ?? `${site.name} — ${site.tagline}`;
  const resolvedDescription = description ?? site.description;
  const url = new URL(path, site.baseUrl).toString();

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title: resolvedTitle,
      description: resolvedDescription,
      locale: site.locale,
      images: [{ url: image, width: 1200, height: 630, alt: resolvedTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.baseUrl,
    email: site.contact.email,
    foundingDate: String(site.founded),
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.country,
    },
    sameAs: site.social.map((s) => s.href),
    logo: new URL('/images/og/default.jpg', site.baseUrl).toString(),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.baseUrl,
    inLanguage: site.locale,
  };
}

export function articleJsonLd(args: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.title,
    description: args.description,
    datePublished: args.publishedAt,
    inLanguage: site.locale,
    url: new URL(`/blog/${args.slug}`, site.baseUrl).toString(),
    image: args.image ? new URL(args.image, site.baseUrl).toString() : undefined,
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: new URL('/images/og/default.jpg', site.baseUrl).toString(),
      },
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.url, site.baseUrl).toString(),
    })),
  };
}
