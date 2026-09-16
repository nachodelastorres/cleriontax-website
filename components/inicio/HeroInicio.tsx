import { getTranslations } from "next-intl/server";
import SimboloAnimado from "@/components/brand/SimboloAnimado";
import ButtonLink from "@/components/ui/ButtonLink";
import CifrasEstado from "@/components/brand/CifrasEstado";
import { formatearImporteConSigno, formatearNumero } from "@/lib/format";
import { CONCILIADAS, REVISADAS_A_MANO } from "@/components/inicio/MetodoDiagrama";

/**
 * Cabecera de la home.
 *
 * Antes la primera pantalla era el clasificador: pedía elegir entre tres
 * preguntas a quien todavía no sabía qué se vende aquí. El clasificador sigue,
 * pero en su propia sección; el hero dice qué hacemos, ofrece una acción y
 * enseña el entregable, que es el argumento de la marca.
 *
 * El resumen de la derecha es la misma cartera ficticia que recorre toda la
 * home: lo que entra en el diagrama del método y lo que sale en el informe.
 */
export default async function HeroInicio({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio" });

  const filas = [
    { concepto: t("informe.filas.ganancias"), valor: formatearImporteConSigno(18402.15) },
    { concepto: t("informe.filas.perdidas"), valor: formatearImporteConSigno(-6117.8) },
    { concepto: t("informe.filas.staking"), valor: formatearImporteConSigno(1293.44) },
  ];

  return (
    <section className="bg-azul">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-28 md:pb-20 md:pt-32 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-24">
        <div className="lg:col-span-7 lg:pr-6">
          <span className="inline-flex items-center gap-3 text-nota font-semibold text-niebla">
            <span className="h-[3px] w-6 bg-rojo" aria-hidden="true" />
            {t("hero.etiqueta")}
          </span>

          <h1 className="mt-5 max-w-[20ch] text-hero text-blanco">{t("hero.titulo")}</h1>
          <p className="mt-6 max-w-[60ch] text-lectura text-niebla">{t("hero.entrada")}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contacto" variant="principal" size="lg">
              {t("hero.accion")}
            </ButtonLink>
            <ButtonLink href="/metodo" variant="secundaria-inversa" size="lg">
              {t("hero.secundaria")}
            </ButtonLink>
          </div>

          <div className="mt-10 flex items-center gap-5 border-t border-blanco/15 pt-6">
            <SimboloAnimado tam={48} className="flex-none text-blanco" retraso={120} />
            <p className="max-w-[46ch] text-nota text-niebla">{t("hero.firma")}</p>
          </div>
        </div>

        {/* El entregable, en pequeño: la prueba de qué se recibe. */}
        <div className="lg:col-span-5">
          <figure className="m-0 border border-blanco/15 bg-blanco">
            <figcaption className="border-b border-niebla px-5 py-3.5 font-dato tabular-nums text-dato text-pizarra">
              {t("informe.periodo")}
            </figcaption>

            <dl className="m-0 px-5 py-1">
              {filas.map((f) => (
                <div
                  key={f.concepto}
                  className="flex items-baseline justify-between gap-6 border-b border-niebla/60 py-3.5 last:border-b-0"
                >
                  <dt className="text-nota text-azul">{f.concepto}</dt>
                  <dd className="cifra-tabla m-0 text-dato text-azul">{f.valor}</dd>
                </div>
              ))}
            </dl>

            <CifrasEstado
              className="border-t border-niebla"
              cifras={[
                { valor: formatearNumero(CONCILIADAS), etiqueta: t("informe.chipConciliado") },
                {
                  valor: formatearNumero(REVISADAS_A_MANO),
                  etiqueta: t("informe.chipRevision"),
                  acento: true,
                },
              ]}
            />
          </figure>
          <p className="mt-3 text-nota text-niebla">{t("metodo.nota")}</p>
        </div>
      </div>
    </section>
  );
}
