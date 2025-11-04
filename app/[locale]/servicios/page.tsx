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
    "name": t('structuredData.name'),
    "description": t('structuredData.description'),
    "url": `https://cleriontax.com/${locale}/servicios`,
    "areaServed": {
      "@type": "Country",
      "name": t('structuredData.areaServed')
    },
    "serviceType": t.raw('structuredData.serviceTypes') as string[],
    "provider": {
      "@type": "Organization",
      "name": "Cleriontax",
      "url": "https://cleriontax.com"
    },
    "image": [
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/tax-diagnosis-data.webp",
        "description": t('structuredData.images.diagnosis.description'),
        "name": t('structuredData.images.diagnosis.name')
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/data-analysis-tax.webp",
        "description": t('structuredData.images.analysis.description'),
        "name": t('structuredData.images.analysis.name')
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/crypto-investment-tax.webp",
        "description": t('structuredData.images.budget.description'),
        "name": t('structuredData.images.budget.name')
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/defi-blockchain-data.webp",
        "description": t('structuredData.images.processing.description'),
        "name": t('structuredData.images.processing.name')
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://cleriontax.com/images/illustrations/services/timeline/tax-report-crypto.webp",
        "description": t('structuredData.images.report.description'),
        "name": t('structuredData.images.report.name')
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
