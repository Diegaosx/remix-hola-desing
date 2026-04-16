import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Informe seu nome completo.').max(120),
  email: z.string().email('E-mail inválido.').max(180),
  message: z.string().min(10, 'Conte um pouco mais sobre o desafio.').max(5000),
  // Honeypot — deve vir vazio
  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('E-mail inválido.').max(180),
  company: z.string().max(0).optional().or(z.literal('')),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
