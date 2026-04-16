import type { CollectionConfig } from 'payload';
import { authenticated } from '../access/authenticated';

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    group: 'Inbox',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
  },
  access: {
    // nunca público — só staff autenticado
    read: authenticated,
    create: () => true, // permitido pelo Server Action (rate-limited + honeypot)
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'Novo', value: 'new' },
        { label: 'Respondido', value: 'replied' },
        { label: 'Arquivado', value: 'archived' },
        { label: 'Spam', value: 'spam' },
      ],
    },
    { name: 'ip', type: 'text', admin: { readOnly: true } },
    { name: 'userAgent', type: 'text', admin: { readOnly: true } },
    { name: 'notes', type: 'textarea', admin: { description: 'Anotações internas da equipe.' } },
  ],
  timestamps: true,
};
