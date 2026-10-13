import { ArrowRight, Check, FileStack, Route, Scale, ScanSearch, Timer, Wallet } from "lucide-react";
import { Cabecera, Envoltura } from "@/components/secciones/Bloques";

/**
 * Precio de los procedimientos que no se cotizan por tramos.
 *
 * Una inspección es demasiado distinta de una a otra para ponerle una tabla.
 * En lugar de un número se explica de qué depende el presupuesto y cómo se
 * da: cerrado, por escrito y antes de empezar. Lo único que puede moverlo es
 * que la propia Administración amplíe el alcance, y eso también se dice.
 */

const ICONOS = {
  alcance: ScanSearch,
  cartera: Wallet,
  fase: Route,
  aportado: FileStack,
  enJuego: Scale,
  plazo: Timer,
};

export interface TextosPresupuesto {
  h2: string;
  entrada?: string;
  factores: { titulo: string; items: { icono: keyof typeof ICONOS; titulo: string; body: string }[] };
  cerrado: {
    etiqueta: string;
    titulo: string;
    pasos: string[];
    incluyeTitulo: string;
    incluye: string[];
  };
  accion: string;
}

export default function PresupuestoMedida({
  textos,
  id = "precio",
}: {
  textos: TextosPresupuesto;
  id?: string;
}) {
  const { factores, cerrado } = textos;
  return (
    <Envoltura id={id} fondo="papel" ancho="max-w-6xl">
      <Cabecera titulo={textos.h2} entrada={textos.entrada} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-stretch">
        {/* De qué depende. */}
        <div className="border border-niebla bg-blanco p-7 md:p-8">
          <h3 className="text-subtitulo text-azul">{factores.titulo}</h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {factores.items.map((f) => {
              const Icono = ICONOS[f.icono];
              return (
                <li key={f.titulo} className="grid grid-cols-[2rem_1fr] gap-3">
                  <Icono className="mt-0.5 h-6 w-6 text-rojo" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className="text-lectura font-semibold text-azul">{f.titulo}</p>
                    <p className="mt-1 text-nota text-pizarra">{f.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Cómo se da el presupuesto y qué cubre. */}
        <div className="flex flex-col bg-azul p-7 md:p-8">
          <p className="text-dato font-semibold uppercase tracking-wide text-niebla">{cerrado.etiqueta}</p>
          <p className="mt-2 text-[34px] font-semibold leading-none tracking-[-0.02em] text-blanco">
            {cerrado.titulo}
          </p>

          <ol className="mt-6">
            {cerrado.pasos.map((paso, i) => {
              const ultimo = i === cerrado.pasos.length - 1;
              return (
                <li key={i} className="grid grid-cols-[1rem_1fr] gap-x-4">
                  <div className="relative flex justify-center" aria-hidden="true">
                    {!ultimo ? <span className="absolute inset-y-0 w-0.5 bg-blanco/20" /> : null}
                    <span className="relative mt-1.5 h-2.5 w-2.5 bg-rojo" />
                  </div>
                  <p className={`text-nota text-niebla ${ultimo ? "" : "pb-4"}`}>{paso}</p>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 border-t border-pizarra/40 pt-6">
            <p className="text-nota font-semibold text-blanco">{cerrado.incluyeTitulo}</p>
            <ul className="mt-3 grid gap-2">
              {cerrado.incluye.map((item) => (
                <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2 text-nota text-niebla">
                  <Check className="mt-0.5 h-4 w-4 text-rojo" strokeWidth={3} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <a
        href="#diagnostico"
        className="mt-8 inline-flex items-center gap-2 text-nota font-semibold text-rojo underline-offset-4 hover:underline"
      >
        {textos.accion}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </Envoltura>
  );
}
