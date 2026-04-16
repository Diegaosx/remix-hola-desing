import type { CollectionConfig } from 'payload';
import { authenticated } from '../access/authenticated';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    group: 'Administração',
    description: 'Membros com acesso ao painel. Admins gerenciam usuários; editores só conteúdo.',
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nome completo', required: true },
    {
      name: 'role',
      type: 'select',
      label: 'Papel',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
  timestamps: true,
};
