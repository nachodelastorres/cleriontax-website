import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Cabecera } from "@/components/secciones/Bloques";
import { porPregunta, estaPublicada, type Pregunta } from "@/lib/situaciones";

/**
 * El clasificador — las tres preguntas y sus situaciones.
 *
 * Estuvo en el hero, con pestañas. Al bajarlo a su propia sección puede
 * enseñar las diez situaciones a la vez, que es mejor para quien busca la
 * suya y mejor para el rastreador: diez enlaces visibles desde la página con
 * más autoridad del sitio, sin JavaScript de por medio.
 *
 * Las tres columnas son las tres preguntas del plan; el orden es el del
 * registro, que pone delante los casos con plazo administrativo.
 */
export default async function ElijeTuCaso({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio" });
  const grupos = porPregunta();
  const preguntas = (["P1", "P2", "P3"] as Pregunta[]).filter((p) =>
    grupos[p].some((s) => estaPublicada(s.slug))
  );

  return (
    <section className="bg-blanco">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Cabecera marca="01" titulo={t("clasificador.titulo")} entrada={t("clasificador.entrada")} />

        {/*
          Las tres cabeceras tienen que quedar a la misma altura aunque el
          texto ocupe distintas líneas: cada columna hereda las filas de la
          rejilla madre (subgrid) en lugar de repartirse su propio alto.
        */}
        <div className="grid gap-px border border-niebla bg-niebla lg:grid-cols-3 lg:grid-rows-[auto_1fr]">
          {preguntas.map((p) => (
            <div key={p} className="flex flex-col bg-blanco lg:row-span-2 lg:grid lg:grid-rows-subgrid">
              <div className="border-b border-niebla px-6 pb-5 pt-6">
                <span className="text-dato font-semibold text-rojo">{p}</span>
                <h3 className="mt-1.5 text-subtitulo text-azul">{t(`preguntas.${p}.titulo`)}</h3>
                <p className="mt-2 text-nota text-pizarra">{t(`preguntas.${p}.quien`)}</p>
              </div>

              <ul className="flex-1 px-3 py-2">
                {grupos[p]
                  .filter((s) => estaPublicada(s.slug))
                  .map((s) => (
                    <li key={s.slug} className="border-b border-niebla/60 last:border-b-0">
                      <Link
                        href={`/situaciones/${s.slug}`}
                        className="group flex items-start justify-between gap-3 px-3 py-3.5 transition-colors duration-200 hover:bg-papel"
                      >
                        <span className="text-nota font-semibold text-azul group-hover:underline group-hover:underline-offset-4">
                          {t(`situaciones.${s.slug}`)}
                        </span>
                        <span className="flex flex-none items-center gap-2 pt-0.5">
                          {s.urgente ? (
                            <span className="bg-rojo/10 px-2 py-0.5 text-dato font-semibold text-rojo">
                              {t("clasificador.conPlazo")}
                            </span>
                          ) : null}
                          <ArrowRight className="h-4 w-4 text-rojo" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

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
