import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { getSituacion } from "@/lib/situaciones";
import { getBlogPostBySlug } from "@/lib/blog";
import { formaDeLinea } from "@/components/brand/lineas";
import { getServiceName } from "@/lib/schemas";
import type { Locale } from "@/lib/site";

/**
 * Cierra la cadena de enlazado de la arquitectura: cada situación sube a su
 * línea de servicio y baja a los artículos del blog que la sostienen.
 *
 * Sin esto, la capa 2 quedaría aislada: el tráfico informativo del blog no
 * encontraría la landing y la landing no tendría con qué demostrar que el
 * tema se domina.
 */
export default async function ArticulosDeSituacion({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const situacion = getSituacion(slug);
  if (!situacion) return null;

  const t = await getTranslations({ locale: locale as Locale, namespace: "situaciones" });

  const linea = formaDeLinea(situacion.servicio);
  const nombreServicio = getServiceName(situacion.servicio, locale as Locale);

  const articulos = (
    await Promise.all(
      situacion.articulos.map(async (s) => {
        const post = await getBlogPostBySlug(s, locale);
        return post ? { slug: post.slug, titulo: post.title, minutos: post.readingTime } : null;
      })
    )
  ).filter(Boolean) as { slug: string; titulo: string; minutos?: number }[];

  const Forma = linea?.Forma;

  return (
    <section className="bg-blanco py-14 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-px border border-niebla bg-niebla md:grid-cols-[2fr_3fr]">
          {/* Sube: la línea de servicio que resuelve esta situación. */}
          <a
            href={`/${locale}/servicios/${situacion.servicio}`}
            className="group bg-papel p-8 transition-colors duration-200 hover:bg-blanco"
          >
            <span className="font-semibold text-dato text-pizarra">{t("resuelveEste")}</span>

            <div className="mt-5 flex items-start gap-4">
              {Forma ? (
                <Forma
                  tam={40}
                  className={`flex-none ${linea.acento ? "text-rojo" : "text-azul"}`}
                />
              ) : null}
              <h2 className="text-subtitulo text-azul">{nombreServicio}</h2>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 text-nota font-semibold text-rojo">
              {t("verServicio")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>

          {/* Baja: los artículos que sostienen el tema. */}
          <div className="bg-blanco p-8">
            <span className="font-semibold text-dato text-pizarra">{t("paraEntenderlo")}</span>

            <ul className="mt-5 grid gap-px bg-niebla">
              {articulos.map((a) => (
                <li key={a.slug} className="bg-blanco">
                  <a
                    href={`/${locale}/blog/${a.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-rojo"
                  >
                    <span className="text-lectura text-azul group-hover:text-rojo">
                      {a.titulo}
                    </span>
                    {a.minutos ? (
                      <span className="flex-none font-semibold text-dato text-pizarra">
                        {a.minutos} min
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
