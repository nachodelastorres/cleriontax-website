'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ButtonLink from '@/components/ui/ButtonLink';

export default function HeroServices() {
  const t = useTranslations('services.hero');
  const locale = useLocale();

  return (
    <section
      id="hero-services"
      className="relative min-h-[600px] md:min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8F9FA] to-white"
    >
      {/* Background Pattern/Image */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(109,164,143,0.08),_transparent_70%)]">
        <div className="absolute inset-0 opacity-[0.25]">
          <Image
            src="/images/illustrations/informe-fiscal-datos-ordenados-cripto.webp"
            alt=""
            fill
            className="object-cover"
            priority
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center space-y-6 md:space-y-8">

        {/* Badge */}
        <div
          className="inline-flex flex-col items-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          <span className="text-xs font-semibold text-[#2B2D42] tracking-wider uppercase">
            {t('badge')}
          </span>
          <div className="w-24 h-[2px] bg-red" />
        </div>

        {/* Main Title (H1) */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2B2D42] leading-tight tracking-tight max-w-4xl animate-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          {t('title')}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-[#6B7280] max-w-3xl leading-relaxed animate-fade-in"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          {t('subtitle')}
        </p>

        {/* CTA Button */}
        <div
          className="pt-4 animate-fade-in"
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          <ButtonLink
            variant="secondary"
            size="lg"
            href="/contacto"
            className="group shadow-xl hover:shadow-2xl"
          >
            {t('cta')}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>

        {/* SEO Additional Text - Visually Hidden but Crawlable */}
        <div className="sr-only" aria-hidden="true">
          <p>
            {t('seoText')}
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#6DA48F]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#2B2D42]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
