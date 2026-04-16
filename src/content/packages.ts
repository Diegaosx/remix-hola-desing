export type Package = {
  slug: string;
  kicker: string;
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const packages: Package[] = [
  {
    slug: 'esencia',
    kicker: 'Sprint Estratégico',
    name: 'Esencia',
    description:
      'Ideal para marcas em fase de validação que buscam clareza imediata e posicionamento essencial.',
    features: ['Brand Blueprint', 'Visual Core', 'Tone of Voice'],
  },
  {
    slug: 'presencia',
    kicker: 'Design Completo',
    name: 'Presencia',
    description:
      'O padrão ouro. Redesign completo de ecossistema visual e verbal para escala competitiva.',
    features: ['Brand Strategy', 'Full Visual Identity', 'Website Design', 'Social Media Grid'],
    highlighted: true,
  },
  {
    slug: 'legado',
    kicker: 'Consultoria Anual',
    name: 'Legado',
    description:
      'Parceria estratégica contínua para manutenção de autoridade e curadoria de marca.',
    features: ['Monthly Advisory', 'Content Curation', 'Expansion Strategy'],
  },
];
