"use client";

import { motion } from "framer-motion";
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
    <section id="how-we-work" className="relative py-24 px-6 bg-white overflow-hidden">
      {/* Gradient overlays - top and bottom */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[rgba(43,45,66,0.04)] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[rgba(141,153,174,0.04)] to-transparent pointer-events-none" />

      {/* Background with radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(109,164,143,0.08),_transparent_70%)]" />

      {/* Decorative pattern - top right */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(27,32,66,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Decorative pattern - bottom left */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 opacity-[0.06] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(109,164,143,0.2) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-darker leading-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-blue max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
            <p className="text-base md:text-lg text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              {t('intro')}
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step Card */}
                  <div className="bg-white rounded-xl p-6 shadow-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-neutral-200 hover:shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 h-full flex flex-col">
                    {/* Step Number */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl font-bold text-navy/10">
                        {step.number}
                      </span>
                      <div className="bg-navy/5 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-navy" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-navy-darker mb-3 leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-blue leading-relaxed flex-grow">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Arrow (hidden on mobile and last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-gray-blue-light" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <ButtonLink
              variant="secondary"
              size="lg"
              href={`/${locale}/contacto`}
              className="group shadow-lg hover:shadow-xl"
            >
              {t('cta')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
