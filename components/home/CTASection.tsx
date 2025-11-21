"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function CTASection() {
  const t = useTranslations('finalCTA');
  const locale = useLocale();

  const trustKeys = ['security', 'clients'] as const;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-navy via-navy to-navy-darker relative overflow-hidden">
      {/* Decorative elements with metallic shine */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-blue-light/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-red/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-navy-darker/50 to-transparent"></div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-blue-light font-medium">
              {t('subtitle')}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center items-center"
          >
            <ButtonLink
              variant="secondary"
              size="lg"
              href="/contacto"
              className="group shadow-xl hover:shadow-2xl"
            >
              {t('button')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-white/80 text-sm"
          >
            {trustKeys.map((key) => (
              <div key={key} className="flex items-center gap-2 group">
                <div className="p-1 rounded-full bg-gray-blue-light/20 group-hover:bg-gray-blue-light/30 transition-colors duration-300">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-white">{t(`trust.${key}`)}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
