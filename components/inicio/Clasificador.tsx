"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Pregunta } from "@/lib/situaciones";

/**
 * Clasificador de la home — la puerta de entrada (plan, fase 05).
 *
 * «En la primera pantalla, quien llega debe poder señalar cuál es su caso.»
 * Tres pestañas, una por pregunta, y debajo las situaciones que cuelgan de
 * cada una, escritas con las palabras del cliente.
 *
 * Todas las listas están en el HTML aunque solo se vea una: los enlaces a las
 * diez landings llegan así al rastreador desde la home, que es la página con
 * más autoridad del sitio. Los paneles se apilan en la misma celda para que
 * cambiar de pestaña no haga saltar la altura del bloque.
 */

export interface GrupoClasificador {
  id: Pregunta;
  titulo: string;
  quien: string;
  situaciones: { slug: string; texto: string; urgente: boolean }[];
}

interface ClasificadorProps {
  grupos: GrupoClasificador[];
  /** Pestaña abierta al cargar. */
  inicial: Pregunta;
  textos: { elige: string; conPlazo: string; verTodas: string; otraCosa: string };
}

export default function Clasificador({ grupos, inicial, textos }: ClasificadorProps) {
  const [activa, setActiva] = useState<Pregunta>(inicial);
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
    <div className="bg-blanco">
      <p className="border-b border-niebla px-5 py-3 text-nota font-semibold text-pizarra md:px-6">
        {textos.elige}
      </p>

      <div role="tablist" aria-label={textos.elige} className="grid grid-cols-3 border-b border-niebla">
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
              className={`relative flex flex-col justify-start border-r border-niebla p-3 text-left transition-colors duration-200 last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rojo md:p-5 ${
                abierta ? "bg-blanco" : "bg-papel hover:bg-niebla/40"
              }`}
            >
              {abierta ? (
                <span className="absolute inset-x-0 top-0 h-[3px] bg-rojo" aria-hidden="true" />
              ) : null}
              <span className={`block font-semibold text-dato ${abierta ? "text-rojo" : "text-pizarra"}`}>
                {g.id}
              </span>
              <span
                className={`mt-1.5 block text-nota font-semibold md:text-lectura md:font-semibold ${
                  abierta ? "text-azul" : "text-pizarra"
                }`}
              >
                {g.titulo}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid">
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
              <p className="px-5 pt-5 text-nota text-pizarra md:px-6">{g.quien}</p>
              <ul className="px-2 pb-3 pt-2 md:px-3">
                {g.situaciones.map((s) => (
                  <li key={s.slug} className="border-b border-niebla/60 last:border-b-0">
                    <Link
                      href={`/situaciones/${s.slug}`}
                      tabIndex={abierta ? undefined : -1}
                      className="group flex items-center justify-between gap-4 px-3 py-3.5 transition-colors duration-200 hover:bg-papel md:py-4"
                    >
                      <span className="text-nota font-semibold text-azul md:text-lectura md:font-semibold">
                        {s.texto}
                      </span>
                      <span className="flex flex-none items-center gap-3">
                        {s.urgente ? (
                          <span className="bg-rojo/10 px-2 py-0.5 text-dato font-semibold text-rojo">
                            {textos.conPlazo}
                          </span>
                        ) : null}
                        <ArrowRight className="h-4 w-4 text-rojo" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-niebla bg-papel px-5 py-4 md:px-6">
        <Link
          href="/situaciones"
          className="text-nota font-semibold text-azul underline-offset-4 hover:underline"
        >
          {textos.verTodas}
        </Link>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-2 text-nota font-semibold text-rojo underline-offset-4 hover:underline"
        >
          {textos.otraCosa}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
