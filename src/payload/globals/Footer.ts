import type { GlobalConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Rodapé',
  admin: { group: 'Configurações' },
  access: { read: anyone, update: authenticated },
  fields: [
    { name: 'accentWord', type: 'text', defaultValue: '¡HOLA!' },
    { name: 'tagline', type: 'text', defaultValue: 'DESIGN AS STRATEGIC ARCHITECTURE' },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Privacidade', href: '/politica-de-privacidade' },
        { label: 'Termos', href: '/termos' },
      ],
    },
  ],
};
