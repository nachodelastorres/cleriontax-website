"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function HeroContact() {
  const t = useTranslations('contact.hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-[600px] md:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/illustrations/office_building1.webp"
          alt="Contacta con Cleriontax - Asesoría fiscal especializada en criptomonedas"
          fill
          priority
          className="object-cover object-center"
          quality={90}
          sizes="100vw"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-azul/85" />
      </div>

      <Container className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl">
          {/* Content */}
          <div
            className="space-y-6 md:space-y-8 text-center md:text-left"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-3"
            >
              <div className="w-[3px] h-10 bg-rojo" />
              <span className="text-xs font-semibold text-blanco tracking-wider uppercase">
                {t('badge')}
              </span>
            </div>

            {/* H1 - Main Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-blanco"
            >
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl text-niebla leading-relaxed max-w-3xl"
            >
              {t('subtitle')}
            </p>

            {/* CTA - Single button */}
            <div
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <ButtonLink
                variant="principal"
                size="lg"
                href="#contact-form"
                className="group"
              >
                {t('cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </ButtonLink>
            </div>

            {/* SEO Additional Text - Visually Hidden but Crawlable */}
            <div className="sr-only" aria-hidden="true">
              <p>
                Contacta con Cleriontax, tu asesoría fiscal especializada en criptomonedas y activos digitales en España.
                Nuestro equipo de asesores fiscales colegiados expertos en blockchain ofrece servicios de declaración IRPF crypto,
                modelo 100 criptomonedas, modelo 720 y 721, optimización fiscal de criptoactivos, y asesoramiento integral
                en fiscalidad de Bitcoin, Ethereum, DeFi y NFTs. Solicita tu presupuesto personalizado sin compromiso y
                obtén respuesta en menos de 24 horas. Servicio profesional, confidencial y 100% compatible con la AEAT.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
