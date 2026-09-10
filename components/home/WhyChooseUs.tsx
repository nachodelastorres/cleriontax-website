"use client";

import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function WhyChooseUs() {
  const t = useTranslations('whyChooseUs');
  const locale = useLocale();

  const reasons = [
    {
      image: "/images/illustrations/cards_home/asesoria-fiscal-criptomonedas.webp",
      alt: "Asesoría fiscal especializada en criptomonedas y análisis normativo AEAT",
      title: t('reasons.reason1.title'),
      description: t('reasons.reason1.description'),
    },
    {
      image: "/images/illustrations/cards_home/fiscalidad-defi-espana.webp",
      alt: "Fiscalidad DeFi multichain: Ethereum, Solana, Polygon y ecosistemas blockchain",
      title: t('reasons.reason2.title'),
      description: t('reasons.reason2.description'),
    },
    {
      image: "/images/illustrations/cards_home/informe-fiscal-criptomonedas-aeat.webp",
      alt: "Informe fiscal de criptomonedas trazable y auditable para la AEAT",
      title: t('reasons.reason3.title'),
      description: t('reasons.reason3.description'),
    },
    {
      image: "/images/illustrations/cards_home/seguridad-fiscal-datos-criptos.webp",
      alt: "Seguridad y confidencialidad en el procesamiento de datos fiscales crypto",
      title: t('reasons.reason4.title'),
      description: t('reasons.reason4.description'),
    },
    {
      image: "/images/illustrations/cards_home/clasificacion-fiscal-criptoactivos.webp",
      alt: "Clasificación fiscal experta de criptoactivos: staking, swaps y operaciones DeFi",
      title: t('reasons.reason5.title'),
      description: t('reasons.reason5.description'),
    },
    {
      image: "/images/illustrations/cards_home/analisis-datos-fiscales-activos.webp",
      alt: "Ingeniería de datos aplicada: limpieza y normalización de transacciones blockchain",
      title: t('reasons.reason6.title'),
      description: t('reasons.reason6.description'),
    },
  ];

  return (
    <section id="why-choose-us" className="relative py-24 px-6 bg-blanco overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/illustrations/data_flow.webp"
            alt="Data flow background"
            fill
            className="object-cover"
            style={{ opacity: 0.25 }}
            quality={90}
            priority={false}
          />
        </div>
        {/* Gradient overlay for better blending */}
        <div className="absolute inset-0 bg-papel" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className="text-center mb-16 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-azul leading-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-pizarra max-w-4xl mx-auto">
              {t('subtitle')}
            </p>
            <p className="text-base md:text-lg text-pizarra max-w-4xl mx-auto leading-relaxed">
              {t('intro')}
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {reasons.map((reason, index) => {
              return (
                <div
                  key={index}
                  className="group"
                >
                  <div className="bg-blanco p-6 md:p-8 -[0_6px_24px_rgba(0,0,0,0.05)] -[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full">
                    {/* Image */}
                    <div className="mb-5 flex items-center justify-center w-full h-40 md:h-44">
                      <Image
                        src={reason.image}
                        alt={reason.alt}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-azul mb-3 leading-tight">
                      {reason.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-pizarra leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div
            className="text-center"
          >
            <ButtonLink
              variant="principal"
              size="lg"
              href="/servicios"
              className="group"
            >
              {t('cta')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
