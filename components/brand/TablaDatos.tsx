import { formatearImporteConSigno, formatearNumero } from "@/lib/format";

/**
 * Tabla de datos — Manual de marca §11 y §17.
 *
 * «La tabla es la protagonista: cifras monoespaciadas a la derecha y criterio
 *  siempre visible.» Y del §11: «Cifras en tabla con tabular-nums y alineadas
 *  a la derecha.»
 *
 * De ahí que `criterio` no sea opcional: una cifra sin criterio no se publica
 * (§19, «cada cifra tiene periodo, criterio y fuente»).
 *
 * Toda tabla publicada usa datos ficticios y lleva su nota (§14).
 */

export interface FilaDato {
  concepto: React.ReactNode;
  /** Importe en euros. Se formatea con signo, para que una pérdida se lea como pérdida. */
  importe?: number;
  /** Alternativa a `importe` para recuentos sin unidad monetaria. */
  recuento?: number;
  /** Texto ya formateado, cuando el dato no es ni importe ni recuento. */
  valor?: string;
}

interface TablaDatosProps {
  titulo?: string;
  /** Cabecera de la columna de la izquierda. */
  columnaConcepto?: string;
  /** Cabecera de la columna de cifras. */
  columnaValor?: string;
  filas: FilaDato[];
  /** Criterio aplicado. Siempre visible: es lo que sostiene la cifra. */
  criterio: string;
  /** Periodo al que corresponden los datos. */
  periodo?: string;
  /** Nota obligatoria si las cifras son de ejemplo (§14). */
  datosDeEjemplo?: boolean;
  /**
   * Pie ya redactado, para páginas en otro idioma. Sustituye al pie generado
   * y tiene que decir lo mismo: datos de ejemplo, si lo son, y el criterio.
   */
  pie?: string;
  className?: string;
}

export default function TablaDatos({
  titulo,
  columnaConcepto = "Concepto",
  columnaValor = "Importe",
  filas,
  criterio,
  periodo,
  datosDeEjemplo = false,
  pie,
  className,
}: TablaDatosProps) {
  return (
    <figure className={`m-0 ${className ?? ""}`}>
      {titulo ? (
        <figcaption className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-subtitulo text-azul">{titulo}</span>
          {periodo ? (
            <span className="font-mono text-dato text-pizarra">{periodo}</span>
          ) : null}
        </figcaption>
      ) : null}

      <div className="overflow-x-auto border border-niebla">
        <table className="w-full border-collapse bg-blanco">
          <thead>
            <tr>
              <th
                scope="col"
                className="border-b border-niebla bg-papel px-4 py-2.5 text-left font-mono text-dato font-normal text-pizarra"
              >
                {columnaConcepto}
              </th>
              <th
                scope="col"
                className="border-b border-niebla bg-papel px-4 py-2.5 text-right font-mono text-dato font-normal text-pizarra"
              >
                {columnaValor}
              </th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, i) => (
              <tr key={i}>
                <th
                  scope="row"
                  className="border-b border-niebla/60 px-4 py-2.5 text-left text-nota font-normal text-azul"
                >
                  {fila.concepto}
                </th>
                <td className="cifra-tabla border-b border-niebla/60 px-4 py-2.5 text-dato text-azul">
                  {fila.importe !== undefined
                    ? formatearImporteConSigno(fila.importe)
                    : fila.recuento !== undefined
                      ? formatearNumero(fila.recuento)
                      : fila.valor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2.5 text-nota text-pizarra">
        {pie ?? (
          <>
            {datosDeEjemplo ? <>Datos de ejemplo. </> : null}
            Criterio {criterio}.
          </>
        )}
      </p>
    </figure>
  );
}
