import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import CookiesPageClient from './CookiesPageClient';
import { getAlternates, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cookies.page' });

  return {
    title: `${t('title')} | Cleriontax`,
    description: t('intro').substring(0, 160),
    alternates: getAlternates(locale as Locale, '/cookies'),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CookiesPage() {
  return <CookiesPageClient />;
}
