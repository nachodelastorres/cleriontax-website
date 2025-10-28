import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from '../locales';
import { notFound } from 'next/navigation';

// Re-export locales and Locale type for use in other files
export { locales, type Locale };

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
