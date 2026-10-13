/**
 * El año fiscal en una tira.
 *
 * Doce meses y, debajo, la ventana de cada trámite como una barra. Se ve de un
 * vistazo que el 721 va antes que la renta y que reunir los datos tiene que
 * empezar antes de que abra la campaña. En móvil, lista.
 */

export interface Ventana {
  desde: number;
  hasta: number;
  cuando: string;
  titulo: string;
  body: string;
  critico?: boolean;
  /** Fuera de plazo: barra apagada. */
  tenue?: boolean;
}

export default function AnioFiscal({ locale, ventanas }: { locale: string; ventanas: Ventana[] }) {
  const mes = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : `${locale}-ES`, { month: "short" });
  const meses = Array.from({ length: 12 }, (_, i) => mes.format(new Date(2025, i, 15)).replace(".", ""));
  const rejilla = { gridTemplateColumns: "repeat(12, minmax(0, 1fr))" };

  return (
    <div>
      <div className="hidden border border-niebla bg-blanco md:block">
        <div className="grid border-b border-niebla" style={rejilla}>
          {meses.map((m, i) => (
            <div
              key={m}
              className={`py-3 text-center text-dato font-semibold uppercase tracking-wide text-pizarra ${
                i > 0 ? "border-l border-niebla" : ""
              }`}
            >
              {m}
            </div>
          ))}
        </div>
        <div className="grid gap-y-2 px-2 py-4" style={rejilla}>
          {ventanas.map((v, i) => (
            <div
              key={i}
              className={`flex min-h-9 items-center px-3 py-2 text-nota font-semibold ${
                v.critico
                  ? "bg-rojo text-blanco"
                  : v.tenue
                    ? "border border-dashed border-pizarra/50 text-pizarra"
                    : "bg-azul text-blanco"
              }`}
              style={{ gridColumn: `${v.desde} / ${v.hasta + 1}`, gridRow: i + 1 }}
            >
              <span className="leading-tight">{v.titulo}</span>
            </div>
          ))}
        </div>
      </div>

      <ol className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {ventanas.map((v, i) => (
          <li key={i} className={`border-t-2 pt-4 ${v.critico ? "border-rojo" : "border-azul"}`}>
            <p
              className={`text-dato font-semibold uppercase tracking-wide ${v.critico ? "text-rojo" : "text-pizarra"}`}
            >
              {v.cuando}
            </p>
            <h3 className="mt-1 text-subtitulo text-azul">{v.titulo}</h3>
            <p className="mt-2 text-nota text-pizarra">{v.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
