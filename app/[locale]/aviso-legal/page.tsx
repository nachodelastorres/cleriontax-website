import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import LegalNoticePageClient from './LegalNoticePageClient';
import { getAlternates, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalNotice.page' });

  return {
    title: `${t('title')} | Cleriontax`,
    description: t('intro').substring(0, 160),
    alternates: getAlternates(locale as Locale, '/aviso-legal'),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LegalNoticePage() {
  return <LegalNoticePageClient />;
}
