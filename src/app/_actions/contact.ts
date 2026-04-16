'use server';

import { headers } from 'next/headers';
import { contactSchema } from '@/lib/validators';
import { rateLimit } from '@/lib/rate-limit';
import { getPayloadSafe } from '@/getPayload';
import { site } from '@/content/site';

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
    return { ok: true, message: 'Recebemos sua mensagem. Retornaremos em breve.' };
  }

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const userAgent = h.get('user-agent') ?? 'unknown';
  const rl = rateLimit(`contact:${ip}`, { windowMs: 10 * 60_000, max: 5 });
  if (!rl.ok) {
    return { ok: false, message: 'Muitas mensagens em pouco tempo. Aguarde alguns minutos.' };
  }

  const payload = await getPayloadSafe();
  const { name, email, message } = parsed.data;

  if (payload) {
    try {
      await payload.create({
        collection: 'contact-messages',
        data: { name, email, message, status: 'new', ip, userAgent },
      });
    } catch (err) {
      console.error('[contact] failed to persist message', err);
    }

    const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
    try {
      await payload.sendEmail({
        to,
        subject: `Novo contato de ${name}`,
        text: `Nome: ${name}\nE-mail: ${email}\nIP: ${ip}\n\nMensagem:\n${message}`,
      });
    } catch (err) {
      console.warn('[contact] e-mail delivery failed (SMTP not configured?)', err);
    }
  } else {
    console.info('[contact] (no db) message logged', { name, email, message: message.slice(0, 140) });
  }

  return { ok: true, message: 'Mensagem enviada. Responderemos em até 24h úteis.' };
}
