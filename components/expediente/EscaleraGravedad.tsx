import { ArrowRight } from "lucide-react";

/**
 * Escalera de gravedad de los procedimientos de Hacienda.
 *
 * Cada peldaño es más alto que el anterior: de un vistazo se ve que un
 * requerimiento no es una inspección. El peldaño del que trata la página va
 * en rojo; los que tienen página propia enlazan a ella.
 */

export interface Escalera {
  extremos: { leve: string; grave: string };
  /** Etiqueta del peldaño de esta página. */
  actual: string;
  niveles: { titulo: string; body: string; href?: string; enlace?: string; aqui?: boolean }[];
}

const ALTURAS = ["h-6", "h-10", "h-14", "h-20", "h-24"];

export default function EscaleraGravedad({
  extremos,
  actual,
  niveles,
  locale,
}: Escalera & { locale?: string }) {
  return (
    <div>
      <ol className="grid gap-px border border-niebla bg-niebla md:grid-cols-4 md:items-stretch">
        {niveles.map((n, i) => (
          <li key={i} className="flex flex-col bg-blanco p-6">
            {/* El peldaño: crece con la gravedad. */}
            <div className="flex h-24 items-end" aria-hidden="true">
              <div
                className={`w-full ${ALTURAS[Math.min(i, ALTURAS.length - 1)]} ${
                  n.aqui ? "bg-rojo" : "bg-azul/15"
                }`}
              />
            </div>
            {n.aqui ? (
              <span className="mt-4 text-dato font-semibold uppercase tracking-wide text-rojo">
                {actual}
              </span>
            ) : null}
            <h3 className={`text-subtitulo text-azul ${n.aqui ? "mt-1" : "mt-4"}`}>{n.titulo}</h3>
            <p className="mt-2 flex-1 text-nota text-pizarra">{n.body}</p>
            {n.href && n.enlace ? (
              <a
                href={locale ? `/${locale}${n.href}` : n.href}
                className="mt-4 inline-flex items-center gap-2 text-nota font-semibold text-azul underline-offset-4 hover:underline"
              >
                {n.enlace}
                <ArrowRight className="h-4 w-4 text-rojo" aria-hidden="true" />
              </a>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-3 hidden justify-between text-dato uppercase tracking-wide text-pizarra md:flex">
        <span>← {extremos.leve}</span>
        <span>{extremos.grave} →</span>
      </div>
    </div>
  );
}
