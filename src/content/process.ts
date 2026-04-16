export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Mapeamento de ecossistema, análise de tensões culturais e identificação de oportunidades latentes. Onde estamos e para onde o mercado está fugindo.',
  },
  {
    number: '02',
    title: 'Imersão',
    description:
      'Sessões colaborativas de design thinking e workshops de visão. Entramos na operação para sentir as dores reais do cliente final.',
  },
  {
    number: '03',
    title: 'Criação',
    description:
      'Tradução da estratégia em sistemas visuais e narrativas proprietárias. Aqui a lógica se torna mágica através do design de alta fidelidade.',
  },
  {
    number: '04',
    title: 'Entrega',
    description:
      'Implementação assistida e diretrizes de governança de marca. Não entregamos arquivos, entregamos autonomia para o crescimento.',
  },
];
