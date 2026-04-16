import type { GlobalConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Rodapé',
  admin: {
    group: 'Configurações',
    description: 'Textos, links legais e palavra de destaque do rodapé.',
  },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      name: 'accentWord',
      type: 'text',
      label: 'Palavra em destaque (marca d\'água)',
      defaultValue: '¡HOLA!',
      admin: { description: 'Aparece gigante, em opacity baixa, no canto inferior.' },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Assinatura / tagline institucional',
      defaultValue: 'DESIGN AS STRATEGIC ARCHITECTURE',
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Links legais',
      labels: { singular: 'Link', plural: 'Links' },
      admin: { description: 'Ex.: Política de Privacidade, Termos de Uso.' },
      fields: [
        { name: 'label', type: 'text', label: 'Texto', required: true },
        { name: 'href', type: 'text', label: 'URL', required: true },
      ],
      defaultValue: [
        { label: 'Privacidade', href: '/politica-de-privacidade' },
        { label: 'Termos', href: '/termos' },
      ],
    },
  ],
};
