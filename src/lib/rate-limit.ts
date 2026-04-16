type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export type RateLimitOptions = {
  windowMs: number;
  max: number;
};

export function rateLimit(key: string, { windowMs, max }: RateLimitOptions) {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }
  if (entry.count >= max) {
    return { ok: false, remaining: 0, retryAfterMs: entry.resetAt - now };
  }
  entry.count += 1;
  return { ok: true, remaining: max - entry.count };
}
