import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import PrivacyPageClient from './PrivacyPageClient';
import { getAlternates, type Locale } from "@/lib/site";
import { metaPagina, recortar } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy.page' });
  return metaPagina({ locale, ruta: '/privacidad', titulo: t('title'), descripcion: recortar(t('intro')) });
}

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
