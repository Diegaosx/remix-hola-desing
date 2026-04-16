export type TimelineEntry = {
  year: string;
  kicker: string;
  description: string;
  highlighted?: boolean;
  dimmed?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    year: '2017',
    kicker: 'Foundation',
    description: 'Criação da ¡HOLA! Design focada em varejo boutique.',
  },
  {
    year: '2019',
    kicker: 'Expansion',
    description: 'Primeiros projetos internacionais e foco em branding estratégico.',
  },
  {
    year: '2021',
    kicker: 'Methodology',
    description: 'Consolidação do método "Noir Curator" de design institucional.',
    highlighted: true,
  },
  {
    year: '2023',
    kicker: 'Legacy',
    description: 'Rebrand total da agência e foco exclusivo em marcas de alto valor.',
  },
  {
    year: '2026',
    kicker: 'Future',
    description: 'Digital integration and cultural curation excellence.',
    dimmed: true,
  },
];
