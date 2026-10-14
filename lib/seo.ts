import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, canonicalFor, getAlternates, type Locale } from "@/lib/site";

/**
 * Metadatos de página, en un solo sitio.
 *
 * Antes cada página montaba los suyos y se habían ido separando: la marca
 * escrita a mano con formatos distintos, Open Graph sin imagen —Next no fusiona
 * el openGraph del layout con el de la página—, og:locale como «es» en vez de
 * «es_ES» y páginas sin URL propia en Open Graph.
 *
 * Ahora la marca la añade la plantilla del layout («%s | Cleriontax»), así que
 * el título de cada página va sin ella.
 */

/** Imagen por defecto al compartir: 1200×630, la medida que piden todas las redes. */
export const OG_IMAGEN = {
  url: `${SITE_URL}/images/og/cleriontax.png`,
  width: 1200,
  height: 630,
  alt: "Cleriontax · Fiscalidad de criptomonedas e inversiones",
};

const OG_LOCALE: Record<Locale, string> = { es: "es_ES", en: "en_GB", ca: "ca_ES" };

export function ogLocale(locale: Locale) {
  return OG_LOCALE[locale];
}

/** Quita la marca de un título escrito a mano: la pone la plantilla. */
export function sinMarca(titulo: string) {
  return titulo.replace(/\s*[|\-–—]\s*(Blog\s+)?Cleriontax\s*$/i, "").trim();
}

/** Recorta una descripción a ~158 caracteres sin partir palabras. */
export function recortar(texto: string, max = 158) {
  const limpio = texto.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (limpio.length <= max) return limpio;
  const corte = limpio.slice(0, max - 1);
  return `${corte.slice(0, corte.lastIndexOf(" "))}…`;
}

export function metaPagina({
  locale,
  ruta,
  titulo,
  descripcion,
  keywords,
  imagen = OG_IMAGEN,
  tipo = "website",
}: {
  locale: string;
  /** Ruta sin idioma, o una por idioma si el slug está traducido. */
  ruta?: string | Record<Locale, string>;
  titulo: string;
  descripcion: string;
  keywords?: string[];
  imagen?: { url: string; width?: number; height?: number; alt?: string };
  tipo?: "website" | "article";
}): Metadata {
  const loc = locale as Locale;
  const alternates = getAlternates(loc, ruta);
  const limpio = sinMarca(titulo);
  const url = canonicalFor(loc, typeof ruta === "object" ? ruta[loc] : ruta);
  const img = { ...imagen, url: imagen.url.startsWith("http") ? imagen.url : `${SITE_URL}${imagen.url}` };

  return {
    title: limpio,
    description: descripcion,
    ...(keywords ? { keywords } : {}),
    alternates,
    openGraph: {
      title: limpio,
      description: descripcion,
      url,
      siteName: SITE_NAME,
      locale: ogLocale(loc),
      type: tipo,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: limpio,
      description: descripcion,
      images: [img.url],
    },
  };
}
