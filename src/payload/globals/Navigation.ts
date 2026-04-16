import type { GlobalConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Menu de navegação',
  admin: {
    group: 'Configurações',
    description: 'Itens do menu principal e botão CTA. Aparece em todas as páginas.',
  },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Itens do menu',
      labels: { singular: 'Item', plural: 'Itens' },
      minRows: 1,
      admin: { description: 'Ordem da lista = ordem que aparece no menu.' },
      fields: [
        { name: 'label', type: 'text', label: 'Texto visível', required: true },
        {
          name: 'href',
          type: 'text',
          label: 'URL',
          required: true,
          admin: { description: 'Interna (/marcas) ou externa (https://…).' },
        },
        {
          name: 'key',
          type: 'select',
          label: 'Chave de identificação',
          required: true,
          admin: {
            description:
              'Usada para marcar o link como ativo na página correspondente.',
          },
          options: [
            { label: 'Portfolio', value: 'portfolio' },
            { label: 'Strategy', value: 'strategy' },
            { label: 'Culture', value: 'culture' },
            { label: 'Journal', value: 'journal' },
            { label: 'Contato', value: 'contato' },
          ],
        },
        { name: 'external', type: 'checkbox', label: 'Link externo (abre em nova aba)', defaultValue: false },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Botão CTA (canto direito da nav)',
      fields: [
        { name: 'label', type: 'text', label: 'Texto do botão', required: true, defaultValue: 'Diagnóstico' },
        { name: 'href', type: 'text', label: 'Destino', required: true, defaultValue: '/contato' },
      ],
    },
  ],
};
