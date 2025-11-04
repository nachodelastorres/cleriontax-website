'use client';

import Image from 'next/image';
import { FileText, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import ButtonLink from '@/components/ui/ButtonLink';

export default function MainServicesSection() {
  const locale = useLocale();
  const t = useTranslations('services.mainSection');

  return (
    <section id="main-services" className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <Image
          src="/images/illustrations/data_flow.webp"
          alt="Fondo abstracto de flujo de datos que simboliza el análisis fiscal y la trazabilidad"
          fill
          style={{ objectFit: 'cover' }}
          priority={false}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-blue max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-navy">
          {/* Paragraph 1 with Icon */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <p className="flex-1">
              {t('paragraph1')}
            </p>
          </div>

          {/* Paragraph 2 with Icon */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle className="w-6 h-6 text-accent" />
            </div>
            <p className="flex-1" dangerouslySetInnerHTML={{ __html: t('paragraph2') }} />
          </div>

          {/* Paragraph 3 with Icon */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <p className="flex-1" dangerouslySetInnerHTML={{ __html: t('paragraph3') }} />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <ButtonLink
            variant="secondary"
            size="lg"
            href={`/${locale}/contacto`}
            className="group"
          >
            {t('cta')}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
