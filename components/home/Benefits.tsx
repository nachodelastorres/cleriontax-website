"use client";

import { motion } from "framer-motion";
import { Shield, Clock, TrendingUp, Users } from "lucide-react";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

const icons = [Shield, Clock, TrendingUp, Users];
const colors = [
  { text: "text-primary-600", bg: "bg-primary-50", gradient: "from-primary-600 to-accent" },
  { text: "text-accent-600", bg: "bg-accent-50", gradient: "from-accent to-accent-dark" },
  { text: "text-primary-700", bg: "bg-primary-100", gradient: "from-primary-700 to-primary-500" },
  { text: "text-accent", bg: "bg-accent/10", gradient: "from-accent-dark to-primary" },
];

export default function Benefits() {
  const t = useTranslations('benefits');

  const benefitKeys = ['precision', 'time', 'optimization', 'support'] as const;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary-50/20 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-4xl mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central vertical line with gradient */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-accent/30 via-accent/60 to-accent/30 hidden md:block">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent to-primary blur-sm opacity-40"></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {benefitKeys.map((key, index) => {
              const Icon = icons[index];
              const color = colors[index];
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative"
                >
                  <div className={`md:grid md:grid-cols-2 md:gap-8 ${isLeft ? '' : 'md:grid-flow-dense'}`}>
                    {/* Content */}
                    <div className={`${isLeft ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'} group`}>
                      {/* Number badge */}
                      <div className={`inline-flex items-center gap-2 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-sm font-bold bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                          0{index + 1}
                        </span>
                        <div className={`h-px w-8 bg-gradient-to-r ${color.gradient}`}></div>
                      </div>

                      <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent mb-3">
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className="text-base text-neutral-600 leading-relaxed">
                        {t(`items.${key}.description`)}
                      </p>

                      {/* Decorative glow on hover */}
                      <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full bg-gradient-to-b ${color.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl hidden md:block`}></div>
                    </div>

                    {/* Icon - centered on timeline */}
                    <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${color.gradient} p-0.5 shadow-xl shadow-accent/20`}
                      >
                        {/* Inner container */}
                        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center relative overflow-hidden group">
                          <Icon className={`h-9 w-9 ${color.text} relative z-10 transition-transform duration-500 group-hover:scale-110`} />

                          {/* Pulse effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Outer glow */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color.gradient} blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`}></div>
                      </motion.div>
                    </div>

                    {/* Mobile Icon */}
                    <div className="md:hidden mb-4">
                      <div className={`inline-flex w-16 h-16 rounded-xl bg-gradient-to-br ${color.gradient} p-0.5 shadow-lg shadow-accent/20`}>
                        <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                          <Icon className={`h-7 w-7 ${color.text}`} />
                        </div>
                      </div>
                    </div>
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
