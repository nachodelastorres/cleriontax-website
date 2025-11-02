"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import Image from "next/image";

export default function WhyChooseUsServices() {
  const t = useTranslations('whyChooseUs');

  const reasons = [
    {
      image: "/images/illustrations/cards_home/asesoria-fiscal-criptomonedas.webp",
      alt: "Asesoría fiscal especializada en criptomonedas y análisis normativo AEAT",
      title: t('reasons.reason1.title'),
      description: t('reasons.reason1.description'),
      position: 'left' as const,
    },
    {
      image: "/images/illustrations/cards_home/fiscalidad-defi-espana.webp",
      alt: "Fiscalidad DeFi multichain: Ethereum, Solana, Polygon y ecosistemas blockchain",
      title: t('reasons.reason2.title'),
      description: t('reasons.reason2.description'),
      position: 'right' as const,
    },
    {
      image: "/images/illustrations/cards_home/informe-fiscal-criptomonedas-aeat.webp",
      alt: "Informe fiscal de criptomonedas trazable y auditable para la AEAT",
      title: t('reasons.reason3.title'),
      description: t('reasons.reason3.description'),
      position: 'left' as const,
    },
    {
      image: "/images/illustrations/cards_home/seguridad-fiscal-datos-criptos.webp",
      alt: "Seguridad y confidencialidad en el procesamiento de datos fiscales crypto",
      title: t('reasons.reason4.title'),
      description: t('reasons.reason4.description'),
      position: 'right' as const,
    },
    {
      image: "/images/illustrations/cards_home/clasificacion-fiscal-criptoactivos.webp",
      alt: "Clasificación fiscal experta de criptoactivos: staking, swaps y operaciones DeFi",
      title: t('reasons.reason5.title'),
      description: t('reasons.reason5.description'),
      position: 'left' as const,
    },
    {
      image: "/images/illustrations/cards_home/analisis-datos-fiscales-activos.webp",
      alt: "Ingeniería de datos aplicada: limpieza y normalización de transacciones blockchain",
      title: t('reasons.reason6.title'),
      description: t('reasons.reason6.description'),
      position: 'right' as const,
    },
  ];

  return (
    <section id="why-choose-us-services" className="relative py-24 px-6 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(27, 32, 66) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-darker leading-tight">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-blue max-w-4xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {t('intro')}
          </p>
        </motion.div>

        {/* Reasons - Editorial Layout */}
        <div className="space-y-16 md:space-y-20">
          {reasons.map((reason, index) => {
            const isLeft = reason.position === 'left';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-12 gap-8 items-center">
                  {isLeft ? (
                    <>
                      {/* Image Left */}
                      <div className="col-span-5">
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <Image
                            src={reason.image}
                            alt={reason.alt}
                            fill
                            className="object-contain p-6 bg-white"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Content Right */}
                      <div className="col-span-7 pl-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                            <span className="text-accent font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-navy-darker mb-4 leading-tight">
                              {reason.title}
                            </h3>
                            <p className="text-base md:text-lg text-gray-blue leading-relaxed">
                              {reason.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Content Left */}
                      <div className="col-span-7 pr-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                            <span className="text-accent font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-navy-darker mb-4 leading-tight">
                              {reason.title}
                            </h3>
                            <p className="text-base md:text-lg text-gray-blue leading-relaxed">
                              {reason.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Image Right */}
                      <div className="col-span-5">
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <Image
                            src={reason.image}
                            alt={reason.alt}
                            fill
                            className="object-contain p-6 bg-white"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-6">
                  {/* Image */}
                  <div className="relative w-full aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={reason.image}
                      alt={reason.alt}
                      fill
                      className="object-contain p-6 bg-white"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="inline-flex w-8 h-8 rounded-full bg-accent/10 items-center justify-center mb-4">
                      <span className="text-accent font-bold text-sm">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-navy-darker mb-3 leading-tight">
                      {reason.title}
                    </h3>
                    <p className="text-base text-gray-blue leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>

                {/* Decorative separator (except for last item) */}
                {index < reasons.length - 1 && (
                  <div className="absolute -bottom-8 md:-bottom-10 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-accent/30 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
