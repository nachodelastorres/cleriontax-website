"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Grupo } from "@/lib/paginas";

/**
 * Clasificador por pestañas.
 *
 * Tres pestañas grandes —una por pregunta— y debajo un panel a todo el ancho
 * con los casos de la pregunta abierta, todos en una fila. Cada caso lleva a su
 * página de servicio.
 *
 * Los tres paneles están siempre en el HTML, apilados en la misma celda de la
 * rejilla: así todos los enlaces llegan al rastreador desde la home, que es la
 * página con más autoridad, y cambiar de pestaña no hace saltar la altura del
 * bloque. Los que no se ven quedan fuera del foco y del lector de pantalla.
 */

export interface GrupoClasificador {
  id: Grupo;
  titulo: string;
  quien: string;
  casos: { slug: string; href: string; texto: string; urgente: boolean }[];
}

// Clases completas para que Tailwind las encuentre al compilar.
const COLUMNAS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

interface Props {
  grupos: GrupoClasificador[];
  /** Pestaña abierta al cargar. */
  inicial: Grupo;
  textos: { conPlazo: string; verPagina: string };
}

export default function ClasificadorPestanas({ grupos, inicial, textos }: Props) {
  const [activa, setActiva] = useState<Grupo>(inicial);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);

  // Flechas para moverse entre pestañas, como pide el patrón ARIA de tabs.
  function alTeclear(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const paso = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!paso) return;
    e.preventDefault();
    const siguiente = (i + paso + grupos.length) % grupos.length;
    setActiva(grupos[siguiente].id);
    pestanas.current[siguiente]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="" className="grid gap-px bg-niebla sm:grid-cols-3">
        {grupos.map((g, i) => {
          const abierta = g.id === activa;
          return (
            <button
              key={g.id}
              ref={(el) => {
                pestanas.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`pestana-${g.id}`}
              aria-selected={abierta}
              aria-controls={`panel-${g.id}`}
              tabIndex={abierta ? 0 : -1}
              onClick={() => setActiva(g.id)}
              onKeyDown={(e) => alTeclear(e, i)}
              className={`relative flex flex-col items-start p-6 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rojo md:p-8 ${
                abierta ? "bg-azul" : "bg-papel hover:bg-niebla/50"
              }`}
            >
              <span
                className={`text-subtitulo ${abierta ? "text-blanco" : "text-azul"}`}
              >
                {g.titulo}
              </span>
              <span
                className={`mt-3 text-nota ${abierta ? "text-niebla" : "text-pizarra"}`}
              >
                {g.quien}
              </span>

              {/* El panel abierto cuelga de su pestaña: un filete rojo lo cose. */}
              {abierta ? (
                <span className="absolute inset-x-0 bottom-0 h-[3px] bg-rojo" aria-hidden="true" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="grid border-x border-b border-niebla">
        {grupos.map((g) => {
          const abierta = g.id === activa;
          return (
            <div
              key={g.id}
              role="tabpanel"
              id={`panel-${g.id}`}
              aria-labelledby={`pestana-${g.id}`}
              aria-hidden={!abierta}
              className={`[grid-area:1/1] ${abierta ? "" : "invisible"}`}
            >
              {/* Todos los casos de la pregunta en una sola fila: tantas columnas
                  como casos, para que ningún panel deje una fila a medias. La
                  lista ocupa todo el alto del panel: los tres comparten celda y
                  miden lo que el más alto, y sin esto los cortos dejaban una
                  franja vacía bajo las tarjetas. */}
              <ul className={`grid h-full ${COLUMNAS[g.casos.length] ?? "md:grid-cols-3"}`}>
                {g.casos.map((s, i) => {
                  return (
                  <li
                    key={s.slug}
                    className={`border-niebla ${i > 0 ? "border-t md:border-t-0 md:border-l" : ""}`}
                  >
                    <Link
                      href={s.href}
                      tabIndex={abierta ? undefined : -1}
                      className="group flex h-full flex-col justify-between gap-4 p-6 transition-colors duration-200 hover:bg-papel md:p-7"
                    >
                      <span className="flex items-start justify-between gap-4">
                        <span className="text-lectura font-semibold text-azul">{s.texto}</span>
                        {s.urgente ? (
                          <span className="flex-none bg-rojo/10 px-2 py-0.5 text-dato font-semibold text-rojo">
                            {textos.conPlazo}
                          </span>
                        ) : null}
                      </span>

                      <span className="inline-flex items-center gap-2 text-nota font-semibold text-azul group-hover:underline group-hover:underline-offset-4">
                        {textos.verPagina}
                        <ArrowRight className="h-4 w-4 text-rojo" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
