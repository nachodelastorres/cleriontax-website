import ButtonLink from "@/components/ui/ButtonLink";
import CalculadoraPlazo, { type TextosCalculadora } from "@/components/expediente/CalculadoraPlazo";

/**
 * Cabecera de las páginas de «¿Cómo lo justifico ante la AEAT?».
 *
 * Se aparta a propósito de la de las páginas de cifra: sin patrón y en azul
 * plano de lado a lado, porque aquí hay una fecha corriendo.
 * A la derecha, la calculadora de plazo: lo primero que necesita quien llega
 * con una carta de Hacienda es saber cuántos días le quedan.
 */
export default function HeroExpediente({
  locale,
  etiqueta,
  titulo,
  entrada,
  accion,
  secundaria,
  calculadora,
}: {
  locale: string;
  etiqueta?: string;
  titulo: string;
  entrada: string;
  accion?: { label: string; href: string };
  secundaria?: { label: string; href: string };
  calculadora?: TextosCalculadora;
}) {
  return (
    <section className="relative bg-azul">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-16 pt-28 md:pb-20 md:pt-32 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-16">
        <div>
          {etiqueta ? (
            <span className="inline-flex items-center gap-2 text-dato font-semibold uppercase tracking-wide text-rojo">
              <span className="h-2 w-2 animate-pulse bg-rojo" aria-hidden="true" />
              {etiqueta}
            </span>
          ) : null}
          <h1 className="mt-5 max-w-[20ch] break-words text-hero text-blanco">{titulo}</h1>
          <p className="mt-6 max-w-[60ch] text-lectura text-niebla">{entrada}</p>

          {accion ? (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href={accion.href} variant="principal" size="lg">
                {accion.label}
              </ButtonLink>
              {secundaria ? (
                <ButtonLink href={secundaria.href} variant="secundaria-inversa" size="lg">
                  {secundaria.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>

        {calculadora ? <CalculadoraPlazo locale={locale} textos={calculadora} /> : null}
      </div>
    </section>
  );
}
