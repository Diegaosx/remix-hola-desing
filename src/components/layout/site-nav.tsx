import Link from 'next/link';
import { site, type NavKey } from '@/content/site';

type Tone = 'primary' | 'surface' | 'surface-low' | 'transparent';

const toneClass: Record<Tone, string> = {
  primary: 'bg-primary-container/60',
  surface: 'bg-surface/60',
  'surface-low': 'bg-surface-container-lowest/60',
  transparent: 'bg-transparent',
};

export type SiteNavProps = {
  active?: NavKey;
  tone?: Tone;
  cta?: { label: string; href: string };
};

export function SiteNav({ active, tone = 'transparent', cta = site.cta }: SiteNavProps) {
  return (
    <nav
      aria-label="Principal"
      className={`fixed top-0 flex justify-between items-center w-full px-6 md:px-12 py-6 md:py-8 ${toneClass[tone]} backdrop-blur-xl z-50`}
    >
      <Link
        href="/"
        aria-label={`${site.name} — início`}
        className="baskerville text-3xl text-white leading-none"
      >
        ¡H!
      </Link>
      <div className="hidden md:flex gap-12 items-center">
        {site.nav.map((item) => {
          const isActive = active === item.key;
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`manrope-label transition-opacity duration-300 ${
                isActive
                  ? 'text-white border-b border-white/40 pb-1'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <Link
        href={cta.href}
        className="bg-white text-primary-container px-6 md:px-8 py-3 manrope-label font-bold hover:scale-[0.97] transition-transform focus-ring"
      >
        {cta.label}
      </Link>
    </nav>
  );
}
