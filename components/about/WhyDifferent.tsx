"use client";

import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

const images = [
  '/images/illustrations/9.png',
  '/images/illustrations/11.png',
  '/images/illustrations/10.png',
  '/images/illustrations/7.png',
];

export default function WhyDifferent() {
  const t = useTranslations('about.why');

  const itemKeys = ['noOldSchool', 'noBlackBox', 'speed', 'scalable'] as const;

  return (
    <section className="py-16 md:py-24 bg-papel">
      <Container>
        <div
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-azul mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-pizarra max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Magazine Grid - Asymmetric without numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {itemKeys.map((key, index) => (
            <article
              key={key}
              className={`relative group ${
 index === 1 || index === 2 ? 'md:translate-y-12' : ''
 }`}
            >
              <div className="relative h-full p-8 md:p-10 bg-papel border border-niebla/50 hover:border-rojo/30 transition-all duration-500">
                {/* Content */}
                <div className="relative z-10">
                  {/* Image with decorative gradient background */}
                  <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-papel"></div>
                    <div className="relative w-40 h-40 mx-auto md:mx-0">
                      <img
                        src={images[index]}
                        alt={t(`items.${key}.title`)}
                        className="w-full h-full object-contain drop-"
                      />
                    </div>
                  </div>

                  {/* Title with decorative line */}
                  <div className="mb-6">
                    <div className="h-1 w-16 bg-rojo mb-4"></div>
                    <h3 className="text-2xl md:text-3xl font-bold text-azul mb-4 leading-tight">
                      {t(`items.${key}.title`)}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-pizarra leading-relaxed mb-6">
                    {t(`items.${key}.description`)}
                  </p>

                  {/* Keywords badges (SEO) */}
                  <div className="flex flex-wrap gap-2">
                    {t(`items.${key}.keywords`).split(', ').map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-medium text-rojo bg-rojo/10 border border-rojo/20 hover:bg-rojo/20 hover:scale-105 transition-all duration-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-papel opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
