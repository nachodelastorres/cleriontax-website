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
