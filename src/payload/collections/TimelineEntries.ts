import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const TimelineEntries: CollectionConfig = {
  slug: 'timeline-entries',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'year',
    defaultColumns: ['year', 'kicker', 'highlighted', 'dimmed'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'year', type: 'text', required: true },
    { name: 'kicker', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'highlighted', type: 'checkbox', defaultValue: false },
    { name: 'dimmed', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 100 },
  ],
};
