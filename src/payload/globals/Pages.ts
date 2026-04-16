import type { GlobalConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

/**
 * Textos editáveis das páginas estáticas, organizados em abas — uma aba por
 * página — para facilitar a edição. Imagens, projetos, posts e FAQs continuam
 * em suas próprias collections.
 */
export const PagesGlobal: GlobalConfig = {
  slug: 'pages',
  label: 'Conteúdo das páginas',
  admin: {
    group: 'Conteúdo',
    description:
      'Textos de cada página pública. Separe por parágrafos com Enter. Os campos em maiúscula (ex.: KICKERS) aparecem em caps no site por convenção de estilo.',
  },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Home',
          description: 'Página inicial (/).',
          fields: [
            {
              name: 'home',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'heroHeadline',
                  type: 'textarea',
                  label: 'Título principal (hero)',
                  defaultValue:
                    'Uma marca forte não é estética.\nÉ decisão de negócio.',
                  admin: {
                    description:
                      'Quebras de linha (Enter) são preservadas no site.',
                  },
                },
                {
                  name: 'heroKicker',
                  type: 'text',
                  label: 'Legenda acima do hero',
                  defaultValue: 'São Paulo — Global Agency',
                },
                {
                  name: 'marqueeText',
                  type: 'text',
                  label: 'Texto do marquee (faixa animada)',
                  defaultValue:
                    'ESTRATÉGIA · IDENTIDADE · REBRANDING · MARCA',
                },
                {
                  name: 'statementNumber',
                  type: 'text',
                  label: 'Número em destaque (anos)',
                  defaultValue: '8',
                },
                {
                  name: 'statementHeadline',
                  type: 'textarea',
                  label: 'Título do bloco "sobre o estúdio"',
                },
                {
                  name: 'statementBody',
                  type: 'textarea',
                  label: 'Texto descritivo do estúdio',
                },
                {
                  name: 'stats',
                  type: 'array',
                  label: 'Estatísticas (métricas em números grandes)',
                  labels: { singular: 'Métrica', plural: 'Métricas' },
                  fields: [
                    { name: 'number', type: 'text', label: 'Número', required: true },
                    { name: 'label', type: 'text', label: 'Rótulo', required: true },
                  ],
                },
                {
                  name: 'founderQuote',
                  type: 'textarea',
                  label: 'Citação da fundadora',
                },
                {
                  name: 'founderAttribution',
                  type: 'text',
                  label: 'Assinatura da citação',
                  defaultValue: 'Mariana — Diretora Criativa',
                },
                {
                  name: 'finalHeadline',
                  type: 'textarea',
                  label: 'Chamada final (antes do footer)',
                },
              ],
            },
          ],
        },
        {
          label: 'Marcas',
          description: 'Página de portfólio (/marcas).',
          fields: [
            {
              name: 'marcas',
              type: 'group',
              label: false,
              fields: [
                { name: 'kicker', type: 'text', label: 'Kicker (acima do título)', defaultValue: 'Estúdio Estratégico' },
                { name: 'headline', type: 'textarea', label: 'Título principal' },
                { name: 'ctaHeadline', type: 'textarea', label: 'Título da chamada final' },
                { name: 'ctaButtonLabel', type: 'text', label: 'Texto do botão CTA', defaultValue: 'Solicitar orçamento' },
              ],
            },
          ],
        },
        {
          label: 'Como trabalhamos',
          description: 'Página de processo e pacotes (/como-trabalhamos).',
          fields: [
            {
              name: 'como',
              type: 'group',
              label: false,
              fields: [
                { name: 'kicker', type: 'text', label: 'Kicker', defaultValue: 'Processo criativo' },
                { name: 'heroHeadline', type: 'textarea', label: 'Título principal' },
                { name: 'sectionHeadline', type: 'text', label: 'Subtítulo da seção do processo' },
                { name: 'sectionBody', type: 'textarea', label: 'Descrição da seção do processo' },
                { name: 'packagesKicker', type: 'text', label: 'Kicker dos pacotes', defaultValue: 'Nossas configurações' },
                { name: 'packagesHeadline', type: 'text', label: 'Título dos pacotes', defaultValue: 'Molduras de atuação' },
                { name: 'marqueeText', type: 'text', label: 'Texto do marquee branco', defaultValue: 'Diagnóstico Estratégico · R$550' },
              ],
            },
          ],
        },
        {
          label: 'Sobre',
          description: 'Página da fundadora e da agência (/sobre).',
          fields: [
            {
              name: 'sobre',
              type: 'group',
              label: false,
              fields: [
                { name: 'kicker', type: 'text', label: 'Kicker', defaultValue: 'Fundadora & Diretora Criativa' },
                { name: 'heroHeadline', type: 'textarea', label: 'Nome + função no hero' },
                { name: 'storyHeadline', type: 'textarea', label: 'Título da seção biográfica' },
                { name: 'storyBody', type: 'textarea', label: 'Biografia' },
                { name: 'quote', type: 'textarea', label: 'Citação gigante' },
                { name: 'trajectoryKicker', type: 'text', label: 'Kicker da timeline', defaultValue: 'Trajectory' },
                { name: 'trajectoryHeadline', type: 'text', label: 'Título da timeline', defaultValue: 'Uma década de impacto' },
              ],
            },
          ],
        },
        {
          label: 'Journal (blog)',
          description: 'Página de listagem de posts (/blog).',
          fields: [
            {
              name: 'blog',
              type: 'group',
              label: false,
              fields: [
                { name: 'heroHeadline', type: 'textarea', label: 'Título principal', defaultValue: 'Pensamento Crítico & Curadoria Visual.' },
                { name: 'newsletterKicker', type: 'text', label: 'Kicker da newsletter', defaultValue: 'The curated list' },
                { name: 'newsletterHeadline', type: 'textarea', label: 'Chamada da newsletter' },
              ],
            },
          ],
        },
        {
          label: 'Contato',
          description: 'Página de contato (/contato).',
          fields: [
            {
              name: 'contato',
              type: 'group',
              label: false,
              fields: [
                { name: 'heroHeadline', type: 'textarea', label: 'Título do hero', defaultValue: 'Vamos\nconversar?' },
                { name: 'formKicker', type: 'text', label: 'Kicker do formulário', defaultValue: 'Manifesto de interesse' },
                { name: 'infoKicker', type: 'text', label: 'Kicker do bloco de contato', defaultValue: 'Conexões diretas' },
                { name: 'whatsappKicker', type: 'text', label: 'Kicker do WhatsApp', defaultValue: 'Urgência criativa?' },
                { name: 'whatsappBody', type: 'textarea', label: 'Texto do WhatsApp' },
                { name: 'faqHeadline', type: 'text', label: 'Título do FAQ', defaultValue: 'Frequentes' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
