import { getTranslations } from "next-intl/server";
import { Angulo, AnguloInverso, Arco, CuartoDeCirculo, Simbolo } from "@/components/brand/Formas";
import { Cabecera } from "@/components/secciones/Bloques";
import { FUENTES, type LogoFuente } from "@/components/inicio/fuentesDatos";

/**
 * El método en una figura — la composición base del manual (§12):
 *
 *   «A la izquierda, datos de longitudes distintas: exchanges, wallets,
 *    protocolos. En el centro, el símbolo como punto de conciliación. A la
 *    derecha, una columna de ancho constante con una línea en rojo señalando
 *    lo revisado a mano.»
 *
 * Sin cifras: lo que cuenta es que da igual de dónde vengan los datos. Las
 * fuentes confluyen en el símbolo y salen como un único informe. Cada paso
 * lleva su forma del símbolo (§08): el ángulo es el dato en bruto, el arco el
 * proceso y el cuarto de círculo, en rojo, el criterio de quien revisa a mano.
 */

/** Centro vertical de cada grupo de fuentes, en % del alto de la figura. */
const CENTROS = [12.5, 37.5, 62.5, 87.5];

/** Logotipo en sus colores, sobre la ficha blanca. */
function Logo({ logo }: { logo: LogoFuente }) {
  return (
    <svg
      viewBox={logo.viewBox}
      className="h-[18px] w-[18px] flex-none"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: logo.svg }}
    />
  );
}

/** Línea con el flujo de datos: un trazo tenue y, encima, guiones que avanzan. */
function Flujo({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="none" className="stroke-blanco/20" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      <path
        d={d}
        fill="none"
        pathLength={100}
        strokeDasharray="2 6"
        className="animate-flujo stroke-blanco/80"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}

/** Conector vertical para móvil, entre bloque y bloque. */
function FlujoVertical() {
  return (
    <svg viewBox="0 0 2 100" preserveAspectRatio="none" className="mx-auto my-3 block h-14 w-0.5 lg:hidden" aria-hidden="true">
      <Flujo d="M1 0 V100" />
    </svg>
  );
}

export default async function MetodoDiagrama({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio.metodo" });
  const intro = t.raw("intro") as string[];
  const pasos = t.raw("pasos") as string[];
  const filas = t.raw("informe.filas") as string[];
  const modelos = t.raw("informe.modelos") as string[];
  const formasPaso = [Angulo, Arco, CuartoDeCirculo];

  return (
    <section className="bg-azul">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Cabecera titulo={t("titulo")} oscuro />

        {/* Qué hacemos y cómo, en texto: la figura lo resume, esto lo explica (y lo indexa) */}
        <div className="mb-14 grid gap-5 lg:grid-cols-3 lg:gap-10">
          {intro.map((parrafo) => (
            <p key={parrafo} className="text-lectura text-niebla">
              {parrafo}
            </p>
          ))}
        </div>

        <figure className="m-0 lg:grid lg:grid-cols-[minmax(0,1fr)_88px_196px_56px_minmax(0,300px)]">
          {/* Lo que llega: cada grupo ocupa el mismo alto, para que las líneas salgan de su centro */}
          <div className="grid gap-6 lg:auto-rows-fr lg:gap-0">
            {FUENTES.map((grupo) => (
              <div key={grupo.id} className="flex flex-col justify-center lg:py-3">
                <p className="mb-2.5 text-dato font-semibold text-blanco">{t(`grupos.${grupo.id}`)}</p>
                <ul className="flex flex-wrap gap-2">
                  {grupo.logos.map((logo) => (
                    <li
                      key={logo.nombre}
                      className="flex items-center gap-2 bg-blanco px-2.5 py-1.5 text-dato font-medium text-azul"
                    >
                      <Logo logo={logo} />
                      {logo.nombre}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Las fuentes confluyen en el símbolo. Las líneas se alargan 44 px para
              tocar su borde: (196 de columna − 108 de símbolo) / 2. */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden h-full w-[calc(100%+44px)] lg:block" aria-hidden="true">
            {CENTROS.map((y) => (
              <Flujo key={y} d={`M0 ${y} C 55 ${y}, 45 50, 100 50`} />
            ))}
          </svg>
          <FlujoVertical />

          {/* Conciliación. En escritorio, filas 1fr · auto · 1fr: el símbolo queda
              justo a media altura, donde llegan las líneas. */}
          <div className="flex flex-col items-center lg:grid lg:grid-rows-[1fr_auto_1fr] lg:justify-items-center">
            <p className="mb-4 text-nota font-semibold text-blanco lg:self-end">{t("conciliacion")}</p>
            <div className="grid grid-cols-2 gap-3" aria-hidden="true">
              <Angulo tam={48} className="text-blanco" />
              <CuartoDeCirculo tam={48} className="text-rojo" />
              <Arco tam={48} className="text-blanco" />
              <AnguloInverso tam={48} className="text-blanco" />
            </div>
            <ul className="mt-5 max-w-[300px] space-y-2.5 lg:self-start">
              {pasos.map((paso, i) => {
                const Forma = formasPaso[i] ?? Arco;
                const rojo = i === pasos.length - 1;
                return (
                  <li key={paso} className="grid grid-cols-[12px_1fr] items-start gap-2.5 text-dato">
                    <Forma tam={12} className={`mt-1 ${rojo ? "text-rojo" : "text-niebla"}`} />
                    <span className={rojo ? "text-blanco" : "text-niebla"}>{paso}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Un solo informe */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="-ml-[44px] hidden h-full w-[calc(100%+44px)] lg:block" aria-hidden="true">
            <Flujo d="M0 50 H100" />
          </svg>
          <FlujoVertical />

          <div className="flex items-center">
            <div className="w-full bg-blanco p-6 text-azul">
              <div className="flex items-center gap-3 border-b border-niebla pb-4">
                <Simbolo tam={28} />
                <div>
                  <p className="text-nota font-semibold">{t("informe.titulo")}</p>
                  <p className="text-dato text-pizarra">{t("informe.subtitulo")}</p>
                </div>
              </div>
              <ul className="divide-y divide-niebla/70">
                {filas.map((fila, i) => (
                  <li key={fila} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-dato">{fila}</span>
                    {/* La cifra, sugerida: lo que importa aquí es el camino, no el importe */}
                    <span className="h-1.5 flex-none bg-niebla" style={{ width: [52, 36, 44][i] ?? 40 }} aria-hidden="true" />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-dato font-semibold text-pizarra">{t("informe.listo")}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {modelos.map((modelo) => (
                  <li key={modelo} className="border border-azul/15 px-2 py-1 text-dato font-semibold">
                    {modelo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </figure>

        <p className="mt-10 max-w-[64ch] text-nota text-niebla">{t("mas")}</p>
        <p className="mt-2 text-dato text-niebla/70">{t("nota")}</p>
      </div>
    </section>
  );
}
