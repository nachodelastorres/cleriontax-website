"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-[600px] md:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/illustrations/office_building2.webp"
          alt="Asesoría fiscal para criptomonedas y DeFi - Cleriontax"
          fill
          priority
          className="object-cover object-center"
          quality={90}
          sizes="100vw"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-darker/95 via-navy/90 to-navy/70" />
      </div>

      <Container className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 md:space-y-8 text-center md:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3"
            >
              <div className="w-[3px] h-10 bg-red" />
              <span className="text-xs font-semibold text-white tracking-wider uppercase">
                {t('badge')}
              </span>
            </motion.div>

            {/* H1 - Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white"
            >
              {t('title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg md:text-xl text-gray-blue-light leading-relaxed max-w-3xl"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <ButtonLink
                variant="secondary"
                size="lg"
                href="/contacto"
                className="group shadow-xl hover:shadow-2xl"
              >
                {t('primaryCTA')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                variant="outline"
                size="lg"
                href="/servicios"
                className="border-white text-white hover:border-gray-blue-light hover:text-gray-blue-light"
              >
                {t('secondaryCTA')}
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
