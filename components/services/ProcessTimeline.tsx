"use client";

import { motion } from "framer-motion";
import { Clock, Search, FileCheck, FileText, Cog, CheckCircle } from "lucide-react";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

const icons = [Search, FileCheck, FileText, Cog, CheckCircle];
const images = [
  '/images/illustrations/5.png',
  '/images/illustrations/6.png',
  '/images/illustrations/7.png',
  '/images/illustrations/8.png',
  '/images/illustrations/10.png',
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-4xl mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Horizontal Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 via-accent/60 to-accent/20">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary blur-sm opacity-40"></div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {stepKeys.map((key, index) => {
              const Icon = icons[index];
              const imageSrc = images[index];

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
                      <img
                        src={imageSrc}
                        alt={t(`steps.${key}.title`)}
                        className="w-full h-full object-contain drop-shadow-2xl"
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

                    <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent min-h-[3.5rem] flex items-center justify-center">
                      {t(`steps.${key}.title`)}
                    </h3>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {t(`steps.${key}.description`)}
                    </p>

                    {/* Time badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                      <Clock className="w-3 h-3 text-accent" />
                      <span className="text-xs font-medium text-accent-dark">
                        {t(`steps.${key}.time`)}
                      </span>
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
            const imageSrc = images[index];

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
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-accent/60 to-accent/20 mt-2"></div>
                  )}
                </div>

                {/* Right side - Content */}
                <div className="flex-1 pb-8">
                  {/* Image */}
                  <div className="mb-4 w-24 h-24">
                    <img
                      src={imageSrc}
                      alt={t(`steps.${key}.title`)}
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>

                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                      {t(`steps.${key}.number`)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent mb-2 min-h-[3.5rem] flex items-center">
                    {t(`steps.${key}.title`)}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                    {t(`steps.${key}.description`)}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                    <Clock className="w-3 h-3 text-accent" />
                    <span className="text-xs font-medium text-accent-dark">
                      {t(`steps.${key}.time`)}
                    </span>
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
