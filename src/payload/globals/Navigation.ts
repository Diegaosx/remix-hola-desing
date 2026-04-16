import type { GlobalConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Menu de navegação',
  admin: { group: 'Configurações' },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true, admin: { description: 'Ex.: /marcas, /blog, https://…' } },
        {
          name: 'key',
          type: 'select',
          required: true,
          options: [
            { label: 'Portfolio', value: 'portfolio' },
            { label: 'Strategy', value: 'strategy' },
            { label: 'Culture', value: 'culture' },
            { label: 'Journal', value: 'journal' },
            { label: 'Contato', value: 'contato' },
          ],
        },
        { name: 'external', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Diagnóstico' },
        { name: 'href', type: 'text', required: true, defaultValue: '/contato' },
      ],
    },
  ],
};
