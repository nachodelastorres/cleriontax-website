import { rutaPagina } from "@/lib/paginas";

/**
 * A qué página de servicio lleva cada cluster del blog.
 *
 * A quien está leyendo un artículo no se le pide contratar: se le lleva a la
 * página que resuelve el caso del que estaba leyendo. El destino depende del
 * tema, no de una regla única para todo el blog.
 */
export const SERVICIO_POR_CLUSTER: Record<string, string> = {
  // Tributación general y modelos: el grueso del blog.
  "fiscalidad-criptomonedas": "/declarar-criptomonedas",
  // DeFi, staking, pools: casos que exigen reconstruir la operativa.
  "fiscalidad-defi-avanzada": "/informe-fiscal-criptomonedas",
  // Pipelines, limpieza de datos, clasificación: el método en estado puro.
  "ingenieria-datos-fiscalidad": "/informe-fiscal-criptomonedas",
  // Cómo exportar históricos: quien llega aquí está reuniendo sus datos.
  "guias-practicas-especificas": "/informe-fiscal-criptomonedas",
};

/** Artículos cuyo tema pide otra página, por encima de su cluster. */
const POR_ARTICULO: Record<string, string> = {
  "errores-declarar-criptomonedas": "/regularizar-criptomonedas",
  "herramientas-rastrear-criptomonedas": "/revisar-informe-koinly-cointracking",
  "modelos-100-721-714-criptomonedas": "/modelo-721-criptomonedas",
  "modelo-714-criptomonedas-patrimonio": "/modelo-721-criptomonedas",
  "directiva-dac8-criptomonedas-exchanges-hacienda": "/requerimiento-hacienda-criptomonedas",
};

export function servicioSugerido(slug: string, cluster?: string, locale = "es"): string {
  const ruta =
    POR_ARTICULO[slug] ??
    (cluster ? SERVICIO_POR_CLUSTER[cluster] : undefined) ??
    "/precios";
  // Todas tienen el slug traducido, también /precios.
  return rutaPagina(ruta.slice(1), locale);
}
