import { getTranslations } from 'next-intl/server';
import Hero from "@/components/home/Hero";
import HowWeWork from "@/components/home/HowWeWork";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesSection from "@/components/home/ServicesSection";
import FAQSection from "@/components/home/FAQSection";
import BlogScrollSection from "@/components/home/BlogScrollSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schemas";
// import Benefits from "@/components/home/Benefits";
// import ServiceSteps from "@/components/home/ServiceSteps";
// import CTASection from "@/components/home/CTASection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'es': `${baseUrl}/es`,
        'en': `${baseUrl}/en`,
        'ca': `${baseUrl}/ca`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}`,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema({
    locale: locale as 'es' | 'en' | 'ca',
    path: `/${locale}`,
    baseUrl
  });

  const webpageSchema = generateWebPageSchema({
    locale: locale as 'es' | 'en' | 'ca',
    title: t('title'),
    description: t('description'),
    url: `${baseUrl}/${locale}`,
    breadcrumb: breadcrumbSchema,
    baseUrl
  });

  return (
    <>
      {/* Structured Data */}
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />

      <Hero />
      <HowWeWork />
      <WhyChooseUs />
      <ServicesSection />
      <FAQSection />
      <BlogScrollSection />
      <FinalCTASection />
      {/* <Benefits /> */}
      {/* <ServiceSteps /> */}
      {/* <CTASection /> */}
    </>
  );
}
