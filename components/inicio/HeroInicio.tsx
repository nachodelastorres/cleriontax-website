import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SimboloAnimado from "@/components/brand/SimboloAnimado";
import ButtonLink from "@/components/ui/ButtonLink";
import { ORDEN_LINEAS } from "@/components/brand/lineas";

/**
 * Cabecera de la home. Una sola columna y el titular a toda escala.
 *
 * Aquí no va ninguna prueba ni ninguna tabla: el informe de ejemplo se enseña
 * dos veces más abajo —en el diagrama del método y en la sección del
 * entregable— y en la primera pantalla solo restaba sitio al titular.
 *
 * Los cuatro nombres de servicio van debajo, como enlaces. Es donde viven los
 * términos que el H1 no puede llevar sin competir con las páginas que ya los
 * defienden: la renta cripto y la litigación tienen su propia landing.
 */
export default async function HeroInicio({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio" });

  return (
    <section className="bg-azul">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-36 lg:pb-24">
        <span className="inline-flex items-center gap-3 text-nota font-semibold text-niebla">
          <span className="h-[3px] w-6 bg-rojo" aria-hidden="true" />
          {t("hero.etiqueta")}
        </span>

        {/*
          Por encima de la escala del §11 (52 px): en la home el titular es la
          pieza, no acompaña a nada. Interletrado y altura de línea bajan en
          proporción para que siga leyéndose como un bloque.
        */}
        <h1 className="mt-6 max-w-[15ch] text-hero text-blanco md:text-[68px] md:leading-[68px] lg:text-[84px] lg:leading-[82px] lg:tracking-[-0.045em]">
          {t("hero.titulo")}
        </h1>

        <p className="mt-8 max-w-[58ch] text-lectura text-niebla md:text-subtitulo md:font-normal md:leading-[32px]">
          {t("hero.entrada")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/contacto" variant="principal" size="lg">
            {t("hero.accion")}
          </ButtonLink>
          <ButtonLink href="/metodo" variant="secundaria-inversa" size="lg">
            {t("hero.secundaria")}
          </ButtonLink>
        </div>

        <div className="mt-14 border-t border-blanco/15 pt-7">
          <div className="flex items-center gap-4">
            <SimboloAnimado tam={36} className="flex-none text-blanco" retraso={120} />
            <p className="text-nota font-semibold text-niebla">{t("hero.firma")}</p>
          </div>

          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {ORDEN_LINEAS.map((slug) => (
              <li key={slug}>
                {/* Sin flecha: con el nombre en dos líneas queda descolgada. */}
                <Link
                  href={`/servicios/${slug}`}
                  className="block border-l-2 border-rojo/70 pl-3 text-lectura text-blanco underline-offset-4 hover:underline"
                >
                  {t(`lineas.items.${slug}.nombre`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
