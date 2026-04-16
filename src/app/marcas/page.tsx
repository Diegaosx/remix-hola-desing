import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { PortfolioGrid } from '@/components/marcas/portfolio-grid';
import { buildMetadata } from '@/lib/seo';
import { projects } from '@/content/projects';

export const metadata: Metadata = buildMetadata({
  title: 'Portfólio — Marcas que transformaram negócios',
  description:
    'Projetos de branding editorial para marcas que querem sair do template. Estratégia, identidade visual e rebranding com narrativa própria.',
  path: '/marcas',
});

export const dynamic = 'force-static';

export default function MarcasPage() {
  return (
    <>
      <SiteNav active="portfolio" tone="primary" />
      <main id="main" className="pt-40 bg-primary-container">
        <section className="relative px-6 md:px-12 py-24 mb-24 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none"
          >
            <span className="baskerville italic text-[25vw] leading-none">Marcas</span>
          </div>
          <div className="relative z-10 max-w-4xl">
            <p className="manrope-label text-primary mb-6">Estúdio Estratégico</p>
            <h1 className="baskerville text-5xl md:text-7xl lg:text-9xl leading-[0.9] font-extralight tracking-tight text-white mb-8">
              Projetos que <br /> <span className="italic">transformaram</span> <br /> negócios
            </h1>
            <div aria-hidden="true" className="h-px w-24 bg-white/20 mt-12" />
          </div>
        </section>

        <PortfolioGrid projects={projects} />

        <section className="px-6 md:px-12 py-32 md:py-40 bg-secondary-container/20 flex flex-col items-center text-center">
          <h2 className="baskerville text-4xl md:text-6xl text-white mb-10 max-w-2xl leading-tight">
            Vamos construir sua <span className="italic text-primary">narrativa</span> juntos?
          </h2>
          <Link
            href="/contato"
            className="manrope-label border border-white/20 px-10 md:px-12 py-4 md:py-5 text-white hover:bg-white hover:text-primary-container transition-all duration-500 focus-ring"
          >
            Solicitar orçamento
          </Link>
        </section>
      </main>
      <SiteFooter tone="primary" accentWord="Curatorship" />
    </>
  );
}
