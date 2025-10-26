import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './locales';

const nextIntl = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true
});

export default async function proxy(request: Request) {
  try {
    return await (nextIntl as any)(request);
  } catch (err) {
    console.error('Proxy (next-intl) error:', err);
    // Evitar 500: reintentar pasar la petición al handler normal
    return fetch(request);
  }
}
