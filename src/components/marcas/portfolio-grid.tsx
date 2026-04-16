'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { Project } from '@/content/projects';

const FILTERS = ['Todos', 'Criação', 'Rebranding'] as const;
type Filter = (typeof FILTERS)[number];

const layoutClass: Record<Project['layout'], string> = {
  tall: 'masonry-item-tall',
  standard: 'masonry-item-standard',
  wide: 'masonry-item-wide',
};

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('Todos');

  const filtered = useMemo(
    () => (filter === 'Todos' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter, projects],
  );

  const count = String(filtered.length).padStart(2, '0');

  return (
    <>
      <section
        aria-label="Filtrar portfólio"
        className="px-6 md:px-12 mb-20 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-outline-variant/10 pb-12"
      >
        <div className="flex flex-wrap gap-8" role="tablist">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`manrope-label transition-colors focus-ring ${
                  active
                    ? 'text-white border-b border-white pb-1'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
        <div className="manrope-label text-white/30">
          Visualizando {count} Projetos Selecionados
        </div>
      </section>

      <section aria-label="Projetos" className="px-6 md:px-12 mb-40">
        <ul
          className="grid gap-8"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gridAutoRows: '200px',
          }}
        >
          {filtered.map((p) => (
            <li
              key={p.slug}
              className={`${layoutClass[p.layout]} group relative overflow-hidden bg-surface-container-high`}
            >
              <Image
                src={p.image.src}
                alt={p.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="manrope-label text-primary mb-2">{p.category}</span>
                <h3 className="baskerville text-3xl md:text-4xl text-white italic">{p.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <style jsx>{`
        .masonry-item-tall {
          grid-row: span 3;
        }
        .masonry-item-wide {
          grid-column: span 2;
        }
        .masonry-item-standard {
          grid-row: span 2;
        }
      `}</style>
    </>
  );
}
