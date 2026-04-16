import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const ProcessSteps: CollectionConfig = {
  slug: 'process-steps',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'order'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'number', type: 'text', required: true, admin: { description: 'Ex.: "01", "02"' } },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'order', type: 'number', defaultValue: 100 },
  ],
};
