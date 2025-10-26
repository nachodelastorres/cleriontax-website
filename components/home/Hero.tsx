"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/10 to-accent-50/10 pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-accent/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent-dark animate-pulse"></div>
                  <span className="text-xs font-semibold text-primary-700 tracking-wide uppercase">
                    {t('badge')}
                  </span>
                </div>
              </motion.div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-5xl lg:text-6xl">
                {t('title')}
              </h1>

              <p className="text-lg text-neutral-600 md:text-xl">
                {t('subtitle')}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <ButtonLink variant="secondary" size="lg" href={`/${locale}/contacto`} className="group">
                {t('primaryCTA')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink variant="outline" size="lg" href={`/${locale}/servicios`}>
                {t('secondaryCTA')}
                <FileText className="ml-2 h-5 w-5" />
              </ButtonLink>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-3 gap-6 border-t border-gradient-to-r from-transparent via-accent/30 to-transparent pt-8"
            >
              <div className="group relative">
                <div className="text-3xl font-bold bg-gradient-to-br from-primary via-accent to-primary-700 bg-clip-text text-transparent">
                  {t('stats.clients.value')}
                </div>
                <div className="text-sm text-neutral-600 font-medium">{t('stats.clients.label')}</div>
              </div>
              <div className="group relative">
                <div className="text-3xl font-bold bg-gradient-to-br from-accent via-primary to-accent-700 bg-clip-text text-transparent">
                  {t('stats.transactions.value')}
                </div>
                <div className="text-sm text-neutral-600 font-medium">{t('stats.transactions.label')}</div>
              </div>
              <div className="group relative">
                <div className="text-3xl font-bold bg-gradient-to-br from-primary-700 via-accent to-primary bg-clip-text text-transparent">
                  {t('stats.accuracy.value')}
                </div>
                <div className="text-sm text-neutral-600 font-medium">{t('stats.accuracy.label')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square">
              {/* Illustration */}
              <div className="flex h-full w-full items-center justify-center p-8">
                <img
                  src="/images/illustrations/9.png"
                  alt="Crypto Tax Analysis"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-accent/20 blur-3xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 h-40 w-40 rounded-full bg-primary/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
