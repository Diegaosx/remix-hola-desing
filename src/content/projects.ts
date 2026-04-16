import { z } from 'zod';

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  layout: z.enum(['tall', 'standard', 'wide']),
  tags: z.array(z.enum(['Criação', 'Rebranding'])).nonempty(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
});

export type Project = z.infer<typeof projectSchema>;

export const projects: Project[] = [
  {
    slug: 'azucena',
    title: 'Azucena',
    category: 'Criação · Editorial',
    layout: 'tall',
    tags: ['Criação'],
    image: {
      src: '/images/marcas/azucena.jpg',
      alt: 'Fotografia editorial minimalista de moda com sombras de alto contraste e tecidos de luxo sobre superfície de mármore.',
    },
  },
  {
    slug: 'dani-jamur',
    title: 'Dani Jamur',
    category: 'Rebranding',
    layout: 'standard',
    tags: ['Rebranding'],
    image: {
      src: '/images/marcas/dani-jamur.jpg',
      alt: 'Fotografia de arquitetura abstrata com linhas marcadas e sombras profundas contra céu noturno — estética brutalista minimalista.',
    },
  },
  {
    slug: 'lm-mentora',
    title: 'LM Mentora',
    category: 'Criação · Digital',
    layout: 'standard',
    tags: ['Criação'],
    image: {
      src: '/images/marcas/lm-mentora.jpg',
      alt: 'Macro de papel texturizado de luxo com tipografia em gold foil e layout minimalista.',
    },
  },
  {
    slug: 'lollita',
    title: 'Lollita',
    category: 'Visual Identity',
    layout: 'tall',
    tags: ['Criação'],
    image: {
      src: '/images/marcas/lollita.jpg',
      alt: 'Interior elegante com mobiliário mid-century e iluminação atmosférica dramática através da janela.',
    },
  },
  {
    slug: 'my-choice',
    title: 'My Choice',
    category: 'Positioning',
    layout: 'wide',
    tags: ['Rebranding'],
    image: {
      src: '/images/marcas/my-choice.jpg',
      alt: 'Movimento artístico de multidão urbana em borrão com tons neon púrpura e preto profundo.',
    },
  },
];

export const featuredProjects: Project[] = projects.slice(0, 3);
