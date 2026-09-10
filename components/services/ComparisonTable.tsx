"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

export default function ComparisonTable() {
  const t = useTranslations('services.comparison');
  const tPlans = useTranslations('services.plans');

  const planKeys = ['basic', 'advanced', 'premium'] as const;
  const featureKeys = ['transactions', 'exchanges', 'trading', 'staking', 'defi', 'nfts', 'model100', 'model720', 'reviews', 'optimization', 'support'] as const;

  return (
    <section className="py-16 md:py-24 bg-blanco">
      <Container>
        <div
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-azul md:text-4xl mb-4">
            Comparación detallada
          </h2>
          <p className="text-lg text-pizarra max-w-2xl mx-auto">
            Encuentra el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        {/* Desktop Table */}
        <div
          className="hidden md:block overflow-x-auto"
        >
          <table className="w-full border-collapse bg-blanco overflow-hidden">
            <thead>
              <tr className="bg-papel">
                <th className="py-4 px-6 text-left font-semibold text-azul">
                  Características
                </th>
                {planKeys.map((plan, index) => (
                  <th
                    key={plan}
                    className={`py-4 px-6 text-center font-semibold ${
 index === 1
 ? "bg-rojo text-blanco"
 : "text-azul"
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
                  className={rowIndex % 2 === 0 ? "bg-papel" : "bg-blanco"}
                >
                  <td className="py-4 px-6 font-medium text-azul">
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
                            <Check className="h-5 w-5 text-rojo" />
                          </div>
                        ) : value === "not_included" ? (
                          <div className="flex justify-center">
                            <X className="h-5 w-5 text-niebla" />
                          </div>
                        ) : (
                          <span className="text-pizarra">{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {planKeys.map((plan, planIndex) => (
            <div
              key={plan}
              className={` border-2 ${
 planIndex === 1 ? "border-rojo" : "border-niebla"
 } bg-blanco p-6 `}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
 planIndex === 1 ? "text-rojo" : "text-azul"
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
                      className="flex items-center justify-between py-2 border-b border-papel last:border-0"
                    >
                      <span className="text-sm text-pizarra font-medium">
                        {t(`features.${feature}`)}
                      </span>
                      {value === "included" ? (
                        <Check className="h-5 w-5 text-rojo shrink-0" />
                      ) : value === "not_included" ? (
                        <X className="h-5 w-5 text-niebla shrink-0" />
                      ) : (
                        <span className="text-sm text-pizarra text-right">
                          {value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
