import { getRequestConfig } from 'next-intl/server';

// Idiomas soportados
export const locales = ['es', 'en', 'ca'] as const;
export type Locale = typeof locales[number];

// Idioma por defecto
export const defaultLocale: Locale = 'es';

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale sea uno de los soportados
  if (!locale || !locales.includes(locale as Locale)) {
    return {
      locale: defaultLocale,
      messages: (await import(`./messages/${defaultLocale}.json`)).default
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
