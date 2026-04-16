import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'name',
    defaultColumns: ['name', 'kicker', 'highlighted', 'order'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'Ex.: Esencia / Presencia / Legado' } },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'kicker', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'highlighted', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 100 },
  ],
};
