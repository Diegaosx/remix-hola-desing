# ¡HOLA! Design — site + painel

Site editorial e **painel de gestão completo** do estúdio ¡HOLA! Design, em **Next.js 15 (App Router) + TypeScript strict** com **Payload CMS v3 embutido**, seguindo o design system "Noir Curator" (`stitch_remix_of_hola_design_website/velvet_strategy/DESIGN.md`).

## Stack

- **Next.js 15** (App Router, React 19, Server Components) + **TypeScript strict**
- **Payload CMS v3** embutido em `/admin` no mesmo app
- **Postgres** (Railway) via `@payloadcms/db-postgres`
- **Cloudflare R2** (S3-compatible) via `@payloadcms/storage-s3` para uploads
- **SMTP genérico** via `nodemailer` + `@payloadcms/email-nodemailer`
- **Tailwind CSS** com tokens editoriais + `next/font` (Newsreader, Montserrat, Manrope)
- **Zod** para validação, **MDX** (`next-mdx-remote`) para posts legados
- Server Actions com honeypot + rate limit in-memory

## Variáveis de ambiente

Copie `.env.example` → `.env` e preencha:

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://holadesign.com.br

# Payload + banco
PAYLOAD_SECRET=          # openssl rand -base64 48
DATABASE_URI=            # postgres://... (Railway)

# SMTP (envio de e-mails do formulário)
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
FROM_EMAIL=no-reply@holadesign.com.br
FROM_NAME=¡HOLA! Design
CONTACT_TO_EMAIL=hola@holadesign.com.br

