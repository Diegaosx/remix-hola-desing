import type { CollectionConfig } from 'payload';
import { authenticated } from '../access/authenticated';

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    group: 'Inbox',
    useAsTitle: 'email',
    defaultColumns: ['email', 'confirmed', 'createdAt'],
  },
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'confirmed', type: 'checkbox', defaultValue: false },
    { name: 'source', type: 'text', admin: { description: 'Ex.: "blog:newsletter"' } },
    { name: 'ip', type: 'text', admin: { readOnly: true } },
  ],
  timestamps: true,
};
