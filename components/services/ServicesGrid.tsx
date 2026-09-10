import { Database, Calculator, TrendingUp, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

/**
 * Rejilla de servicios — Manual de marca §10, §11, §12.
 *
 * Las cuatro líneas se diferencian por su número y su icono, no por color:
 * la marca tiene dos colores y el rojo es acento, así que cuatro colores de
 * tarjeta romperían el reparto (§10). Sin degradados, sin sombras, sin
 * animación al pasar el ratón y con esquinas rectas.
 */
const icons = [Database, Calculator, TrendingUp, Users];

export default function ServicesGrid() {
  const t = useTranslations("services.offerings");

  const serviceKeys = [
    "dataAnalysis",
    "taxCalculations",
    "optimization",
    "advisory",
  ] as const;

  return (
    <section className="py-16 md:py-24 bg-papel">
      <Container>
        <div className="mb-16 max-w-3xl">
          <h2 className="text-seccion text-azul mb-4">{t("title")}</h2>
          <p className="text-lectura text-pizarra">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-niebla border border-niebla max-w-6xl">
          {serviceKeys.map((key, index) => {
            const Icon = icons[index];

            return (
              <article key={key} className="bg-blanco p-8 flex flex-col">
                {/* Número de línea y filete: la única aparición del rojo en la tarjeta. */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-dato text-rojo">
                    {t(`items.${key}.number`)}
                  </span>
                  <div className="h-px flex-1 bg-niebla" />
                </div>

                <Icon className="h-7 w-7 text-azul mb-5" aria-hidden="true" />

                <h3 className="text-subtitulo text-azul mb-3">
                  {t(`items.${key}.title`)}
                </h3>

                <p className="text-lectura text-pizarra mb-6 flex-1">
                  {t(`items.${key}.description`)}
                </p>

                <div className="flex flex-wrap gap-2">
                  {t(`items.${key}.keywords`)
                    .split(", ")
                    .map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-nota text-pizarra bg-papel border border-niebla"
                      >
                        {keyword}
                      </span>
                    ))}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
