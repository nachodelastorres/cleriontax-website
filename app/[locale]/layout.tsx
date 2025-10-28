import { Inter } from "next/font/google";
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com'),
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
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
        'ca': '/ca',
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
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
