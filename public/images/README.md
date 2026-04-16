# Imagens do site

Suba os arquivos listados abaixo respeitando os nomes e subpastas. Todas as imagens
devem ser em JPG/PNG de alta qualidade (recomendado 1600px no lado maior). Os `alt`
textos já estão definidos em `src/content/*.ts` e seguem o pedido de acessibilidade.

## `public/images/home/`
| Arquivo          | Uso                       | Referência no Stitch export                       |
| ---------------- | ------------------------- | ------------------------------------------------- |
| `portfolio-1.jpg`| Card horizontal 1 (Maison Lumière) | `home_page/code.html` — project 1 |
| `portfolio-2.jpg`| Card horizontal 2 (Æther Skincare) | `home_page/code.html` — project 2 |
| `portfolio-3.jpg`| Card horizontal 3 (Novo Studio)    | `home_page/code.html` — project 3 |
| `founder.jpg`    | Seção Founder Moment (Mariana)     | `home_page/code.html` — founder img |

## `public/images/marcas/`
| Arquivo            | Projeto       | Layout     |
| ------------------ | ------------- | ---------- |
| `azucena.jpg`      | Azucena       | tall       |
| `dani-jamur.jpg`   | Dani Jamur    | standard   |
| `lm-mentora.jpg`   | LM Mentora    | standard   |
| `lollita.jpg`      | Lollita       | tall       |
| `my-choice.jpg`    | My Choice     | wide       |

## `public/images/blog/`
| Arquivo          | Uso                                       |
| ---------------- | ----------------------------------------- |
| `featured.jpg`   | Post em destaque "El silencio..."         |
| `post-design.jpg`| Card secundário de Design                 |
| `post-market.jpg`| Card secundário de Mercado                |
| `post-culture.jpg`| Card secundário de Cultura               |

## `public/images/sobre/`
| Arquivo        | Uso                              |
| -------------- | -------------------------------- |
| `hero.jpg`     | Hero — retrato Mariana Queiroz   |
| `studio.jpg`   | Seção Story — atmosfera do estúdio|

## `public/images/contato/`
| Arquivo      | Uso                                     |
| ------------ | --------------------------------------- |
| `studio.jpg` | Imagem grayscale inferior (painel direito)|

## `public/images/og/`
| Arquivo         | Uso                                   |
| --------------- | ------------------------------------- |
| `default.jpg`   | Imagem Open Graph padrão (1200×630)   |

Enquanto as imagens não estiverem no lugar, o `next/image` renderiza um 404
no asset mas o layout permanece intacto (os containers possuem `bg-surface-container-high`).
Assim que subir os arquivos com os nomes acima, o site passa a exibi-los sem nenhuma
alteração de código.
