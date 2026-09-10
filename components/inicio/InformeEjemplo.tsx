import { getTranslations } from "next-intl/server";
import { Angulo, Simbolo } from "@/components/brand/Formas";
import { Cabecera } from "@/components/secciones/Bloques";
import TablaDatos from "@/components/brand/TablaDatos";
import ChipEstado from "@/components/brand/ChipEstado";
import ButtonLink from "@/components/ui/ButtonLink";
import { formatearNumero } from "@/lib/format";
import { CONCILIADAS, REVISADAS_A_MANO } from "@/components/inicio/MetodoDiagrama";

/**
 * El entregable como prueba — plan, fase 05: «la tabla real como prueba, con
 * datos ficticios y su nota».
 *
 * La tabla reproduce la del manual (§17, «Informe») y los recuentos de los
 * chips son los mismos de la figura del método: es la misma cartera de
 * ejemplo vista en dos momentos.
 */
export default async function InformeEjemplo({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio.informe" });
  const puntos = t.raw("puntos") as string[];

  return (
    <section className="bg-blanco">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <Cabecera marca="04" titulo={t("titulo")} entrada={t("entrada")} />

          <ul className="space-y-4 sm:pl-[56px]">
            {puntos.map((p) => (
              <li key={p} className="grid grid-cols-[14px_1fr] gap-4">
                <Angulo tam={12} className="mt-[7px] text-azul" />
                <span className="text-lectura text-azul">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 sm:pl-[56px]">
            <ButtonLink href="/servicios/informe-fiscal-criptomonedas" variant="secundaria" size="lg">
              {t("accion")}
            </ButtonLink>
          </div>
        </div>

        {/* El documento, sobre Papel para que se lea como pieza aparte. */}
        <div className="bg-papel p-4 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="border border-niebla bg-blanco p-5 sm:p-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-niebla pb-5">
              <div className="flex items-center gap-3">
                <Simbolo tam={28} />
                <span className="font-mono text-dato text-pizarra">{t("periodo")}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <ChipEstado estado="conciliado">
                  {formatearNumero(CONCILIADAS)} {t("chipConciliado")}
                </ChipEstado>
                <ChipEstado estado="revision">
                  {REVISADAS_A_MANO} {t("chipRevision")}
                </ChipEstado>
              </div>
            </div>

            <TablaDatos
              titulo={t("tablaTitulo")}
              columnaConcepto={t("columnaConcepto")}
              columnaValor={t("columnaValor")}
              filas={[
                { concepto: t("filas.ganancias"), importe: 18402.15 },
                { concepto: t("filas.perdidas"), importe: -6117.8 },
                { concepto: t("filas.staking"), importe: 1293.44 },
                { concepto: t("filas.revisadas"), recuento: REVISADAS_A_MANO },
              ]}
              criterio="FIFO"
              datosDeEjemplo
              pie={t("pie")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
