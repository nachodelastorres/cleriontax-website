"use client";

import { Scale, Cpu, CheckCircle2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

export default function DualitySection() {
  const t = useTranslations('about.duality');

  const fiscalPoints = t.raw('fiscal.points') as string[];
  const techPoints = t.raw('tech.points') as string[];

  return (
    <section className="py-16 md:py-24 bg-azul relative overflow-hidden">

      <Container className="relative z-10">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blanco mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-niebla max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Split Magazine Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Fiscal Side - Left */}
          <article
            className="relative group"
          >
            <div className="p-8 md:p-12 h-full bg-blanco border-r-2 border-rojo/30 hover:border-rojo/50 transition-all duration-500">
              {/* Large decorative icon */}
              <div className="absolute top-8 right-8 opacity-5">
                <Scale className="w-64 h-64 text-azul" strokeWidth={0.5} />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blanco flex items-center justify-center transition- duration-300">
                      <Scale className="w-6 h-6 text-azul" />
                    </div>
                    <div className="h-px flex-1 bg-azul"></div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-azul mb-2">
                    {t('fiscal.title')}
                  </h3>
                  <p className="text-lg font-semibold text-rojo">
                    {t('fiscal.subtitle')}
                  </p>
                </div>

                {/* Description */}
                <p className="text-base text-pizarra leading-relaxed mb-8">
                  {t('fiscal.description')}
                </p>

                {/* Points */}
                <div className="space-y-3">
                  {fiscalPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 bg-azul flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-blanco" strokeWidth={3} />
                        </div>
                      </div>
                      <p className="text-sm text-pizarra leading-relaxed group-hover/item:text-azul transition-colors duration-300">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Tech Side - Right */}
          <article
            className="relative group"
          >
            <div className="p-8 md:p-12 h-full bg-blanco border-l-2 border-rojo/30 hover:border-rojo/50 transition-all duration-500">
              {/* Large decorative icon */}
              <div className="absolute top-8 left-8 opacity-5">
                <Cpu className="w-64 h-64 text-rojo" strokeWidth={0.5} />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="h-px flex-1 bg-rojo"></div>
                    <div className="w-12 h-12 bg-blanco flex items-center justify-center transition- duration-300">
                      <Cpu className="w-6 h-6 text-rojo" />
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-rojo mb-2 text-right">
                    {t('tech.title')}
                  </h3>
                  <p className="text-lg font-semibold text-azul text-right">
                    {t('tech.subtitle')}
                  </p>
                </div>

                {/* Description */}
                <p className="text-base text-pizarra leading-relaxed mb-8 text-right">
                  {t('tech.description')}
                </p>

                {/* Points */}
                <div className="space-y-3">
                  {techPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 flex-row-reverse group/item"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 bg-rojo flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-blanco" strokeWidth={3} />
                        </div>
                      </div>
                      <p className="text-sm text-pizarra leading-relaxed text-right group-hover/item:text-rojo transition-colors duration-300">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Center dividing line with icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-20">
          <div className="w-16 h-16 bg-blanco flex items-center justify-center transition- duration-300">
            <span className="text-2xl font-bold text-azul">×</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
