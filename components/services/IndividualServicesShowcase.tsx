import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LINEAS_SERVICIO } from "@/components/brand/lineas";

/**
 * Las cuatro líneas de servicio (manual v1.1, §02).
 *
 * La forma que identifica a cada línea sale de `LINEAS_SERVICIO`, para que
 * esta rejilla y los bloques de servicios relacionados no puedan discrepar.
 */
const LINEAS = [
  {
    slug: "informe-fiscal-criptomonedas",
    tituloKey: "analysisTitle",
    excerptKey: "analysisExcerpt",
  },
  {
    slug: "declarar-criptomonedas",
    tituloKey: "taxReturnsTitle",
    excerptKey: "taxReturnsExcerpt",
  },
  {
    slug: "litigacion-fiscal-criptomonedas",
    tituloKey: "litigationTitle",
    excerptKey: "litigationExcerpt",
  },
  {
    slug: "asesoria-fiscal-criptomonedas",
    tituloKey: "advisoryTitle",
    excerptKey: "advisoryExcerpt",
  },
] as const;

export default function IndividualServicesShowcase() {
  const t = useTranslations("services.showcase");

  return (
    <section className="py-24 bg-papel">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 max-w-3xl">
          <h2 className="text-seccion text-azul">{t("sectionTitle")}</h2>
          <p className="mt-4 text-lectura text-pizarra">{t("sectionSubtitle")}</p>
        </div>

        <div className="grid gap-px border border-niebla bg-niebla">
          {LINEAS.map(({ slug, tituloKey, excerptKey }, i) => {
            const { Forma, acento } = LINEAS_SERVICIO[slug];

            return (
              <Link
                key={slug}
                href={`/servicios/${slug}`}
                className="group block bg-blanco transition-colors duration-200 hover:bg-papel"
              >
                <article className="flex items-start gap-6 p-8 md:p-10">
                  <div className="flex flex-none items-start gap-4">
                    <span className="pt-1 font-semibold text-dato text-pizarra">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Forma tam={44} className={acento ? "text-rojo" : "text-azul"} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-subtitulo text-azul">{t(tituloKey)}</h3>
                    <p className="mt-3 text-lectura text-pizarra">{t(excerptKey)}</p>

                    <span className="mt-6 inline-flex items-center gap-2 text-nota font-semibold text-rojo">
                      {t("learnMore")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 max-w-[66ch] text-nota text-pizarra">{t("needHelpChoosing")}</p>
      </div>
    </section>
  );
}
