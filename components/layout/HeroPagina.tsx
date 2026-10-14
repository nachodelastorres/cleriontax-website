import Patron from "@/components/brand/Patron";
import ButtonLink from "@/components/ui/ButtonLink";
import SimboloAnimado from "@/components/brand/SimboloAnimado";
import SimboloFondo from "@/components/brand/SimboloFondo";

/**
 * Cabecera de página — §13 y §17.
 *
 * El patrón se usa como superficie completa, no como banda parcial. La razón
 * es de color: su cara dominante es #22326B, bastante más clara que el Azul
 * Cleriontax del fondo, así que una banda a media anchura se lee siempre como
 * un rectángulo pegado encima, con un canto que parece un error.
 *
 * Cubriendo toda la cabecera, el patrón sangra por los cuatro lados —«como
 * superficie completa», §13— y el texto va dentro de una caja de color plano
 * que flota encima, con patrón a su alrededor. Antes el panel del texto se
 * prolongaba hasta el borde izquierdo y tapaba dos tercios del patrón, que
 * quedaba como una franja cortada a la derecha.
 *
 * El texto de lectura va sobre color plano, nunca sobre el patrón (§13).
 */
interface HeroPaginaProps {
  /** Identificador de la página. Se conserva por compatibilidad de llamada. */
  id: string;
  etiqueta?: string;
  titulo: string;
  entrada: string;
  /** Muestra el símbolo entrando a su posición (§12). Solo donde signifique algo. */
  simbolo?: boolean;
  accion?: { label: string; href: string };
  secundaria?: { label: string; href: string };
}

export default function HeroPagina({
  etiqueta,
  titulo,
  entrada,
  accion,
  secundaria,
  simbolo = false,
}: HeroPaginaProps) {
  return (
    <section className="relative overflow-hidden bg-azul">
      {/* Superficie completa de patrón. En móvil, color plano. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Patron version="azul" bloque={104} />
      </div>

      <SimboloFondo />

      <div className="relative mx-auto max-w-5xl px-6">
        {/*
          Caja sólida sobre el patrón. En pantalla grande se separa del borde
          de la cabecera para que el patrón la rodee, y el margen negativo
          compensa su relleno: el texto sigue alineado con el resto de la página.
          Arriba el margen suma los 64 px del menú fijo, que tapa el principio
          de la cabecera: así se ve el mismo patrón encima que debajo.
        */}
        <div className="relative py-20 md:py-24 lg:-mx-12 lg:mb-14 lg:bg-azul lg:mt-[7.5rem] lg:w-fit lg:max-w-[52rem] lg:px-12 lg:py-12">
          <div className="relative grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
            <div>
              {etiqueta ? (
                <span className="font-semibold text-dato text-rojo">{etiqueta}</span>
              ) : null}

              <h1 className="mt-5 max-w-[18ch] break-words text-hero text-blanco">{titulo}</h1>
              <p className="mt-6 max-w-[62ch] text-lectura text-niebla">{entrada}</p>

              {accion ? (
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={accion.href} variant="principal" size="lg">
                    {accion.label}
                  </ButtonLink>
                  {secundaria ? (
                    <ButtonLink
                      href={secundaria.href}
                      variant="secundaria-inversa"
                      size="lg"
                    >
                      {secundaria.label}
                    </ButtonLink>
                  ) : null}
                </div>
              ) : null}
            </div>

            {simbolo ? (
              <SimboloAnimado
                tam={132}
                className="hidden text-blanco xl:block"
                retraso={140}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
