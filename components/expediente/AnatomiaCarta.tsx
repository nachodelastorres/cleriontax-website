/**
 * Anatomía de una notificación de Hacienda.
 *
 * Una carta de ejemplo y, a su lado, qué significa cada dato. Quien tiene la
 * suya delante la reconoce en la de ejemplo y sabe dónde mirar; leer «busca el
 * procedimiento» en un párrafo no sirve tanto como verlo señalado en la hoja.
 *
 * Cada fila de la carta y su nota comparten fila de rejilla, así que quedan a la
 * misma altura sin calcular nada. En móvil la nota va debajo de su dato.
 */

export interface Carta {
  membrete: string;
  /** «Notificación de ejemplo»: los datos no son de nadie. */
  etiqueta: string;
  filas: { campo: string; valor: string; titulo: string; nota: string }[];
}

export default function AnatomiaCarta({ membrete, etiqueta, filas }: Carta) {
  return (
    <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-x-0">
      {/* Membrete: solo en la columna de la carta. */}
      <div className="border border-b-0 border-niebla bg-blanco px-6 pb-4 pt-6 md:px-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-subtitulo text-azul">{membrete}</span>
          <span className="text-dato uppercase tracking-wide text-pizarra">{etiqueta}</span>
        </div>
        <div className="mt-4 h-px bg-niebla" aria-hidden="true" />
      </div>
      <div className="hidden md:block" aria-hidden="true" />

      {filas.map((f, i) => {
        const ultima = i === filas.length - 1;
        return (
          <div key={i} className="contents">
            <div
              className={`border-x border-niebla bg-blanco px-6 py-4 md:px-8 ${
                ultima ? "border-b pb-8" : ""
              }`}
            >
              <p className="text-dato uppercase tracking-wide text-pizarra">{f.campo}</p>
              <p className="mt-1 border-l-2 border-rojo pl-3 text-lectura font-semibold text-azul">
                {f.valor}
              </p>
            </div>

            <div className={`flex items-center gap-4 py-4 md:pl-0 ${ultima ? "pb-8 md:pb-8" : ""}`}>
              {/* Conector entre el dato y su nota. */}
              <span className="hidden h-px w-10 flex-none bg-rojo md:block" aria-hidden="true" />
              <div className="md:pr-2">
                <p className="text-nota font-semibold text-azul">{f.titulo}</p>
                <p className="mt-1 text-nota text-pizarra">{f.nota}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
