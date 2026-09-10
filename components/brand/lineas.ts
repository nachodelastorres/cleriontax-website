import { Angulo, AnguloInverso, Arco, CuartoDeCirculo } from "@/components/brand/Formas";

/**
 * Las cuatro líneas de servicio y la forma del símbolo que identifica a cada
 * una (manual v1.1, §02 y §08).
 *
 * La correspondencia no es arbitraria: el manual da un significado a cada
 * forma, y cada línea toma la que le corresponde.
 *
 *   Arco              «El proceso: limpieza y conciliación que curva el dato
 *                      hasta encajarlo» -> el informe fiscal.
 *   Ángulo inverso    «El resultado: el mismo ángulo, ya cerrado sobre el
 *                      informe» -> la declaración.
 *   Cuarto de círculo «El criterio fiscal. La única pieza en rojo y la única
 *                      que decide» -> la litigación, que es defender un criterio.
 *   Ángulo            «El dato en bruto, tal como llega del exchange» -> la
 *                      asesoría continuada, por donde entra la operativa nueva.
 *
 * Vive en un solo sitio para que la rejilla de servicios y los bloques de
 * servicios relacionados no puedan discrepar.
 */
export const LINEAS_SERVICIO = {
  "informe-fiscal-criptomonedas": {
    Forma: Arco,
    acento: false,
    // Quien busca un informe tiene datos, no un plazo: se le pide el diagnóstico.
    urgente: false,
  },
  "declarar-criptomonedas": {
    Forma: AnguloInverso,
    acento: false,
    urgente: false,
  },
  "litigacion-fiscal-criptomonedas": {
    Forma: CuartoDeCirculo,
    acento: true,
    // Aquí siempre hay una fecha corriendo: el canal directo va por delante.
    urgente: true,
  },
  "asesoria-fiscal-criptomonedas": {
    Forma: Angulo,
    acento: false,
    urgente: false,
  },
} as const;

export type SlugServicio = keyof typeof LINEAS_SERVICIO;

/** Orden canónico de las cuatro líneas, tal como aparecen en el manual. */
export const ORDEN_LINEAS = Object.keys(LINEAS_SERVICIO) as SlugServicio[];

export function formaDeLinea(slug: string) {
  return LINEAS_SERVICIO[slug as SlugServicio];
}
