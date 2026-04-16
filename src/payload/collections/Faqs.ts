import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'question',
    defaultColumns: ['question', 'order', 'updatedAt'],
    description: 'Perguntas frequentes exibidas em /contato.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'question', type: 'text', label: 'Pergunta', required: true },
    { name: 'answer', type: 'textarea', label: 'Resposta', required: true },
    { name: 'order', type: 'number', label: 'Ordem', defaultValue: 100, admin: { description: 'Menor = aparece antes.' } },
  ],
};
