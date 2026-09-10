"use client";

import { Clock, Search, FileCheck, FileText, Cog, CheckCircle } from "lucide-react";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Container from "@/components/ui/Container";

const icons = [Search, FileCheck, FileText, Cog, CheckCircle];

// Imágenes optimizadas para SEO con nombres descriptivos
const images = [
  {
    src: '/images/illustrations/services/timeline/tax-diagnosis-data.webp',
    alt: 'Diagnóstico fiscal de datos de criptomonedas y análisis de carteras digitales',
    width: 600,
    height: 600
  },
  {
    src: '/images/illustrations/services/timeline/data-analysis-tax.webp',
    alt: 'Análisis de complejidad fiscal para operaciones en exchanges y DeFi',
    width: 600,
    height: 600
  },
  {
    src: '/images/illustrations/services/timeline/crypto-investment-tax.webp',
    alt: 'Presupuesto personalizado de servicios fiscales para inversores crypto',
    width: 600,
    height: 600
  },
  {
    src: '/images/illustrations/services/timeline/defi-blockchain-data.webp',
    alt: 'Procesamiento de datos blockchain y cálculos fiscales certificados FIFO',
    width: 600,
    height: 600
  },
  {
    src: '/images/illustrations/services/timeline/tax-report-crypto.webp',
    alt: 'Informe fiscal completo de criptoactivos verificado y compatible con AEAT',
    width: 600,
    height: 600
  }
];

export default function ProcessTimeline() {
  const t = useTranslations('services.process');

  const stepKeys = ['diagnosis', 'analysis', 'proposal', 'execution', 'delivery'] as const;

  return (
    <section className="py-16 md:py-24 bg-papel">
      <Container>
        <div
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-azul mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-pizarra max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Horizontal Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-niebla">
            <div className="absolute inset-0 bg-azul opacity-40"></div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {stepKeys.map((key, index) => {
              const Icon = icons[index];
              const imageData = images[index];

              return (
                <div
                  key={key}
                  className="relative"
                >
                  {/* Image above */}
                  <div className="mb-8 flex justify-center">
                    <div
                      className="w-32 h-32 relative"
                    >
                      <Image
                        src={imageData.src}
                        alt={imageData.alt}
                        width={imageData.width}
                        height={imageData.height}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="w-full h-full object-contain drop-"
                        title={imageData.alt}
                      />
                    </div>
                  </div>

                  {/* Icon node on timeline */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="relative w-16 h-16 bg-rojo p-0.5 z-10"
                    >
                      <div className="w-full h-full bg-blanco flex items-center justify-center">
                        <Icon className="h-7 w-7 text-rojo" />
                      </div>

                      {/* Pulse effect */}
                      <div className="absolute inset-0 bg-rojo opacity-0 hover:opacity-60 transition-opacity duration-500 -z-10"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-2">
                    {/* Number badge */}
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-rojo">
                        {t(`steps.${key}.number`)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-azul min-h-[3.5rem] flex items-center justify-center">
                      {t(`steps.${key}.title`)}
                    </h3>

                    <p className="text-sm text-pizarra leading-relaxed">
                      {t(`steps.${key}.description`)}
                    </p>

                    {/* Time badge */}
                    <div className="inline-flex flex-col items-center gap-2 mt-4 pt-4 border-t border-niebla">
                      <div className="inline-flex items-center gap-2">
                        <Clock className="w-3 h-3 text-pizarra" />
                        <span className="text-xs font-medium text-pizarra">
                          {t(`steps.${key}.time`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vertical Timeline - Mobile & Tablet */}
        <div className="lg:hidden space-y-12">
          {stepKeys.map((key, index) => {
            const Icon = icons[index];
            const imageData = images[index];

            return (
              <div
                key={key}
                className="relative flex gap-6"
              >
                {/* Left side - Icon and line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-rojo p-0.5 flex-shrink-0">
                    <div className="w-full h-full bg-blanco flex items-center justify-center">
                      <Icon className="h-6 w-6 text-rojo" />
                    </div>
                  </div>
                  {index < stepKeys.length - 1 && (
                    <div className="w-0.5 flex-1 bg-niebla mt-2"></div>
                  )}
                </div>

                {/* Right side - Content */}
                <div className="flex-1 pb-8">
                  {/* Image */}
                  <div className="mb-4 w-24 h-24 relative">
                    <Image
                      src={imageData.src}
                      alt={imageData.alt}
                      width={imageData.width}
                      height={imageData.height}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-contain drop-"
                      title={imageData.alt}
                    />
                  </div>

                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-rojo">
                      {t(`steps.${key}.number`)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-azul mb-2 min-h-[3.5rem] flex items-center">
                    {t(`steps.${key}.title`)}
                  </h3>

                  <p className="text-sm text-pizarra leading-relaxed mb-4">
                    {t(`steps.${key}.description`)}
                  </p>

                  <div className="pt-4 border-t border-niebla">
                    <div className="inline-flex items-center gap-2">
                      <Clock className="w-3 h-3 text-pizarra" />
                      <span className="text-xs font-medium text-pizarra">
                        {t(`steps.${key}.time`)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
