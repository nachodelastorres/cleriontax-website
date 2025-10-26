"use client";

import { motion } from "framer-motion";
import { Database, Calculator, TrendingUp, Users } from "lucide-react";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

const icons = [Database, Calculator, TrendingUp, Users];
const colors = [
  { gradient: "from-primary-600 to-accent", text: "text-primary-600" },
  { gradient: "from-accent to-accent-dark", text: "text-accent" },
  { gradient: "from-primary-700 to-primary-500", text: "text-primary-700" },
  { gradient: "from-accent-dark to-primary", text: "text-accent-dark" },
];

export default function ServicesGrid() {
  const t = useTranslations('services.offerings');

  const serviceKeys = ['dataAnalysis', 'taxCalculations', 'optimization', 'advisory'] as const;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50/10 to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-4xl mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {serviceKeys.map((key, index) => {
            const Icon = icons[index];
            const color = colors[index];

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative group"
              >
                {/* Magazine-style card */}
                <div className="relative h-full">
                  {/* Huge background number */}
                  <div className="absolute -top-8 -left-4 opacity-5 select-none pointer-events-none z-0">
                    <span className={`text-[200px] font-bold bg-gradient-to-br ${color.gradient} bg-clip-text text-transparent leading-none`}>
                      {t(`items.${key}.number`)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Icon with gradient border */}
                    <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${color.gradient} p-0.5 shadow-lg shadow-accent/10 mb-6 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-accent/20 transition-all duration-500`}>
                      <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center relative overflow-hidden">
                        <Icon className={`h-7 w-7 ${color.text} relative z-10 transition-transform duration-500 group-hover:scale-110`} />

                        {/* Pulse effect on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      </div>
                    </div>

                    {/* Number badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xl font-bold bg-gradient-to-r ${color.gradient} bg-clip-text text-transparent`}>
                        {t(`items.${key}.number`)}
                      </span>
                      <div className={`h-px flex-1 bg-gradient-to-r ${color.gradient} opacity-30`}></div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent mb-4 leading-tight">
                      {t(`items.${key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-neutral-600 leading-relaxed mb-6 flex-1">
                      {t(`items.${key}.description`)}
                    </p>

                    {/* Keywords badge (SEO) */}
                    <div className="flex flex-wrap gap-2">
                      {t(`items.${key}.keywords`).split(', ').map((keyword, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full border border-primary-100"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl pointer-events-none`}></div>

                    {/* Border on hover */}
                    <div className={`absolute inset-0 border-2 border-transparent group-hover:border-accent/20 rounded-2xl transition-all duration-500 pointer-events-none`}></div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
