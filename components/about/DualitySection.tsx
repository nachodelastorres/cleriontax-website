"use client";

import { motion } from "framer-motion";
import { Scale, Cpu, CheckCircle2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

export default function DualitySection() {
  const t = useTranslations('about.duality');

  const fiscalPoints = t.raw('fiscal.points') as string[];
  const techPoints = t.raw('tech.points') as string[];

  return (
    <section className="py-16 md:py-24 bg-navy relative overflow-hidden">

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-blue-light max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Split Magazine Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Fiscal Side - Left */}
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="p-8 md:p-12 h-full bg-white border-r-2 border-accent/30 hover:border-accent/50 transition-all duration-500 rounded-l-2xl">
              {/* Large decorative icon */}
              <div className="absolute top-8 right-8 opacity-5">
                <Scale className="w-64 h-64 text-primary" strokeWidth={0.5} />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Scale className="w-6 h-6 text-primary" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary to-transparent"></div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {t('fiscal.title')}
                  </h3>
                  <p className="text-lg font-semibold text-accent">
                    {t('fiscal.subtitle')}
                  </p>
                </div>

                {/* Description */}
                <p className="text-base text-neutral-700 leading-relaxed mb-8">
                  {t('fiscal.description')}
                </p>

                {/* Points */}
                <div className="space-y-3">
                  {fiscalPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      </div>
                      <p className="text-sm text-neutral-700 leading-relaxed group-hover/item:text-primary transition-colors duration-300">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

          {/* Tech Side - Right */}
          <motion.article
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="p-8 md:p-12 h-full bg-white border-l-2 border-accent/30 hover:border-accent/50 transition-all duration-500 rounded-r-2xl">
              {/* Large decorative icon */}
              <div className="absolute top-8 left-8 opacity-5">
                <Cpu className="w-64 h-64 text-accent" strokeWidth={0.5} />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-l from-accent to-transparent"></div>
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Cpu className="w-6 h-6 text-accent" />
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-accent mb-2 text-right">
                    {t('tech.title')}
                  </h3>
                  <p className="text-lg font-semibold text-primary text-right">
                    {t('tech.subtitle')}
                  </p>
                </div>

                {/* Description */}
                <p className="text-base text-neutral-700 leading-relaxed mb-8 text-right">
                  {t('tech.description')}
                </p>

                {/* Points */}
                <div className="space-y-3">
                  {techPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3 flex-row-reverse group/item"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      </div>
                      <p className="text-sm text-neutral-700 leading-relaxed text-right group-hover/item:text-accent transition-colors duration-300">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </div>

        {/* Center dividing line with icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-20">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">×</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
