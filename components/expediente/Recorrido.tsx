/**
 * El recorrido de un procedimiento largo.
 *
 * Una inspección no cabe en un calendario de días: dura meses y pasa por
 * etapas. Aquí cada etapa es una parada en un camino vertical, con su momento a
 * la izquierda. La parada con plazo que no se puede perder va en rojo.
 */

export interface Parada {
  cuando: string;
  titulo: string;
  body: string;
  critico?: boolean;
}

export default function Recorrido({ hitos }: { hitos: Parada[] }) {
  return (
    <ol className="relative">
      {hitos.map((h, i) => {
        const ultimo = i === hitos.length - 1;
        return (
          <li
            key={i}
            className="grid grid-cols-[1.5rem_1fr] gap-x-5 md:grid-cols-[9rem_1.5rem_1fr] md:gap-x-6"
          >
            {/* Momento: a la izquierda en escritorio, encima en móvil. */}
            <p
              className={`hidden pt-0.5 text-right text-dato font-semibold uppercase tracking-wide md:block ${
                h.critico ? "text-rojo" : "text-pizarra"
              }`}
            >
              {h.cuando}
            </p>

            {/* El camino: nodo y tramo hasta la siguiente parada. */}
            <div className="relative flex justify-center" aria-hidden="true">
              {!ultimo ? <span className="absolute inset-y-0 w-0.5 bg-azul/20" /> : null}
              <span
                className={`relative mt-1 h-4 w-4 border-2 ${
                  h.critico ? "border-rojo bg-rojo" : "border-azul bg-blanco"
                }`}
              />
            </div>

            <div className={ultimo ? "" : "pb-10"}>
              <p
                className={`text-dato font-semibold uppercase tracking-wide md:hidden ${
                  h.critico ? "text-rojo" : "text-pizarra"
                }`}
              >
                {h.cuando}
              </p>
              <h3 className="text-subtitulo text-azul">{h.titulo}</h3>
              <p className="mt-2 max-w-[64ch] text-lectura text-pizarra">{h.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