# Cloudflare R2 (upload de mídia)
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_PUBLIC_URL=           # https://cdn.holadesign.com.br  ou  https://pub-<hash>.r2.dev
```

Nenhum segredo é lido fora de `process.env`. Em dev, se `DATABASE_URI` estiver
ausente, o frontend continua funcionando com o conteúdo em `src/content/*.ts`.

## Scripts

```bash
pnpm dev                  # desenvolvimento local
pnpm build                # build de produção
pnpm start                # servir o build

pnpm lint
pnpm typecheck

pnpm generate:types       # gera src/payload-types.ts a partir da config
pnpm generate:importmap   # regenera importMap.js para componentes custom
pnpm migrate              # roda migrations do Payload no Postgres
pnpm seed                 # popula globals + collections base a partir de src/content/*
```

## Painel (/admin)

- Acessível em `https://<dominio>/admin`, autenticação nativa Payload
  (cookie sessão, `SameSite=Lax`, `Secure` em produção).
- Primeiro acesso: cadastre o admin na tela que o Payload exibe automaticamente
  na primeira conexão com o banco.
- Grupos do menu:
  - **Conteúdo** — Pages (textos das páginas), Projects, Posts, FAQs,
    Packages, Process Steps, Timeline Entries, Media
  - **Inbox** — Contact Messages, Newsletter Subscribers
  - **Configurações** — Site Settings, Navigation, Footer
  - **Administração** — Users (RBAC `admin` / `editor`)
- `<meta name="robots">` retorna `noindex, nofollow` em todas as rotas `/admin/*`
  (configurado em `next.config.ts` + `src/middleware.ts`).
- Access control por coleção/global; `ContactMessages` e
  `NewsletterSubscribers` só são legíveis por staff autenticado.

## Segurança — nenhuma rota pública sensível

- Middleware (`src/middleware.ts`):
  - Força HTTPS em produção (defesa em profundidade).
  - Bloqueia métodos não permitidos em `/api/contact`, `/api/newsletter`.
  - Aplica `X-Robots-Tag: noindex, nofollow` em rotas admin.
- `next.config.ts`:
  - CSP restritiva para rotas públicas, relaxada no admin (Payload usa inline styles próprios).
  - HSTS 2 anos com preload, `X-Frame-Options: DENY`, `nosniff`,
    `Referrer-Policy: strict-origin-when-cross-origin`,
    `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
  - `poweredByHeader: false`.
- Autenticação:
  - Payload gerencia todas as rotas `/api/*` com seus próprios access
    controls; qualquer collection/global com `read: authenticated` não pode
    ser lida anonimamente.
  - Users lock após 5 tentativas (10 min), `tokenExpiration: 8h`.
- Server Actions:
  - Zod + honeypot + rate limit por IP em `contact` e `newsletter`.
  - Persistência via `payload.create` com `_req` autenticado server-side;
    não expõe a coleção à escrita anônima do admin, apenas o fluxo público
    controlado.

## Frontend público

- `/`, `/marcas`, `/como-trabalhamos`, `/sobre`, `/blog`, `/blog/[slug]`, `/contato`, `/404`.
- Nav e Footer **unificados** em componentes compartilhados
  (`src/components/layout/site-nav.tsx`, `site-footer.tsx`) com variantes
  de tom por página (`primary | surface | surface-low | transparent`).
- SEO completo: metadata API por rota, sitemap, robots, JSON-LD
  (Organization, WebSite, Article, BreadcrumbList).

## Deploy (Railway)

1. Adicione o plugin **Postgres** no Railway — ele injeta `DATABASE_URI`.
2. Defina todas as demais envs (ver bloco acima).
3. Build command: `pnpm build` · Start command: `pnpm start`.
4. Nada de migrations manuais: com `PAYLOAD_PUSH=true` (default), o Payload
   sincroniza o schema diretamente do código TypeScript no primeiro boot
   do container — e a cada deploy subsequente propaga apenas as diferenças.
5. Acesse `/admin` — a tela de criação do primeiro admin aparece
   automaticamente.
6. (Opcional) Para popular os globals + FAQs/packages/etc. a partir de
   `src/content/*.ts`, abra o shell do Railway e rode `pnpm seed`. Essa
   etapa é opcional: você pode simplesmente cadastrar tudo pelo painel.

### Quando trocar para migrations versionadas

`PAYLOAD_PUSH=true` é conveniente, mas reescreve o schema a partir do código
sem review prévio — trocas de tipo ou renames podem dropar colunas. Quando
o conteúdo estiver maduro:

```bash
# local, apontando para um banco de staging
pnpm payload migrate:create --name baseline
git add src/migrations && git commit -m "chore(db): baseline migrations"
# no Railway:
#   PAYLOAD_PUSH=false
# e altere o start para: pnpm payload migrate && next start -p 3000
```

## Imagens do site

Agora as imagens são gerenciadas pelo próprio painel (upload em Media, que
vai para o R2). Para migrar as 14 imagens dos HTMLs originais, use a
extensão Claude do navegador com o prompt em
`public/images/PROMPT_PARA_EXTENSAO.md` (baixa local) ou envie diretamente
pelo admin em `/admin/collections/media`.

O carimbo `https://holadesign.com.br/wp-content/uploads/2021/07/carimbo-768x790.png`
deve ser salvo em `public/brand/logo.png` (o WordPress bloqueia downloads
via curl — ver `public/brand/README.md`). Enquanto isso, o favicon e o
logo usam o monograma estilizado `¡H!` (`src/app/icon.svg`).

## Estrutura de pastas

```
src/
  app/
    (payload)/          # admin Payload + API REST
      admin/[[...segments]]/
      api/[...slug]/
    _actions/           # contact, newsletter (com Payload + SMTP)
    blog/[slug]/        # posts MDX (legado) → migrar para Payload Posts
  components/
    layout/ site-nav, site-footer, grain-overlay, skip-link
    marcas/ portfolio-grid
    blog/   newsletter-form
    contato/ contact-form
  content/              # fallback quando DATABASE_URI ausente (dev)
  lib/                  # seo, validators, rate-limit, content loader
  middleware.ts         # segurança em camadas
  payload.config.ts     # config central Payload
  payload/
    access/             # authenticated, anyone
    collections/        # Users, Media, Projects, Posts, Faqs, Packages, ProcessSteps, TimelineEntries, ContactMessages, NewsletterSubscribers
    globals/            # SiteSettings, Navigation, Footer, Pages
  styles/globals.css
public/
  brand/logo.png        # subir manualmente o carimbo
  images/README.md      # manifesto das imagens públicas do site
scripts/
  seed.ts
```

## Roadmap

- Integrar o frontend para ler dos globals/collections Payload (hoje os
  Server Components ainda usam fallback de `src/content/*`; a função
  `getPayloadSafe` em `src/getPayload.ts` já está pronta).
- Editor de blocos para a collection `Pages` (blocks de hero/CTA/grade).
- Rate limit distribuído via Upstash Redis.
- Revalidação on-demand por hooks `afterChange` nas collections.

## Licença

Proprietário — ¡HOLA! Design.
