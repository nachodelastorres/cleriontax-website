"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Calculadora de plazo — páginas de «¿Cómo lo justifico ante la AEAT?».
 *
 * Cuenta días hábiles desde el día siguiente a la notificación, saltando
 * sábados, domingos y festivos nacionales. En la sede electrónica, si no se ha
 * abierto, la notificación se da por hecha a los diez días naturales de
 * ponerse a disposición, y desde ahí empieza a contar.
 *
 * Si la página tiene varios trámites con plazos distintos (alegaciones en días
 * hábiles, recursos en meses), se elige el trámite primero. Los plazos por
 * meses van de fecha a fecha y, si el último día es inhábil, pasan al
 * siguiente hábil.
 *
 * Es orientativa y lo dice: los festivos autonómicos y locales no entran, y
 * manda lo que diga la carta.
 */

export interface Tramite {
  etiqueta: string;
  tipo: "habiles" | "meses";
  cantidad: number;
}

export interface TextosCalculadora {
  titulo: string;
  /** Pregunta del selector, solo si hay varios trámites. */
  tramite?: string;
  opciones?: Tramite[];
  fecha: string;
  sede: string;
  resultado: string;
  recomendado: string;
  /** Con {n}: días hábiles que quedan. */
  quedan: string;
  hoy: string;
  vencido: string;
  /** Con poco margen: el encargo es urgente y puede costar más. */
  urgente: string;
  aviso: string;
}

/** Hábiles restantes a partir de los cuales el encargo se considera urgente. */
const MARGEN_URGENTE = 3;

/** Festivos nacionales fijos (mes 1-12, día). Semana Santa varía y no entra. */
const FESTIVOS = [
  [1, 1],
  [1, 6],
  [5, 1],
  [8, 15],
  [10, 12],
  [11, 1],
  [12, 6],
  [12, 8],
  [12, 25],
];

function esHabil(d: Date) {
  const dia = d.getDay();
  if (dia === 0 || dia === 6) return false;
  return !FESTIVOS.some(([m, n]) => d.getMonth() + 1 === m && d.getDate() === n);
}

