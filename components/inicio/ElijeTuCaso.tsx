import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Cabecera } from "@/components/secciones/Bloques";
import ClasificadorPestanas, {
  type GrupoClasificador,
} from "@/components/inicio/ClasificadorPestanas";
import { GRUPOS, porGrupo } from "@/lib/paginas";

/**
 * El clasificador — las tres preguntas y, debajo de cada una, los casos que
 * llevan a su página de servicio.
 *
 * Abre por la pregunta de la AEAT: los procedimientos con plazo son el caso de
 * más valor y el que el keyword research marca como oportunidad número uno.
 */
export default async function ElijeTuCaso({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio" });
  const tPag = await getTranslations({ locale, namespace: "paginas" });
  const grupos = porGrupo();

  const datos: GrupoClasificador[] = GRUPOS.map((g) => ({
    id: g,
    titulo: tPag(`grupos.${g}.titulo`),
    quien: tPag(`grupos.${g}.quien`),
    casos: grupos[g].map((p) => ({
      slug: p.slug,
      texto: tPag(`casos.${p.slug}`),
      urgente: p.urgente,
    })),
  }));

  return (
    <section className="bg-blanco">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Cabecera titulo={t("clasificador.titulo")} entrada={t("clasificador.entrada")} />

        <ClasificadorPestanas
          grupos={datos}
          inicial="aeat"
          textos={{
            conPlazo: tPag("conPlazo"),
            verPagina: tPag("verPagina"),
          }}
        />

        <div className="mt-6 flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
          <a
            href={`/${locale}/contacto`}
            className="inline-flex items-center gap-2 text-nota font-semibold text-rojo underline-offset-4 hover:underline"
          >
            {t("clasificador.otraCosa")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
