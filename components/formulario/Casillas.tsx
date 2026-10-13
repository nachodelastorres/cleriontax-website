/**
 * Una pregunta de impreso con sus casillas.
 *
 * Cada caso es una fila y la respuesta se marca con un aspa en su columna,
 * como se rellena un formulario a mano. Sirve para veredictos cortos (sí, no,
 * depende) en los que el lector busca su caso y quiere la respuesta de un
 * vistazo; la explicación va debajo, en pequeño.
 */

export type Veredicto = "si" | "no" | "depende";

export interface TextosCasillas {
  pregunta: string;
  opciones: Record<Veredicto, string>;
  filas: { caso: string; body: string; veredicto: Veredicto }[];
}

const ORDEN: Veredicto[] = ["si", "no", "depende"];

function Casilla({ marcada, etiqueta }: { marcada: boolean; etiqueta: string }) {
  return (
    <span
      className={`relative flex h-8 w-8 items-center justify-center border-2 ${
        marcada ? "border-azul bg-blanco" : "border-niebla bg-blanco"
      }`}
      role="img"
      aria-label={marcada ? etiqueta : undefined}
      aria-hidden={marcada ? undefined : true}
    >
      {marcada ? (
        // El aspa, dibujada: dos trazos como los de un bolígrafo.
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-azul" aria-hidden="true">
          <path d="M5 5 L19 19 M19 5 L5 19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        </svg>
      ) : null}
    </span>
  );
}

export default function Casillas({ pregunta, opciones, filas }: TextosCasillas) {
  const columnas = "grid-cols-[minmax(0,1fr)_repeat(3,4.5rem)] md:grid-cols-[minmax(0,1fr)_repeat(3,6rem)]";
  return (
    <div className="border border-niebla bg-blanco">
      {/* Cabecera del impreso: la pregunta y las tres columnas. */}
      <div className={`grid ${columnas} items-end border-b-4 border-azul px-5 py-4 md:px-7`}>
        <p className="text-subtitulo text-azul">{pregunta}</p>
        {ORDEN.map((v) => (
          <p key={v} className="text-center text-dato font-semibold uppercase tracking-wide text-pizarra">
            {opciones[v]}
          </p>
        ))}
      </div>

      <ul>
        {filas.map((f, i) => (
          <li
            key={f.caso}
            className={`grid ${columnas} items-center px-5 py-5 md:px-7 ${
              i > 0 ? "border-t border-dashed border-niebla" : ""
            }`}
          >
            <div className="pr-4">
              <p className="text-lectura font-semibold text-azul">{f.caso}</p>
              <p className="mt-1 max-w-[60ch] text-nota text-pizarra">{f.body}</p>
            </div>
            {ORDEN.map((v) => (
              <div key={v} className="flex justify-center">
                <Casilla marcada={f.veredicto === v} etiqueta={opciones[v]} />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
