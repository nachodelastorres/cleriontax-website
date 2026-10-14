import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from 'next';
import CookiesPageClient from './CookiesPageClient';
import { getAlternates, type Locale } from "@/lib/site";
import { metaPagina, recortar } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schemas";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'cookies.page' });
  return metaPagina({ locale, ruta: '/cookies', titulo: t('title'), descripcion: recortar(t('intro')) });
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const todos = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: 'cookies.page' });
  const migas = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}/cookies`,
    customLabels: { 'cookies': t('title') },
    baseUrl: SITE_URL,
  });
  // Los textos legales solo viajan al navegador en su propia página.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(migas) }}
      />
      <NextIntlClientProvider messages={{ cookies: todos.cookies }} locale={locale}>
      <CookiesPageClient />
      </NextIntlClientProvider>
    </>
  );
}
