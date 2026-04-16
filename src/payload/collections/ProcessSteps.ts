import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const ProcessSteps: CollectionConfig = {
  slug: 'process-steps',
  labels: { singular: 'Etapa', plural: 'Etapas do processo' },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'order'],
    description: 'Timeline vertical da página /como-trabalhamos.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'number', type: 'text', label: 'Número (dois dígitos)', required: true, admin: { placeholder: '01' } },
    { name: 'title', type: 'text', label: 'Título', required: true },
    { name: 'description', type: 'textarea', label: 'Descrição', required: true },
    { name: 'order', type: 'number', label: 'Ordem', defaultValue: 100 },
  ],
};
