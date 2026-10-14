import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getBlogPostBySlug } from "@/lib/blog";
import { PAGINAS, rutaPagina, type Pagina } from "@/lib/paginas";
import type { Locale } from "@/lib/site";

/**
 * Cierra el enlazado de cada página de servicio: de lado, a las páginas que
 * responden a la misma pregunta; hacia abajo, a los artículos del blog que
 * explican el tema. Así el blog alimenta a la página y la página no queda
 * aislada.
 */
export default async function RelacionadosPagina({
  locale,
  pagina,
}: {
  locale: string;
  pagina: Pagina;
}) {
  const t = await getTranslations({ locale: locale as Locale, namespace: "paginas" });

  // Primero las de su misma pregunta; si no llegan a dos, se completa con el resto.
  const hermanas = [
    ...PAGINAS.filter((p) => p.grupo === pagina.grupo && p.slug !== pagina.slug),
    ...PAGINAS.filter((p) => p.grupo !== pagina.grupo),
  ].slice(0, 3);

  const articulos = (
    await Promise.all(
      pagina.articulos.map(async (slug) => {
        const post = await getBlogPostBySlug(slug, locale);
        return post ? { slug: post.slug, titulo: post.title, minutos: post.readingTime } : null;
      })
    )
  ).filter(Boolean) as { slug: string; titulo: string; minutos?: number }[];

  return (
    <section className="bg-blanco py-14 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-px border border-niebla bg-niebla md:grid-cols-[2fr_3fr]">
          <div className="bg-papel p-8">
            <span className="font-semibold text-dato text-pizarra">{t("otras")}</span>
            <ul className="mt-5 grid gap-px bg-niebla">
              {hermanas.map((p) => (
                <li key={p.slug} className="bg-papel">
                  <Link
                    href={rutaPagina(p.slug, locale)}
                    className="group flex items-center justify-between gap-4 py-3"
                  >
                    <span className="text-lectura text-azul group-hover:text-rojo">
                      {t(`nombres.${p.slug}`)}
                    </span>
                    <ArrowRight className="h-4 w-4 flex-none text-rojo" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {articulos.length > 0 ? (
            <div className="bg-blanco p-8">
              <span className="font-semibold text-dato text-pizarra">{t("articulos")}</span>
              <ul className="mt-5 grid gap-px bg-niebla">
                {articulos.map((a) => (
                  <li key={a.slug} className="bg-blanco">
                    <Link
                      href={`/blog/${a.slug}`}
                      className="group flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-lectura text-azul group-hover:text-rojo">{a.titulo}</span>
                      {a.minutos ? (
                        <span className="flex-none font-semibold text-dato text-pizarra">
                          {a.minutos} {t("minutos")}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
