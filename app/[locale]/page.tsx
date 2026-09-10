import { getTranslations } from 'next-intl/server';
import HeroInicio from "@/components/inicio/HeroInicio";
import Perfiles from "@/components/inicio/Perfiles";
import LineasServicio from "@/components/inicio/LineasServicio";
import MetodoDiagrama from "@/components/inicio/MetodoDiagrama";
import InformeEjemplo from "@/components/inicio/InformeEjemplo";
import PreguntasInicio from "@/components/inicio/PreguntasInicio";
import UltimasPublicaciones from "@/components/inicio/UltimasPublicaciones";
import BloqueAccion from "@/components/cta/BloqueAccion";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale as Locale),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: canonicalFor(locale as Locale),
    },
  };
}

/**
 * Home — puerta de clasificación (plan, fase 05).
 *
 * Primero, que quien llega señale su caso; después, quién es, qué hacemos,
 * cómo lo hacemos y qué recibe. Cada sección tiene una composición distinta:
 * pestañas, rejilla, índice, figura, documento, acordeón y lista asimétrica.
 */
export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  const tCierre = await getTranslations({ locale, namespace: 'inicio.cierre' });

  const breadcrumbSchema = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}`,
    baseUrl: SITE_URL
  });

  const webpageSchema = generateWebPageSchema({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    url: canonicalFor(locale as Locale),
    breadcrumb: breadcrumbSchema,
    baseUrl: SITE_URL
  });

  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />

      <HeroInicio locale={locale} />
      <Perfiles locale={locale} />
      <LineasServicio locale={locale} />
      <MetodoDiagrama locale={locale} />
      <InformeEjemplo locale={locale} />
      <PreguntasInicio locale={locale} />
      <UltimasPublicaciones locale={locale} />
      <BloqueAccion
        temperatura="templado"
        titulo={tCierre('titulo')}
        apoyo={tCierre('apoyo')}
        accion={{ texto: tCierre('accion'), href: '/contacto' }}
        secundaria={{ texto: tCierre('secundaria'), href: '/situaciones' }}
      />
    </>
  );
}
