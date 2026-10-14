import RUTAS from "./rutas-paginas.json";

/**
 * Slugs traducidos. Las rutas internas de la web se escriben en español
 * (`/precios`, `/contacto`, `/informe-fiscal-criptomonedas`…); al pintar un
 * enlace se traduce el primer segmento al idioma de la página. Las páginas de
 * servicio se sirven con su slug local desde `[pagina]`; las páginas fijas,
 * con una reescritura de next.config.mjs a su carpeta en español.
 */

type Idioma = "es" | "en" | "ca";
const TABLA = RUTAS as Record<string, Record<Idioma, string>>;

/** `/precios#faq` en inglés → `/pricing#faq`. Lo que no está en la tabla queda igual. */
export function localizarRuta(href: string, locale: string): string {
  if (!href.startsWith("/") || /^\/(es|en|ca)(\/|$)/.test(href)) return href;
  const m = href.match(/^\/([^/?#]+)(.*)$/);
  if (!m) return href;
  const local = TABLA[m[1]]?.[locale as Idioma];
  return local ? `/${local}${m[2]}` : href;
}

/** La misma ruta (sin idioma) en otro idioma: `/pricing` de en a es → `/precios`. */
export function traducirRuta(ruta: string, de: string, a: string): string {
  const m = ruta.match(/^\/([^/?#]+)(.*)$/);
  if (!m) return ruta;
  const entrada = Object.values(TABLA).find((r) => r[de as Idioma] === m[1]);
  return entrada ? `/${entrada[a as Idioma]}${m[2]}` : ruta;
}
