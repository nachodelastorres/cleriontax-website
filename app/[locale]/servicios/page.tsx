import { getTranslations } from 'next-intl/server';
import Container from "@/components/ui/Container";
import HeroServices from "@/components/services/HeroServices";
import MainServicesSection from "@/components/services/MainServicesSection";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import WhyChooseUsServices from "@/components/services/WhyChooseUsServices";
import CTASection from "@/components/home/CTASection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.services' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: 'asesoría fiscal criptomonedas, asesor fiscal crypto, declaración renta bitcoin, impuestos criptomonedas España, modelo 100 crypto, FIFO criptomonedas, tax advisor cryptocurrency, asesoría fiscal acciones, declaración ganancias patrimoniales',
    alternates: {
      canonical: `/${locale}/servicios`,
      languages: {
        'es': '/es/servicios',
        'en': '/en/servicios',
        'ca': '/ca/servicios',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}/servicios`,
    },
  };
}

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('services');

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Cleriontax - Asesoría Fiscal Criptomonedas y Acciones",
    "description": "Servicios de asesoría fiscal especializada en criptomonedas, acciones y activos digitales. Cálculos FIFO, modelos 100, 720 y 721.",
    "url": `https://cleriontax.com/${locale}/servicios`,
    "areaServed": {
      "@type": "Country",
      "name": "España"
    },
    "serviceType": [
      "Asesoría Fiscal Criptomonedas",
      "Declaración IRPF Crypto",
      "Cálculo Ganancias Patrimoniales",
      "Modelo 100 Criptoactivos",
      "Modelo 720 Activos Digitales"
    ],
    "provider": {
      "@type": "Organization",
      "name": "Cleriontax",
      "url": "https://cleriontax.com"
    },
    "image": [
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/tax-diagnosis-data.webp",
        "description": "Diagnóstico fiscal de datos de criptomonedas y análisis de carteras digitales",
        "name": "Diagnóstico fiscal crypto - Cleriontax"
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/data-analysis-tax.webp",
        "description": "Análisis de complejidad fiscal para operaciones en exchanges y DeFi",
        "name": "Análisis fiscal DeFi - Cleriontax"
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/crypto-investment-tax.webp",
        "description": "Presupuesto personalizado de servicios fiscales para inversores crypto",
        "name": "Presupuesto fiscal crypto - Cleriontax"
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/defi-blockchain-data.webp",
        "description": "Procesamiento de datos blockchain y cálculos fiscales certificados FIFO",
        "name": "Cálculos FIFO blockchain - Cleriontax"
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/tax-report-crypto.webp",
        "description": "Informe fiscal completo de criptoactivos verificado y compatible con AEAT",
        "name": "Informe fiscal AEAT - Cleriontax"
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <HeroServices />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Main Services Section */}
      <MainServicesSection />

      {/* Why Choose Us - Editorial Layout */}
      <WhyChooseUsServices />

      {/* CTA */}
      <CTASection />
    </>
  );
}
