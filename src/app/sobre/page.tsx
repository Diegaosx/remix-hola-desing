import Image from 'next/image';
import type { Metadata } from 'next';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { buildMetadata } from '@/lib/seo';
import { timeline } from '@/content/timeline';

export const metadata: Metadata = buildMetadata({
  title: 'Sobre — Mariana Queiroz, estrategista de marca',
  description:
    'Mais de 15 anos de atuação em branding e varejo de luxo. Conheça a história da ¡HOLA! Design e sua fundadora.',
  path: '/sobre',
});

export const dynamic = 'force-static';

export default function SobrePage() {
  return (
    <>
      <SiteNav active="culture" tone="surface" />
      <main id="main" className="pt-32 bg-background dotted-background">
        <section className="relative min-h-[70vh] md:min-h-[90vh] px-6 md:px-12 flex flex-col justify-end pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/sobre/hero.jpg"
              alt="Retrato editorial em preto e branco de uma profissional de pé em estúdio minimalista, com iluminação marcada e sombras profundas."
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale opacity-60"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="relative z-10 max-w-5xl">
            <p className="manrope-label text-white/50 mb-6">Fundadora & Diretora Criativa</p>
            <h1 className="baskerville text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] text-white italic">
              Mariana Queiroz <br />
              <span className="not-italic opacity-90">— Estrategista de Marca</span>
            </h1>
          </div>
        </section>

        <section className="px-6 md:px-12 py-24 md:py-40 bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
            <div className="md:col-span-7">
              <h2 className="baskerville text-4xl md:text-7xl mb-12 leading-tight">
                Não faço logo. <br />
                <span className="italic">Faço design que sustenta negócios.</span>
              </h2>
              <div className="space-y-8 text-on-surface/80 max-w-2xl font-body font-light text-lg leading-relaxed tracking-wide">
                <p>
                  Com mais de 15 anos de atuação no mercado de varejo de luxo e estratégia
                  corporativa, Mariana Queiroz fundou a ¡HOLA! Design com uma premissa clara: a
                  estética sem propósito é apenas ruído decorativo.
                </p>
                <p>
                  Sua trajetória atravessa o desenvolvimento de identidades que não apenas ocupam
                  espaço, mas que dominam categorias. O foco não está no “agora”, mas na
                  longevidade das marcas em um ecossistema de consumo cada vez mais volátil.
                </p>
              </div>
            </div>
            <div className="md:col-span-5 pt-10 md:pt-20">
              <div className="relative aspect-[3/4] bg-surface-container overflow-hidden group">
                <Image
                  src="/images/sobre/studio.jpg"
                  alt="Estúdio minimalista com tons escuros de roxo, sombras marcadas e mobiliário de luxo — atmosfera cinematográfica."
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Citação da fundadora"
          className="px-6 md:px-12 py-24 md:py-32 bg-primary-container text-center flex items-center justify-center min-h-[500px] relative"
        >
          <span
            aria-hidden="true"
            className="absolute top-10 left-6 md:top-20 md:left-20 baskerville text-[10rem] md:text-[20rem] text-white opacity-[0.03] select-none"
          >
            “
          </span>
          <blockquote className="max-w-4xl relative z-10">
            <p className="baskerville text-3xl md:text-8xl italic text-white leading-tight">
              “O design só tem valor quando está conectado à estratégia.”
            </p>
          </blockquote>
          <span
            aria-hidden="true"
            className="absolute bottom-10 right-6 md:right-20 baskerville text-[10rem] md:text-[20rem] text-white opacity-[0.03] select-none"
          >
            ”
          </span>
        </section>

        <section aria-labelledby="trajectory-title" className="py-24 md:py-40 bg-surface overflow-hidden">
          <div className="px-6 md:px-12 mb-20 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <span className="manrope-label text-primary">Trajectory</span>
              <h3 id="trajectory-title" className="baskerville text-4xl md:text-5xl text-white mt-4">
                Uma década de impacto
              </h3>
            </div>
            <div aria-hidden="true" className="w-1/3 h-px bg-outline-variant/30 hidden md:block" />
          </div>
          <ol className="flex overflow-x-auto custom-scrollbar pb-12 px-6 md:px-12 gap-16 md:gap-24 items-start snap-x snap-mandatory">
            {timeline.map((t) => (
              <li
                key={t.year}
                className={`min-w-[280px] md:min-w-[300px] snap-start border-l pl-8 py-4 ${
                  t.highlighted ? 'border-primary/40' : 'border-outline-variant/20'
                } ${t.dimmed ? 'opacity-40' : ''}`}
              >
                <span className="baskerville text-4xl text-white italic">{t.year}</span>
                <h4 className="manrope-label mt-4 mb-2 text-primary">{t.kicker}</h4>
                <p className="text-on-surface/60 font-body font-light text-sm">{t.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-label="Valores"
          className="px-6 md:px-12 py-24 md:py-40 bg-surface-container-lowest border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div className="manrope-label text-xl md:text-4xl tracking-[0.5em] text-white/90 flex flex-col md:flex-row gap-8 md:gap-24">
              <span className="hover:text-primary transition-colors duration-500">Longevidade</span>
              <span aria-hidden="true" className="text-primary/30 hidden md:inline">·</span>
              <span className="hover:text-primary transition-colors duration-500">Estratégia</span>
              <span aria-hidden="true" className="text-primary/30 hidden md:inline">·</span>
              <span className="hover:text-primary transition-colors duration-500">Parceria</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter tone="primary" accentWord="Design" />
    </>
  );
}
