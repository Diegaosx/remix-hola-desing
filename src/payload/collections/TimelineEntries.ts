import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const TimelineEntries: CollectionConfig = {
  slug: 'timeline-entries',
  labels: { singular: 'Marco da trajetória', plural: 'Trajetória' },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'year',
    defaultColumns: ['year', 'kicker', 'highlighted', 'dimmed'],
    description: 'Marcos históricos da agência na página /sobre.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'year', type: 'text', label: 'Ano', required: true, admin: { placeholder: '2021' } },
    { name: 'kicker', type: 'text', label: 'Kicker', required: true, admin: { placeholder: 'Methodology' } },
    { name: 'description', type: 'textarea', label: 'Descrição', required: true },
    { name: 'highlighted', type: 'checkbox', label: 'Ponto em destaque', defaultValue: false },
    { name: 'dimmed', type: 'checkbox', label: 'Mostrar como futuro (opacidade baixa)', defaultValue: false },
    { name: 'order', type: 'number', label: 'Ordem', defaultValue: 100 },
  ],
};
