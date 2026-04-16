import type { GlobalConfig } from 'payload';
import { anyone, authenticated } from '../access/authenticated';

/**
 * Global com os textos editáveis das páginas estáticas (home/marcas/como-trabalhamos/sobre/blog/contato).
 * Estrutura simples: cada página tem um conjunto conhecido de campos textuais.
 * Seções e ativos visuais continuam governados pelas collections (Projects, Posts, Faqs, etc.).
 */
export const PagesGlobal: GlobalConfig = {
  slug: 'pages',
  label: 'Conteúdo das páginas',
  admin: { group: 'Conteúdo' },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      name: 'home',
      type: 'group',
      label: 'Home',
      fields: [
        { name: 'heroHeadline', type: 'textarea', defaultValue: 'Uma marca forte não é estética.\nÉ decisão de negócio.' },
        { name: 'heroKicker', type: 'text', defaultValue: 'São Paulo — Global Agency' },
        { name: 'marqueeText', type: 'text', defaultValue: 'ESTRATÉGIA · IDENTIDADE · REBRANDING · MARCA' },
        { name: 'statementNumber', type: 'text', defaultValue: '8' },
        { name: 'statementHeadline', type: 'textarea' },
        { name: 'statementBody', type: 'textarea' },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
        { name: 'founderQuote', type: 'textarea' },
        { name: 'founderAttribution', type: 'text', defaultValue: 'Mariana — Diretora Criativa' },
        { name: 'finalHeadline', type: 'textarea' },
      ],
    },
    {
      name: 'marcas',
      type: 'group',
      label: 'Portfólio',
      fields: [
        { name: 'kicker', type: 'text', defaultValue: 'Estúdio Estratégico' },
        { name: 'headline', type: 'textarea' },
        { name: 'ctaHeadline', type: 'textarea' },
        { name: 'ctaButtonLabel', type: 'text', defaultValue: 'Solicitar orçamento' },
      ],
    },
    {
      name: 'como',
      type: 'group',
      label: 'Como trabalhamos',
      fields: [
        { name: 'kicker', type: 'text', defaultValue: 'Processo criativo' },
        { name: 'heroHeadline', type: 'textarea' },
        { name: 'sectionHeadline', type: 'text' },
        { name: 'sectionBody', type: 'textarea' },
        { name: 'packagesKicker', type: 'text', defaultValue: 'Nossas configurações' },
        { name: 'packagesHeadline', type: 'text', defaultValue: 'Molduras de atuação' },
        { name: 'marqueeText', type: 'text', defaultValue: 'Diagnóstico Estratégico · R$550' },
      ],
    },
    {
      name: 'sobre',
      type: 'group',
      label: 'Sobre',
      fields: [
        { name: 'kicker', type: 'text', defaultValue: 'Fundadora & Diretora Criativa' },
        { name: 'heroHeadline', type: 'textarea' },
        { name: 'storyHeadline', type: 'textarea' },
        { name: 'storyBody', type: 'textarea' },
        { name: 'quote', type: 'textarea' },
        { name: 'trajectoryKicker', type: 'text', defaultValue: 'Trajectory' },
        { name: 'trajectoryHeadline', type: 'text', defaultValue: 'Uma década de impacto' },
      ],
    },
    {
      name: 'blog',
      type: 'group',
      label: 'Journal (blog)',
      fields: [
        { name: 'heroHeadline', type: 'textarea', defaultValue: 'Pensamento Crítico & Curadoria Visual.' },
        { name: 'newsletterKicker', type: 'text', defaultValue: 'The curated list' },
        { name: 'newsletterHeadline', type: 'textarea' },
      ],
    },
    {
      name: 'contato',
      type: 'group',
      label: 'Contato',
      fields: [
        { name: 'heroHeadline', type: 'textarea', defaultValue: 'Vamos\nconversar?' },
        { name: 'formKicker', type: 'text', defaultValue: 'Manifesto de interesse' },
        { name: 'infoKicker', type: 'text', defaultValue: 'Conexões diretas' },
        { name: 'whatsappKicker', type: 'text', defaultValue: 'Urgência criativa?' },
        { name: 'whatsappBody', type: 'textarea' },
        { name: 'faqHeadline', type: 'text', defaultValue: 'Frequentes' },
      ],
    },
  ],
};
