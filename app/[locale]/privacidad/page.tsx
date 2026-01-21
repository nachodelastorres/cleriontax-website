import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import PrivacyPageClient from './PrivacyPageClient';
import { getAlternates, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy.page' });

  return {
    title: `${t('title')} | Cleriontax`,
    description: t('intro').substring(0, 160),
    alternates: getAlternates(locale as Locale, '/privacidad'),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
