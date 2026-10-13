"use client";

import { useMemo, useState } from "react";

/**
 * ¿Cuánto pagarás? — cuota de la base del ahorro.
 *
 * Aplica la escala del ahorro de 2025 (estatal y autonómica sumadas) a una
 * ganancia neta. Enseña el reparto por tramos, porque es lo que explica por qué
 * el tipo medio siempre queda por debajo del marginal.
 *
 * Es una estimación y lo dice: no suma otras rentas del ahorro, no compensa
 * pérdidas ni aplica deducciones.
 */

/** Escala del ahorro 2025: [hasta, tipo]. El último tramo no tiene techo. */
const TRAMOS: [number, number][] = [
  [6_000, 19],
  [50_000, 21],
  [200_000, 23],
  [300_000, 27],
  [Infinity, 30],
];

export interface TextosCuota {
  ganancia: string;
  cuota: string;
  tipoMedio: string;
  /** «hasta», «más de»: para las etiquetas de los tramos. */
  hasta: string;
  masDe: string;
  aviso: string;
}

export default function CalculadoraCuota({
  locale,
  textos,
  inicial = 10_000,
}: {
  locale: string;
  textos: TextosCuota;
  inicial?: number;
}) {
  const [texto, setTexto] = useState(String(inicial));
  const loc = locale === "en" ? "en-IE" : `${locale}-ES`;
  // En español Intl no agrupa las cifras de cuatro dígitos; aquí se quiere
  // siempre, para que 6.000 € y 50.000 € se lean igual.
  const miles = { useGrouping: "always" } as unknown as Intl.NumberFormatOptions;
  const euros = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", maximumFractionDigits: 0, ...miles });
  const euros2 = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", minimumFractionDigits: 2, ...miles });
  const pct = new Intl.NumberFormat(loc, { maximumFractionDigits: 1 });

  const ganancia = Math.max(0, Number(texto.replace(/[^\d]/g, "")) || 0);

  const reparto = useMemo(() => {
    let desde = 0;
    return TRAMOS.map(([hasta, tipo]) => {
      const base = Math.max(0, Math.min(ganancia, hasta) - desde);
      const fila = { desde, hasta, tipo, base, cuota: (base * tipo) / 100 };
      desde = hasta;
      return fila;
    });
  }, [ganancia]);

  const cuota = reparto.reduce((s, r) => s + r.cuota, 0);
  const medio = ganancia > 0 ? (cuota / ganancia) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* Entrada y resultado. */}
      <div className="border border-niebla bg-blanco p-7 md:p-8">
        <label htmlFor="ganancia" className="block text-nota text-pizarra">
          {textos.ganancia}
        </label>
        <div className="mt-2 flex items-center border border-azul bg-blanco focus-within:ring-2 focus-within:ring-rojo">
          <input
            id="ganancia"
            inputMode="numeric"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="h-14 w-full bg-transparent px-4 font-dato text-[28px] font-semibold text-azul focus:outline-none"
          />
          <span className="px-4 text-subtitulo text-pizarra">€</span>
        </div>

        <div className="mt-8 border-t border-niebla pt-6" aria-live="polite">
          <p className="text-nota text-pizarra">{textos.cuota}</p>
          <p className="mt-1 font-dato text-[44px] font-semibold leading-none tracking-[-0.03em] text-azul">
            {euros2.format(cuota)}
          </p>
          <p className="mt-3 text-nota text-pizarra">
            {textos.tipoMedio}: <span className="font-semibold text-azul">{pct.format(medio)} %</span>
          </p>
        </div>
      </div>

      {/* Reparto por tramos. */}
      <div className="border border-niebla bg-blanco p-7 md:p-8">
        <ul className="grid gap-3">
          {reparto.map((r) => {
            const ancho = r.hasta === Infinity ? 0 : r.hasta - r.desde;
            const lleno = r.hasta === Infinity ? (r.base > 0 ? 100 : 0) : (r.base / ancho) * 100;
            const etiqueta =
              r.hasta === Infinity
                ? `${textos.masDe} ${euros.format(r.desde)}`
                : `${textos.hasta} ${euros.format(r.hasta)}`;
            return (
              <li key={r.tipo} className="grid grid-cols-[3.5rem_1fr_6.5rem] items-center gap-3">
                <span className="font-dato text-subtitulo font-semibold text-azul">{r.tipo} %</span>
                <div>
                  <div className="h-3 bg-papel">
                    <div
                      className={`h-3 transition-all duration-300 ${r.base > 0 ? "bg-azul" : ""}`}
                      style={{ width: `${Math.min(100, lleno)}%` }}
                    />
                  </div>
                  <p className="mt-1 text-dato text-pizarra">{etiqueta}</p>
                </div>
                <span
                  className={`text-right font-dato text-nota ${r.cuota > 0 ? "font-semibold text-azul" : "text-niebla"}`}
                >
                  {euros2.format(r.cuota)}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 border-t border-niebla pt-4 text-dato text-pizarra">{textos.aviso}</p>
      </div>
    </div>
  );
}
