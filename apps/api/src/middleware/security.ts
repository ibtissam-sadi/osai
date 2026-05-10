import type http from 'node:http';

export const applySecurityHeaders = (res: http.ServerResponse) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
};

const windowMs = 60_000;
const hits = new Map<string, { count: number; start: number }>();

export const checkRateLimit = (ip: string, max: number): boolean => {
  const now = Date.now();
  const row = hits.get(ip);
  if (!row || now - row.start > windowMs) {
    hits.set(ip, { count: 1, start: now });
    return true;
  }

  if (row.count >= max) return false;
  row.count += 1;
  return true;
};
