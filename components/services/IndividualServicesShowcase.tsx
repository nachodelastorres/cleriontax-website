'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const serviceImages = {
  'analisis-carteras': {
    src: '/images/illustrations/services/analisis-carteras-inversion-compleja-crypto.webp',
    alt: 'Análisis de carteras de inversión complejas en criptomonedas y activos digitales'
  },
  'liquidaciones-fiscales': {
    src: '/images/illustrations/services/liquidaciones-fiscales-modelos-aeat-criptomonedas.webp',
    alt: 'Liquidaciones fiscales y preparación de modelos AEAT para criptomonedas'
  },
  'seguimiento-cartera': {
    src: '/images/illustrations/services/seguimiento-tiempo-real-cartera-crypto.webp',
    alt: 'Seguimiento en tiempo real de cartera de criptomonedas con CoinTracking'
  },
  'asesoria-fiscal-criptomonedas': {
    src: '/images/illustrations/services/asesoria-fiscal-especializada-criptoactivos.webp',
    alt: 'Asesoría fiscal especializada en criptoactivos y activos digitales'
  },
};

export default function IndividualServicesShowcase() {
  const locale = useLocale();
  const t = useTranslations('services.showcase');

  const services = [
    {
      slug: 'analisis-carteras',
      title: t('analysisTitle'),
      excerpt: t('analysisExcerpt'),
    },
    {
      slug: 'liquidaciones-fiscales',
      title: t('taxReturnsTitle'),
      excerpt: t('taxReturnsExcerpt'),
    },
    {
      slug: 'seguimiento-cartera',
      title: t('trackingTitle'),
      excerpt: t('trackingExcerpt'),
    },
    {
      slug: 'asesoria-fiscal-criptomonedas',
      title: t('advisoryTitle'),
      excerpt: t('advisoryExcerpt'),
    },
  ];

  return (
    <section className="relative py-24 bg-gray-100 overflow-hidden">
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-100/50" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            {t('sectionTitle')}
          </h2>
          <p className="text-lg text-gray-blue max-w-3xl mx-auto">
            {t('sectionSubtitle')}
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-6">
          {services.map((service, index) => {
            const serviceImage = serviceImages[service.slug as keyof typeof serviceImages];

            return (
              <Link
                key={service.slug}
                href={`/${locale}/servicios/${service.slug}`}
                className="group relative block"
              >
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300">
                  {/* Accent bar on left */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-burgundy-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start gap-6 p-8 md:p-10">
                    {/* Image Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 bg-white">
                        <Image
                          src={serviceImage.src}
                          alt={serviceImage.alt}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain p-3"
                        />
                        {/* Subtle glow effect on hover */}
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-navy group-hover:text-accent transition-colors duration-300 mb-3">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {service.excerpt}
                      </p>

                      {/* CTA */}
                      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-navy/20 bg-white group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                        <span className="text-sm font-semibold text-navy group-hover:text-accent transition-colors duration-300">
                          {t('learnMore')}
                        </span>
                        <ArrowRight className="w-4 h-4 text-navy group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-burgundy-dark to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-blue dark:text-gray-blue-light max-w-2xl mx-auto">
            {t('needHelpChoosing')}
          </p>
        </div>
      </div>
    </section>
  );
}
