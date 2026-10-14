import { getTranslations, setRequestLocale } from 'next-intl/server';
import PaginaContenido, { cargarPagina } from "@/components/pages/PaginaContenido";
import { getAlternates, canonicalFor, type Locale } from "@/lib/site";
import { metaPagina, recortar } from "@/lib/seo";
import { rutasPagina } from "@/lib/paginas";

type Props = { params: Promise<{ locale: string }> };

const SLUG = 'despachos';

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const datos = await cargarPagina(locale, SLUG);
  if (!datos) return {};
  const seo = (datos as any).seo ?? {};
  return metaPagina({
    locale,
    ruta: rutasPagina(SLUG),
    titulo: seo.title ?? datos.title,
    descripcion: seo.description ?? datos.excerpt,
    keywords: seo.keywords,
  });
}

export default async function Pagina({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const datos = await cargarPagina(locale, SLUG);
  const t = await getTranslations({ locale, namespace: 'paginas' });

  return (
    <PaginaContenido locale={locale} datos={datos} accionBarra={t('barraContacto')} />
  );
}
