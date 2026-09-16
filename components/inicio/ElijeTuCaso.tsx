import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Cabecera } from "@/components/secciones/Bloques";
import ClasificadorPestanas, {
  type GrupoClasificador,
} from "@/components/inicio/ClasificadorPestanas";
import { porPregunta, estaPublicada, type Pregunta } from "@/lib/situaciones";

/**
 * El clasificador — las tres preguntas y sus situaciones.
 *
 * Abre por P2: los procedimientos con plazo son el caso de más valor y el que
 * el keyword research marca como oportunidad número uno. El orden dentro de
 * cada pregunta es el del registro, que también pone delante lo urgente.
 */
export default async function ElijeTuCaso({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio" });
  const tSit = await getTranslations({ locale, namespace: "situaciones" });
  const grupos = porPregunta();

  const datos: GrupoClasificador[] = (["P1", "P2", "P3"] as Pregunta[])
    .filter((p) => grupos[p].some((s) => estaPublicada(s.slug)))
    .map((p) => ({
      id: p,
      titulo: t(`preguntas.${p}.titulo`),
      quien: t(`preguntas.${p}.quien`),
      situaciones: grupos[p]
        .filter((s) => estaPublicada(s.slug))
        .map((s) => ({ slug: s.slug, texto: t(`situaciones.${s.slug}`), urgente: s.urgente })),
    }));

  return (
    <section className="bg-blanco">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Cabecera titulo={t("clasificador.titulo")} entrada={t("clasificador.entrada")} />

        <ClasificadorPestanas
          grupos={datos}
          inicial="P2"
          textos={{
            conPlazo: t("clasificador.conPlazo"),
            verSituacion: tSit("verSituacion"),
          }}
        />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <Link
            href="/situaciones"
            className="text-nota font-semibold text-azul underline-offset-4 hover:underline"
          >
            {t("clasificador.verTodas")}
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-nota font-semibold text-rojo underline-offset-4 hover:underline"
          >
            {t("clasificador.otraCosa")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
