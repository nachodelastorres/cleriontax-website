"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

/**
 * ¿Estás obligado a presentar el modelo 721?
 *
 * Suma lo custodiado en plataformas extranjeras a 31 de diciembre y lo compara
 * con el umbral de 50.000 €. Si ya se presentó otro año, lo que obliga a volver
 * a presentarlo es un aumento de más de 20.000 € sobre el último saldo
 * declarado.
 *
 * El verde y el rojo describen aquí el estado real del resultado (§10), no
 * decoran. Es orientativo y lo dice.
 */

const UMBRAL = 50_000;
const INCREMENTO = 20_000;

export interface TextosComprobador {
  plataforma: string;
  anadir: string;
  quitar: string;
  total: string;
  yaPresentado: string;
  ultimoSaldo: string;
  obligado: string;
  noObligado: string;
  obligadoOtraVez: string;
  noOtraVez: string;
  aviso: string;
}

function aNumero(s: string) {
  return Math.max(0, Number(s.replace(/[^\d]/g, "")) || 0);
}

export default function Comprobador721({ locale, textos }: { locale: string; textos: TextosComprobador }) {
  const [saldos, setSaldos] = useState<string[]>(["30000", "24000"]);
  const [presentado, setPresentado] = useState(false);
  const [ultimo, setUltimo] = useState("");

  const euros = new Intl.NumberFormat(locale === "en" ? "en-IE" : `${locale}-ES`, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const total = saldos.reduce((s, v) => s + aNumero(v), 0);
  const aumento = total - aNumero(ultimo);
  const obligado = presentado ? aumento > INCREMENTO : total > UMBRAL;
  const mensaje = presentado
    ? obligado
      ? textos.obligadoOtraVez
      : textos.noOtraVez
    : obligado
      ? textos.obligado
      : textos.noObligado;

  const campo =
    "h-12 w-full border border-niebla bg-blanco px-3 text-right font-dato text-lectura text-azul focus:border-azul focus:outline-none";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="border border-niebla bg-blanco p-7 md:p-8">
        <ul className="grid gap-3">
          {saldos.map((v, i) => (
            <li key={i} className="grid grid-cols-[1fr_11rem_2rem] items-center gap-3">
              <label htmlFor={`saldo-${i}`} className="text-nota text-pizarra">
                {textos.plataforma.replace("{n}", String(i + 1))}
              </label>
              <input
                id={`saldo-${i}`}
                inputMode="numeric"
                value={v}
                onChange={(e) => setSaldos(saldos.map((x, j) => (j === i ? e.target.value : x)))}
                className={campo}
              />
              {saldos.length > 1 ? (
                <button
                  type="button"
                  onClick={() => setSaldos(saldos.filter((_, j) => j !== i))}
                  className="flex h-8 w-8 items-center justify-center text-pizarra hover:text-rojo"
                  aria-label={textos.quitar}
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <span />
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setSaldos([...saldos, ""])}
          className="mt-4 inline-flex items-center gap-2 text-nota font-semibold text-azul hover:underline"
        >
          <Plus className="h-4 w-4 text-rojo" aria-hidden="true" />
          {textos.anadir}
        </button>

        <div className="mt-6 flex items-baseline justify-between border-t-2 border-azul pt-4">
          <span className="text-nota font-semibold text-azul">{textos.total}</span>
          <span className="font-dato text-subtitulo font-semibold text-azul">{euros.format(total)}</span>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3 text-nota text-pizarra">
          <input
            type="checkbox"
            checked={presentado}
            onChange={(e) => setPresentado(e.target.checked)}
            className="mt-1 h-4 w-4 flex-none accent-rojo"
          />
          {textos.yaPresentado}
        </label>
        {presentado ? (
          <div className="mt-3 grid grid-cols-[1fr_11rem_2rem] items-center gap-3">
            <label htmlFor="ultimo-saldo" className="text-nota text-pizarra">
              {textos.ultimoSaldo}
            </label>
            <input
              id="ultimo-saldo"
              inputMode="numeric"
              value={ultimo}
              onChange={(e) => setUltimo(e.target.value)}
              className={campo}
            />
            <span />
          </div>
        ) : null}
      </div>

      {/* El resultado, con el color de su estado. */}
      <div
        className={`flex flex-col justify-between border-t-4 bg-blanco p-7 md:p-8 ${
          obligado ? "border-rojo" : "border-verde-conciliado"
        } border-x border-b border-x-niebla border-b-niebla`}
        aria-live="polite"
      >
        <div>
          <span
            className={`inline-flex items-center gap-2 px-2.5 py-1 text-dato font-semibold ${
              obligado ? "bg-rojo/10 text-rojo" : "bg-verde-conciliado/10 text-verde-conciliado"
            }`}
          >
            <span className={`h-2 w-2 ${obligado ? "bg-rojo" : "bg-verde-conciliado"}`} aria-hidden="true" />
            {euros.format(total)}
          </span>
          <p className="mt-5 text-seccion text-azul">{mensaje}</p>
        </div>
        <p className="mt-8 text-dato text-pizarra">{textos.aviso}</p>
      </div>
    </div>
  );
}
