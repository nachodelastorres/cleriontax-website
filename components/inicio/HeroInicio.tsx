import { getTranslations } from "next-intl/server";
import SimboloAnimado from "@/components/brand/SimboloAnimado";
import Clasificador, { type GrupoClasificador } from "@/components/inicio/Clasificador";
import { porPregunta, estaPublicada, type Pregunta } from "@/lib/situaciones";

/**
 * Cabecera de la home. A la izquierda la tesis; a la derecha, la puerta de
 * clasificación. Es la única cabecera del sitio sin patrón: aquí el elemento
 * gráfico es el clasificador, y el símbolo entrando a su posición (§12) firma
 * la página.
 */
export default async function HeroInicio({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio" });
  const grupos = porPregunta();

  const datos: GrupoClasificador[] = (["P1", "P2", "P3"] as Pregunta[]).map((p) => ({
    id: p,
    titulo: t(`preguntas.${p}.titulo`),
    quien: t(`preguntas.${p}.quien`),
    situaciones: grupos[p]
      .filter((s) => estaPublicada(s.slug))
      .map((s) => ({ slug: s.slug, texto: t(`situaciones.${s.slug}`), urgente: s.urgente })),
  }));

  return (
    <section className="bg-azul">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-28 md:pb-20 md:pt-32 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24">
        <div className="lg:col-span-6 lg:pr-4">
          {/*
            §11: la monoespaciada es solo para datos, y §10: el rojo sobre azul
            no alcanza contraste para texto pequeño. La etiqueta va en Niebla y
            el rojo queda en la marca.
          */}
          <span className="inline-flex items-center gap-3 text-nota font-semibold text-niebla">
            <span className="h-[3px] w-6 bg-rojo" aria-hidden="true" />
            {t("hero.etiqueta")}
          </span>
          <h1 className="mt-5 max-w-[16ch] text-hero text-blanco">{t("hero.titulo")}</h1>
          <p className="mt-6 max-w-[56ch] text-lectura text-niebla">{t("hero.entrada")}</p>

          <div className="mt-10 flex items-center gap-5 border-t border-blanco/15 pt-6">
            <SimboloAnimado tam={56} className="flex-none text-blanco" retraso={120} />
            <p className="max-w-[34ch] text-nota text-niebla">{t("hero.firma")}</p>
          </div>
        </div>

        <div className="lg:col-span-6">
          {/*
            P2 abierta al cargar: los procedimientos con plazo son el cliente
            que el research marca como oportunidad número uno.
          */}
          <Clasificador
            grupos={datos}
            inicial="P2"
            textos={{
              elige: t("hero.elige"),
              conPlazo: t("hero.conPlazo"),
              verTodas: t("hero.verTodas"),
              otraCosa: t("hero.otraCosa"),
            }}
          />
        </div>
      </div>
    </section>
  );
}
