/**
 * Los modelos de Hacienda como fichas.
 *
 * Cada modelo con su número en grande, como en la portada del impreso. El de la
 * página va marcado arriba en rojo. El número es el dato que la gente busca y
 * confunde, así que es lo que más pesa.
 */

export interface Ficha {
  numero: string;
  body: string;
  actual?: boolean;
}

export default function FichasModelo({ etiqueta, fichas }: { etiqueta: string; fichas: Ficha[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {fichas.map((f) => (
        <li
          key={f.numero}
          className={`flex flex-col border border-niebla bg-blanco ${f.actual ? "border-t-4 border-t-rojo" : ""}`}
        >
          <div className="border-b border-dashed border-niebla px-6 pb-4 pt-5">
            <p className="text-dato font-semibold uppercase tracking-wide text-pizarra">{etiqueta}</p>
            <p
              className={`mt-1 font-dato text-[56px] font-semibold leading-none tracking-[-0.03em] ${
                f.actual ? "text-rojo" : "text-azul"
              }`}
            >
              {f.numero}
            </p>
          </div>
          <p className="flex-1 px-6 py-5 text-nota text-pizarra">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}
