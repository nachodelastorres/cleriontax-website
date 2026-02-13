import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './locales';

// Crear middleware base de next-intl SIN alternate links automáticos
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  // Deshabilitar headers Link automáticos - los manejamos manualmente en metadata
  alternateLinks: false
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Detectar URLs con locale duplicado (ej: /es/es/blog, /en/es/algo)
  // Patrón: /{locale}/{locale}/ donde el segundo segmento también es un locale válido
  const localePattern = new RegExp(`^/(${locales.join('|')})/(${locales.join('|')})(/|$)`);
  const match = pathname.match(localePattern);

  if (match) {
    // URL tiene locale duplicado - devolver 404 limpio sin headers Link
    return new NextResponse(null, { status: 404 });
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};
