import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { anyone, authenticated } from '../access/authenticated';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'layout', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'category', type: 'text', required: true, admin: { description: 'Ex.: "Criação · Editorial"' } },
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Standard (2 rows)', value: 'standard' },
        { label: 'Tall (3 rows)', value: 'tall' },
        { label: 'Wide (2 cols)', value: 'wide' },
      ],
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Criação', value: 'Criação' },
        { label: 'Rebranding', value: 'Rebranding' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Descrição curta para SEO / listagens.' },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: { description: 'Menor = aparece antes.' },
    },
  ],
  timestamps: true,
  versions: { drafts: true },
};
