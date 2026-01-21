import { Inter } from "next/font/google";
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsentWrapper from "@/components/cookies/CookieConsentWrapper";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schemas";
import { SITE_URL, LOCALES, getAlternates, type Locale } from "@/lib/site";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const locales = LOCALES;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE_URL),
    title: 'Cleriontax - Asesoría Fiscal Criptomonedas',
    description: 'Especialistas en fiscalidad de criptomonedas. Te ayudamos con tu declaración fiscal de Bitcoin, Ethereum y otros criptoactivos.',
    keywords: [
      'fiscalidad criptomonedas',
      'declaración fiscal cripto',
      'asesor fiscal bitcoin',
      'análisis datos fiscales',
      'hacienda criptoactivos',
    ],
    authors: [{ name: 'Cleriontax' }],
    icons: {
      icon: [
        { url: '/images/logos/icono_fondo_transparente.svg', type: 'image/svg+xml' },
        { url: '/images/logos/icono_fondo_transparente.png', type: 'image/png' },
      ],
      apple: '/images/logos/icono_fondo_transparente.png',
    },
    openGraph: {
      title: 'Cleriontax - Asesoría Fiscal Criptomonedas',
      description: 'Especialistas en fiscalidad de criptomonedas. Te ayudamos con tu declaración fiscal de Bitcoin, Ethereum y otros criptoactivos.',
      type: 'website',
      locale: locale,
      url: `${SITE_URL}/${locale}`,
      images: [
        {
          url: '/images/logos/logo_fondo_blanco.png',
          width: 1200,
          height: 630,
          alt: 'Cleriontax',
        },
      ],
    },
    alternates: getAlternates(locale as Locale),
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  // Validar que el locale es válido
  if (!locales.includes(locale)) {
    notFound();
  }

  // Obtener mensajes para el idioma actual
  const messages = await getMessages({ locale });

  // Generate structured data schemas
  const organizationSchema = generateOrganizationSchema({
    locale: locale as Locale,
    baseUrl: SITE_URL
  });
  const websiteSchema = generateWebSiteSchema({
    locale: locale as Locale,
    baseUrl: SITE_URL
  });

  return (
    <html lang={locale}>
      <head>
        {/* Ahrefs Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="3r++ttNRQCzpkDfWHbDw2A"
          async
        />

        {/* Structured Data - Organization */}
        <script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Structured Data - WebSite */}
        <script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsentWrapper />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
