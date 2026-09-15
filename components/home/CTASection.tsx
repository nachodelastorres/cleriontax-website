"use client";

import { ArrowRight, Check } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function CTASection() {
  const t = useTranslations('finalCTA');
  const locale = useLocale();

  const trustKeys = ['security', 'clients'] as const;

  return (
    <section className="py-16 md:py-24 bg-azul relative overflow-hidden">
      {/* Decorative elements with metallic shine */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-papel" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-papel" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-azul"></div>

      <Container className="relative z-10">
        <div
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blanco">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-niebla font-medium">
              {t('subtitle')}
            </p>
          </div>

          <div
            className="flex justify-center items-center"
          >
            <ButtonLink
              variant="principal"
              size="lg"
              href="/contacto"
              className="group"
            >
              {t('button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </ButtonLink>
          </div>

          {/* Trust indicators */}
          <div
            className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-blanco/80 text-sm"
          >
            {trustKeys.map((key) => (
              <div key={key} className="flex items-center gap-2 group">
                <div className="p-1 bg-niebla/20 group-hover:bg-niebla/30 transition-colors duration-300">
                  <Check className="w-4 h-4 text-blanco" />
                </div>
                <span className="font-medium text-blanco">{t(`trust.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
