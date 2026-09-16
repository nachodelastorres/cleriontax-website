import ButtonLink from "@/components/ui/ButtonLink";
import Patron from "@/components/brand/Patron";

/**
 * Bloque de acción — Manual de marca §17.
 *
 * «Un titular, una frase de apoyo, una acción principal en rojo y una
 *  secundaria en contorno azul. Nunca dos botones del mismo peso.»
 *
 * La API lo hace cumplir: hay una sola acción principal y la secundaria es
 * opcional, nunca un segundo botón del mismo peso.
 *
 * El tono cambia con la temperatura del visitante (plan, §06):
 *   frio     Está informándose. Se le lleva a su situación, no al contacto.
 *   templado Se ha reconocido en el problema. Se le pide el diagnóstico.
 *   urgente  Tiene una fecha límite. Teléfono y plazo por delante.
 */

type Temperatura = "frio" | "templado" | "urgente";

interface BloqueAccionProps {
  titulo: string;
  apoyo?: string;
  accion: { texto: string; href: string };
  secundaria?: { texto: string; href: string };
  temperatura?: Temperatura;
  /** Plazo visible. Solo en `urgente`, donde la fecha es el argumento. */
  plazo?: string;
  className?: string;
}

export default function BloqueAccion({
  titulo,
  apoyo,
  accion,
  secundaria,
  temperatura = "templado",
  plazo,
  className,
}: BloqueAccionProps) {
  const sobreAzul = temperatura !== "frio";

  return (
    <section
      className={`relative overflow-hidden ${sobreAzul ? "bg-azul" : "bg-papel"} ${className ?? ""}`}
    >
      {/* §13 — el patrón solo bajo titular y acción, nunca bajo texto de lectura. */}
      {sobreAzul ? (
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <Patron version="azul" bloque={96} />
        </div>
      ) : null}

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="relative py-14 md:py-16 lg:w-[70%] lg:bg-azul lg:before:absolute lg:before:inset-y-0 lg:before:right-full lg:before:w-screen lg:before:bg-azul">
        {temperatura === "urgente" && plazo ? (
          <p className="mb-4 inline-block border-l-2 border-rojo bg-rojo/10 px-3 py-1.5 font-semibold text-dato text-blanco">
            {plazo}
          </p>
        ) : null}

        <h2
          className={`max-w-[20ch] text-seccion ${sobreAzul ? "text-blanco" : "text-azul"}`}
        >
          {titulo}
        </h2>

        {apoyo ? (
          <p
            className={`mt-4 max-w-[62ch] text-lectura ${sobreAzul ? "text-niebla" : "text-pizarra"}`}
          >
            {apoyo}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href={accion.href} variant="principal" size="lg">
            {accion.texto}
          </ButtonLink>

          {secundaria ? (
            <ButtonLink
              href={secundaria.href}
              variant={sobreAzul ? "secundaria-inversa" : "secundaria"}
              size="lg"
            >
              {secundaria.texto}
            </ButtonLink>
          ) : null}
        </div>
        </div>
      </div>
    </section>
  );
}
