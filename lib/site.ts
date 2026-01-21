/**
 * Site Configuration - Canonical URL Management
 *
 * IMPORTANTE: La URL base DEBE ser la URL final que devuelve 200 OK.
 * Vercel redirige cleriontax.com → www.cleriontax.com
 * Por lo tanto, usamos www.cleriontax.com como URL canónica.
 */

/** Locales soportados */
export const LOCALES = ['es', 'en', 'ca'] as const;
export type Locale = (typeof LOCALES)[number];

/** Locale por defecto */
export const DEFAULT_LOCALE: Locale = 'es';

/**
 * URL base del sitio - SIEMPRE con www
 * Lee de env var o usa el fallback con www
 * Normaliza: https, www, sin trailing slash
 */
function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!envUrl) {
    return 'https://www.cleriontax.com';
  }

  try {
    // Asegurar que tiene protocolo para poder parsear
    let urlString = envUrl.trim();
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      urlString = `https://${urlString}`;
    }

    const parsed = new URL(urlString);

    // Forzar https
    parsed.protocol = 'https:';

    // Forzar www si es cleriontax.com sin www
    if (parsed.hostname === 'cleriontax.com') {
      parsed.hostname = 'www.cleriontax.com';
    }

    // Devolver origin (https://www.cleriontax.com) sin trailing slash ni pathname
    return parsed.origin;
  } catch {
    // Si falla el parsing, usar fallback seguro
    return 'https://www.cleriontax.com';
  }
}

/** URL base canónica del sitio */
export const SITE_URL = getBaseUrl();

/** Nombre del sitio */
export const SITE_NAME = 'Cleriontax';

/**
 * Une partes de URL evitando dobles barras
 * @param base - URL base
 * @param parts - Partes a unir
 * @returns URL completa sin dobles barras ni trailing slash
 */
export function joinUrl(base: string, ...parts: string[]): string {
  let result = base.endsWith('/') ? base.slice(0, -1) : base;

  for (const part of parts) {
    if (!part) continue;
    const cleanPart = part.startsWith('/') ? part : `/${part}`;
    result += cleanPart;
  }

  // Quitar trailing slash final (excepto si es solo el origin)
  if (result.endsWith('/') && result.length > SITE_URL.length + 1) {
    result = result.slice(0, -1);
  }

  return result;
}

/**
 * Genera la URL canónica para una página
 * @param locale - Idioma de la página (es, en, ca)
 * @param path - Ruta relativa SIN locale (ej: '/blog/mi-post' o 'blog/mi-post')
 * @returns URL canónica completa sin query params, sin hash, sin trailing slash
 *
 * IMPORTANTE: path NO debe incluir el locale. Si se pasa '/es/blog/hola',
 * se detectará y se quitará el locale duplicado.
 */
export function canonicalFor(locale: Locale, path?: string): string {
  // Caso base: sin path o path vacío
  if (!path || path === '' || path === '/') {
    return `${SITE_URL}/${locale}`;
  }

  // Normalizar path: debe empezar con /
  let normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Quitar query params y hash
  normalizedPath = normalizedPath.split('?')[0].split('#')[0];

  // Quitar trailing slash
  if (normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  // IMPORTANTE: Detectar y quitar locale duplicado al inicio del path
  // Si alguien pasa '/es/blog/hola', quitamos '/es' para evitar /es/es/blog/hola
  const localePattern = new RegExp(`^/(${LOCALES.join('|')})(/|$)`);
  if (localePattern.test(normalizedPath)) {
    normalizedPath = normalizedPath.replace(localePattern, '$2');
    // Si quedó vacío después de quitar locale, es la home
    if (!normalizedPath || normalizedPath === '/') {
      return `${SITE_URL}/${locale}`;
    }
    // Asegurar que empiece con /
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = `/${normalizedPath}`;
    }
  }

  return `${SITE_URL}/${locale}${normalizedPath}`;
}

/**
 * Genera las URLs alternativas para hreflang
 * @param path - Ruta relativa (sin locale)
 * @returns Objeto con URLs por locale
 */
export function alternatesFor(path?: string): Record<Locale, string> {
  return {
    es: canonicalFor('es', path),
    en: canonicalFor('en', path),
    ca: canonicalFor('ca', path),
  };
}

/**
 * Genera objeto alternates completo para metadata de Next.js
 * @param locale - Locale actual
 * @param path - Ruta relativa (sin locale)
 * @returns Objeto alternates con canonical y languages
 */
export function getAlternates(locale: Locale, path?: string) {
  return {
    canonical: canonicalFor(locale, path),
    languages: alternatesFor(path),
  };
}
