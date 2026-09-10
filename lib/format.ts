/**
 * Formato de datos — Manual de marca Cleriontax v1.0, §16 «Léxico y datos».
 *
 * Formato español en toda pieza y todo canal:
 *   Importes        12.480,37 €
 *   Porcentajes     21 %
 *   Fechas          14/01/2026 · 14 de enero de 2026
 *   Hash abreviado  0x7a3f…c91b
 *   Rangos          3–5 días   (guion medio, no guion corto)
 *
 * Coma decimal, punto de millar y espacio fino irrompible (U+202F) antes de € y %.
 * El espacio fino evita que el símbolo salte de línea separado de su cifra.
 */

/** Espacio fino irrompible: separa la cifra de € y % sin permitir un salto de línea. */
const ESPACIO_FINO = " ";

/** Guion medio, reservado para rangos (§16). */
const GUION_MEDIO = "–";

/** Puntos suspensivos de un solo carácter, para hashes abreviados. */
const ELIPSIS = "…";

const LOCALE = "es-ES";

/**
 * Importe en euros: `12.480,37 €`.
 * Siempre con dos decimales, porque cada decimal cuenta en una declaración.
 */
export function formatearImporte(valor: number, decimales = 2): string {
  const cifra = new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(valor);

  return `${cifra}${ESPACIO_FINO}€`;
}

/**
 * Importe con signo explícito, para tablas de resultados donde una pérdida
 * tiene que leerse como pérdida: `−6.117,80 €`.
 * Usa el signo menos tipográfico (U+2212), no el guion del teclado.
 */
export function formatearImporteConSigno(valor: number, decimales = 2): string {
  const absoluto = formatearImporte(Math.abs(valor), decimales);
  if (valor < 0) return `−${absoluto}`;
  if (valor > 0) return `+${absoluto}`;
  return absoluto;
}

/** Porcentaje: `21 %`. El símbolo va separado por espacio fino. */
export function formatearPorcentaje(valor: number, decimales = 0): string {
  const cifra = new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(valor);

  return `${cifra}${ESPACIO_FINO}%`;
}

/** Número sin unidad, con punto de millar: `12.480`. Para recuentos de operaciones. */
export function formatearNumero(valor: number, decimales = 0): string {
  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(valor);
}

/** Fecha corta: `14/01/2026`. Para tablas y metadatos. */
export function formatearFechaCorta(fecha: Date | string): string {
  const d = typeof fecha === "string" ? new Date(fecha) : fecha;
  return new Intl.DateTimeFormat(LOCALE, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

/** Fecha larga: `14 de enero de 2026`. Para texto corrido. */
export function formatearFechaLarga(fecha: Date | string): string {
  const d = typeof fecha === "string" ? new Date(fecha) : fecha;
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Hash abreviado: `0x7a3f…c91b`.
 * Mantiene el prefijo `0x` fuera del recuento de caracteres visibles.
 */
export function abreviarHash(hash: string, inicio = 4, fin = 4): string {
  const prefijo = hash.startsWith("0x") ? "0x" : "";
  const cuerpo = prefijo ? hash.slice(2) : hash;

  if (cuerpo.length <= inicio + fin) return hash;

  return `${prefijo}${cuerpo.slice(0, inicio)}${ELIPSIS}${cuerpo.slice(-fin)}`;
}

/** Rango con guion medio: `3–5 días`. */
export function formatearRango(desde: number, hasta: number, unidad?: string): string {
  const base = `${formatearNumero(desde)}${GUION_MEDIO}${formatearNumero(hasta)}`;
  return unidad ? `${base} ${unidad}` : base;
}

/** Ejercicio fiscal, siempre en minúscula y sin abreviar: `ejercicio 2025`. */
export function formatearEjercicio(anio: number): string {
  return `ejercicio ${anio}`;
}
