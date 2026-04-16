import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { anyone, authenticated, authenticatedOrPublished } from '../access/authenticated';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Estratégia', value: 'ESTRATEGIA' },
        { label: 'Design', value: 'DESIGN' },
        { label: 'Mercado', value: 'MERCADO' },
        { label: 'Cultura', value: 'CULTURA' },
      ],
    },
    { name: 'readingTime', type: 'text', defaultValue: '5 MIN READ' },
    { name: 'publishedAt', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({}),
    },
  ],
  timestamps: true,
  versions: { drafts: true },
};

export { anyone };
