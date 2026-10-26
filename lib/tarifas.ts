/**
 * Tramos de precio de la reconciliación.
 *
 * El precio lo marca cuántas fuentes de datos hay que casar, no cuánto se ha
 * ganado ni cuántas operaciones hay. Los nombres y las descripciones viven en
 * el namespace `tarifas`; aquí solo el importe, para que no pueda discrepar
 * entre idiomas ni entre páginas.
 */
export interface Tarifa {
  id: "plataforma" | "multiexchange" | "mixta" | "compleja";
  /** Euros. */
  precio: number;
  /** El importe es un mínimo: se cierra al ver los datos. */
  desde?: boolean;
}

export const TARIFAS: Tarifa[] = [
  { id: "plataforma", precio: 250 },
  { id: "multiexchange", precio: 350 },
  { id: "mixta", precio: 450 },
  { id: "compleja", precio: 700, desde: true },
];

/**
 * Modelo 721, por ejercicio. No sigue los tramos: informa de saldos, no exige
 * reconciliar la operativa.
 */
export const PRECIO_721 = 450;

/**
 * Presentar la renta completa (no solo la parte cripto), por declaración; una
 * conjunta cuenta como una. Nunca va dentro de los tramos: es opcional.
 */
export const PRECIO_RENTA = 150;
