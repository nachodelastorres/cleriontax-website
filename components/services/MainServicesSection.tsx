'use client';

import Image from 'next/image';
import { FileText, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import ButtonLink from '@/components/ui/ButtonLink';

export default function MainServicesSection() {
  const locale = useLocale();

  return (
    <section id="main-services" className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <Image
          src="/images/illustrations/data_flow.webp"
          alt="Fondo abstracto de flujo de datos que simboliza el análisis fiscal y la trazabilidad"
          fill
          style={{ objectFit: 'cover' }}
          priority={false}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Nuestros servicios fiscales especializados
          </h2>
          <p className="text-lg text-gray-blue max-w-3xl mx-auto">
            Soluciones integrales en fiscalidad crypto y activos digitales, adaptadas a cada tipo de inversor.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-navy">
          {/* Paragraph 1 with Icon */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <p className="flex-1">
              En Cleriontax combinamos análisis fiscal y ciencia de datos para ofrecer un servicio integral y transparente.
              Nuestro equipo aborda cada cartera de inversión —ya sea en criptomonedas, DeFi o activos digitales tradicionales—
              con la precisión que requiere la normativa vigente.
            </p>
          </div>

          {/* Paragraph 2 with Icon */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle className="w-6 h-6 text-accent" />
            </div>
            <p className="flex-1">
              Trabajamos con una metodología propia que garantiza la trazabilidad completa de las operaciones,
              la clasificación fiscal correcta y la generación de informes claros, auditables y 100% compatibles con la AEAT.
              Cada <strong>informe fiscal</strong> es revisado por profesionales especializados en <strong>fiscalidad crypto</strong>,
              asegurando exactitud en los cálculos y coherencia en la presentación.
            </p>
          </div>

          {/* Paragraph 3 with Icon */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <p className="flex-1">
              Además, ofrecemos <strong>acompañamiento personalizado</strong> durante todo el proceso fiscal:
              desde la revisión inicial hasta la entrega de modelos oficiales y soporte post-presentación.
              Nuestro objetivo es que cada cliente declare con seguridad y sin incertidumbre,
              respaldado por una <strong>asesoría fiscal criptomonedas</strong> de máxima calidad.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <ButtonLink
            variant="secondary"
            size="lg"
            href={`/${locale}/contacto`}
            className="group"
          >
            Solicita tu informe fiscal
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
