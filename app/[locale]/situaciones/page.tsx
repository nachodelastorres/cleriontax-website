import { getTranslations } from 'next-intl/server';
import { promises as fs } from 'fs';
import path from 'path';
import { ArrowRight } from 'lucide-react';
import { SITUACIONES_VIVAS, estaPublicada, porPregunta, type Pregunta } from "@/lib/situaciones";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schemas";
import HeroPagina from "@/components/layout/HeroPagina";
import BarraAccion from "@/components/cta/BarraAccion";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'situaciones' });

  return {
    title: t('seoTitulo'),
    description: t('seoDescripcion'),
    alternates: getAlternates(locale as Locale, '/situaciones'),
    openGraph: {
      title: t('seoTitulo'),
      description: t('seoDescripcion'),
      type: 'website',
      locale,
      url: canonicalFor(locale as Locale, '/situaciones'),
    },
  };
}

/** Titular de cada landing, leído de su propio contenido para no duplicarlo. */
async function tituloDe(locale: string, slug: string): Promise<{ h1: string; excerpt: string }> {
  for (const l of [locale, 'es']) {
    try {
      const p = path.join(process.cwd(), 'messages', 'situations', l, `${slug}.json`);
      const d = JSON.parse(await fs.readFile(p, 'utf-8'));
      return { h1: d.hero?.h1 ?? d.title, excerpt: d.excerpt ?? '' };
    } catch {
      continue;
    }
  }
  return { h1: slug, excerpt: '' };
}

export default async function SituacionesHub({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'situaciones' });

  const grupos = porPregunta();
  // Solo se muestran las preguntas que ya tienen alguna situación redactada.
  const preguntas: Pregunta[] = (['P1', 'P2', 'P3'] as Pregunta[]).filter(
    (p) => grupos[p].some((s) => estaPublicada(s.slug))
  );

  const titulos: Record<string, { h1: string; excerpt: string }> = {};
  await Promise.all(
    SITUACIONES_VIVAS.map(async (s) => {
      titulos[s.slug] = await tituloDe(locale, s.slug);
    })
  );

  const breadcrumb = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}/situaciones`,
    baseUrl: SITE_URL,
  });

  const webpage = generateWebPageSchema({
    locale: locale as Locale,
    title: t('seoTitulo'),
    description: t('seoDescripcion'),
    url: canonicalFor(locale as Locale, '/situaciones'),
    breadcrumb,
    baseUrl: SITE_URL,
  });

  return (
    <>
      {[breadcrumb, webpage].map((e, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(e) }}
        />
      ))}

      <HeroPagina
        id="situaciones"
        etiqueta={t('etiqueta')}
        titulo={t('titulo')}
        entrada={t('entrada')}
      />

      {preguntas.map((p, i) => (
        <section
          key={p}
          className={`py-14 md:py-16 ${i % 2 === 0 ? 'bg-blanco' : 'bg-papel'}`}
        >
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 grid grid-cols-[44px_1fr] gap-3">
              <span className="pt-2 font-semibold text-dato text-rojo">{p}</span>
              <div>
                <h2 className="text-seccion text-azul">{t(`preguntas.${p}.titulo`)}</h2>
                <p className="mt-3 max-w-[64ch] text-lectura text-pizarra">
                  {t(`preguntas.${p}.quien`)}
                </p>
              </div>
            </div>

            <div className="grid gap-px border border-niebla bg-niebla md:pl-0">
              {grupos[p].filter((s) => estaPublicada(s.slug)).map((s) => (
                <a
                  key={s.slug}
                  href={`/${locale}/situaciones/${s.slug}`}
                  className="group bg-blanco p-6 transition-colors duration-200 hover:bg-papel md:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <h3 className="text-subtitulo text-azul">{titulos[s.slug].h1}</h3>
                      <p className="mt-2 max-w-[70ch] text-nota text-pizarra">
                        {titulos[s.slug].excerpt}
                      </p>
                    </div>
                    {s.urgente ? (
                      <span className="flex-none bg-rojo/10 px-2.5 py-1 font-semibold text-dato text-rojo">
                        {t('conPlazo')}
                      </span>
                    ) : null}
                  </div>

                  <span className="mt-5 inline-flex items-center gap-2 text-nota font-semibold text-rojo">
                    {t('verSituacion')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <BarraAccion contexto={t('titulo')} href="/contacto" accion={t('barraAccion')} />
    </>
  );
}
