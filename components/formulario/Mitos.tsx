/**
 * Mitos tachados, con la realidad debajo.
 *
 * La idea equivocada se deja leer —es la que trae el lector— pero tachada en
 * rojo, y debajo, en firme, cómo funciona de verdad. Cada par en su ficha.
 */

export interface TextosMitos {
  etiquetaMito: string;
  etiquetaRealidad: string;
  pares: { mito: string; realidad: string }[];
}

export default function Mitos({ etiquetaMito, etiquetaRealidad, pares }: TextosMitos) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {pares.map((p) => (
        <li key={p.mito} className="border border-niebla bg-blanco p-7">
          <p className="text-dato font-semibold uppercase tracking-wide text-pizarra">{etiquetaMito}</p>
          <p className="mt-2 text-lectura text-pizarra line-through decoration-rojo decoration-2">{p.mito}</p>
          <div className="mt-5 border-t border-niebla pt-5">
            <p className="text-dato font-semibold uppercase tracking-wide text-azul">{etiquetaRealidad}</p>
            <p className="mt-2 text-subtitulo text-azul">{p.realidad}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
