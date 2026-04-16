import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Packages: CollectionConfig = {
  slug: 'packages',
  labels: { singular: 'Pacote', plural: 'Pacotes' },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'name',
    defaultColumns: ['name', 'kicker', 'highlighted', 'order'],
    description: 'Cards de pacotes exibidos em /como-trabalhamos (Esencia / Presencia / Legado).',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nome do pacote', required: true },
    { name: 'slug', type: 'text', label: 'Slug', required: true, unique: true },
    { name: 'kicker', type: 'text', label: 'Kicker (acima do nome)', required: true, admin: { placeholder: 'Sprint Estratégico' } },
    { name: 'description', type: 'textarea', label: 'Descrição', required: true },
    {
      name: 'features',
      type: 'array',
      label: 'Entregáveis',
      labels: { singular: 'Entregável', plural: 'Entregáveis' },
      minRows: 1,
      required: true,
      fields: [{ name: 'label', type: 'text', label: 'Descrição', required: true }],
    },
    { name: 'highlighted', type: 'checkbox', label: 'Destacado (padrão ouro)', defaultValue: false },
    { name: 'order', type: 'number', label: 'Ordem', defaultValue: 100 },
  ],
};
