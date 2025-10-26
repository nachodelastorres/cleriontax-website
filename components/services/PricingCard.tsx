"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import Card from "@/components/ui/Card";
import ButtonLink from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: 'basic' | 'advanced' | 'premium';
  index: number;
}

export default function PricingCard({ plan, index }: PricingCardProps) {
  const t = useTranslations('services.plans');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const popular = plan === 'advanced';

  // Get feature keys based on plan
  const getFeatureKeys = () => {
    if (plan === 'basic') {
      return ['transactions', 'exchanges', 'report', 'calculations', 'model100', 'reviews', 'support'];
    } else if (plan === 'advanced') {
      return ['transactions', 'exchanges', 'report', 'calculations', 'staking', 'models', 'reviews', 'support', 'optimization'];
    } else {
      return ['transactions', 'exchanges', 'report', 'operations', 'defi', 'models', 'reviews', 'advisor', 'optimization', 'support', 'followup'];
    }
  };

  const getNotIncludedKeys = () => {
    if (plan === 'basic') {
      return ['staking', 'defi', 'optimization'];
    } else if (plan === 'advanced') {
      return ['defi', 'nfts'];
    }
    return [];
  };

  const featureKeys = getFeatureKeys();
  const notIncludedKeys = getNotIncludedKeys();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative"
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
            {tCommon('popular')}
          </span>
        </div>
      )}

      <Card
        className={cn(
          "h-full flex flex-col",
          popular && "border-2 border-accent shadow-xl"
        )}
      >
        <div className="space-y-4 pb-6 border-b border-neutral-200">
          <h3 className="text-2xl font-bold text-primary">{t(`${plan}.name`)}</h3>
          <div>
            <div className="text-3xl font-bold text-primary">{t(`${plan}.price`)}</div>
            <p className="text-sm text-neutral-600 mt-1">{t(`${plan}.description`)}</p>
          </div>
        </div>

        <div className="flex-1 pt-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-primary mb-3">{tCommon('included')}:</p>
            <ul className="space-y-2.5">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700 leading-relaxed">
                    {t(`${plan}.features.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {notIncludedKeys.length > 0 && (
            <div className="pt-4">
              <p className="text-sm font-semibold text-neutral-500 mb-3">
                {tCommon('notIncluded')}:
              </p>
              <ul className="space-y-2.5">
                {notIncludedKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2.5">
                    <X className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-500 leading-relaxed">
                      {t(`${plan}.notIncluded.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-neutral-200">
          <ButtonLink
            variant={popular ? "primary" : "outline"}
            size="md"
            href={`/${locale}/contacto`}
            className="w-full"
          >
            {tNav('requestQuote')}
          </ButtonLink>
        </div>
      </Card>
    </motion.div>
  );
}
