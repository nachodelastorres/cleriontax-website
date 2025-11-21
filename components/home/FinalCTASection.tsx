"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import { ArrowRight, Shield, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function FinalCTASection() {
  const t = useTranslations('finalCTA');
  const locale = useLocale();

  return (
    <section id="cta-final" className="relative py-32 px-6 overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/illustrations/informe-fiscal-datos-ordenados-cripto.webp"
          alt="Informe fiscal de criptomonedas ordenado y estructurado"
          fill
          className="object-cover"
          style={{ opacity: 0.35 }}
          quality={90}
          priority={false}
        />
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.4)_0%,_rgba(255,255,255,0.25)_50%,_rgba(255,255,255,0.1)_100%)]" />

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232B2D42' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2D42] leading-tight">
              {t('title')}
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-[#2B2D42] max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <ButtonLink
                variant="primary"
                size="lg"
                href="/contacto"
                className="group inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {t('button')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#9CA3AF]"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#6DA48F]" />
                <span>{t('trust.security')}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-[#9CA3AF]" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#6DA48F]" />
                <span>{t('trust.clients')}</span>
              </div>
            </motion.div>

            {/* SEO text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 text-xs text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed"
            >
              {t('seoText')}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
