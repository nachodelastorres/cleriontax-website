"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

export default function ComparisonTable() {
  const t = useTranslations('services.comparison');
  const tPlans = useTranslations('services.plans');

  const planKeys = ['basic', 'advanced', 'premium'] as const;
  const featureKeys = ['transactions', 'exchanges', 'trading', 'staking', 'defi', 'nfts', 'model100', 'model720', 'reviews', 'optimization', 'support'] as const;

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary md:text-4xl mb-4">
            Comparación detallada
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Encuentra el plan que mejor se adapte a tus necesidades
          </p>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:block overflow-x-auto"
        >
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-neutral-100">
                <th className="py-4 px-6 text-left font-semibold text-primary">
                  Características
                </th>
                {planKeys.map((plan, index) => (
                  <th
                    key={plan}
                    className={`py-4 px-6 text-center font-semibold ${
                      index === 1
                        ? "bg-accent text-white"
                        : "text-primary"
                    }`}
                  >
                    {tPlans(`${plan}.name`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureKeys.map((feature, rowIndex) => (
                <tr
                  key={feature}
                  className={rowIndex % 2 === 0 ? "bg-neutral-50" : "bg-white"}
                >
                  <td className="py-4 px-6 font-medium text-neutral-800">
                    {t(`features.${feature}`)}
                  </td>
                  {planKeys.map((plan) => {
                    let value;

                    // Lógica para determinar el valor
                    if (['transactions', 'exchanges', 'reviews', 'optimization', 'support'].includes(feature)) {
                      value = t(`values.${plan}.${feature}`);
                    } else if (['trading', 'model100'].includes(feature)) {
                      value = 'included';
                    } else if (feature === 'staking') {
                      value = plan === 'basic' ? 'not_included' : 'included';
                    } else if (feature === 'defi') {
                      value = plan === 'premium' ? 'included' : 'not_included';
                    } else if (feature === 'nfts') {
                      value = plan === 'premium' ? 'included' : 'not_included';
                    } else if (feature === 'model720') {
                      value = plan === 'basic' ? 'not_included' : 'included';
                    } else {
                      value = 'not_included';
                    }

                    return (
                      <td key={plan} className="py-4 px-6 text-center">
                        {value === "included" ? (
                          <div className="flex justify-center">
                            <Check className="h-5 w-5 text-accent" />
                          </div>
                        ) : value === "not_included" ? (
                          <div className="flex justify-center">
                            <X className="h-5 w-5 text-neutral-300" />
                          </div>
                        ) : (
                          <span className="text-neutral-700">{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {planKeys.map((plan, planIndex) => (
            <motion.div
              key={plan}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: planIndex * 0.1, duration: 0.5 }}
              className={`rounded-lg border-2 ${
                planIndex === 1 ? "border-accent" : "border-neutral-200"
              } bg-white p-6 shadow-md`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  planIndex === 1 ? "text-accent" : "text-primary"
                }`}
              >
                {tPlans(`${plan}.name`)}
              </h3>
              <div className="space-y-3">
                {featureKeys.map((feature) => {
                  let value;

                  if (['transactions', 'exchanges', 'reviews', 'optimization', 'support'].includes(feature)) {
                    value = t(`values.${plan}.${feature}`);
                  } else if (['trading', 'model100'].includes(feature)) {
                    value = 'included';
                  } else if (feature === 'staking') {
                    value = plan === 'basic' ? 'not_included' : 'included';
                  } else if (feature === 'defi') {
                    value = plan === 'premium' ? 'included' : 'not_included';
                  } else if (feature === 'nfts') {
                    value = plan === 'premium' ? 'included' : 'not_included';
                  } else if (feature === 'model720') {
                    value = plan === 'basic' ? 'not_included' : 'included';
                  } else {
                    value = 'not_included';
                  }

                  return (
                    <div
                      key={feature}
                      className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0"
                    >
                      <span className="text-sm text-neutral-700 font-medium">
                        {t(`features.${feature}`)}
                      </span>
                      {value === "included" ? (
                        <Check className="h-5 w-5 text-accent shrink-0" />
                      ) : value === "not_included" ? (
                        <X className="h-5 w-5 text-neutral-300 shrink-0" />
                      ) : (
                        <span className="text-sm text-neutral-600 text-right">
                          {value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
