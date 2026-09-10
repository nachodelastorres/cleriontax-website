import Patron from "@/components/brand/Patron";
import ButtonLink from "@/components/ui/ButtonLink";
import { formaDeLinea } from "@/components/brand/lineas";

/**
 * Cabecera de una página de servicio — §17.
 *
 * Un titular, una frase de apoyo, una acción principal en rojo y una
 * secundaria en contorno. El patrón azul ocupa una banda a sangre por el
 * borde derecho, nunca bajo el texto de lectura (§13).
 */
interface HeroServicioProps {
  slug: string;
  /** Posición de la línea dentro de las cuatro del manual. */
  indice: number;
  titulo: string;
  entrada: string;
  accion: { label: string; href: string };
  secundaria?: { label: string; href: string };
  etiqueta: string;
}

export default function HeroServicio({
  slug,
  indice,
  titulo,
  entrada,
  accion,
  secundaria,
  etiqueta,
}: HeroServicioProps) {
  const linea = formaDeLinea(slug);
  const Forma = linea?.Forma;

  return (
    <section className="relative overflow-hidden bg-azul">
      {/* Superficie completa: el patrón sangra por tres bordes (§13). */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Patron version="azul" bloque={104} />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="relative bg-azul py-20 before:absolute before:inset-y-0 before:right-full before:w-screen before:bg-azul md:py-24 lg:w-[66%] lg:pr-12">
        <div className="flex items-center gap-3">
          <span className="font-mono text-dato text-rojo">
            {String(indice).padStart(2, "0")} / 04
          </span>
          <span className="font-mono text-dato text-niebla">{etiqueta}</span>
        </div>

        <div className="mt-6 flex items-start gap-6">
          {Forma ? (
            <Forma
              tam={56}
              className={`hidden flex-none sm:block ${linea.acento ? "text-rojo" : "text-blanco"}`}
            />
          ) : null}

          <div className="min-w-0">
            <h1 className="max-w-[18ch] text-hero text-blanco">{titulo}</h1>
            <p className="mt-6 max-w-[62ch] text-lectura text-niebla">{entrada}</p>
          </div>
        </div>

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
        </div>
      </div>
    </section>
  );
}
