import Image from 'next/image';
import type { Metadata } from 'next';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { ContactForm } from '@/components/contato/contact-form';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/content/site';
import { faqs } from '@/content/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'Contato — Vamos conversar?',
  description:
    'Envie sua proposta ou fale via WhatsApp. Respondemos em até 24h úteis. NDA assinado em todo projeto.',
  path: '/contato',
});

export const dynamic = 'force-static';

export default function ContatoPage() {
  return (
    <>
      <SiteNav active="contato" tone="surface" />
      <main id="main" className="pt-40 pb-20 px-6 md:px-12 lg:px-24 bg-background relative">
        <header className="mb-32">
          <h1
            className="baskerville italic text-[4rem] md:text-[7rem] lg:text-[9rem] leading-[0.9] text-white tracking-tighter"
            style={{ textShadow: '0 0 30px rgba(207, 191, 234, 0.2)' }}
          >
            Vamos
            <br />
            conversar?
          </h1>
          <div aria-hidden="true" className="h-px w-24 bg-primary mt-12 opacity-40" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-7">
            <p className="manrope-label text-primary mb-12">Manifesto de interesse</p>
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-20 lg:sticky lg:top-40">
            <section>
              <p className="manrope-label text-primary mb-8">Conexões diretas</p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="text-primary text-xl">@</span>
                  <div>
                    <p className="manrope-label text-outline-variant">E-mail</p>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-xl text-white font-body font-light hover:text-primary transition-colors focus-ring"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="text-primary text-xl">◉</span>
                  <div>
                    <p className="manrope-label text-outline-variant">Studio</p>
                    <p className="text-xl text-white font-body font-light">
                      {site.location.city}, {site.location.country}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container p-10 md:p-12 border-l-2 border-primary">
              <h3 className="baskerville text-2xl md:text-3xl text-white italic mb-4">
                Urgência criativa?
              </h3>
              <p className="text-sm text-on-surface-variant font-body font-light mb-8 leading-relaxed">
                Para consultas imediatas ou colaborações rápidas, nosso canal direto via WhatsApp
                está disponível em horário comercial.
              </p>
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center gap-4 bg-[#25D366] text-surface-container-lowest px-8 md:px-10 py-4 md:py-5 manrope-label hover:scale-105 transition-transform focus-ring"
              >
                WhatsApp direto
              </a>
            </section>

            <div className="aspect-square w-full grayscale opacity-40 mix-blend-luminosity overflow-hidden relative">
              <Image
                src="/images/contato/studio.jpg"
                alt="Interior arquitetônico minimalista do estúdio de design com paredes de concreto e sombras dramáticas ao entardecer."
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </aside>
        </div>

        <section
          aria-labelledby="faq-title"
          className="mt-40 md:mt-60 border-t border-outline-variant/20 pt-24 md:pt-32"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              id="faq-title"
              className="baskerville text-4xl md:text-5xl text-white italic mb-20 text-center"
            >
              Frequentes
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="group bg-surface-container-low transition-colors duration-500 open:bg-surface-container"
                >
                  <summary className="flex justify-between items-center p-6 md:p-8 cursor-pointer list-none focus-ring">
                    <span className="manrope-label text-white !tracking-widest text-sm">
                      {f.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-primary group-open:rotate-180 transition-transform"
                    >
                      ▾
                    </span>
                  </summary>
                  <div className="px-6 md:px-8 pb-8 text-on-surface-variant font-body font-light text-sm leading-relaxed max-w-2xl">
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter tone="primary" accentWord="Curadoria" />
    </>
  );
}
