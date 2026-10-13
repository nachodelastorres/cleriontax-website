import { ArrowRight } from "lucide-react";

/**
 * Tu parte y la nuestra.
 *
 * Lo que el cliente aporta y lo que hacemos con ello, uno junto a otro. A la
 * izquierda, una lista para ir marcando los documentos; a la derecha, el camino
 * de nuestro trabajo. Une dos secciones que por separado eran dos listas más.
 */

export interface Intercambio {
  traes: { titulo: string; items: string[] };
  hacemos: { titulo: string; pasos: { title: string; body: string }[] };
}

/** Los enlaces internos del contenido se escriben sin idioma: aquí se les añade. */
function conIdioma(html: string, locale?: string) {
  return locale ? html.replace(/href="\/(?!\/)/g, `href="/${locale}/`) : html;
}

export default function BloqueIntercambio({
  traes,
  hacemos,
  locale,
}: Intercambio & { locale?: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,6fr)] lg:items-start">
      {/* Lo que nos traes: casillas para marcar. */}
      <div className="border border-niebla bg-papel p-7 md:p-8">
        <h3 className="text-subtitulo text-azul">{traes.titulo}</h3>
        <ul className="mt-6 grid gap-4">
          {traes.items.map((item, i) => (
            <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-3">
              <span className="mt-1 h-5 w-5 border-2 border-azul bg-blanco" aria-hidden="true" />
              <span
                className="text-nota text-pizarra [&_strong]:font-semibold [&_strong]:text-azul"
                dangerouslySetInnerHTML={{ __html: conIdioma(item, locale) }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center lg:pt-24" aria-hidden="true">
        <ArrowRight className="h-8 w-8 rotate-90 text-rojo lg:rotate-0" strokeWidth={1.75} />
      </div>

      {/* Lo que hacemos: el camino. */}
      <div>
        <h3 className="text-subtitulo text-azul">{hacemos.titulo}</h3>
        <ol className="mt-6">
          {hacemos.pasos.map((p, i) => {
            const ultimo = i === hacemos.pasos.length - 1;
            return (
              <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-x-4">
                <div className="relative flex justify-center" aria-hidden="true">
                  {!ultimo ? <span className="absolute inset-y-0 w-0.5 bg-azul/20" /> : null}
                  <span className="relative mt-1.5 h-3 w-3 bg-rojo" />
                </div>
                <div className={ultimo ? "" : "pb-7"}>
                  <p className="text-lectura font-semibold text-azul">{p.title}</p>
                  <p className="mt-1 text-nota text-pizarra">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
