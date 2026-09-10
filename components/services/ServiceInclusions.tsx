"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

export default function ServiceInclusions() {
  const t = useTranslations('services.inclusions');

  const inclusionKeys = [
    'dataProcessing',
    'calculations',
    'models',
    'review',
    'report',
    'session',
    'support',
    'updates',
  ] as const;

  return (
    <section className="py-16 md:py-24 bg-papel">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-azul md:text-4xl mb-4">
              {t('title')}
            </h2>
          </div>

          {/* Elegant list with golden checkmarks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inclusionKeys.map((key, index) => (
              <div
                key={key}
                className="group"
              >
                <div className="flex items-start gap-4 p-4 transition-colors duration-200 hover:bg-papel">
                  {/* Golden checkmark with gradient */}
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="relative">
                      <div className="w-7 h-7 bg-rojo p-0.5 transition-all duration-300">
                        <div className="w-full h-full bg-blanco flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-rojo" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Pulse ring on hover */}
                      <div className="absolute inset-0 bg-rojo opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-base text-pizarra leading-relaxed font-medium group-hover:text-azul transition-colors duration-300">
                      {t(`items.${key}`)}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA hint */}
          <div
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-papel border border-rojo/20">
              <span className="text-sm font-medium text-azul">
                {useTranslations('serviceInclusions')('allInclude')}
              </span>
              <div className="w-2 h-2 bg-rojo"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
