import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['es', 'en', 'ca'],

  // Used when no locale matches
  defaultLocale: 'es',

  // Always show locale prefix in URL
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ca|en|es)/:path*']
};
