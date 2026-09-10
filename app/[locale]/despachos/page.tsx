import { getTranslations } from 'next-intl/server';
import PaginaContenido, { cargarPagina } from "@/components/pages/PaginaContenido";
import { getAlternates, canonicalFor, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const SLUG = 'despachos';

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const datos = await cargarPagina(locale, SLUG);
  if (!datos) return {};

  const seo = (datos as any).seo ?? {};

  return {
    title: seo.title ?? datos.title,
    description: seo.description ?? datos.excerpt,
    keywords: seo.keywords,
    alternates: getAlternates(locale as Locale, `/${SLUG}`),
    openGraph: {
      title: seo.title ?? datos.title,
      description: seo.description ?? datos.excerpt,
      type: 'website',
      locale,
      url: canonicalFor(locale as Locale, `/${SLUG}`),
    },
  };
}

export default async function Pagina({ params }: Props) {
  const { locale } = await params;
  const datos = await cargarPagina(locale, SLUG);
  const t = await getTranslations({ locale, namespace: 'servicesPages.cierre' });

  return (
    <PaginaContenido locale={locale} datos={datos} accionBarra={t('barraAccion')} />
  );
}
