"use client";

import { motion } from "framer-motion";
import { Search, Eraser, Calculator, PackageCheck } from "lucide-react";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

const icons = [Search, Eraser, Calculator, PackageCheck];
const images = [
  '/images/illustrations/5.png',
  '/images/illustrations/6.png',
  '/images/illustrations/7.png',
  '/images/illustrations/8.png',
];
const colors = [
  { text: "text-primary-600", bg: "bg-primary-50" },
  { text: "text-accent-600", bg: "bg-accent-50" },
  { text: "text-primary-700", bg: "bg-primary-100" },
  { text: "text-accent", bg: "bg-accent/10" },
];

export default function ServiceSteps() {
  const t = useTranslations('process');

  const stepKeys = ['diagnosis', 'cleaning', 'calculation', 'delivery'] as const;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50/20 to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-4xl mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-20">
          {stepKeys.map((key, index) => {
            const Icon = icons[index];
            const color = colors[index];
            const imageSrc = images[index];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Floating illustration - above card, full width */}
                <div className="absolute -top-20 left-0 right-0 h-40 z-[5]">
                  <motion.div
                    className="relative w-full h-full px-6"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image */}
                    <img
                      src={imageSrc}
                      alt={t(`steps.${key}.title`)}
                      className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_20px_40px_rgba(212,165,116,0.3)]"
                    />

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
                  </motion.div>
                </div>

                {/* Step number badge - outside card to stay on top */}
                <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark text-white flex items-center justify-center text-base font-bold shadow-xl z-[30]">
                  {t(`steps.${key}.number`)}
                </div>

                <Card hover className="h-full relative overflow-visible group pt-24">

                  {/* Content */}
                  <div className="relative space-y-4">
                    {/* Icon with premium effect */}
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${color.bg} relative overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/20`}
                    >
                      <Icon className={`h-6 w-6 ${color.text} relative z-10 transition-transform duration-500 group-hover:scale-110`} />
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent mb-2">
                        {t(`steps.${key}.title`)}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {t(`steps.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
