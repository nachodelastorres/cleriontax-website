"use client";

import { motion } from "framer-motion";
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary-50/10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Horizontal Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-navy/20 via-navy/60 to-navy/20">
            <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy-darker blur-sm opacity-40"></div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {stepKeys.map((key, index) => {
              const Icon = icons[index];
              const imageData = images[index];

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  {/* Image above */}
                  <div className="mb-8 flex justify-center">
                    <motion.div
                      whileHover={{ y: -8, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-32 h-32 relative"
                    >
                      <Image
                        src={imageData.src}
                        alt={imageData.alt}
                        width={imageData.width}
                        height={imageData.height}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="w-full h-full object-contain drop-shadow-2xl"
                        title={imageData.alt}
                      />
                    </motion.div>
                  </div>

                  {/* Icon node on timeline */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dark p-0.5 shadow-xl shadow-accent/30 z-10"
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Icon className="h-7 w-7 text-accent" />
                      </div>

                      {/* Pulse effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-accent-dark blur-md opacity-0 hover:opacity-60 transition-opacity duration-500 -z-10"></div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-2">
                    {/* Number badge */}
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                        {t(`steps.${key}.number`)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-primary min-h-[3.5rem] flex items-center justify-center">
                      {t(`steps.${key}.title`)}
                    </h3>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {t(`steps.${key}.description`)}
                    </p>

                    {/* Time badge */}
                    <div className="inline-flex flex-col items-center gap-2 mt-4 pt-4 border-t border-neutral-200">
                      <div className="inline-flex items-center gap-2">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        <span className="text-xs font-medium text-neutral-600">
                          {t(`steps.${key}.time`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative flex gap-6"
              >
                {/* Left side - Icon and line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark p-0.5 shadow-lg shadow-accent/20 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  {index < stepKeys.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-navy/60 to-navy/20 mt-2"></div>
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
                      className="w-full h-full object-contain drop-shadow-xl"
                      title={imageData.alt}
                    />
                  </div>

                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                      {t(`steps.${key}.number`)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-2 min-h-[3.5rem] flex items-center">
                    {t(`steps.${key}.title`)}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {t(`steps.${key}.description`)}
                  </p>

                  <div className="pt-4 border-t border-neutral-200">
                    <div className="inline-flex items-center gap-2">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      <span className="text-xs font-medium text-neutral-600">
                        {t(`steps.${key}.time`)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
