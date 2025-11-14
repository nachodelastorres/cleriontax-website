import { getTranslations } from 'next-intl/server';
import Hero from "@/components/home/Hero";
import HowWeWork from "@/components/home/HowWeWork";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesSection from "@/components/home/ServicesSection";
import FAQSection from "@/components/home/FAQSection";
import BlogScrollSection from "@/components/home/BlogScrollSection";
import FinalCTASection from "@/components/home/FinalCTASection";
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
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
        'ca': '/ca',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}`,
    },
  };
}

export default function Home() {
  return (
    <>
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
