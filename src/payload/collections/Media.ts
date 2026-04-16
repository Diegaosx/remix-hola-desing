import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Arquivo de mídia', plural: 'Mídia' },
  admin: {
    group: 'Conteúdo',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize'],
    description: 'Imagens enviadas para o Cloudflare R2. Referenciadas em projetos, posts, etc.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 900 },
      { name: 'wide', width: 1600 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto alternativo (alt)',
      admin: { description: 'Descreva a imagem para acessibilidade. Obrigatório.' },
    },
    { name: 'caption', type: 'text', label: 'Legenda (opcional)' },
  ],
};
