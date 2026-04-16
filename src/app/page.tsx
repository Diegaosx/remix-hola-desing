import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { buildMetadata } from '@/lib/seo';
import { homeMarquee, homePortfolio, homeStats } from '@/content/home';
import { site } from '@/content/site';

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: '/',
});

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <SiteNav active="home" tone="transparent" />
      <main id="main">
        <section
          aria-labelledby="hero-title"
          className="min-h-screen flex items-center px-6 md:px-12 pt-32 bg-primary-container relative overflow-hidden"
        >
          <div className="max-w-6xl z-10">
            <h1
              id="hero-title"
              className="baskerville text-[clamp(3rem,8vw,6rem)] leading-[1.1] text-white tracking-tighter"
            >
              Uma marca forte não é estética. <br />
              <span className="opacity-40">É decisão de negócio.</span>
            </h1>
            <div className="mt-16 flex gap-4">
              <span className="manrope-label text-white/40">
                {site.location.city} — Global Agency
              </span>
            </div>
          </div>
          <div aria-hidden="true" className="absolute right-[10%] top-0 w-px h-full bg-outline-variant/20" />
        </section>

        <div className="bg-secondary-container overflow-hidden py-6 border-y border-white/5" aria-hidden="true">
          <div className="flex whitespace-nowrap gap-12 animate-marquee">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="manrope-label text-white text-xl">
                {homeMarquee}
              </span>
            ))}
          </div>
        </div>

        <section className="py-24 md:py-40 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-5 relative">
            <span
              aria-hidden="true"
              className="baskerville text-[10rem] md:text-[18rem] leading-none text-primary absolute -top-20 md:-top-32 -left-4 md:-left-8 opacity-20 select-none pointer-events-none"
            >
              8
            </span>
            <p className="baskerville text-4xl md:text-5xl relative z-10 leading-tight">
              anos construindo narrativas que convertem atenção em valor.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl">
              Não somos apenas designers. Somos estrategistas visuais que entendem que o design
              é a embalagem da sua competência. A {site.name} nasceu para elevar marcas ao seu
              estado de arte.
            </p>
            <div aria-hidden="true" className="mt-12 h-px w-32 bg-primary" />
          </div>
        </section>

        <section
          aria-labelledby="portfolio-title"
          className="py-24 bg-surface-container-lowest overflow-hidden"
        >
          <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between md:items-end gap-4">
            <h2 id="portfolio-title" className="baskerville text-4xl md:text-6xl text-white">
              Marcas que criamos
            </h2>
            <div className="manrope-label text-white/40">Role para explorar →</div>
          </div>
          <ul className="flex overflow-x-auto gap-8 px-6 md:px-12 hide-scrollbar pb-12 snap-x snap-mandatory">
            {homePortfolio.map((p) => (
              <li
                key={p.slug}
                className="min-w-[320px] md:min-w-[450px] aspect-[3/4] bg-surface-container-high group cursor-pointer relative overflow-hidden snap-start"
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 450px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent p-8 md:p-12 flex flex-col justify-end">
                  <span className="manrope-label text-primary mb-2">{p.category}</span>
                  <h3 className="baskerville text-3xl text-white">{p.title}</h3>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-6 md:px-12 mt-8">
            <Link href="/marcas" className="manrope-label text-white underline underline-offset-8">
              Ver portfólio completo →
            </Link>
          </div>
        </section>

        <section
          aria-labelledby="founder-title"
          className="min-h-screen grid grid-cols-1 md:grid-cols-2"
        >
          <div className="relative h-[60vh] md:h-full bg-surface-container-high overflow-hidden">
            <Image
              src="/images/home/founder.jpg"
              alt="Retrato profissional de Mariana Queiroz, diretora criativa, em estúdio minimalista com iluminação dramática."
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale contrast-125"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-primary-container/20" />
          </div>
          <div className="bg-primary-container flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
            <span className="manrope-label text-primary mb-8">— A Fundadora</span>
            <h2
              id="founder-title"
              className="baskerville text-[clamp(2.5rem,5vw,5rem)] leading-none text-white mb-12"
            >
              Marca forte é <br />
              decisão de negócio.
            </h2>
            <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed mb-12 italic">
              “Minha missão é garantir que sua marca não seja apenas bonita, mas que tenha a
              autoridade necessária para cobrar o valor que você realmente entrega.”
            </p>
            <div className="manrope-label text-white">Mariana — Diretora Criativa</div>
          </div>
        </section>

        <section
          aria-label="Métricas do estúdio"
          className="py-24 md:py-40 bg-surface px-6 md:px-12 border-y border-white/5"
        >
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 text-center">
            {homeStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="baskerville text-6xl md:text-8xl text-primary mb-4">{s.number}</dd>
                <div className="manrope-label">{s.label}</div>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-40 md:py-60 px-6 md:px-12 flex flex-col items-center text-center bg-primary-container relative overflow-hidden">
          <div className="max-w-4xl relative z-10">
            <h2 className="baskerville text-[clamp(2rem,6vw,5rem)] leading-tight text-white mb-16">
              Sua marca representa quem você se tornou?
            </h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <Link
                href="/contato"
                className="bg-white text-primary-container px-12 py-5 manrope-label font-bold hover:scale-105 transition-transform focus-ring"
              >
                Iniciar diagnóstico
              </Link>
              <Link
                href="/marcas"
                className="border border-white/20 text-white px-12 py-5 manrope-label hover:bg-white/5 transition-colors focus-ring"
              >
                Ver portfólio
              </Link>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]"
          >
            <span className="baskerville text-[14rem] md:text-[25rem] select-none">¡HOLA!</span>
          </div>
        </section>
      </main>
      <SiteFooter tone="primary" />
    </>
  );
}
