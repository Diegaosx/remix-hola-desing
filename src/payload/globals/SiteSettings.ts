import type { GlobalConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configurações do site',
  admin: {
    group: 'Configurações',
    description: 'Informações gerais (nome, contato, redes, logo). Aparecem em todo o site.',
  },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identidade',
          fields: [
            { name: 'name', type: 'text', label: 'Nome completo', required: true, defaultValue: '¡HOLA! Design' },
            { name: 'shortName', type: 'text', label: 'Nome curto', defaultValue: '¡HOLA!' },
            { name: 'tagline', type: 'text', label: 'Tagline', required: true, defaultValue: 'Design como arquitetura estratégica' },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descrição (meta / SEO)',
              required: true,
              admin: { description: 'Usada como description default em todas as páginas.' },
            },
            { name: 'locale', type: 'text', label: 'Idioma (BCP-47)', required: true, defaultValue: 'pt-BR' },
            { name: 'founded', type: 'number', label: 'Ano de fundação', defaultValue: 2016 },
          ],
        },
        {
          label: 'Contato',
          fields: [
            {
              name: 'contact',
              type: 'group',
              label: false,
              fields: [
                { name: 'email', type: 'email', label: 'E-mail público', required: true },
                {
                  name: 'whatsapp',
                  type: 'text',
                  label: 'WhatsApp (formato internacional)',
                  admin: { placeholder: '+5541999999999', description: 'Apenas números após o +.' },
                },
                { name: 'whatsappDisplay', type: 'text', label: 'WhatsApp (para exibir)', admin: { placeholder: '+55 41 9 9999 9999' } },
              ],
            },
            {
              name: 'location',
              type: 'group',
              label: 'Localização',
              fields: [
                { name: 'city', type: 'text', label: 'Cidade', required: true },
                { name: 'country', type: 'text', label: 'País', required: true },
                { name: 'note', type: 'text', label: 'Nota adicional', admin: { placeholder: 'Worldwide Execution' } },
              ],
            },
          ],
        },
        {
          label: 'Redes sociais',
          fields: [
            {
              name: 'social',
              type: 'array',
              label: 'Links sociais',
              labels: { singular: 'Rede', plural: 'Redes' },
              admin: { description: 'Aparecem no rodapé de todas as páginas.' },
              fields: [
                { name: 'label', type: 'text', label: 'Nome (ex.: Instagram)', required: true },
                { name: 'href', type: 'text', label: 'URL', required: true },
              ],
            },
          ],
        },
        {
          label: 'Mídia',
          fields: [
            { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo (PNG/SVG)' },
            { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Imagem Open Graph (1200×630)' },
          ],
        },
      ],
    },
  ],
};
