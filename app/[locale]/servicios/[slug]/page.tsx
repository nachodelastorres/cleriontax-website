import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Container from "@/components/ui/Container";
import CTASection from "@/components/home/CTASection";
import { promises as fs } from 'fs';
import path from 'path';
import {
  generateServiceBreadcrumbSchema,
  generateDetailedServiceSchema,
  generateHowToSchema,
  getServiceName
} from "@/lib/schemas";
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const validSlugs = ['analisis-carteras', 'liquidaciones-fiscales', 'seguimiento-cartera', 'asesoria-fiscal-criptomonedas'];

// Convert slug to camelCase for i18n keys
const slugToCamelCase = (slug: string): string => {
  return slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug)) {
    return {};
  }

  const slugKey = slugToCamelCase(slug);
  const servicePath = `/servicios/${slug}`;

  try {
    const t = await getTranslations({ locale, namespace: `servicesPages.${slugKey}` });

    return {
      title: t('seo.title'),
      description: t('seo.description'),
      keywords: t.raw('seo.keywords'),
      alternates: getAlternates(locale as Locale, servicePath),
      openGraph: {
        title: t('seo.title'),
        description: t('seo.description'),
        type: 'website',
        locale: locale,
        url: canonicalFor(locale as Locale, servicePath),
      },
    };
  } catch {
    return {};
  }
}

