import { getTranslations } from "next-intl/server";

/**
 * Cabecera del blog.
 *
 * La voz de las páginas institucionales (sobre nosotros, contacto): blanco,
 * titular grande en frase normal y nada decorativo. Las dos cifras —artículos
 * y temas— van como cifras, no como tarjetas.
 */

interface BlogHeroProps {
  locale: string;
  postsCount: number;
  categoriesCount: number;
}

export default async function BlogHero({ locale, postsCount, categoriesCount }: BlogHeroProps) {
  const t = await getTranslations({ locale, namespace: "blog.hero" });
  const cifras = [
    { valor: postsCount, etiqueta: t("stats.articles") },
    { valor: categoriesCount, etiqueta: t("stats.categories") },
  ];

  return (
    <section id="hero-blog" className="bg-blanco">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-dato font-semibold uppercase tracking-wide text-rojo">{t("badge")}</p>
            <h1 className="mt-6 max-w-[18ch] text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em] text-azul md:text-[64px]">
              {t("title")}
            </h1>
            <p className="mt-8 max-w-[58ch] text-lectura text-pizarra">{t("subtitle")}</p>
          </div>

          <dl className="flex gap-12 lg:flex-col lg:gap-8 lg:border-l lg:border-niebla lg:pl-12">
            {cifras.map((c) => (
              <div key={c.etiqueta}>
                <dd className="font-dato text-[56px] font-semibold leading-none tracking-[-0.03em] text-azul">
                  {c.valor}
                </dd>
                <dt className="mt-2 text-dato font-semibold uppercase tracking-wide text-pizarra">{c.etiqueta}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
