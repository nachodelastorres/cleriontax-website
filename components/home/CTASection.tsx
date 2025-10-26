"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();

  const badgeKeys = ['noCommitment', 'response24h', 'secure'] as const;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 relative overflow-hidden">
      {/* Decorative elements with metallic shine */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/5 to-transparent"></div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-accent-100 to-white bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              {t('subtitle')}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <ButtonLink
              variant="secondary"
              size="lg"
              href={`/${locale}/contacto`}
              className="group shadow-xl hover:shadow-2xl"
            >
              {t('primary')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink
              variant="outline"
              size="lg"
              href={`/${locale}/servicios`}
            >
              {t('secondary')}
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
            {badgeKeys.map((key) => (
              <div key={key} className="flex items-center gap-2 group">
                <div className="p-1 rounded-full bg-accent/20 group-hover:bg-accent/30 transition-colors duration-300">
                  <Check className="w-4 h-4 text-accent-100" />
                </div>
                <span className="font-medium">{t(`badges.${key}`)}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
