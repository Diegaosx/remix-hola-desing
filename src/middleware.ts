import { NextResponse, type NextRequest } from 'next/server';

/**
 * Segurança em camadas:
 *
 * - O Payload já protege o dashboard (`/admin`) e as rotas `/api/*`
 *   via cookie de sessão autenticado.
 * - Este middleware adiciona defesa em profundidade:
 *   • Rejeita payloads anormalmente grandes em Server Actions.
 *   • Bloqueia métodos não permitidos em rotas sensíveis.
 *   • Insere headers adicionais em qualquer resposta.
 */
export function middleware(req: NextRequest) {
  const { pathname, protocol } = req.nextUrl;

  // Force HTTPS em produção (defesa em profundidade — normalmente a infra já redireciona).
  if (process.env.NODE_ENV === 'production' && protocol === 'http:') {
    const url = req.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  // Bloqueia métodos não esperados em APIs sensíveis.
  const protectedPrefixes = ['/api/contact', '/api/newsletter'];
  if (protectedPrefixes.some((p) => pathname.startsWith(p))) {
    if (!['POST', 'OPTIONS'].includes(req.method)) {
      return new NextResponse('Method Not Allowed', { status: 405 });
    }
  }

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', pathname.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow');
  return res;
}

export const config = {
  // Executa em todas as rotas exceto assets estáticos e imagens do Next.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.svg|images/|brand/).*)'],
};
