import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const isDev = process.env.NODE_ENV !== 'production';

const r2Host = (() => {
  try {
    return process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL).host : null;
  } catch {
    return null;
  }
})();

const imgSrc = [
  "'self'",
  'data:',
  'blob:',
  r2Host ? `https://${r2Host}` : null,
]
  .filter(Boolean)
  .join(' ');

const connectSrc = [
  "'self'",
  isDev ? 'ws:' : null,
  isDev ? 'http:' : null,
  isDev ? 'https:' : null,
  r2Host ? `https://${r2Host}` : null,
]
  .filter(Boolean)
  .join(' ');

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `img-src ${imgSrc}`,
  "font-src 'self' data:",
  `script-src 'self' ${isDev ? "'unsafe-eval'" : ''} 'unsafe-inline'`,
  "style-src 'self' 'unsafe-inline'",
  `connect-src ${connectSrc}`,
  "manifest-src 'self'",
  'upgrade-insecure-requests',
]
  .filter(Boolean)
  .join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['zod'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: r2Host ? [{ protocol: 'https', hostname: r2Host, pathname: '/**' }] : [],
  },
  async headers() {
    return [
      {
        source: '/((?!admin|api).*)',
        headers: securityHeaders,
      },
      {
        // Admin: CSP mais permissiva (o admin Payload usa seus próprios inline styles/scripts).
        source: '/admin/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
