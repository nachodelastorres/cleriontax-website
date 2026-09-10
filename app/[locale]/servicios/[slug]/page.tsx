import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import {
  generateServiceBreadcrumbSchema,
  generateDetailedServiceSchema,
  generateHowToSchema,
  generateFAQSchema,
  getServiceName
} from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";
import { formaDeLinea, ORDEN_LINEAS } from "@/components/brand/lineas";
import HeroServicio from "@/components/services/HeroServicio";
import IndiceServicio from "@/components/services/IndiceServicio";
import SeccionesServicio, { type Seccion } from "@/components/services/SeccionesServicio";
import ServiciosRelacionados from "@/components/services/ServiciosRelacionados";
import BloqueAccion from "@/components/cta/BloqueAccion";
import FormularioDiagnostico from "@/components/cta/FormularioDiagnostico";
import BarraAccion from "@/components/cta/BarraAccion";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Las cuatro líneas del manual de marca v1.1, §02.
const validSlugs = ORDEN_LINEAS as readonly string[];

const slugToCamelCase = (slug: string): string =>
  slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug)) return {};

  const slugKey = slugToCamelCase(slug);
  const servicePath = `/servicios/${slug}`;

  try {
    const t = await getTranslations({ locale, namespace: `servicesPages.${slugKey}` });

    return {
      title: t('seo.title'),
      description: t('seo.description'),
      keywords: t.raw('seo.keywords'),
      alternates: getAlternates(locale as Locale, servicePath),
      openGraph: {
        title: t('seo.title'),
        description: t('seo.description'),
        type: 'website',
        locale,
        url: canonicalFor(locale as Locale, servicePath),
      },
    };
  } catch {
    return {};
  }
}

async function getServiceData(locale: string, slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'messages', 'services-pages', locale, `${slug}.json`);
    return JSON.parse(await fs.readFile(filePath, 'utf-8'));
  } catch (error) {
    console.error(`Error loading service data for ${slug}:`, error);
    return null;
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug)) notFound();

  const serviceData = await getServiceData(locale, slug);
  if (!serviceData) notFound();

  const tRel = await getTranslations({ locale, namespace: 'servicesPages.relatedServices' });
  const tCta = await getTranslations({ locale, namespace: 'servicesPages.cierre' });

  const { hero, toc, sections, internal_links } = serviceData as {
    hero: { h1: string; subheading: string; cta: { label: string; href: string } };
    toc: { id: string; label: string }[];
    sections: Seccion[];
    internal_links: { label: string; href: string }[];
  };

  const serviceName = getServiceName(slug, locale as Locale);
  const serviceUrl = canonicalFor(locale as Locale, `/servicios/${slug}`);
  const linea = formaDeLinea(slug);
  const indice = (ORDEN_LINEAS as readonly string[]).indexOf(slug) + 1;

  const breadcrumbSchema = generateServiceBreadcrumbSchema({
    locale: locale as Locale,
    serviceSlug: slug,
    serviceTitle: serviceName,
    baseUrl: SITE_URL
  });

  const serviceSchema = generateDetailedServiceSchema({
    locale: locale as Locale,
    serviceName,
    description: serviceData.excerpt,
    serviceType: slug,
    url: serviceUrl,
    breadcrumb: breadcrumbSchema,
    baseUrl: SITE_URL
  });

  const howToSection = sections.find((s) => s.steps && s.steps.length > 0);
  const howToSchema = howToSection?.steps
    ? generateHowToSchema({
        locale: locale as Locale,
        name: `${serviceName} - ${howToSection.h2}`,
        description: serviceData.excerpt,
        steps: howToSection.steps.map((step) => ({ name: step.title, text: step.body })),
        url: serviceUrl,
        baseUrl: SITE_URL
      })
    : null;

  // Las preguntas se muestran completas en la página, que es lo que exige FAQPage.
  const faqSection = sections.find((s) => s.id === 'faq');
  const faqSchema = faqSection?.items
    ? generateFAQSchema({
        locale: locale as Locale,
        items: faqSection.items as { q: string; a: string }[],
        url: serviceUrl
      })
    : null;

  const cierre = sections.find((s) => s.id === 'cta');
  const esquemas = [breadcrumbSchema, serviceSchema, howToSchema, faqSchema].filter(Boolean);

  return (
    <>
      {esquemas.map((esquema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(esquema) }}
        />
      ))}

      <HeroServicio
        slug={slug}
        indice={indice}
        titulo={hero.h1}
        entrada={hero.subheading}
        etiqueta={tCta('etiquetaLinea')}
        accion={hero.cta}
        secundaria={{ label: tCta('verMetodo'), href: '#como-trabajamos' }}
      />

      <IndiceServicio items={toc.filter((i) => i.id !== 'cta')} />

      <SeccionesServicio secciones={sections} />

      {/* Cierre: el diagnóstico es la acción principal de la página. */}
      <section id="cta" className="scroll-mt-20 bg-papel py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 grid grid-cols-[44px_1fr] gap-3">
            <span className="pt-2 font-mono text-dato text-rojo">&rarr;</span>
            <div>
              <h2 className="text-seccion text-azul">{cierre?.h2 ?? tCta('titulo')}</h2>
              {cierre?.body ? (
                <p className="mt-4 max-w-[68ch] text-lectura text-pizarra">{cierre.body}</p>
              ) : null}
            </div>
          </div>

          <div className="md:pl-[56px]">
            <FormularioDiagnostico
              situacion={serviceName}
              accion={cierre?.button?.label ?? tCta('enviar')}
            />
          </div>
        </div>
      </section>

      {linea?.urgente ? (
        <BloqueAccion
          temperatura="urgente"
          plazo={tCta('plazoAviso')}
          titulo={tCta('urgenteTitulo')}
          apoyo={tCta('urgenteApoyo')}
          accion={{ texto: '+34 663 482 301', href: '/contacto' }}
        />
      ) : null}

      <ServiciosRelacionados
        locale={locale}
        enlaces={internal_links}
        titulo={tRel('title')}
        subtitulo={tRel('subtitle')}
        verDetalles={tRel('viewDetails')}
        verTodos={tRel('viewAllServices')}
      />

      <BarraAccion
        contexto={serviceName}
        href="/contacto"
        accion={tCta('barraAccion')}
        urgente={linea?.urgente ?? false}
      />
    </>
  );
}
