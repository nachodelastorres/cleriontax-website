import { getTranslations } from 'next-intl/server';
import Container from "@/components/ui/Container";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServiceInclusions from "@/components/services/ServiceInclusions";
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
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section - SEO Optimized */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <Container>
          <div className="space-y-6 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-5xl lg:text-6xl leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg text-neutral-600 md:text-xl leading-relaxed">
              {t('subtitle')}
            </p>

            {/* SEO-friendly trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                <span className="text-sm font-medium text-primary-700">✓ Análisis gratuito 24-48h</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10">
                <span className="text-sm font-medium text-accent-dark">✓ Asesores fiscales colegiados</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                <span className="text-sm font-medium text-primary-700">✓ 50+ exchanges soportados</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Services Grid - Magazine Style */}
      <ServicesGrid />

      {/* Service Inclusions */}
      <ServiceInclusions />

      {/* SEO Content Section - Hidden visually but crawlable */}
      <section className="sr-only" aria-label="Información adicional para buscadores">
        <Container>
          <h2>Asesoría Fiscal Especializada en Criptomonedas y Activos Digitales</h2>
          <p>
            Cleriontax ofrece servicios de asesoría fiscal especializada para inversores en criptomonedas,
            Bitcoin, Ethereum y otros criptoactivos. Realizamos la declaración de la renta (IRPF)
            con cálculo de ganancias y pérdidas patrimoniales mediante metodología FIFO, preparamos
            los modelos 100, 720 y 721, y ofrecemos asesoramiento fiscal continuado.
          </p>
          <h3>Servicios de Declaración Fiscal para Crypto</h3>
          <ul>
            <li>Cálculo de ganancias y pérdidas patrimoniales con método FIFO</li>
            <li>Preparación modelo 100 (IRPF) para criptomonedas</li>
            <li>Modelo 720 para declaración de activos en el extranjero</li>
            <li>Modelo 721 para criptoactivos situados en el extranjero</li>
            <li>Asesoramiento en staking, lending, DeFi y NFTs</li>
            <li>Optimización fiscal dentro del marco legal vigente</li>
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
