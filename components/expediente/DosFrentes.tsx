import { ArrowRight, Check } from "lucide-react";

/**
 * La cuota y la sanción, como dos frentes.
 *
 * Son dos discusiones distintas y se pintan enfrentadas: a un lado la cuota,
 * que se gana con cifras —el flujo enseña por qué rebajar la base lo rebaja
 * todo—, y al otro la sanción, que se gana con la conducta y tiene sus propias
 * defensas. En medio, el sello que lo resume.
 */

export interface Frentes {
  nexo: string;
  cuota: { etiqueta: string; lema: string; flujo: string[]; nota: string };
  sancion: { etiqueta: string; lema: string; intro: string; defensas: { titulo: string; body: string }[] };
}

export default function DosFrentes({ nexo, cuota, sancion }: Frentes) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
      {/* La cuota: cifras. */}
      <div className="flex flex-col border border-niebla bg-blanco p-7 md:p-8">
        <p className="text-dato font-semibold uppercase tracking-wide text-pizarra">{cuota.etiqueta}</p>
        <h3 className="mt-2 text-seccion text-azul">{cuota.lema}</h3>

        <div className="mt-8 flex flex-wrap items-center gap-2" aria-hidden="true">
          {cuota.flujo.map((paso, i) => (
            <div key={paso} className="flex items-center gap-2">
              <span
                className={`px-3 py-2 text-nota font-semibold ${
                  i === 0 ? "bg-rojo text-blanco" : "bg-azul/10 text-azul"
                }`}
              >
                {paso}
              </span>
              {i < cuota.flujo.length - 1 ? <ArrowRight className="h-4 w-4 text-pizarra" /> : null}
            </div>
          ))}
        </div>

        <p className="mt-6 text-lectura text-pizarra">{cuota.nota}</p>
      </div>

      {/* El sello que separa los dos frentes. */}
      <div className="flex items-center justify-center">
        <span className="border-2 border-rojo px-4 py-2 text-center text-dato font-semibold uppercase tracking-wide text-rojo lg:[writing-mode:vertical-rl] lg:rotate-180">
          {nexo}
        </span>
      </div>

      {/* La sanción: conducta. */}
      <div className="flex flex-col bg-azul p-7 md:p-8">
        <p className="text-dato font-semibold uppercase tracking-wide text-niebla">{sancion.etiqueta}</p>
        <h3 className="mt-2 text-seccion text-blanco">{sancion.lema}</h3>
        <p className="mt-6 text-lectura text-niebla">{sancion.intro}</p>

        <ul className="mt-6 grid gap-5 border-t border-pizarra/40 pt-6">
          {sancion.defensas.map((d) => (
            <li key={d.titulo} className="grid grid-cols-[1.5rem_1fr] gap-3">
              <span className="mt-0.5 flex h-6 w-6 items-center justify-center bg-rojo" aria-hidden="true">
                <Check className="h-4 w-4 text-blanco" strokeWidth={3} />
              </span>
              <div>
                <p className="text-lectura font-semibold text-blanco">{d.titulo}</p>
                <p className="mt-1 text-nota text-niebla">{d.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
