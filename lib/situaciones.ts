/**
 * Registro de las situaciones — capa 2 de la arquitectura.
 *
 * Las landings no se organizan por servicio sino por las tres preguntas con
 * las que llega la gente:
 *
 *   P1  ¿Cuánto he ganado o perdido?
 *   P2  ¿Cómo lo justifico ante la AEAT?
 *   P3  ¿Cómo lo declaro?
 *
 * Cada situación declara aquí a qué pregunta pertenece, a qué línea de
 * servicio sube y si trae plazo administrativo, porque de eso depende la
 * temperatura del CTA: con una fecha corriendo, el canal directo va delante
 * del formulario.
 *
 * El campo `volumen` es la estimación propia de septiembre de 2026, pendiente
 * de sustituir por datos de herramienta. Solo se usa para ordenar.
 */

export type Pregunta = "P1" | "P2" | "P3";

export interface Situacion {
  slug: string;
  pregunta: Pregunta;
  /** Línea de servicio a la que sube la landing. */
  servicio: string;
  /** Hay plazo administrativo corriendo: el teléfono va por delante. */
  urgente: boolean;
  /** Búsquedas/mes estimadas. Provisional. */
  volumen: number;
  /** Artículos del blog que la sostienen por debajo. */
  articulos: string[];
}

export const SITUACIONES: Situacion[] = [
  // --- P2 · procedimientos abiertos. El bloque de más valor. ---
  {
    slug: "requerimiento-de-hacienda",
    pregunta: "P2",
    servicio: "litigacion-fiscal-criptomonedas",
    urgente: true,
    volumen: 510,
    articulos: ["inspeccion-hacienda-criptomonedas", "errores-declarar-criptomonedas"],
  },
  {
    slug: "recurrir-una-sancion",
    pregunta: "P2",
    servicio: "litigacion-fiscal-criptomonedas",
    urgente: true,
    volumen: 470,
    articulos: ["inspeccion-hacienda-criptomonedas"],
  },
  {
    slug: "regularizar-anos-anteriores",
    pregunta: "P2",
    servicio: "litigacion-fiscal-criptomonedas",
    urgente: true,
    volumen: 380,
    articulos: ["errores-declarar-criptomonedas", "modelos-100-721-714-criptomonedas"],
  },
  {
    slug: "errores-en-mi-informe-automatico",
    pregunta: "P1",
    servicio: "informe-fiscal-criptomonedas",
    urgente: false,
    volumen: 330,
    articulos: ["limpiar-datasets-cripto-antes-declarar", "clasificar-operaciones-criptomonedas"],
  },
  {
    slug: "inspeccion-por-criptomonedas",
    pregunta: "P2",
    servicio: "litigacion-fiscal-criptomonedas",
    urgente: true,
    volumen: 210,
    articulos: ["inspeccion-hacienda-criptomonedas", "directiva-dac8-criptomonedas-exchanges-hacienda"],
  },
  {
    slug: "miles-de-transacciones",
    pregunta: "P1",
    servicio: "informe-fiscal-criptomonedas",
    urgente: false,
    volumen: 790,
    articulos: [
      "limpiar-datasets-cripto-antes-declarar",
      "pipeline-etl-fiscalidad-cripto",
      "herramientas-rastrear-criptomonedas",
    ],
  },

  // --- P3 · declarativas. Estacionales, más volumen y más competencia. ---
  {
    slug: "declarar-criptomonedas",
    pregunta: "P3",
    servicio: "declarar-criptomonedas",
    urgente: false,
    volumen: 4530,
    articulos: [
      "como-declarar-criptomonedas-renta-2025",
      "guia-completa-declaracion-fiscal-criptomonedas-2025",
      "errores-declarar-criptomonedas",
    ],
  },
  {
    slug: "modelo-721",
    pregunta: "P3",
    servicio: "asesoria-fiscal-criptomonedas",
    urgente: false,
    volumen: 1280,
    articulos: ["modelo-721-criptomonedas", "modelos-100-721-714-criptomonedas"],
  },
  {
    slug: "defi-staking-airdrops",
    pregunta: "P3",
    servicio: "informe-fiscal-criptomonedas",
    urgente: false,
    volumen: 2100,
    articulos: [
      "fiscalidad-defi-espana",
      "yield-farming-como-tributa-espana",
      "liquidity-pools-lp-tokens-fiscalidad-espana",
      "lending-borrowing-tributacion-espana",
    ],
  },
  {
    slug: "compensar-perdidas",
    pregunta: "P1",
    servicio: "declarar-criptomonedas",
    urgente: false,
    volumen: 180,
    articulos: ["perdidas-criptomonedas-compensar-declaracion"],
  },
];

export const SLUGS_SITUACION = SITUACIONES.map((s) => s.slug);

export function getSituacion(slug: string): Situacion | undefined {
  return SITUACIONES.find((s) => s.slug === slug);
}

/** Situaciones agrupadas por pregunta, en el orden del hub. */
export function porPregunta(): Record<Pregunta, Situacion[]> {
  return {
    P1: SITUACIONES.filter((s) => s.pregunta === "P1"),
    P2: SITUACIONES.filter((s) => s.pregunta === "P2"),
    P3: SITUACIONES.filter((s) => s.pregunta === "P3"),
  };
}

/**
 * Situaciones que tienen contenido escrito y por tanto pueden publicarse.
 *
 * El registro de arriba es el plan completo; esto es lo que existe hoy. El hub
 * y el sitemap se construyen desde aquí para no enlazar nunca a una landing
 * que todavía no está redactada.
 *
 * Al añadir el JSON de una situación, se añade su slug a esta lista.
 */
export const SITUACIONES_PUBLICADAS = new Set<string>([
  "requerimiento-de-hacienda",
  "recurrir-una-sancion",
  "regularizar-anos-anteriores",
  "errores-en-mi-informe-automatico",
  "inspeccion-por-criptomonedas",
  "miles-de-transacciones",
  "declarar-criptomonedas",
  "modelo-721",
  "defi-staking-airdrops",
  "compensar-perdidas",
]);

export function estaPublicada(slug: string): boolean {
  return SITUACIONES_PUBLICADAS.has(slug);
}

/** Solo las que se pueden enlazar hoy, en el orden del registro. */
export const SITUACIONES_VIVAS = SITUACIONES.filter((s) => estaPublicada(s.slug));
