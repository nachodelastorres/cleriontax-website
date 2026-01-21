import { getTranslations } from 'next-intl/server';
import Hero from "@/components/home/Hero";
import HowWeWork from "@/components/home/HowWeWork";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesSection from "@/components/home/ServicesSection";
import FAQSection from "@/components/home/FAQSection";
import BlogScrollSection from "@/components/home/BlogScrollSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";
// import Benefits from "@/components/home/Benefits";
// import ServiceSteps from "@/components/home/ServiceSteps";
// import CTASection from "@/components/home/CTASection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale as Locale),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: canonicalFor(locale as Locale),
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}`,
    baseUrl: SITE_URL
  });

  const webpageSchema = generateWebPageSchema({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    url: canonicalFor(locale as Locale),
    breadcrumb: breadcrumbSchema,
    baseUrl: SITE_URL
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
      <BlogScrollSection locale={locale} />
      <FinalCTASection />
      {/* <Benefits /> */}
      {/* <ServiceSteps /> */}
      {/* <CTASection /> */}
    </>
  );
}
