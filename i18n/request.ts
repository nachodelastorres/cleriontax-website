import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from '../locales';
import { notFound } from 'next/navigation';

// Re-export locales and Locale type for use in other files
export { locales, type Locale };

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is valid
  // Use defaultLocale as fallback instead of notFound() to avoid 404 during build
  const validLocale = (locale && locales.includes(locale as Locale))
    ? locale
    : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});
