"use client";

import { motion } from "framer-motion";
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
        <div className="absolute inset-0 bg-gradient-to-br from-navy-darker/95 via-navy/92 to-navy-darker/95" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-blue-light max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 h-full flex flex-col">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-base text-gray-blue-light leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    <ButtonLink
                      variant="secondary"
                      size="md"
                      href={service.link}
                      className="group inline-flex w-fit"
                    >
                      {service.cta}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </ButtonLink>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
