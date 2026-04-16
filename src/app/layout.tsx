import type { Metadata, Viewport } from 'next';
import { Newsreader, Montserrat, Manrope } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import { site } from '@/content/site';
import { buildMetadata, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import { GrainOverlay } from '@/components/layout/grain-overlay';
import { SkipLink } from '@/components/layout/skip-link';

const headline = Newsreader({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-headline',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const body = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
  display: 'swap',
});

const label = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-label',
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#1d1233',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  ...buildMetadata(),
  applicationName: site.name,
  authors: [{ name: site.name, url: site.baseUrl }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={site.locale}
      className={`dark ${headline.variable} ${body.variable} ${label.variable}`}
    >
      <body className="bg-background text-on-surface selection:bg-primary selection:text-on-primary-fixed">
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <SkipLink />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
