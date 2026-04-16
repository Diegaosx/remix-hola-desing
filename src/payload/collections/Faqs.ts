import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'question',
    defaultColumns: ['question', 'order', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'order', type: 'number', defaultValue: 100 },
  ],
};
