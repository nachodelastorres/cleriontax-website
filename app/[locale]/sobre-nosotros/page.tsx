import { getTranslations } from 'next-intl/server';
import Container from "@/components/ui/Container";
import HeroAbout from "@/components/about/HeroAbout";
import DualitySection from "@/components/about/DualitySection";
import IndividualServicesShowcase from "@/components/services/IndividualServicesShowcase";
import BlogScrollSection from "@/components/home/BlogScrollSection";
import CTASection from "@/components/home/CTASection";
import { Lightbulb, Target, Handshake } from "lucide-react";
import { generateBreadcrumbSchema, getOrganizationReference } from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.about' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: 'asesoría fiscal tecnológica, asesores fiscales colegiados crypto, análisis de datos fiscales, automatización fiscal, tecnología blockchain, procesamiento transacciones cripto, asesoría fiscal innovadora, fiscal + tecnología, expertise fiscal digital',
    alternates: getAlternates(locale as Locale, '/sobre-nosotros'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: canonicalFor(locale as Locale, '/sobre-nosotros'),
    },
  };
}

export default async function SobreNosotrosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('about');
  const aboutUrl = canonicalFor(locale as Locale, '/sobre-nosotros');

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}/sobre-nosotros`,
    baseUrl: SITE_URL
  });

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": t('structuredData.name'),
    "description": t('structuredData.description'),
    "url": aboutUrl,
    "breadcrumb": breadcrumbSchema,
    "about": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Cleriontax",
      "foundingDate": t('structuredData.foundingDate'),
      "areaServed": {
        "@type": "Country",
        "name": t('structuredData.areaServed')
      },
      "knowsAbout": t.raw('structuredData.knowsAbout') as string[]
    },
    "mainEntity": getOrganizationReference(SITE_URL)
  };

  const valueIcons = [Lightbulb, Target, Handshake];

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
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <HeroAbout />

      {/* Duality Section */}
      <DualitySection />

      {/* Values Section - SEO Optimized */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-neutral-50 to-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Header with SEO-rich content */}
            <div className="text-center mb-16 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">
                {t('values.title')}
              </h2>
              <p className="text-xl md:text-2xl text-gray-blue max-w-4xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t('valuesSection.intro1') }} />
              <p className="text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t('valuesSection.intro2') }} />
            </div>

            {/* Values Grid with SEO-enriched content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {['innovation', 'precision', 'partnership'].map((key, index) => {
                const Icon = valueIcons[index];
                return (
                  <div key={key} className="group">
                    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full border border-neutral-200 hover:border-accent/30">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-accent" strokeWidth={2} />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                        {t(`values.${key}.title`)}
                      </h3>
                      <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                        {t(`values.${key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional SEO-rich paragraph */}
            <div className="bg-navy/5 rounded-2xl p-8 md:p-12 border border-navy/10">
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed text-center max-w-5xl mx-auto" dangerouslySetInnerHTML={{ __html: t('valuesSection.closingText') }} />
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Content Section - Hidden but crawlable */}
      <section className="sr-only" aria-label="Información adicional sobre Cleriontax">
        <Container>
          <h2>{t('seoHidden.title')}</h2>
          <p>{t('seoHidden.paragraph1')}</p>
          <h3>{t('seoHidden.sectionTitle')}</h3>
          <p>{t('seoHidden.paragraph2')}</p>
          <h3>{t('seoHidden.teamTitle')}</h3>
          <ul>
            {(t.raw('seoHidden.teamItems') as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Individual Services Showcase */}
      <IndividualServicesShowcase />

      {/* Blog Scroll Section */}
      <BlogScrollSection locale={locale} />

      {/* CTA */}
      <CTASection />
    </>
  );
}
