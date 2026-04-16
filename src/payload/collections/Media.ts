import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Conteúdo', defaultColumns: ['filename', 'alt', 'mimeType', 'filesize'] },
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
    { name: 'alt', type: 'text', required: true, label: 'Texto alternativo' },
    { name: 'caption', type: 'text' },
  ],
};
