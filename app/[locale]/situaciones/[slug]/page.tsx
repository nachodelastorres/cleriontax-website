import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
  generateHowToSchema,
} from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";
import { SLUGS_SITUACION, SITUACIONES_PUBLICADAS, getSituacion } from "@/lib/situaciones";
import HeroPagina from "@/components/layout/HeroPagina";
import IndiceServicio from "@/components/services/IndiceServicio";
import SeccionesServicio, { type Seccion } from "@/components/services/SeccionesServicio";
import FormularioDiagnostico from "@/components/cta/FormularioDiagnostico";
import BarraAccion from "@/components/cta/BarraAccion";
import BloqueAccion from "@/components/cta/BloqueAccion";
import ArticulosDeSituacion from "@/components/situaciones/ArticulosDeSituacion";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return [...SITUACIONES_PUBLICADAS].map((slug) => ({ slug }));
}

async function cargar(locale: string, slug: string): Promise<any | null> {
  try {
    const p = path.join(process.cwd(), 'messages', 'situations', locale, `${slug}.json`);
    return JSON.parse(await fs.readFile(p, 'utf-8'));
  } catch {
    if (locale !== 'es') return cargar('es', slug);
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const datos = await cargar(locale, slug);
  if (!datos) return {};

  const ruta = `/situaciones/${slug}`;
  const seo = datos.seo ?? {};

  return {
    title: seo.title ?? datos.title,
    description: seo.description ?? datos.excerpt,
    keywords: seo.keywords,
    alternates: getAlternates(locale as Locale, ruta),
    openGraph: {
      title: seo.title ?? datos.title,
      description: seo.description ?? datos.excerpt,
      type: 'article',
      locale,
      url: canonicalFor(locale as Locale, ruta),
    },
  };
}

export default async function SituacionPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!SLUGS_SITUACION.includes(slug)) notFound();

  const datos = await cargar(locale, slug);
  if (!datos) notFound();

  const meta = getSituacion(slug);
  const t = await getTranslations({ locale, namespace: 'situaciones' });
  const ruta = `/situaciones/${slug}`;
  const url = canonicalFor(locale as Locale, ruta);

  const { hero, toc, sections, cierre } = datos as {
    hero: any;
    toc: { id: string; label: string }[];
    sections: Seccion[];
    cierre?: { h2: string; body: string; button?: { label: string; href: string } };
  };

  const breadcrumb = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}${ruta}`,
    baseUrl: SITE_URL,
  });

  const webpage = generateWebPageSchema({
    locale: locale as Locale,
    title: datos.title,
    description: datos.excerpt,
    url,
    breadcrumb,
    baseUrl: SITE_URL,
  });

  const faq = sections.find((s) => s.id === 'faq');
  const faqSchema = faq?.items
    ? generateFAQSchema({ locale: locale as Locale, items: faq.items as any, url })
    : null;

  const pasos = sections.find((s) => s.steps && s.steps.length > 0);
  const howTo = pasos?.steps
    ? generateHowToSchema({
        locale: locale as Locale,
        name: `${datos.title} - ${pasos.h2}`,
        description: datos.excerpt,
        steps: pasos.steps.map((s) => ({ name: s.title, text: s.body })),
        url,
        baseUrl: SITE_URL,
      })
    : null;

  const esquemas = [breadcrumb, webpage, faqSchema, howTo].filter(Boolean);

  return (
    <>
      {esquemas.map((e, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(e) }}
        />
      ))}

      <HeroPagina
        id={slug}
        etiqueta={hero.etiqueta}
        titulo={hero.h1}
        entrada={hero.subheading}
        accion={hero.cta}
        secundaria={hero.secundaria}
      />

      <IndiceServicio items={toc} />

      <SeccionesServicio secciones={sections} />

      {cierre ? (
        <section id="cierre" className="scroll-mt-20 bg-papel py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 grid grid-cols-[44px_1fr] gap-3">
              <span className="pt-2 font-mono text-dato text-rojo">&rarr;</span>
              <div>
                <h2 className="text-seccion text-azul">{cierre.h2}</h2>
                <p className="mt-4 max-w-[68ch] text-lectura text-pizarra">{cierre.body}</p>
              </div>
            </div>
            <div className="md:pl-[56px]">
              <FormularioDiagnostico
                situacion={datos.title}
                accion={cierre.button?.label ?? t('enviar')}
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Sube al servicio y baja a los artículos que la sostienen. */}
      <ArticulosDeSituacion locale={locale} slug={slug} />

      {meta?.urgente ? (
        <BloqueAccion
          temperatura="urgente"
          plazo={t('plazoAviso')}
          titulo={t('urgenteTitulo')}
          apoyo={t('urgenteApoyo')}
          accion={{ texto: '+34 663 482 301', href: '/contacto' }}
        />
      ) : null}

      <BarraAccion
        contexto={datos.title}
        href="/contacto"
        accion={t('barraAccion')}
        urgente={meta?.urgente ?? false}
      />
    </>
  );
}
