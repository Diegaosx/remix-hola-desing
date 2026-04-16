import type { CollectionConfig } from 'payload';
import { authenticated } from '../access/authenticated';

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: { singular: 'Assinante', plural: 'Assinantes da newsletter' },
  admin: {
    group: 'Inbox',
    useAsTitle: 'email',
    defaultColumns: ['email', 'confirmed', 'createdAt'],
    description: 'E-mails capturados pelo formulário da newsletter.',
  },
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'email', type: 'email', label: 'E-mail', required: true, unique: true, index: true },
    { name: 'confirmed', type: 'checkbox', label: 'Confirmado (double opt-in)', defaultValue: false },
    { name: 'source', type: 'text', label: 'Origem', admin: { placeholder: 'blog:newsletter' } },
    { name: 'ip', type: 'text', label: 'IP', admin: { readOnly: true } },
  ],
  timestamps: true,
};
