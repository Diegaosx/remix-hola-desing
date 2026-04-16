import Link from 'next/link';
import { site } from '@/content/site';

export type SiteFooterProps = {
  tone?: 'primary' | 'surface';
  accentWord?: string;
};

export function SiteFooter({ tone = 'primary', accentWord = '¡HOLA!' }: SiteFooterProps) {
  const bg = tone === 'primary' ? 'bg-[#1d1233]' : 'bg-surface-container-lowest';
  const year = new Date().getFullYear();

  return (
    <footer
      className={`w-full px-6 md:px-12 pt-24 md:pt-40 pb-12 flex flex-col items-center ${bg} relative overflow-hidden`}
    >
      <div
        aria-hidden="true"
        className="text-[8rem] md:text-[10rem] baskerville text-white opacity-5 absolute bottom-0 left-0 select-none pointer-events-none"
      >
        {accentWord}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 mb-20">
        <div className="flex flex-col gap-6">
          <span className="manrope-label text-white/40">Conecte-se</span>
          <div className="flex flex-col gap-3">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                rel="noopener noreferrer"
                target="_blank"
                className="font-body text-sm font-light tracking-wide text-white/60 hover:text-white transition-all duration-500"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <span className="manrope-label text-white/40">Escritório</span>
          <p className="font-body text-sm font-light tracking-wide text-white/60">
            {site.location.city}, {site.location.country}
            <br />
            {site.location.note}
          </p>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <span className="manrope-label text-white/40">Fale conosco</span>
          <a
            href={`mailto:${site.contact.email}`}
            className="baskerville text-2xl md:text-3xl text-white underline underline-offset-8 decoration-white/20 hover:decoration-white transition-all"
          >
            {site.contact.email}
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="w-full h-px bg-white/10 mb-8" />
      <div className="flex flex-col md:flex-row justify-between w-full gap-4 relative z-10">
        <p className="font-body text-[10px] font-light tracking-[0.3em] text-white/30 uppercase">
          © {year} {site.name}. Todos os direitos reservados.
        </p>
        <div className="flex gap-8">
          <Link
            href="/politica-de-privacidade"
            className="manrope-label text-white/30 hover:text-white transition-colors"
          >
            Privacidade
          </Link>
          <Link
            href="/termos"
            className="manrope-label text-white/30 hover:text-white transition-colors"
          >
            Termos
          </Link>
        </div>
      </div>
      <div className="mt-20 w-full text-center manrope-label text-white/10 tracking-[1em]">
        DESIGN AS STRATEGIC ARCHITECTURE · EST. {site.founded}
      </div>
    </footer>
  );
}
