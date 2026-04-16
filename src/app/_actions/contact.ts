'use server';

import { headers } from 'next/headers';
import { contactSchema } from '@/lib/validators';
import { rateLimit } from '@/lib/rate-limit';

export type ContactResult =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: Record<string, string> };

export async function sendContact(formData: FormData): Promise<ContactResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    company: formData.get('company') ?? '',
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: 'Revise os campos destacados.', errors };
  }

  if (parsed.data.company) {
    // honeypot — aceitar silenciosamente
    return { ok: true, message: 'Recebemos sua mensagem. Retornaremos em breve.' };
  }

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const rl = rateLimit(`contact:${ip}`, { windowMs: 10 * 60_000, max: 5 });
  if (!rl.ok) {
    return { ok: false, message: 'Muitas mensagens em pouco tempo. Aguarde alguns minutos.' };
  }

  // TODO: enviar via Resend / SMTP / webhook
  console.info('[contact] new message', {
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message.slice(0, 200),
  });

  return { ok: true, message: 'Mensagem enviada. Responderemos em até 24h úteis.' };
}
