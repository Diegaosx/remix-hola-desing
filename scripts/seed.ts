/**
 * Seed inicial: popula SiteSettings, Navigation, Footer, FAQs, Packages,
 * ProcessSteps e TimelineEntries a partir dos arquivos em src/content/*.ts.
 *
 * Uso:
 *   DATABASE_URI=postgres://… PAYLOAD_SECRET=… pnpm tsx scripts/seed.ts
 *
 * Em produção, rode uma única vez após o primeiro deploy.
 */

import { getPayload } from 'payload';
import config from '../src/payload.config';

import { site } from '../src/content/site';
import { faqs } from '../src/content/faqs';
import { packages } from '../src/content/packages';
import { processSteps } from '../src/content/process';
import { timeline } from '../src/content/timeline';

async function main() {
  if (!process.env.DATABASE_URL && !process.env.DATABASE_URI) {
    console.error('DATABASE_URL/DATABASE_URI não definida. Abortando seed.');
    process.exit(1);
  }

  const payload = await getPayload({ config });

  console.log('› Atualizando Site Settings…');
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      name: site.name,
      shortName: site.shortName,
      tagline: site.tagline,
      description: site.description,
      locale: site.locale,
      founded: site.founded,
      contact: {
        email: site.contact.email,
        whatsapp: site.contact.whatsapp,
        whatsappDisplay: site.contact.whatsappDisplay,
      },
      location: site.location,
      social: site.social.map((s) => ({ label: s.label, href: s.href })),
    },
  });

  console.log('› Atualizando Navigation…');
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      items: site.nav.map((n) => ({ label: n.label, href: n.href, key: n.key, external: false })),
      cta: { label: site.cta.label, href: site.cta.href },
    },
  });

  console.log('› Atualizando Footer…');
  await payload.updateGlobal({
    slug: 'footer',
    data: { accentWord: '¡HOLA!', tagline: 'DESIGN AS STRATEGIC ARCHITECTURE' },
  });

  console.log('› FAQs…');
  for (const [i, f] of faqs.entries()) {
    await payload.create({
      collection: 'faqs',
      data: { question: f.question, answer: f.answer, order: (i + 1) * 10 },
    });
  }

  console.log('› Packages…');
  for (const [i, p] of packages.entries()) {
    await payload.create({
      collection: 'packages',
      data: {
        name: p.name,
        slug: p.slug,
        kicker: p.kicker,
        description: p.description,
        features: p.features.map((label) => ({ label })),
        highlighted: p.highlighted ?? false,
        order: (i + 1) * 10,
      },
    });
  }

  console.log('› Process Steps…');
  for (const [i, s] of processSteps.entries()) {
    await payload.create({
      collection: 'process-steps',
      data: { number: s.number, title: s.title, description: s.description, order: (i + 1) * 10 },
    });
  }

  console.log('› Timeline…');
  for (const [i, t] of timeline.entries()) {
    await payload.create({
      collection: 'timeline-entries',
      data: {
        year: t.year,
        kicker: t.kicker,
        description: t.description,
        highlighted: t.highlighted ?? false,
        dimmed: t.dimmed ?? false,
        order: (i + 1) * 10,
      },
    });
  }

  console.log('✔ Seed concluído.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
