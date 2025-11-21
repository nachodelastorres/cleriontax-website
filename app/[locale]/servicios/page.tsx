import { getTranslations } from 'next-intl/server';
import Container from "@/components/ui/Container";
import HeroServices from "@/components/services/HeroServices";
import MainServicesSection from "@/components/services/MainServicesSection";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import IndividualServicesShowcase from "@/components/services/IndividualServicesShowcase";
import WhyChooseUsServices from "@/components/services/WhyChooseUsServices";
import BlogScrollSection from "@/components/home/BlogScrollSection";
import CTASection from "@/components/home/CTASection";
import { generateBreadcrumbSchema, getOrganizationReference } from "@/lib/schemas";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.services' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: 'asesoría fiscal criptomonedas, asesor fiscal crypto, declaración renta bitcoin, impuestos criptomonedas España, modelo 100 crypto, FIFO criptomonedas, tax advisor cryptocurrency, asesoría fiscal acciones, declaración ganancias patrimoniales',
    alternates: {
      canonical: `${baseUrl}/${locale}/servicios`,
      languages: {
        'es': `${baseUrl}/es/servicios`,
        'en': `${baseUrl}/en/servicios`,
        'ca': `${baseUrl}/ca/servicios`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/servicios`,
    },
  };
}

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('services');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema({
    locale: locale as 'es' | 'en' | 'ca',
    path: `/${locale}/servicios`,
    baseUrl
  });

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": t('structuredData.name'),
    "description": t('structuredData.description'),
    "url": `${baseUrl}/${locale}/servicios`,
    "areaServed": {
      "@type": "Country",
      "name": t('structuredData.areaServed')
    },
    "serviceType": t.raw('structuredData.serviceTypes') as string[],
    "provider": getOrganizationReference(baseUrl),
    "breadcrumb": breadcrumbSchema,
    "image": [
      {
        "@type": "ImageObject",
        "contentUrl": `${baseUrl}/images/illustrations/services/timeline/tax-diagnosis-data.webp`,
        "description": t('structuredData.images.diagnosis.description'),
        "name": t('structuredData.images.diagnosis.name')
      },
      {
        "@type": "ImageObject",
        "contentUrl": `${baseUrl}/images/illustrations/services/timeline/data-analysis-tax.webp`,
        "description": t('structuredData.images.analysis.description'),
        "name": t('structuredData.images.analysis.name')
      },
      {
        "@type": "ImageObject",
        "contentUrl": `${baseUrl}/images/illustrations/services/timeline/crypto-investment-tax.webp`,
        "description": t('structuredData.images.budget.description'),
        "name": t('structuredData.images.budget.name')
      },
      {
        "@type": "ImageObject",
        "contentUrl": `${baseUrl}/images/illustrations/services/timeline/defi-blockchain-data.webp`,
        "description": t('structuredData.images.processing.description'),
        "name": t('structuredData.images.processing.name')
      },
      {
        "@type": "ImageObject",
        "contentUrl": `${baseUrl}/images/illustrations/services/timeline/tax-report-crypto.webp`,
        "description": t('structuredData.images.report.description'),
        "name": t('structuredData.images.report.name')
      }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Structured Data */}
      <script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <HeroServices />

      {/* Individual Services Showcase */}
      <IndividualServicesShowcase />

      {/* Blog Scroll Section */}
      <BlogScrollSection />

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
