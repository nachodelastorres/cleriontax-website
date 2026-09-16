import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Cabecera } from "@/components/secciones/Bloques";
import { LINEAS_SERVICIO, ORDEN_LINEAS } from "@/components/brand/lineas";

/**
 * Las cuatro líneas de servicio, como un índice y no como tarjetas: filas a
 * todo el ancho, cada una con la forma del símbolo que le corresponde (§08) a
 * escala de elemento estructural, no de icono.
 */
export default async function LineasServicio({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio.lineas" });

  return (
    <section className="bg-blanco">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Cabecera marca="03" titulo={t("titulo")} entrada={t("entrada")} />

        <ul className="border-t-2 border-azul">
          {ORDEN_LINEAS.map((slug, i) => {
            const { Forma, acento } = LINEAS_SERVICIO[slug];
            return (
              <li key={slug} className="border-b border-niebla">
                <Link
                  href={`/servicios/${slug}`}
                  className="group grid gap-5 px-1 py-8 transition-colors duration-200 hover:bg-blanco md:grid-cols-[72px_minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-start md:gap-8 md:px-4"
                >
                  <Forma tam={56} className={acento ? "text-rojo" : "text-azul"} />
                  <div>
                    <span className="font-semibold text-dato text-pizarra">0{i + 1}</span>
                    <h3 className="mt-1 text-subtitulo text-azul">{t(`items.${slug}.nombre`)}</h3>
                  </div>
                  <p className="max-w-[60ch] text-lectura text-pizarra">{t(`items.${slug}.descripcion`)}</p>
                  <span className="inline-flex items-center gap-2 whitespace-nowrap text-nota font-semibold text-azul group-hover:underline group-hover:underline-offset-4 md:pt-1">
                    {t("verServicio")}
                    <ArrowRight className="h-4 w-4 text-rojo" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
