import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Cabecera } from "@/components/secciones/Bloques";
import { getAllBlogPostsWithContent } from "@/lib/blog";

/**
 * Últimas publicaciones — la capa 3 asomada a la home.
 *
 * Una pieza destacada con imagen y dos en lista: la composición asimétrica
 * marca qué es lo último sin repetir la rejilla de tarjetas del blog.
 */
const FORMATO_FECHA: Record<string, string> = { es: "es-ES", en: "en-GB", ca: "ca-ES" };

export default async function UltimasPublicaciones({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "inicio.blog" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });

  const posts = (await getAllBlogPostsWithContent(locale))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  if (posts.length === 0) return null;
  const [destacado, ...resto] = posts;

  const fecha = (d: string) =>
    new Date(d).toLocaleDateString(FORMATO_FECHA[locale] ?? "es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const categoria = (c: string) => tBlog(`categoryTranslations.${c}`);

  return (
    <section className="bg-blanco">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Cabecera marca="06" titulo={t("titulo")} entrada={t("entrada")} />
          <Link
            href="/blog"
            className="mb-9 inline-flex flex-none items-center gap-2 text-nota font-semibold text-azul underline-offset-4 hover:underline"
          >
            {t("verTodos")}
            <ArrowRight className="h-4 w-4 text-rojo" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-px border border-niebla bg-niebla lg:grid-cols-12">
          <Link href={`/blog/${destacado.slug}`} className="group bg-blanco lg:col-span-7">
            <div className="relative aspect-[16/9] overflow-hidden bg-papel">
              <Image
                src={destacado.image.url}
                alt={destacado.image.alt}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-7">
              <p className="text-dato text-pizarra">
                {categoria(destacado.category)} ·{" "}
                <time dateTime={destacado.publishedAt}>{fecha(destacado.publishedAt)}</time>
              </p>
              <h3 className="mt-3 text-subtitulo text-azul group-hover:underline group-hover:underline-offset-4">
                {destacado.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-nota text-pizarra">{destacado.excerpt}</p>
            </div>
          </Link>

          <div className="grid gap-px bg-niebla lg:col-span-5">
            {resto.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-blanco p-7">
                <p className="text-dato text-pizarra">
                  {categoria(post.category)} · <time dateTime={post.publishedAt}>{fecha(post.publishedAt)}</time>
                </p>
                <h3 className="mt-3 text-subtitulo text-azul group-hover:underline group-hover:underline-offset-4">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-nota text-pizarra">{post.excerpt}</p>
                <p className="mt-5 text-dato text-pizarra">
                  {post.readingTime} {t("min")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
