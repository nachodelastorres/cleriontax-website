import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import CookiesPageClient from './CookiesPageClient';
import { getAlternates, type Locale } from "@/lib/site";
import { metaPagina, recortar } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'cookies.page' });
  return metaPagina({ locale, ruta: '/cookies', titulo: t('title'), descripcion: recortar(t('intro')) });
}

export default function CookiesPage() {
  return <CookiesPageClient />;
}
