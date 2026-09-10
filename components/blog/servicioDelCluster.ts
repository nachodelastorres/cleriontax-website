/**
 * A qué línea de servicio lleva cada cluster del blog.
 *
 * Es la escalera de temperatura del plan: a quien está leyendo un artículo no
 * se le pide contratar, se le lleva a ver cómo se resuelve su caso. El destino
 * depende de lo que estaba leyendo, no de una regla única para todo el blog.
 *
 * Cuando exista la capa de situaciones, este mapeo apuntará ahí en lugar de
 * al servicio: es el único punto que habrá que cambiar.
 */
export const SERVICIO_POR_CLUSTER: Record<string, string> = {
  // Tributación general, modelos, inspecciones: el grueso del blog.
  "fiscalidad-criptomonedas": "/servicios/declarar-criptomonedas",
  // DeFi, staking, pools: casos que exigen reconstruir la operativa.
  "fiscalidad-defi-avanzada": "/servicios/informe-fiscal-criptomonedas",
  // Pipelines, limpieza de datos, clasificación: el método en estado puro.
  "ingenieria-datos-fiscalidad": "/servicios/informe-fiscal-criptomonedas",
  // Cómo exportar históricos: quien llega aquí está reuniendo sus datos.
  "guias-practicas-especificas": "/servicios/informe-fiscal-criptomonedas",
};

/** Artículos cuyo tema pide litigación, por encima de su cluster. */
const POR_ARTICULO: Record<string, string> = {
  "inspeccion-hacienda-criptomonedas": "/servicios/litigacion-fiscal-criptomonedas",
  "errores-declarar-criptomonedas": "/servicios/litigacion-fiscal-criptomonedas",
};

export function servicioSugerido(slug: string, cluster?: string): string {
  return (
    POR_ARTICULO[slug] ??
    (cluster ? SERVICIO_POR_CLUSTER[cluster] : undefined) ??
    "/servicios"
  );
}
