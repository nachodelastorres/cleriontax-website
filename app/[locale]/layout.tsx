import { OG_IMAGEN, ogLocale, sinMarca } from "@/lib/seo";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsentWrapper from "@/components/cookies/CookieConsentWrapper";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schemas";
import { SITE_URL, LOCALES, type Locale } from "@/lib/site";
import "../globals.css";

// §11 — Familia principal. La misma familia formal que el logotipo.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

/*
 * §11 — Familia de datos.
 *
 * Fue IBM Plex Mono y después Source Serif 4. Ahora las cifras van en la
 * familia principal: lo que el manual busca —columnas de cifras alineadas— lo
 * dan las cifras tabulares, y Plus Jakarta Sans las tiene. `font-dato` sigue
 * existiendo para marcar qué es un dato y activar esas cifras (globals.css).
 */

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
  setRequestLocale(locale);

  // Respaldo del sitio: solo se usa donde la página no define su propia
  // metadata. Va traducido, igual que el resto (§19).
  const t = await getTranslations({ locale, namespace: 'seo.site' });

  return {
    metadataBase: new URL(SITE_URL),
    // La marca la añade la plantilla: cada página pone su título sin ella.
    title: { default: sinMarca(t('title')), template: '%s | Cleriontax' },
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    authors: [{ name: 'Cleriontax' }],
    icons: {
      icon: [
        { url: '/images/logos/icono_fondo_transparente.svg', type: 'image/svg+xml' },
        { url: '/images/logos/icono_fondo_transparente.png', type: 'image/png' },
      ],
      apple: '/images/logos/icono_fondo_transparente.png',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: ogLocale(locale as Locale),
      url: `${SITE_URL}/${locale}`,
      siteName: 'Cleriontax',
      images: [OG_IMAGEN],
    },
    twitter: { card: 'summary_large_image', images: [OG_IMAGEN.url] },
    // NOTA: No definir alternates aquí - cada página los define individualmente
    // para evitar duplicación de hreflang
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Validar que el locale es válido
  if (!(locales as readonly string[]).includes(locale)) {
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
      <body className={`${jakarta.variable} font-sans`}>
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