async function getServiceData(locale: string, slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'messages', 'services-pages', locale, `${slug}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading service data for ${slug}:`, error);
    return null;
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const serviceData = await getServiceData(locale, slug);

  if (!serviceData) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'servicesPages.relatedServices' });

  const { hero, toc, sections, internal_links } = serviceData;

  // Generate structured data schemas
  const serviceName = getServiceName(slug, locale as Locale);
  const serviceUrl = canonicalFor(locale as Locale, `/servicios/${slug}`);

  // Breadcrumb Schema
  const breadcrumbSchema = generateServiceBreadcrumbSchema({
    locale: locale as Locale,
    serviceSlug: slug,
    serviceTitle: serviceName,
    baseUrl: SITE_URL
  });

  // Service Schema
  const serviceSchema = generateDetailedServiceSchema({
    locale: locale as Locale,
    serviceName,
    description: serviceData.excerpt,
    serviceType: slug,
    url: serviceUrl,
    breadcrumb: breadcrumbSchema,
    baseUrl: SITE_URL
  });

  // HowTo Schema (if service has steps)
  const howToSection = sections.find((s: any) => s.steps && s.steps.length > 0);
  let howToSchema = null;
  if (howToSection && howToSection.steps) {
    howToSchema = generateHowToSchema({
      locale: locale as Locale,
      name: `${serviceName} - ${howToSection.h2}`,
      description: serviceData.excerpt,
      steps: howToSection.steps.map((step: any) => ({
        name: step.title,
        text: step.body
      })),
      url: serviceUrl,
      baseUrl: SITE_URL
    });
  }

  return (
    <>
      {/* Structured Data - Breadcrumb */}
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Structured Data - Service */}
      <script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Structured Data - HowTo (if available) */}
      {howToSchema && (
        <script
          id="howto-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-darker to-plum pt-32 pb-24">
        {/* Animated background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(220, 38, 24, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(123, 25, 35, 0.3) 0%, transparent 50%)
            `
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(255 255 255 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              {hero.h1}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-blue-light max-w-3xl mx-auto">
              {hero.subheading}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={hero.cta.href}
                className="group relative inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:bg-burgundy-dark transition-all duration-300"
              >
                {hero.cta.label}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Table of Contents - Enhanced */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm backdrop-blur-sm bg-white/95">
        <Container>
          <nav className="py-3 md:py-5">
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden overflow-x-auto scrollbar-hide">
              <ul className="flex gap-2 text-sm min-w-max px-4">
                {toc.map((item: { id: string; label: string }) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="inline-block px-3 py-1.5 rounded-lg text-gray-700 hover:text-accent hover:bg-accent/5 font-medium transition-all duration-200 border border-gray-300 hover:border-accent/20 whitespace-nowrap text-xs"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop: Wrap with spacing */}
            <ul className="hidden md:flex flex-wrap gap-3 justify-center text-sm">
              {toc.map((item: { id: string; label: string }) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-block px-4 py-2 rounded-lg text-gray-700 hover:text-accent hover:bg-accent/5 font-medium transition-all duration-200 border border-transparent hover:border-accent/20"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* Content Sections - Enhanced with alternating backgrounds */}
      <div className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl py-20 space-y-24">
            {sections.map((section: any, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  {/* Section Header with accent */}
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-accent to-burgundy-dark rounded-full" />
                      <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                        {toc.find((t: any) => t.id === section.id)?.label}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold text-navy">
                      {section.h2}
                    </h2>
                  </div>

                  {/* Body text with better styling */}
                  {section.body && (
                    <div className="prose prose-lg max-w-none mb-8">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {section.body}
                      </p>
                    </div>
                  )}

                  {/* Bullets - Different styles based on section */}
                  {section.bullets && section.id !== 'por-que-elegirnos' && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {section.bullets.map((bullet: string, i: number) => (
                        <div
                          key={`${section.id}-bullet-${i}`}
                          className="group relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span
                              className="text-gray-700 leading-relaxed [&>strong]:text-navy [&>strong]:font-bold"
                              dangerouslySetInnerHTML={{ __html: bullet }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Special design for "Por qué elegirnos" section */}
                  {section.bullets && section.id === 'por-que-elegirnos' && (
                    <div className="space-y-6">
                      {section.bullets.map((bullet: string, i: number) => (
                        <div
                          key={`${section.id}-bullet-special-${i}`}
                          className="group relative bg-white border-l-4 border-accent p-6 rounded-r-xl shadow-md hover:shadow-xl hover:border-burgundy-dark transition-all duration-300"
                        >
                          <div className="flex items-start gap-5">
                            {/* Number badge */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-burgundy-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <span className="text-white text-xl font-bold">{i + 1}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <span
                                className="text-gray-700 leading-relaxed text-base [&>strong]:text-navy [&>strong]:font-bold [&>strong]:text-lg"
                                dangerouslySetInnerHTML={{ __html: bullet }}
                              />
                            </div>

                            {/* Decorative icon */}
                            <div className="flex-shrink-0 opacity-20 group-hover:opacity-40 transition-opacity">
                              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            </div>
                          </div>

                          {/* Bottom gradient accent */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Steps - Enhanced timeline */}
                  {section.steps && (
                    <div className="space-y-8 relative">
                      {/* Vertical line */}
                      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-accent via-burgundy-dark to-accent/20" />

                      {section.steps.map((step: { title: string; body: string }, i: number) => (
                        <div key={`${section.id}-step-${i}-${step.title?.slice(0, 10) || i}`} className="relative pl-16">
                          {/* Step number badge */}
                          <div className="absolute left-0 top-0 w-12 h-12 rounded-xl bg-gradient-to-br from-navy to-navy-darker flex items-center justify-center shadow-lg">
                            <span className="text-white text-lg font-bold">{i + 1}</span>
                          </div>

                          {/* Step content card */}
                          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:border-accent/20 hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-bold text-navy mb-3">
                              {step.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {step.body}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Items (casos de uso) - Enhanced cards */}
                  {section.items && section.items.length > 0 && !section.items[0]?.q && section.items[0]?.title && (
                    <div className="grid gap-6 md:grid-cols-1">
                      {section.items.map((item: { title: string; body: string }, i: number) => (
                        <div
                          key={`${section.id}-item-${i}-${item.title?.slice(0, 10) || i}`}
                          className="relative group bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-accent/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          {/* Accent corner */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity" />

                          <h3 className="text-2xl font-bold text-navy mb-4 relative">
                            {item.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed relative">
                            {item.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* FAQ - Enhanced accordion style */}
                  {section.items && section.items.length > 0 && section.items[0]?.q && !section.items[0]?.title && (
                    <div className="space-y-4">
                      {section.items.map((item: { q: string; a: string }, i: number) => (
                        <div
                          key={`${section.id}-faq-${i}-${item.q?.slice(0, 10) || i}`}
                          className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:border-accent/20 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mt-1">
                              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-navy mb-3">
                                {item.q}
                              </h3>
                              <p className="text-gray-700 leading-relaxed">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA button within section */}
                  {section.button && (
                    <div className="mt-10 flex justify-center">
                      <a
                        href={section.button.href}
                        className="group inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:bg-burgundy-dark transition-all duration-300"
                      >
                        {section.button.label}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Internal Links - Enhanced with images */}
      <section className="relative bg-gradient-to-b from-gray-100 to-white py-20 overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
          }}
        />

        <Container>
          <div className="relative mx-auto max-w-6xl">
            {/* Section header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-1 w-8 bg-gradient-to-r from-accent to-burgundy-dark rounded-full" />
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                  {t('badge')}
                </span>
                <div className="h-1 w-8 bg-gradient-to-l from-accent to-burgundy-dark rounded-full" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-navy mb-3">
                {t('title')}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>

            {/* Services grid */}
            <div className="grid gap-8 md:grid-cols-3 justify-items-center max-w-6xl mx-auto">
              {internal_links
                .filter((link: { label: string; href: string }) => !link.href.includes('/servicios#') && link.href !== '/servicios')
                .map((link: { label: string; href: string }, index: number) => {
                  // Map services to their images
                  const serviceImages: { [key: string]: string } = {
                    'analisis-carteras': '/images/illustrations/services/analisis-carteras-inversion-compleja-crypto.webp',
                    'liquidaciones-fiscales': '/images/illustrations/services/liquidaciones-fiscales-modelos-aeat-criptomonedas.webp',
                    'seguimiento-cartera': '/images/illustrations/services/seguimiento-tiempo-real-cartera-crypto.webp',
                    'asesoria-fiscal-criptomonedas': '/images/illustrations/services/asesoria-fiscal-especializada-criptoactivos.webp'
                  };

                  const serviceSlug = link.href.split('/').pop() || '';
                  const image = serviceImages[serviceSlug];
                  const description = t(`descriptions.${serviceSlug}` as any);

                  if (!image || !description) return null;

                  return (
                    <a
                      key={index}
                      href={`/${locale}${link.href}`}
                      className="group relative block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-accent/30 w-full max-w-sm cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                        <img
                          src={image}
                          alt={link.label}
                          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-navy mb-3 group-hover:text-accent transition-colors">
                          {link.label}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                          {description}
                        </p>

                        {/* CTA indicator */}
                        <div className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                          {t('viewDetails')}
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom accent border */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-burgundy-dark to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </a>
                  );
                })}
            </div>

            {/* Back to all services link */}
            {internal_links.find((link: { href: string }) => link.href === '/servicios') && (
              <div className="mt-12 text-center">
                <a
                  href={`/${locale}/servicios`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-navy/20 bg-white hover:border-accent hover:bg-accent/5 font-semibold text-navy hover:text-accent transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  {t('viewAllServices')}
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
