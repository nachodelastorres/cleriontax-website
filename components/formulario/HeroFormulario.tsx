import Patron from "@/components/brand/Patron";
import ButtonLink from "@/components/ui/ButtonLink";

/**
 * Cabecera de las páginas de «¿Cómo lo declaro?».
 *
 * La gama va al revés que en los otros dos grupos: fondo claro, el patrón en
 * su versión clara —la que el manual reserva a los soportes de documento— y el
 * azul solo en el texto. A la derecha, un borrador dibujado: es lo que el
 * cliente se lleva, la declaración con sus casillas ya rellenas.
 *
 * El texto de lectura va sobre una caja blanca, nunca sobre el patrón (§13).
 */

export interface Borrador {
  titulo: string;
  apartado: string;
  filas: { etiqueta: string; valor: string; total?: boolean }[];
  estado: string;
  nota: string;
}

export default function HeroFormulario({
  etiqueta,
  titulo,
  entrada,
  accion,
  secundaria,
  borrador,
}: {
  etiqueta?: string;
  titulo: string;
  entrada: string;
  accion?: { label: string; href: string };
  secundaria?: { label: string; href: string };
  borrador?: Borrador;
}) {
  return (
    <section className="relative overflow-hidden bg-papel">
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Patron version="claro" bloque={104} />
      </div>

      {/* Sin borrador, la caja de texto va sola y no ocupa todo el ancho. */}
      <div
        className={`relative mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-24 md:pb-16 md:pt-28 lg:items-center lg:gap-14 ${
          borrador ? "lg:grid-cols-[minmax(0,1fr)_25rem]" : ""
        }`}
      >
        <div
          className={`border border-niebla bg-blanco p-6 md:p-10 lg:p-12 ${borrador ? "" : "lg:max-w-3xl"}`}
        >
          {etiqueta ? (
            <span className="text-dato font-semibold uppercase tracking-wide text-rojo">{etiqueta}</span>
          ) : null}
          <h1 className="mt-5 max-w-[20ch] text-hero text-azul">{titulo}</h1>
          <p className="mt-6 max-w-[60ch] text-lectura text-pizarra">{entrada}</p>

          {accion ? (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href={accion.href} variant="principal" size="lg">
                {accion.label}
              </ButtonLink>
              {secundaria ? (
                <ButtonLink href={secundaria.href} variant="secundaria" size="lg">
                  {secundaria.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>

        {borrador ? <HojaBorrador {...borrador} /> : null}
      </div>
    </section>
  );
}

/** El borrador: un impreso con sus casillas, rellenas con datos de ejemplo. */
function HojaBorrador({ titulo, apartado, filas, estado, nota }: Borrador) {
  return (
    <div className="border border-niebla bg-blanco" aria-label={titulo}>
      <div className="border-b-4 border-azul px-6 pb-4 pt-5">
        <p className="text-subtitulo text-azul">{titulo}</p>
        <p className="mt-1 text-dato uppercase tracking-wide text-pizarra">{apartado}</p>
      </div>

      <dl className="px-6 py-2">
        {filas.map((f) => (
          <div
            key={f.etiqueta}
            className={`flex items-baseline justify-between gap-4 border-b border-dashed border-niebla py-3 ${
              f.total ? "border-solid border-azul" : ""
            }`}
          >
            <dt className={`text-nota ${f.total ? "font-semibold text-azul" : "text-pizarra"}`}>
              {f.etiqueta}
            </dt>
            {/* La casilla: el importe va dentro de un recuadro, como en el impreso. */}
            <dd
              className={`min-w-[8.5rem] border px-2 py-1 text-right font-dato text-nota ${
                f.total ? "border-azul font-semibold text-azul" : "border-niebla text-azul"
              }`}
            >
              {f.valor}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center justify-between gap-4 px-6 pb-5 pt-3">
        <span className="inline-flex items-center gap-2 bg-verde-conciliado/10 px-2.5 py-1 text-dato font-semibold text-verde-conciliado">
          <span className="h-2 w-2 bg-verde-conciliado" aria-hidden="true" />
          {estado}
        </span>
        <span className="text-dato text-pizarra">{nota}</span>
      </div>
    </div>
  );
}
