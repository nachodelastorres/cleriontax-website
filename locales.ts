export const locales = ['es', 'en', 'ca'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'es';