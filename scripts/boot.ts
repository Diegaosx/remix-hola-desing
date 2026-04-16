/**
 * Boot script — roda antes do `next start` no Railway.
 *
 * Força a inicialização do Payload com `NODE_ENV=development` apenas durante
 * o boot, o que aciona o drizzle-kit push e cria/atualiza as tabelas do
 * Postgres a partir do schema TypeScript. Depois o processo termina e o
 * `next start` sobe normalmente em `NODE_ENV=production`.
 *
 * Essa abordagem evita a necessidade de manter migrations versionadas e é
 * ideal para projetos novos. Para projetos com histórico, migre para
 * migrations versionadas (veja README).
 */

import 'dotenv/config';

async function main() {
  const hasDb = Boolean(process.env.DATABASE_URL ?? process.env.DATABASE_URI);
  if (!hasDb) {
    console.log('[boot] Nenhum DATABASE_URL/DATABASE_URI definido — pulando schema sync.');
    return;
  }

  const originalEnv = process.env.NODE_ENV;
  Object.assign(process.env, { NODE_ENV: 'development', PAYLOAD_PUSH: 'true' });

  console.log('[boot] Sincronizando schema Payload no Postgres…');
  const { getPayload } = await import('payload');
  const { default: config } = await import('../src/payload.config');

  const payload = await getPayload({ config });
  console.log('[boot] Schema pronto.');

  // Fecha conexões para o processo sair limpo.
  const db = payload.db as unknown as { destroy?: () => Promise<void> };
  if (typeof db.destroy === 'function') {
    await db.destroy();
  }

  Object.assign(process.env, { NODE_ENV: originalEnv });
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[boot] erro fatal:', err);
    process.exit(1);
  });
