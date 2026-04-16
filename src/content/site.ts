export const site = {
  name: '¡HOLA! Design',
  shortName: '¡HOLA!',
  tagline: 'Design como arquitetura estratégica',
  description:
    'Estúdio de branding editorial que transforma marcas em instituições culturais de alto valor. Estratégia, identidade e rebranding para quem entende que marca forte é decisão de negócio.',
  locale: 'pt-BR',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://holadesign.com.br',
  location: {
    city: 'Curitiba',
    country: 'Brasil',
    note: 'Worldwide Execution',
  },
  contact: {
    email: 'hola@holadesign.com.br',
    whatsapp: '+5541999999999',
    whatsappDisplay: '+55 41 9 9999 9999',
  },
  social: [
    { label: 'Instagram', href: 'https://instagram.com/holadesign' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/holadesign' },
    { label: 'Behance', href: 'https://behance.net/holadesign' },
  ],
  nav: [
    { label: 'Portfolio', href: '/marcas', key: 'portfolio' as const },
    { label: 'Strategy', href: '/como-trabalhamos', key: 'strategy' as const },
    { label: 'Culture', href: '/sobre', key: 'culture' as const },
    { label: 'Journal', href: '/blog', key: 'journal' as const },
  ],
  cta: { label: 'Diagnóstico', href: '/contato' },
  founded: 2016,
} as const;

export type NavKey = (typeof site.nav)[number]['key'] | 'home' | 'contato';
