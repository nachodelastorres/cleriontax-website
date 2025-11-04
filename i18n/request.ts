import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from '../locales';
import { notFound } from 'next/navigation';

// Re-export locales and Locale type for use in other files
export { locales, type Locale };

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
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
