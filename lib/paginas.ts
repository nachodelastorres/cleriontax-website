import type { NombreForma } from "@/components/secciones/Bloques";
import RUTAS from "./rutas-paginas.json";

/**
 * Las páginas de servicio — una por intención de búsqueda.
 *
 * Sustituyen a las antiguas capas de servicios y situaciones, que competían
 * por las mismas keywords. La regla es una keyword, una URL: lo que alguien
 * busca para contratar vive aquí, y lo que busca para entender vive en el
 * blog. Ninguna de estas páginas comparte keyword principal con otra ni con
 * un artículo.
 *
 * Viven en la raíz (`/declarar-criptomonedas`, no `/servicios/...`) para que
 * la URL sea la keyword tal cual. El contenido de cada una está en
 * `messages/paginas/{locale}/{slug}.json`.
 *
 * El menú, la home, el pie y el sitemap se construyen desde este registro.
 */

/** La pregunta con la que llega el cliente; agrupa las páginas en la home. */
export type Grupo = "cifra" | "aeat" | "declarar";

export interface Pagina {
  slug: string;
  grupo: Grupo;
  /** Forma del símbolo que la identifica (manual §08). */
  forma: NombreForma;
  /** Hay un plazo administrativo corriendo: el teléfono va por delante. */
  urgente: boolean;
  /** Muestra las tarifas de reconciliación. */
  tarifas: boolean;
  /** Artículos del blog que la sostienen por debajo. */
  articulos: string[];
}

export const PAGINAS: Pagina[] = [
  // --- ¿Cuánto he ganado o perdido? ---
  {
    slug: "informe-fiscal-criptomonedas",
    grupo: "cifra",
    forma: "arco",
    urgente: false,
    tarifas: true,
    articulos: [
      "limpiar-datasets-cripto-antes-declarar",
      "clasificar-operaciones-criptomonedas",
      "como-exportar-historial-binance-correctamente",
    ],
  },
  {
    slug: "revisar-informe-koinly-cointracking",
    grupo: "cifra",
    forma: "angulo",
    urgente: false,
    tarifas: true,
    articulos: [
      "herramientas-rastrear-criptomonedas",
      "limpiar-datasets-cripto-antes-declarar",
      "clasificar-operaciones-criptomonedas",
    ],
  },

  // --- ¿Cómo lo justifico ante la AEAT? ---
  {
    slug: "requerimiento-hacienda-criptomonedas",
    grupo: "aeat",
    forma: "cuarto",
    urgente: true,
    tarifas: true,
    articulos: [
      "errores-declarar-criptomonedas",
      "directiva-dac8-criptomonedas-exchanges-hacienda",
      "como-documentar-transacciones-defi-hacienda",
    ],
  },
  {
    slug: "inspeccion-hacienda-criptomonedas",
    grupo: "aeat",
    forma: "cuarto",
    urgente: true,
    // Se presupuesta a medida: no hay tabla que aplicar.
    tarifas: false,
    articulos: [
      "como-documentar-transacciones-defi-hacienda",
      "errores-declarar-criptomonedas",
      "dac8-guia-practica-inversores-cripto",
    ],
  },
  {
    slug: "regularizar-criptomonedas",
    grupo: "aeat",
    forma: "cuarto",
    // Regularizar es adelantarse: todavía no hay plazo de la AEAT corriendo.
    urgente: false,
    tarifas: true,
    articulos: [
      "errores-declarar-criptomonedas",
      "perdidas-criptomonedas-compensar-declaracion",
      "modelos-100-721-714-criptomonedas",
    ],
  },

  // --- ¿Cómo lo declaro? ---
  {
    slug: "declarar-criptomonedas",
    grupo: "declarar",
    forma: "inverso",
    urgente: false,
    tarifas: true,
    articulos: [
      "errores-declarar-criptomonedas",
      "perdidas-criptomonedas-compensar-declaracion",
      "fiscalidad-defi-espana",
    ],
  },
  {
    slug: "modelo-721-criptomonedas",
    grupo: "declarar",
    forma: "inverso",
    urgente: false,
    // La 721 informa de saldos, no exige reconciliar: se presupuesta aparte.
    tarifas: false,
    articulos: [
      "modelos-100-721-714-criptomonedas",
      "modelo-714-criptomonedas-patrimonio",
      "directiva-dac8-criptomonedas-exchanges-hacienda",
    ],
  },
];

export const SLUGS_PAGINA = PAGINAS.map((p) => p.slug);

export const GRUPOS: Grupo[] = ["cifra", "aeat", "declarar"];

export function getPagina(slug: string): Pagina | undefined {
  return PAGINAS.find((p) => p.slug === slug);
}

export function porGrupo(): Record<Grupo, Pagina[]> {
  return {
    cifra: PAGINAS.filter((p) => p.grupo === "cifra"),
    aeat: PAGINAS.filter((p) => p.grupo === "aeat"),
    declarar: PAGINAS.filter((p) => p.grupo === "declarar"),
  };
}

/* ------------------------------------------------------- Slugs por idioma */

type Idioma = "es" | "en" | "ca";

/**
 * Cada página tiene su slug en cada idioma (`rutas-paginas.json`, que también
 * lee next.config.mjs para las redirecciones). `slug` es el identificador
 * interno y coincide con el español; los contenidos se guardan con él.
 */
export function slugLocal(slugEs: string, locale: string): string {
  const rutas = (RUTAS as Record<string, Record<Idioma, string>>)[slugEs];
  return rutas?.[locale as Idioma] ?? slugEs;
}

/** La ruta de una página en un idioma, sin el prefijo del idioma. */
export function rutaPagina(slugEs: string, locale: string): string {
  return `/${slugLocal(slugEs, locale)}`;
}

/** Las rutas de una página en los tres idiomas, para hreflang. */
export function rutasPagina(slugEs: string): Record<Idioma, string> {
  return { es: rutaPagina(slugEs, "es"), en: rutaPagina(slugEs, "en"), ca: rutaPagina(slugEs, "ca") };
}

/** La página a la que corresponde un slug en un idioma concreto. */
export function paginaPorSlug(slug: string, locale: string): Pagina | undefined {
  return PAGINAS.find((p) => slugLocal(p.slug, locale) === slug);
}
