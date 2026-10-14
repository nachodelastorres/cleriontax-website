import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from '../locales';
import { notFound } from 'next/navigation';

// Re-export locales and Locale type for use in other files
export { locales, type Locale };

/*
 * next-intl 4: el idioma llega en `requestLocale`, que lee el que cada página
 * fija con setRequestLocale. El antiguo `locale` llegaba vacío y todo lo que
 * se generaba en el servidor sin idioma explícito —los enlaces de `Link`, por
 * ejemplo— caía al español: las páginas en inglés y catalán enlazaban a /es.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) {
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default
    };
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
