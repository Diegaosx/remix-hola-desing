import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { buildMetadata } from '@/lib/seo';
import { getAllPosts, getFeaturedPost } from '@/lib/content';
import { NewsletterForm } from '@/components/blog/newsletter-form';

export const metadata: Metadata = buildMetadata({
  title: 'Journal — Pensamento crítico & curadoria visual',
  description:
    'Ensaios editoriais sobre estratégia, design e cultura de marcas premium. Curadoria quinzenal.',
  path: '/blog',
});

export const dynamic = 'force-static';

function formatShortDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d
      .toLocaleDateString('pt-BR', { month: 'short', day: '2-digit' })
      .replace('.', '')
      .toUpperCase();
  } catch {
    return iso;
  }
}

export default function BlogPage() {
  const all = getAllPosts();
  const featured = getFeaturedPost();
  const rest = all.filter((p) => p.slug !== featured?.slug);
  const secondary = rest.slice(0, 3);
  const archive = rest.slice(3);

  return (
    <>
      <SiteNav active="journal" tone="surface-low" />
      <main id="main" className="pt-32 pb-24 bg-background">
        <section className="px-6 md:px-12 mb-20 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <h1 className="baskerville italic text-5xl md:text-[7rem] leading-[0.9] text-white">
              Pensamento Crítico &amp; Curadoria Visual.
            </h1>
          </div>
          <div className="col-span-12 md:col-start-9 md:col-span-4 flex flex-col justify-end pb-4">
            <div className="flex gap-6 manrope-label text-white/40">
              <span className="text-white border-b border-white/40 pb-1">Todos</span>
              <span>Estratégia</span>
              <span>Design</span>
              <span>Mercado</span>
            </div>
          </div>
        </section>

        {featured && (
          <section className="px-6 md:px-12 mb-24 md:mb-32">
            <Link
              href={`/blog/${featured.slug}`}
              className="relative group cursor-pointer overflow-hidden bg-surface-container block focus-ring"
            >
              <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-7 h-[420px] md:h-[716px] relative overflow-hidden">
                  {featured.image && (
                    <Image
                      src={featured.image.src}
                      alt={featured.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority
                    />
                  )}
                </div>
                <div className="col-span-12 md:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-primary-container">
                  <span className="manrope-label text-on-primary-container mb-6 italic">
                    {featured.category} • {featured.readingTime}
                  </span>
                  <h2 className="baskerville text-3xl md:text-6xl text-white mb-8 leading-tight italic">
                    {featured.title}
                  </h2>
                  <p className="font-body font-light text-lg text-white/60 leading-relaxed mb-10 max-w-md">
                    {featured.description}
                  </p>
                  <div
                    aria-hidden="true"
                    className="w-12 h-px bg-white/20 group-hover:w-24 transition-all duration-500"
                  />
                </div>
              </div>
            </Link>
          </section>
        )}

        <section className="px-6 md:px-12 mb-24 md:mb-32">
          <ul className="grid grid-cols-12 gap-12 md:gap-16">
            {secondary.map((p, i) => (
              <li
                key={p.slug}
                className={`col-span-12 md:col-span-4 group ${i === 1 ? 'md:mt-24' : ''}`}
              >
                <Link href={`/blog/${p.slug}`} className="block focus-ring">
                  <div className="aspect-[4/5] bg-surface-container-high mb-8 overflow-hidden relative">
                    {p.image && (
                      <Image
                        src={p.image.src}
                        alt={p.image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                      />
                    )}
                  </div>
                  <span className="manrope-label text-white/30 mb-4 block">{p.category}</span>
                  <h3 className="baskerville text-2xl md:text-3xl text-white mb-4 italic">
                    {p.title}
                  </h3>
                  <div aria-hidden="true" className="w-full h-px bg-white/5 mt-6" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-6 md:px-12 mb-24 md:mb-32">
          <div className="bg-secondary-container p-10 md:p-20 flex flex-col items-center text-center">
            <span className="manrope-label text-on-secondary-container mb-8">
              The curated list
            </span>
            <h2 className="baskerville text-3xl md:text-7xl text-white mb-12 italic max-w-4xl">
              Receba nossa curadoria quinzenal sobre estratégia e estética.
            </h2>
            <NewsletterForm />
          </div>
        </section>

        {archive.length > 0 && (
          <section className="px-6 md:px-12 mb-40">
            <div className="grid grid-cols-12 border-t border-white/5 pt-20">
              <div className="col-span-12 md:col-span-3">
                <h4 className="manrope-label text-white/30">Archive 2024</h4>
              </div>
              <div className="col-span-12 md:col-span-9 space-y-12 md:space-y-16">
                {archive.map((p, i) => (
                  <div key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer focus-ring"
                    >
                      <div>
                        <span className="manrope-label text-primary mb-2 block">
                          {formatShortDate(p.publishedAt)}
                        </span>
                        <h3 className="baskerville text-2xl md:text-4xl text-white group-hover:italic transition-all">
                          {p.title}
                        </h3>
                      </div>
                      <span
                        aria-hidden="true"
                        className="text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all text-xl"
                      >
                        ↗
                      </span>
                    </Link>
                    {i < archive.length - 1 && (
                      <div aria-hidden="true" className="w-full h-px bg-white/5 mt-12 md:mt-16" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter tone="primary" accentWord="Journal" />
    </>
  );
}
