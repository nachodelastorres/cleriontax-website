"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

const images = [
  '/images/illustrations/9.png',
  '/images/illustrations/11.png',
  '/images/illustrations/10.png',
  '/images/illustrations/7.png',
];

export default function WhyDifferent() {
  const t = useTranslations('about.why');

  const itemKeys = ['noOldSchool', 'noBlackBox', 'speed', 'scalable'] as const;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50/20 to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Magazine Grid - Asymmetric without numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {itemKeys.map((key, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`relative group ${
                index === 1 || index === 2 ? 'md:translate-y-12' : ''
              }`}
            >
              <div className="relative h-full p-8 md:p-10 bg-gradient-to-br from-white to-primary-50/20 rounded-2xl border border-neutral-200/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10">
                {/* Content */}
                <div className="relative z-10">
                  {/* Image with decorative gradient background */}
                  <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-2xl blur-2xl"></div>
                    <div className="relative w-40 h-40 mx-auto md:mx-0">
                      <motion.img
                        src={images[index]}
                        alt={t(`items.${key}.title`)}
                        className="w-full h-full object-contain drop-shadow-2xl"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Title with decorative line */}
                  <div className="mb-6">
                    <div className="h-1 w-16 bg-gradient-to-r from-accent to-accent-dark rounded-full mb-4"></div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 leading-tight">
                      {t(`items.${key}.title`)}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                    {t(`items.${key}.description`)}
                  </p>

                  {/* Keywords badges (SEO) */}
                  <div className="flex flex-wrap gap-2">
                    {t(`items.${key}.keywords`).split(', ').map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-medium text-accent-dark bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 hover:scale-105 transition-all duration-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
