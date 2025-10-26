"use client";

import { motion } from "framer-motion";
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary-50/20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-4xl mb-4">
              {t('title')}
            </h2>
          </motion.div>

          {/* Elegant list with golden checkmarks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inclusionKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group"
              >
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-accent/5 hover:to-transparent transition-all duration-300">
                  {/* Golden checkmark with gradient */}
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="relative">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-dark p-0.5 shadow-md shadow-accent/20 group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-300">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-accent" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Pulse ring on hover */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-accent-dark opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-base text-neutral-700 leading-relaxed font-medium group-hover:text-primary transition-colors duration-300">
                      {t(`items.${key}`)}
                    </p>
                  </div>

                  {/* Decorative line that appears on hover */}
                  <div className="absolute left-0 bottom-0 h-px w-0 bg-gradient-to-r from-accent/50 to-transparent group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-accent/20">
              <span className="text-sm font-medium text-primary-700">
                {useTranslations('serviceInclusions')('allInclude')}
              </span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent-dark animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
