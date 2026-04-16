import type { CollectionConfig } from 'payload';
import { authenticated } from '../access/authenticated';

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: { singular: 'Mensagem', plural: 'Mensagens recebidas' },
  admin: {
    group: 'Inbox',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
    description: 'Mensagens enviadas pelo formulário de /contato.',
  },
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true },
    { name: 'email', type: 'email', label: 'E-mail', required: true },
    { name: 'message', type: 'textarea', label: 'Mensagem', required: true },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'Novo', value: 'new' },
        { label: 'Respondido', value: 'replied' },
        { label: 'Arquivado', value: 'archived' },
        { label: 'Spam', value: 'spam' },
      ],
    },
    { name: 'ip', type: 'text', label: 'IP de origem', admin: { readOnly: true } },
    { name: 'userAgent', type: 'text', label: 'User Agent', admin: { readOnly: true } },
    { name: 'notes', type: 'textarea', label: 'Anotações internas', admin: { description: 'Só visíveis para o staff.' } },
  ],
  timestamps: true,
};
