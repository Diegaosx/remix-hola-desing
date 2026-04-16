'use server';

import { headers } from 'next/headers';
import { newsletterSchema } from '@/lib/validators';
import { rateLimit } from '@/lib/rate-limit';

export type NewsletterResult = { ok: boolean; message: string };

export async function subscribeNewsletter(formData: FormData): Promise<NewsletterResult> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get('email'),
    company: formData.get('company') ?? '',
  });
  if (!parsed.success) {
    return { ok: false, message: 'E-mail inválido. Revise e tente novamente.' };
  }
  if (parsed.data.company) {
    return { ok: true, message: 'Obrigado.' }; // honeypot silent success
  }
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const rl = rateLimit(`newsletter:${ip}`, { windowMs: 60_000, max: 3 });
  if (!rl.ok) {
    return { ok: false, message: 'Muitas tentativas. Tente novamente em 1 minuto.' };
  }
  // TODO: integrar com provedor (Resend, Mailchimp, etc.)
  console.info('[newsletter] new subscriber', parsed.data.email);
  return { ok: true, message: 'Inscrição confirmada. Até a próxima curadoria.' };
}
