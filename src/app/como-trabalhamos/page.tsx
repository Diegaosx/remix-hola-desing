import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { buildMetadata } from '@/lib/seo';
import { processSteps } from '@/content/process';
import { packages } from '@/content/packages';

export const metadata: Metadata = buildMetadata({
  title: 'Como trabalhamos — Processo criativo',
  description:
    'Um mergulho estruturado no âmago do seu negócio: diagnóstico, imersão, criação e entrega. Três molduras de atuação para marcas de alto valor.',
  path: '/como-trabalhamos',
});

export const dynamic = 'force-static';

export default function ComoTrabalhamosPage() {
  return (
    <>
      <SiteNav active="strategy" tone="surface" />
      <main id="main" className="bg-surface">
        <header className="relative flex flex-col justify-center px-6 md:px-12 pt-40 pb-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 opacity-20 bg-gradient-to-br from-primary-container via-surface to-surface-container-lowest"
          />
          <div className="relative z-10 max-w-6xl">
            <span className="manrope-label text-primary mb-8 block">Processo criativo</span>
            <h1 className="baskerville text-5xl md:text-8xl lg:text-[7rem] leading-[1.1] font-light text-white italic tracking-tight">
              Não chegamos com respostas. <br />
              <span className="opacity-40">Chegamos com as</span> perguntas certas.
            </h1>
          </div>
        </header>

        <section className="py-24 md:py-32 px-6 md:px-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 md:sticky md:top-40 h-fit">
              <h2 className="baskerville text-4xl md:text-5xl text-white mb-6">
                Como
                <br />
                trabalhamos
              </h2>
              <p className="font-body text-on-surface-variant font-light leading-relaxed max-w-xs">
                Um mergulho estruturado no âmago do seu negócio para extrair a verdade que merece
                ser contada.
              </p>
            </div>
            <div className="md:col-span-8 relative">
              <div aria-hidden="true" className="absolute left-0 top-0 w-px h-full bg-outline-variant opacity-20" />
              <ol className="space-y-24 md:space-y-32 pl-12">
                {processSteps.map((step, i) => (
                  <li key={step.number} className="group relative">
                    <div
                      aria-hidden="true"
                      className={`absolute -left-[54px] top-0 w-3 h-3 rounded-full transition-colors ${
                        i === 0 ? 'bg-primary' : 'bg-outline-variant opacity-40 group-hover:bg-primary'
                      }`}
                    />
                    <span className="manrope-label text-primary mb-4 block">{step.number}</span>
                    <h3 className="baskerville text-3xl md:text-4xl text-white mb-6 group-hover:italic transition-all duration-500">
                      {step.title}
                    </h3>
                    <p className="font-body text-on-surface-variant font-light text-lg leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="packages-title"
          className="py-24 md:py-40 px-6 md:px-12 bg-surface-container-lowest"
        >
          <div className="flex flex-col items-center mb-24 text-center">
            <span className="manrope-label text-primary mb-8 block">Nossas configurações</span>
            <h2 id="packages-title" className="baskerville text-4xl md:text-6xl text-white">
              Molduras de atuação
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {packages.map((p) => (
              <li
                key={p.slug}
                className={`group border border-outline-variant/10 p-8 md:p-12 flex flex-col min-h-[560px] md:min-h-[600px] hover:bg-primary-container transition-colors duration-700 ${
                  p.highlighted ? 'bg-secondary-container/10' : ''
                }`}
              >
                <h4 className="manrope-label text-on-primary-container mb-12">{p.kicker}</h4>
                <h3 className="baskerville text-4xl md:text-5xl text-white mb-8 italic">
                  {p.name}
                </h3>
                <p className="font-body text-on-surface-variant font-light text-sm mb-12 leading-relaxed">
                  {p.description}
                </p>
                <ul className="mt-auto space-y-4">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-4 manrope-label ${
                        p.highlighted ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      <span aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <Link
          href="/contato"
          className="w-full h-28 md:h-32 flex items-center justify-between px-6 md:px-12 bg-white text-primary-container group cursor-pointer overflow-hidden relative focus-ring"
          aria-label="Agendar diagnóstico estratégico"
        >
          <div className="flex items-center gap-12 animate-marquee-fast whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="baskerville text-2xl md:text-3xl italic">
                Diagnóstico Estratégico · R$550
              </span>
            ))}
          </div>
        </Link>
      </main>
      <SiteFooter tone="primary" accentWord="Strategy" />
    </>
  );
}
