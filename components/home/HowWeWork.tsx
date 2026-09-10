"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Database, Filter, Calculator, FileCheck, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function HowWeWork() {
  const t = useTranslations('howWeWork');
  const locale = useLocale();

  const steps = [
    {
      number: "01",
      icon: Database,
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
    },
    {
      number: "02",
      icon: Filter,
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
    },
    {
      number: "03",
      icon: Calculator,
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
    },
    {
      number: "04",
      icon: FileCheck,
      title: t('steps.step4.title'),
      description: t('steps.step4.description'),
    },
  ];

  return (
    <section id="how-we-work" className="relative py-24 px-6 bg-blanco overflow-hidden">

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className="text-center mb-16 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-azul leading-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-pizarra max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
            <p className="text-base md:text-lg text-pizarra max-w-4xl mx-auto leading-relaxed">
              {t('intro')}
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative"
                >
                  {/* Step Card */}
                  <div className="bg-blanco p-6 -[0_10px_30px_rgba(0,0,0,0.05)] border border-niebla -[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 h-full flex flex-col">
                    {/* Step Number */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl font-bold text-azul/10">
                        {step.number}
                      </span>
                      <div className="bg-azul/5 p-3">
                        <Icon className="w-6 h-6 text-azul" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-azul mb-3 leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-pizarra leading-relaxed flex-grow">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Arrow (hidden on mobile and last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-niebla" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div
            className="text-center"
          >
            <ButtonLink
              variant="principal"
              size="lg"
              href="/contacto"
              className="group"
            >
              {t('cta')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
