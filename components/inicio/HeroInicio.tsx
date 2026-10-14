import { getTranslations } from "next-intl/server";
import SimboloAnimado from "@/components/brand/SimboloAnimado";
import SimboloFondo from "@/components/brand/SimboloFondo";
import ButtonLink from "@/components/ui/ButtonLink";
import { rutaPagina } from "@/lib/paginas";

/**
 * Cabecera de la home.
 *
 * A la izquierda, el titular y la entradilla; a la derecha, el símbolo
 * entrando a su posición —la única animación que autoriza el §12— con las dos
 * acciones debajo.
 *
 * El titular carga las búsquedas de cabecera. Aquí no va ninguna prueba ni
 * tabla: el informe de ejemplo se enseña dos veces más abajo.
 */
export default async function HeroInicio({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio.hero" });
  const senas = t.raw("senas") as { texto: string; slug: string }[];

  return (
    <section className="relative bg-azul">
      <SimboloFondo />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 pb-16 pt-28 md:pb-20 md:pt-32 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-24">
        <div className="lg:col-span-7">
          {/*
            Por encima de la escala del §11 (52 px): en la home el titular es
            la pieza, no acompaña a nada.
          */}
          {/* Un peso por debajo del 800 de la escala: a este tamaño el 800
              se empasta y el 700 respira. */}
          <h1 className="max-w-[17ch] break-words text-hero font-bold text-blanco md:text-[60px] md:leading-[60px] lg:text-[68px] lg:leading-[68px] lg:tracking-[-0.045em]">
            {t("titulo")}
          </h1>

          <p className="mt-8 max-w-[58ch] text-lectura text-niebla md:text-subtitulo md:font-normal md:leading-[32px]">
            {t("entrada")}
          </p>
        </div>

        <div className="flex flex-col items-start gap-8 lg:col-span-5 lg:gap-10 lg:items-center">
          <SimboloAnimado tam={260} className="hidden w-full max-w-[280px] text-blanco lg:block" retraso={160} dispersa />

          <div className="flex w-full flex-wrap items-center gap-4 lg:justify-center">
            <ButtonLink href="/contacto" variant="principal" size="lg">
              {t("accion")}
            </ButtonLink>
          </div>

          {/* Solo en móvil: tres señas bajo el botón para que el hero no
              termine en vacío, enlazadas a su servicio con la keyword como
              texto. En escritorio ese hueco lo ocupa el símbolo. */}
          <ul className="w-full border-t border-blanco/20 pt-5 lg:hidden">
            {senas.map((s) => (
              <li key={s.slug} className="py-1 text-dato font-semibold uppercase tracking-wide text-niebla">
                <a
                  href={`/${locale}${rutaPagina(s.slug, locale)}`}
                  className="underline-offset-4 transition-colors hover:text-blanco hover:underline"
                >
                  {s.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
