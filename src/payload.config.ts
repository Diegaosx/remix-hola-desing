import { buildConfig } from 'payload';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { s3Storage } from '@payloadcms/storage-s3';
import nodemailer from 'nodemailer';
// `sharp` é instalado (pnpm already pulled it) mas não possui @types no workspace — importado via require dinâmico para evitar tipos.

import { Users } from './payload/collections/Users';
import { Media } from './payload/collections/Media';
import { Projects } from './payload/collections/Projects';
import { Posts } from './payload/collections/Posts';
import { Faqs } from './payload/collections/Faqs';
import { Packages } from './payload/collections/Packages';
import { ProcessSteps } from './payload/collections/ProcessSteps';
import { TimelineEntries } from './payload/collections/TimelineEntries';
import { ContactMessages } from './payload/collections/ContactMessages';
import { NewsletterSubscribers } from './payload/collections/NewsletterSubscribers';

import { SiteSettings } from './payload/globals/SiteSettings';
import { Navigation } from './payload/globals/Navigation';
import { Footer } from './payload/globals/Footer';
import { PagesGlobal } from './payload/globals/Pages';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const smtpConfigured =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

const r2 = {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? process.env.R2_ACCOUNT_ID,
  accessKeyId:
    process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID,
  secretAccessKey:
    process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY,
  bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME ?? process.env.R2_BUCKET,
  publicUrl: process.env.CLOUDFLARE_R2_PUBLIC_URL ?? process.env.R2_PUBLIC_URL,
};

const r2Configured = Boolean(r2.accountId && r2.accessKeyId && r2.secretAccessKey && r2.bucket);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      title: '¡HOLA! Design — Painel',
      titleSuffix: ' · ¡HOLA!',
      description: 'Painel de gestão do site editorial ¡HOLA! Design.',
    },
    components: {},
  },
  collections: [
    Users,
    Media,
    Projects,
    Posts,
    Faqs,
    Packages,
    ProcessSteps,
    TimelineEntries,
    ContactMessages,
    NewsletterSubscribers,
  ],
  globals: [SiteSettings, Navigation, Footer, PagesGlobal],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET ?? 'dev-only-unsafe-secret-change-me',
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ??
        process.env.DATABASE_URI ??
        'postgres://postgres:postgres@localhost:5432/hola',
    },
    // Sincroniza o schema automaticamente no boot do container.
    // Para projetos maduros, desligue (PAYLOAD_PUSH=false) e use migrations
    // versionadas: `pnpm payload migrate:create` + `pnpm migrate` no start.
    push: process.env.PAYLOAD_PUSH !== 'false',
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  email: smtpConfigured
    ? nodemailerAdapter({
        defaultFromAddress:
          process.env.FROM_EMAIL ?? process.env.SMTP_USER ?? 'no-reply@localhost',
        defaultFromName: process.env.FROM_NAME ?? '¡HOLA! Design',
        transport: nodemailer.createTransport({
          host: process.env.SMTP_HOST!,
          port: Number(process.env.SMTP_PORT ?? 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASS!,
          },
        }),
      })
    : undefined,
  plugins: r2Configured
    ? [
        s3Storage({
          collections: { media: true },
          bucket: r2.bucket!,
          config: {
            region: 'auto',
            endpoint: `https://${r2.accountId}.r2.cloudflarestorage.com`,
            credentials: {
              accessKeyId: r2.accessKeyId!,
              secretAccessKey: r2.secretAccessKey!,
            },
            forcePathStyle: true,
          },
        }),
      ]
    : [],
  graphQL: { disable: true },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sharp: (await import('sharp')).default as any,
  cors:
    process.env.NODE_ENV === 'production'
      ? [process.env.NEXT_PUBLIC_SITE_URL ?? 'https://holadesign.com.br']
      : '*',
  csrf:
    process.env.NODE_ENV === 'production'
      ? [process.env.NEXT_PUBLIC_SITE_URL ?? 'https://holadesign.com.br']
      : undefined,
});
