import { ArrowRight, Check } from "lucide-react";

/**
 * La cuota y la sanción, como dos frentes.
 *
 * Son dos discusiones distintas y se pintan enfrentadas, con la misma
 * estructura a cada lado para que se lean en paralelo: qué se discute, un flujo
 * de tres pasos que enseña dónde se ataca —la base en la cuota, la conducta en
 * la sanción— y dos defensas. Entre ambas, un «≠»: el titular de la sección ya
 * dice que van por separado.
 */

export interface Frente {
  etiqueta: string;
  lema: string;
  /** Tres pasos; el primero, donde se ataca, va en rojo. */
  flujo: string[];
  intro: string;
  defensas: { titulo: string; body: string }[];
}

export interface Frentes {
  cuota: Frente;
  sancion: Frente;
}

function Lado({ frente, oscuro }: { frente: Frente; oscuro: boolean }) {
  return (
    <div className={`flex flex-col p-7 md:p-8 ${oscuro ? "bg-azul" : "border border-niebla bg-blanco"}`}>
      <p
        className={`text-dato font-semibold uppercase tracking-wide ${oscuro ? "text-niebla" : "text-pizarra"}`}
      >
        {frente.etiqueta}
      </p>
      <h3 className={`mt-2 text-seccion ${oscuro ? "text-blanco" : "text-azul"}`}>{frente.lema}</h3>

      <div className="mt-6 flex flex-wrap items-center gap-2" aria-hidden="true">
        {frente.flujo.map((paso, i) => (
          <div key={paso} className="flex items-center gap-2">
            <span
              className={`px-3 py-2 text-nota font-semibold ${
                i === 0
                  ? "bg-rojo text-blanco"
                  : oscuro
                    ? "bg-blanco/10 text-blanco"
                    : "bg-azul/10 text-azul"
              }`}
            >
              {paso}
            </span>
            {i < frente.flujo.length - 1 ? (
              <ArrowRight className={`h-4 w-4 ${oscuro ? "text-niebla" : "text-pizarra"}`} />
            ) : null}
          </div>
        ))}
      </div>

      <p className={`mt-6 text-lectura ${oscuro ? "text-niebla" : "text-pizarra"}`}>{frente.intro}</p>

      <ul
        className={`mt-6 grid flex-1 content-start gap-5 border-t pt-6 ${
          oscuro ? "border-pizarra/40" : "border-niebla"
        }`}
      >
        {frente.defensas.map((d) => (
          <li key={d.titulo} className="grid grid-cols-[1.5rem_1fr] gap-3">
            <span className="mt-0.5 flex h-6 w-6 items-center justify-center bg-rojo" aria-hidden="true">
              <Check className="h-4 w-4 text-blanco" strokeWidth={3} />
            </span>
            <div>
              <p className={`text-lectura font-semibold ${oscuro ? "text-blanco" : "text-azul"}`}>
                {d.titulo}
              </p>
              <p className={`mt-1 text-nota ${oscuro ? "text-niebla" : "text-pizarra"}`}>{d.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DosFrentes({ cuota, sancion }: Frentes) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] lg:items-stretch lg:gap-0">
      <Lado frente={cuota} oscuro={false} />
      <div className="flex items-center justify-center" aria-hidden="true">
        <span className="font-dato text-[56px] font-semibold leading-none text-rojo">≠</span>
      </div>
      <Lado frente={sancion} oscuro />
    </div>
  );
}
