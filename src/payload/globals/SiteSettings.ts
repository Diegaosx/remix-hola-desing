import type { GlobalConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configurações do site',
  admin: { group: 'Configurações' },
  access: { read: anyone, update: authenticated },
  fields: [
    { name: 'name', type: 'text', required: true, defaultValue: '¡HOLA! Design' },
    { name: 'shortName', type: 'text', defaultValue: '¡HOLA!' },
    { name: 'tagline', type: 'text', required: true, defaultValue: 'Design como arquitetura estratégica' },
    { name: 'description', type: 'textarea', required: true },
    { name: 'locale', type: 'text', required: true, defaultValue: 'pt-BR' },
    { name: 'founded', type: 'number', defaultValue: 2016 },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'whatsapp', type: 'text', admin: { description: 'Formato internacional, ex.: +5541999999999' } },
        { name: 'whatsappDisplay', type: 'text' },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'note', type: 'text' },
      ],
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
  ],
};
