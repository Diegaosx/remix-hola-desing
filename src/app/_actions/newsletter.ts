'use server';

import { headers } from 'next/headers';
import { newsletterSchema } from '@/lib/validators';
import { rateLimit } from '@/lib/rate-limit';
import { getPayloadSafe } from '@/getPayload';

export type NewsletterResult = { ok: boolean; message: string };

export async function subscribeNewsletter(formData: FormData): Promise<NewsletterResult> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get('email'),
    company: formData.get('company') ?? '',
  });
  if (!parsed.success) return { ok: false, message: 'E-mail inválido. Revise e tente novamente.' };
  if (parsed.data.company) return { ok: true, message: 'Obrigado.' };

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const rl = rateLimit(`newsletter:${ip}`, { windowMs: 60_000, max: 3 });
  if (!rl.ok) return { ok: false, message: 'Muitas tentativas. Tente novamente em 1 minuto.' };

  const payload = await getPayloadSafe();
  if (payload) {
    try {
      await payload.create({
        collection: 'newsletter-subscribers',
        data: { email: parsed.data.email, source: 'blog:newsletter', ip },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      // duplicate subscribe: respond friendly
      if (/unique/i.test(msg)) {
        return { ok: true, message: 'Você já está inscrito. Até a próxima curadoria.' };
      }
      console.error('[newsletter] persist failed', err);
    }
  } else {
    console.info('[newsletter] (no db) new subscriber', parsed.data.email);
  }

  return { ok: true, message: 'Inscrição confirmada. Até a próxima curadoria.' };
}
