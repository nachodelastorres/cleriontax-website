/**
 * Cifras de estado — sustituye a los chips de color en las piezas donde el
 * estado es, en realidad, un recuento.
 *
 * El chip (§10) sigue sirviendo para marcar el estado de *un* dato: verde
 * Conciliado, ámbar Revisión. Pero cuando lo que se muestra son dos recuentos
 * —cuántas operaciones se conciliaron solas y cuántas pasaron por revisión
 * manual—, el semáforo convierte en decoración lo que debería ser el
 * argumento. Aquí manda la cifra: grande, en la familia de datos y con la
 * etiqueta debajo.
 *
 * El color se reduce a la marca: azul para todo y un filete rojo sobre la
 * cifra que sostiene el argumento, que es la revisada a mano (§10, «si una
 * pieza tiene más rojo que azul, está mal»).
 */

export interface CifraEstado {
  valor: string;
  etiqueta: string;
  /** La cifra que sostiene el argumento. Solo una por grupo. */
  acento?: boolean;
}

interface CifrasEstadoProps {
  cifras: CifraEstado[];
  /** Sobre azul, para las piezas de fondo oscuro. */
  oscuro?: boolean;
  className?: string;
}

export default function CifrasEstado({ cifras, oscuro = false, className }: CifrasEstadoProps) {
  return (
    <dl
      className={`grid grid-cols-2 gap-px ${oscuro ? "bg-blanco/15" : "bg-niebla"} ${className ?? ""}`}
    >
      {cifras.map((c) => (
        <div key={c.etiqueta} className={`relative px-5 py-4 ${oscuro ? "bg-azul" : "bg-blanco"}`}>
          {c.acento ? (
            <span className="absolute inset-x-0 top-0 h-[3px] bg-rojo" aria-hidden="true" />
          ) : null}
          <dd
            className={`m-0 font-dato text-[34px] leading-none tabular-nums ${
              oscuro ? "text-blanco" : "text-azul"
            }`}
          >
            {c.valor}
          </dd>
          <dt className={`mt-2.5 text-nota ${oscuro ? "text-niebla" : "text-pizarra"}`}>
            {c.etiqueta}
          </dt>
        </div>
      ))}
    </dl>
  );
}
