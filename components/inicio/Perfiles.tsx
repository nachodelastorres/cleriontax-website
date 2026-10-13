import { getTranslations } from "next-intl/server";
import { Cabecera, type NombreForma } from "@/components/secciones/Bloques";
import { Angulo, AnguloInverso, Arco, CuartoDeCirculo } from "@/components/brand/Formas";

/**
 * Los cuatro perfiles del manual (§05).
 *
 * No llevan a ninguna parte a propósito: su trabajo es que el lector se
 * reconozca en uno, no repartir tráfico. Las puertas a cada caso ya están en
 * el clasificador de arriba.
 *
 * Cada perfil se marca con una forma del símbolo en lugar de una letra. El
 * despacho va en azul porque es el único bloque que no habla al
 * contribuyente; el requerido lleva la única forma en rojo, la del criterio.
 */
const FORMAS = { angulo: Angulo, arco: Arco, cuarto: CuartoDeCirculo, inverso: AnguloInverso };

const PERFILES: { id: string; forma: NombreForma; acento?: boolean; oscuro?: boolean }[] = [
  { id: "A", forma: "arco" },
  { id: "B", forma: "inverso" },
  { id: "C", forma: "cuarto", acento: true },
  { id: "D", forma: "angulo", oscuro: true },
];

export default async function Perfiles({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio.perfiles" });

  return (
    <section className="bg-papel">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Cabecera titulo={t("titulo")} entrada={t("entrada")} />

        <ul className="grid gap-px border border-niebla bg-niebla sm:grid-cols-2 lg:grid-cols-4">
          {PERFILES.map((p) => {
            const Forma = FORMAS[p.forma];
            return (
              <li key={p.id} className={`flex flex-col p-7 ${p.oscuro ? "bg-azul" : "bg-blanco"}`}>
                <Forma
                  tam={56}
                  className={p.acento ? "text-rojo" : p.oscuro ? "text-blanco" : "text-azul"}
                />

                <h3 className={`mt-8 text-subtitulo ${p.oscuro ? "text-blanco" : "text-azul"}`}>
                  {t(`items.${p.id}.nombre`)}
                </h3>
                <p className={`mt-3 flex-1 text-nota ${p.oscuro ? "text-niebla" : "text-pizarra"}`}>
                  {t(`items.${p.id}.descripcion`)}
                </p>

                <div className={`mt-6 border-t pt-4 ${p.oscuro ? "border-blanco/20" : "border-niebla"}`}>
                  <p className={`text-dato ${p.oscuro ? "text-niebla" : "text-pizarra"}`}>
                    {t("mensaje")}
                  </p>
                  <p className={`mt-1 text-nota font-semibold ${p.oscuro ? "text-blanco" : "text-azul"}`}>
                    {t(`items.${p.id}.mensaje`)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
