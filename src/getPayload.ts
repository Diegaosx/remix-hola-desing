import 'server-only';
import { getPayload as getPayloadBase } from 'payload';
import config from '@/payload.config';

let cached: Awaited<ReturnType<typeof getPayloadBase>> | null = null;

/**
 * Retorna uma instância singleton do Payload. Se não houver `DATABASE_URI`
 * configurado, retorna null para permitir que o frontend caia no fallback
 * de content files (modo dev/local sem infra).
 */
export async function getPayloadSafe() {
  if (!process.env.DATABASE_URI) return null;
  if (cached) return cached;
  try {
    cached = await getPayloadBase({ config });
    return cached;
  } catch (err) {
    console.warn('[payload] init failed, falling back to static content:', err);
    return null;
  }
}
