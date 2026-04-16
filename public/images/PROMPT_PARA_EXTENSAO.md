# Prompt para a extensão do Claude (Chrome) — baixar imagens do site

Abra o repositório `diegaosx/remix-hola-desing` no VS Code com a extensão
Claude ativa e cole este prompt na barra do Claude:

---

Preciso que você **baixe** todas as imagens referenciadas nos HTMLs de
`stitch_remix_of_hola_design_website/**/code.html` e as salve em
`public/images/**` com os nomes exatos da tabela abaixo. Use os `src=` das
tags `<img>` (todos começam com `https://lh3.googleusercontent.com/aida-public/…`).
Salve como **JPG**, qualidade 90, lado maior ≤ 1600px (use `sharp` se
necessário). Não altere nenhum arquivo de código — só crie os arquivos de
imagem.

## Mapa URL → destino

### `home_page/code.html`
| Ordem no HTML                           | Destino                               |
| --------------------------------------- | ------------------------------------- |
| Project Card 1 — `Maison Lumière`       | `public/images/home/portfolio-1.jpg`  |
| Project Card 2 — `Æther Skincare`       | `public/images/home/portfolio-2.jpg`  |
| Project Card 3 — `Novo Studio`          | `public/images/home/portfolio-3.jpg`  |
| Founder Moment — retrato `Mariana`      | `public/images/home/founder.jpg`      |

### `marcas_portfolio_page/code.html`
| Projeto no HTML                         | Destino                               |
| --------------------------------------- | ------------------------------------- |
| `Azucena` (masonry-item-tall)           | `public/images/marcas/azucena.jpg`    |
| `Dani Jamur` (masonry-item-standard)    | `public/images/marcas/dani-jamur.jpg` |
| `LM Mentora` (masonry-item-standard)    | `public/images/marcas/lm-mentora.jpg` |
| `Lollita` (masonry-item-tall)           | `public/images/marcas/lollita.jpg`    |
| `My Choice` (masonry-item-wide)         | `public/images/marcas/my-choice.jpg`  |

### `blog_page/code.html`
| Post no HTML                            | Destino                                  |
| --------------------------------------- | ---------------------------------------- |
| Featured (grande, 7 colunas)            | `public/images/blog/featured.jpg`        |
| Card 1 — Design Post                    | `public/images/blog/post-design.jpg`     |
| Card 2 — Market Post                    | `public/images/blog/post-market.jpg`     |
| Card 3 — Culture Post                   | `public/images/blog/post-culture.jpg`    |

### `sobre_about_page/code.html`
| Imagem                                  | Destino                                |
| --------------------------------------- | -------------------------------------- |
| Hero portrait (`Mariana Queiroz`)       | `public/images/sobre/hero.jpg`         |
| Story section — `Studio Atmosphere`     | `public/images/sobre/studio.jpg`       |

### `contato_page/code.html`
| Imagem                                  | Destino                                |
| --------------------------------------- | -------------------------------------- |
| Imagem inferior grayscale (studio)      | `public/images/contato/studio.jpg`     |

### OG image (gerar 1 vez)
Crie/pegue qualquer imagem 1200×630 escura (pode ser recorte de
`sobre/hero.jpg`) e salve em `public/images/og/default.jpg`.

## Como extrair os URLs automaticamente

Se preferir, rode este comando antes para listar todos em um único arquivo:

```bash
grep -rEho 'https://lh3\.googleusercontent\.com/aida-public/[A-Za-z0-9_-]+' \
  stitch_remix_of_hola_design_website \
  | sort -u > /tmp/hola-images.txt
```

Depois você casa cada URL com o HTML de origem (ordem no arquivo) para saber
em qual destino salvar.

## Verificação final

Ao terminar, rode:

```bash
find public/images -type f -name '*.jpg' | sort
```

Devem aparecer **15 arquivos** (14 do mapa acima + `og/default.jpg`). Depois
disso, `pnpm build` e os `next/image` passam a servir as imagens otimizadas
(AVIF/WebP) automaticamente — nenhuma mudança de código necessária, os
`src=` já apontam para esses caminhos.
