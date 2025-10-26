import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './locales';

// Re-export locales and Locale type for use in other files
export { locales, type Locale };

export default getRequestConfig(async ({ locale }) => {
  // Handle Next.js 16 params as Promise
  const resolvedLocale = await locale;
  
  if (!resolvedLocale || !locales.includes(resolvedLocale as Locale)) {
    return {
      locale: defaultLocale,
      messages: (await import(`./messages/${defaultLocale}.json`)).default
    };
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
