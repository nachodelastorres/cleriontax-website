import { Inter } from "next/font/google";
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schemas";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const locales = ['es', 'en', 'ca'];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';

  return {
    metadataBase: new URL(baseUrl),
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
      url: `${baseUrl}/${locale}`,
      images: [
        {
          url: '/images/logos/logo_fondo_blanco.png',
          width: 1200,
          height: 630,
          alt: 'Cleriontax',
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'es': `${baseUrl}/es`,
        'en': `${baseUrl}/en`,
        'ca': `${baseUrl}/ca`,
      },
    },
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';
  const organizationSchema = generateOrganizationSchema({
    locale: locale as 'es' | 'en' | 'ca',
    baseUrl
  });
  const websiteSchema = generateWebSiteSchema({
    locale: locale as 'es' | 'en' | 'ca',
    baseUrl
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
