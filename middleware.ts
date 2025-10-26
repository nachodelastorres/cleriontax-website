import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Lista de locales soportados
  locales,

  // Locale por defecto
  defaultLocale,

  // Estrategia de prefijo de locale en URLs
  // 'as-needed' = solo mostrar prefijo para idiomas no predeterminados
  // 'always' = siempre mostrar prefijo (recomendado para SEO)
  localePrefix: 'always'
});

export const config = {
  // Matcher para que el middleware se ejecute en todas las rutas excepto:
  // - API routes
  // - _next (archivos estáticos de Next.js)
  // - archivos con extensión (favicon.ico, etc.)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
