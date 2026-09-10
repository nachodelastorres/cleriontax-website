"use client";

import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import { ArrowRight, Shield, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function FinalCTASection() {
  const t = useTranslations('finalCTA');
  const locale = useLocale();

  return (
    <section id="cta-final" className="relative py-32 px-6 overflow-hidden bg-blanco">
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



      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main content */}
          <div
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
                variant="principal"
                size="lg"
                href="/contacto"
                className="group inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold transition-all duration-300"
              >
                {t('button')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </div>

            {/* Trust indicators */}
            <div
              className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#9CA3AF]"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#6DA48F]" />
                <span>{t('trust.security')}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-[#9CA3AF]" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#6DA48F]" />
                <span>{t('trust.clients')}</span>
              </div>
            </div>

            {/* SEO text */}
            <p
              className="pt-6 text-xs text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed"
            >
              {t('seoText')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
