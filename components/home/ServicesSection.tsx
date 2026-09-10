"use client";

import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function ServicesSection() {
  const t = useTranslations('servicesSection');
  const locale = useLocale();

  const services = [
    {
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      cta: t('services.service1.cta'),
      link: '/servicios',
    },
    {
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      cta: t('services.service2.cta'),
      link: '/servicios',
    },
    {
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      cta: t('services.service3.cta'),
      link: '/servicios',
    },
    {
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      cta: t('services.service4.cta'),
      link: '/servicios',
    },
  ];

  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/illustrations/office_building1.webp"
          alt="Oficina Cleriontax asesoría fiscal"
          fill
          className="object-cover"
          quality={90}
          priority={false}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-azul" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-blanco leading-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-niebla max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => {
              return (
                <div
                  key={index}
                  className="group"
                >
                  <div className="bg-blanco/10 backdrop- p-8 border border-blanco/20 hover:bg-blanco/15 hover:border-blanco/30 transition-all duration-300 h-full flex flex-col">
                    <h3 className="text-xl md:text-2xl font-semibold text-blanco mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-base text-niebla leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    <ButtonLink
                      variant="principal"
                      size="md"
                      href={service.link}
                      className="group inline-flex w-fit"
                    >
                      {service.cta}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
