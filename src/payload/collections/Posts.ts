import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { anyone, authenticated, authenticatedOrPublished } from '../access/authenticated';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    description: 'Posts do Journal (/blog). Rascunhos ficam invisíveis para o público.',
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Título', required: true },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Parte final da URL: /blog/<slug>.' },
    },
    { name: 'description', type: 'textarea', label: 'Resumo / description', required: true },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      required: true,
      options: [
        { label: 'Estratégia', value: 'ESTRATEGIA' },
        { label: 'Design', value: 'DESIGN' },
        { label: 'Mercado', value: 'MERCADO' },
        { label: 'Cultura', value: 'CULTURA' },
      ],
    },
    {
      name: 'readingTime',
      type: 'text',
      label: 'Tempo de leitura',
      defaultValue: '5 MIN READ',
      admin: { placeholder: '7 MIN READ' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data de publicação',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    { name: 'featured', type: 'checkbox', label: 'Destaque na home do blog', defaultValue: false },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagem de capa' },
    {
      name: 'body',
      type: 'richText',
      label: 'Corpo do post',
      editor: lexicalEditor({}),
    },
  ],
  timestamps: true,
  versions: { drafts: true },
};

export { anyone };