function sumarDias(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function ultimoDia(notificacion: Date, habiles: number) {
  let d = notificacion;
  let contados = 0;
  while (contados < habiles) {
    d = sumarDias(d, 1);
    if (esHabil(d)) contados++;
  }
  return d;
}

/** Fecha a fecha; sin día equivalente, el último del mes; si es inhábil, el siguiente hábil. */
function ultimoDiaMeses(notificacion: Date, meses: number) {
  const y = notificacion.getFullYear();
  const m = notificacion.getMonth() + meses;
  const ultimoDelMes = new Date(y, m + 1, 0).getDate();
  let d = new Date(y, m, Math.min(notificacion.getDate(), ultimoDelMes));
  while (!esHabil(d)) d = sumarDias(d, 1);
  return d;
}

function habilAnterior(d: Date) {
  let r = sumarDias(d, -1);
  while (!esHabil(r)) r = sumarDias(r, -1);
  return r;
}

/** Hábiles entre mañana y `fin`, ambos incluidos. */
function habilesHasta(hoy: Date, fin: Date) {
  let n = 0;
  let d = hoy;
  while (d < fin) {
    d = sumarDias(d, 1);
    if (esHabil(d)) n++;
  }
  return n;
}

function aFecha(valor: string) {
  const [y, m, d] = valor.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function aValor(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function CalculadoraPlazo({
  locale,
  textos,
  habiles = 10,
}: {
  locale: string;
  textos: TextosCalculadora;
  habiles?: number;
}) {
  // La fecha de hoy se pone al montar: calculada en el servidor podría ser otra
  // por la zona horaria y no casaría con lo que pinta el navegador.
  const [valor, setValor] = useState("");
  const [sede, setSede] = useState(false);
  const [elegido, setElegido] = useState(0);
  const tramite: Tramite = textos.opciones?.[elegido] ?? {
    etiqueta: "",
    tipo: "habiles",
    cantidad: habiles,
  };
  useEffect(() => setValor(aValor(new Date())), []);

  const formato = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : `${locale}-ES`, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const calculo = useMemo(() => {
    if (!valor) return null;
    const puesta = aFecha(valor);
    if (Number.isNaN(puesta.getTime())) return null;
    const notificacion = sede ? sumarDias(puesta, 10) : puesta;
    const fin =
      tramite.tipo === "meses"
        ? ultimoDiaMeses(notificacion, tramite.cantidad)
        : ultimoDia(notificacion, tramite.cantidad);
    const hoy = aFecha(aValor(new Date()));
    const presentar = habilAnterior(fin);
    const quedan = habilesHasta(hoy, fin);
    const esHoy = fin.getTime() === hoy.getTime();
    return {
      fin,
      presentar,
      // Si ese día ya es hoy o pasó, no se promete una fecha imposible.
      presentarPosible: presentar > hoy,
      quedan,
      vencido: fin < hoy,
      esHoy,
      urgente: esHoy || quedan <= MARGEN_URGENTE,
    };
  }, [valor, sede, tramite.tipo, tramite.cantidad]);

  return (
    <div className="bg-blanco p-6 text-azul md:p-8">
      <p className="text-subtitulo">{textos.titulo}</p>

      {textos.opciones && textos.opciones.length > 1 ? (
        <>
          <label className="mt-5 block text-nota text-pizarra" htmlFor="tramite">
            {textos.tramite}
          </label>
          <select
            id="tramite"
            value={elegido}
            onChange={(e) => setElegido(Number(e.target.value))}
            className="mt-2 h-12 w-full border border-niebla bg-blanco px-3 text-base text-azul focus:border-azul focus:outline-none md:text-nota"
          >
            {textos.opciones.map((o, i) => (
              <option key={i} value={i}>
                {o.etiqueta}
              </option>
            ))}
          </select>
        </>
      ) : null}

      <label className="mt-5 block text-nota text-pizarra" htmlFor="fecha-notificacion">
        {textos.fecha}
      </label>
      <input
        id="fecha-notificacion"
        type="date"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="mt-2 h-12 w-full border border-niebla bg-blanco px-3 text-lectura text-azul focus:border-azul focus:outline-none"
      />

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-nota text-pizarra">
        <input
          type="checkbox"
          checked={sede}
          onChange={(e) => setSede(e.target.checked)}
          className="mt-1 h-4 w-4 flex-none accent-rojo"
        />
        {textos.sede}
      </label>

      <div className="mt-6 border-t border-niebla pt-6" aria-live="polite">
        {calculo ? (
          calculo.vencido ? (
            <p className="text-lectura font-semibold text-rojo">{textos.vencido}</p>
          ) : (
            <>
              <p className="text-nota text-pizarra">{textos.resultado}</p>
              <p className="mt-1 font-dato text-[28px] font-semibold leading-tight tracking-[-0.02em] first-letter:uppercase">
                {formato.format(calculo.fin)}
              </p>
              <p className="mt-2 text-nota font-semibold text-rojo">
                {calculo.esHoy ? textos.hoy : textos.quedan.replace("{n}", String(calculo.quedan))}
              </p>
              {calculo.presentarPosible ? (
                <p className="mt-4 text-nota text-pizarra">
                  {textos.recomendado}{" "}
                  <span className="font-semibold text-azul">{formato.format(calculo.presentar)}</span>
                </p>
              ) : null}
              {calculo.urgente ? (
                <p className="mt-4 border-l-2 border-rojo bg-rojo/10 px-3 py-2 text-nota text-azul">
                  {textos.urgente}
                </p>
              ) : null}
            </>
          )
        ) : null}
      </div>

      <p className="mt-6 text-dato text-pizarra">{textos.aviso}</p>
    </div>
  );
}
