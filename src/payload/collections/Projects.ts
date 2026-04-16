import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { anyone, authenticated } from '../access/authenticated';

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Projeto', plural: 'Projetos' },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'layout', 'updatedAt'],
    description: 'Projetos exibidos em /marcas. A ordem visual segue o campo "ordem".',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Nome do projeto', required: true },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Letras minúsculas, sem acentos e sem espaços. Ex.: "maison-lumiere".' },
    },
    {
      name: 'category',
      type: 'text',
      label: 'Categoria',
      required: true,
      admin: { description: 'Ex.: "Criação · Editorial", "Rebranding", "Visual Identity".' },
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Formato no grid',
      required: true,
      defaultValue: 'standard',
      admin: { description: 'Controla o tamanho do card na grade masonry.' },
      options: [
        { label: 'Padrão (2 linhas)', value: 'standard' },
        { label: 'Alto (3 linhas)', value: 'tall' },
        { label: 'Largo (2 colunas)', value: 'wide' },
      ],
    },
    {
      name: 'tags',
      type: 'select',
      label: 'Filtros',
      hasMany: true,
      required: true,
      admin: { description: 'Usado pelos botões de filtro em /marcas.' },
      options: [
        { label: 'Criação', value: 'Criação' },
        { label: 'Rebranding', value: 'Rebranding' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagem de capa', required: true },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Resumo (SEO / listagens)',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Descrição completa',
      editor: lexicalEditor({}),
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordem de exibição',
      defaultValue: 100,
      admin: { description: 'Menor número aparece primeiro.' },
    },
  ],
  timestamps: true,
  versions: { drafts: true },
};
