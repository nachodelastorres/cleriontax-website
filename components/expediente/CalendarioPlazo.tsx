/**
 * El plazo como calendario.
 *
 * Una fila de días, del de la notificación al del vencimiento, y debajo cada
 * fase de nuestro trabajo como una barra que ocupa los días que le tocan. Se ve
 * a la vez cuánto plazo hay y cómo se reparte, y que la reconstrucción es el
 * tramo largo. En móvil, donde once columnas no caben, pasa a lista.
 */

export interface Calendario {
  /** «Día» en el idioma de la página. */
  dia: string;
  /** Último día del plazo; el primero es el 0, la notificación. */
  dias: number;
  fases: { desde: number; hasta: number; titulo: string; body: string; critico?: boolean }[];
}

export default function CalendarioPlazo({ dia, dias, fases }: Calendario) {
  const columnas = dias + 1;
  const rejilla = { gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))` };

  return (
    <div>
      {/* Escritorio: días arriba y fases como barras. */}
      <div className="hidden border border-niebla bg-blanco md:block">
        <div className="grid border-b border-niebla" style={rejilla}>
          {Array.from({ length: columnas }, (_, i) => {
            const fin = i === dias;
            return (
              <div
                key={i}
                className={`px-2 py-4 text-center ${i > 0 ? "border-l border-niebla" : ""} ${
                  fin ? "bg-rojo text-blanco" : "text-azul"
                }`}
              >
                <span className={`block text-dato uppercase tracking-wide ${fin ? "text-blanco" : "text-pizarra"}`}>
                  {dia}
                </span>
                <span className="font-dato text-[28px] font-semibold leading-none">{i}</span>
              </div>
            );
          })}
        </div>

        <div className="grid gap-y-2 px-2 py-4" style={rejilla}>
          {fases.map((f, i) => (
            <div
              key={i}
              className={`flex items-center px-3 py-2 text-nota font-semibold ${
                f.critico ? "bg-rojo text-blanco" : "bg-azul text-blanco"
              }`}
              style={{ gridColumn: `${f.desde + 1} / ${f.hasta + 2}`, gridRow: i + 1 }}
            >
              <span className="truncate">{f.titulo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lo que pasa en cada fase. */}
      <ol className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {fases.map((f, i) => (
          <li key={i} className={`border-t-2 pt-4 ${f.critico ? "border-rojo" : "border-azul"}`}>
            <p className={`font-dato text-dato font-semibold uppercase tracking-wide ${f.critico ? "text-rojo" : "text-pizarra"}`}>
              {dia} {f.desde === f.hasta ? f.desde : `${f.desde}–${f.hasta}`}
            </p>
            <h3 className="mt-1 text-subtitulo text-azul">{f.titulo}</h3>
            <p className="mt-2 text-nota text-pizarra">{f.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
