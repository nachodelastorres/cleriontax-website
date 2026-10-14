import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { PAGINAS, rutaPagina } from "@/lib/paginas";

/**
 * Página no encontrada.
 *
 * Quien llega aquí suele venir de un enlace antiguo. En vez de un error seco,
 * se le ofrecen los servicios y el blog, en su idioma y con el menú y el pie
 * de siempre. El estado sigue siendo 404 y Next la marca como noindex.
 */
export default async function NoEncontrada() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "noEncontrada" });
  const tPag = await getTranslations({ locale, namespace: "paginas" });

  return (
    <section className="bg-blanco">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-28 md:pt-36">
        <p className="text-dato font-semibold uppercase tracking-wide text-rojo">404</p>
        <h1 className="mt-6 max-w-[18ch] text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em] text-azul md:text-[64px]">
          {t("titulo")}
        </h1>
        <p className="mt-8 max-w-[58ch] text-lectura text-pizarra">{t("entrada")}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="principal" size="lg">
            {t("inicio")}
          </ButtonLink>
          <ButtonLink href="/blog" variant="secundaria" size="lg">
            {t("blog")}
          </ButtonLink>
        </div>

        <p className="mt-16 text-dato font-semibold uppercase tracking-wide text-pizarra">{t("servicios")}</p>
        <ul className="mt-4 grid gap-x-10 border-t border-niebla sm:grid-cols-2">
          {PAGINAS.map((p) => (
            <li key={p.slug} className="border-b border-niebla">
              <a
                href={`/${locale}${rutaPagina(p.slug, locale)}`}
                className="group flex items-center justify-between gap-4 py-4 text-lectura font-semibold text-azul hover:text-rojo"
              >
                {tPag(`nombres.${p.slug}`)}
                <ArrowRight className="h-5 w-5 flex-none text-rojo" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
