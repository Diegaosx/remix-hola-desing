# ¡HOLA! Design — website

Site editorial do estúdio ¡HOLA! Design, construído em **Next.js 15 (App Router) + TypeScript strict**, seguindo o design system "Noir Curator" documentado em `stitch_remix_of_hola_design_website/velvet_strategy/DESIGN.md`.

## Stack

- **Next.js 15** (App Router, React 19, Server Components)
- **TypeScript strict** (`strict`, `noUncheckedIndexedAccess`)
- **Tailwind CSS v3** com tokens editoriais (paleta roxa "Noir", `radius: 0`, tipografia Newsreader/Montserrat/Manrope via `next/font`)
- **Zod** para validação, **MDX** (via `next-mdx-remote/rsc` + `gray-matter`) para posts do Journal
- **Server Actions** para formulários (contato, newsletter), com honeypot e rate limit in-memory
- **SEO** completo: `metadata` por rota, `sitemap.xml`, `robots.txt`, JSON-LD (Organization/WebSite/Article/BreadcrumbList), OG tags
- **Segurança**: CSP, HSTS, X-Frame-Options `DENY`, Permissions-Policy, Referrer-Policy, `poweredByHeader` off, rate limit em Server Actions, honeypot

## Scripts

```bash
pnpm dev        # desenvolvimento local em http://localhost:3000
pnpm build      # build de produção (SSG)
pnpm start      # serve o build
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
```

## Estrutura

```
src/
  app/              # rotas (App Router) + sitemap/robots
    _actions/       # Server Actions (contact, newsletter)
    blog/[slug]/    # post dinâmico em MDX
  components/
    layout/         # SiteNav, SiteFooter, GrainOverlay, SkipLink — unificados
    marcas/         # PortfolioGrid com filtros
    blog/           # NewsletterForm
    contato/        # ContactForm
  content/          # conteúdo tipado (site, projects, timeline, packages, faqs, home, process)
    posts/          # MDX (7 posts iniciais)
  lib/              # seo.ts, validators.ts, content.ts, rate-limit.ts
  styles/           # globals.css (tokens, grain, keyframes)
public/
  images/           # assets locais (ver public/images/README.md)
```

## Nav e Footer unificados

Os HTMLs exportados do Stitch mostravam navegação e rodapé com a mesma estrutura, variando apenas a cor de fundo conforme a página. Foram consolidados em dois componentes com props de tom:

- `<SiteNav active="home|portfolio|strategy|culture|journal|contato" tone="primary|surface|surface-low|transparent" />`
- `<SiteFooter tone="primary|surface" accentWord="¡HOLA!|Curatorship|Strategy|Design|Curadoria" />`

Todo o conteúdo (social, e-mail, endereço, CTA) vem de `src/content/site.ts`.

## Imagens

As imagens dos HTMLs exportados (hosts `lh3.googleusercontent.com`) devem ser subidas em `public/images/**` seguindo o manifesto em [`public/images/README.md`](public/images/README.md). Enquanto os arquivos não existem, o layout e a tipografia permanecem intactos (os containers têm `bg-surface-container-high`).

## Futuro: painel de gestão

A estrutura de conteúdo já está em arquivos tipados (`src/content/*.ts` + MDX com frontmatter). A migração para um CMS embutido (ex.: Payload CMS no mesmo projeto Next.js) é direta:

1. Mover os tipos (`Project`, `Post`, `Package`, `Faq`, `TimelineEntry`, `ProcessStep`) para coleções Payload.
2. Substituir `src/lib/content.ts` por consultas Payload (mantendo a mesma assinatura).
3. Adicionar `app/admin/[[...payload]]/page.tsx` para montar o painel autenticado.

Auth, rate limit distribuído (Upstash Redis) e integração de e-mail (Resend) já têm pontos de extensão em `src/lib/`.

## Acessibilidade

- `lang="pt-BR"`, skip-link, foco visível via `.focus-ring`, `aria-current="page"` na nav ativa.
- `prefers-reduced-motion` desativa marquee/transições.
- Alts descritivos em todas as `<Image>`.

## Licença

Proprietário — ¡HOLA! Design.
