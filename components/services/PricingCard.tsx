"use client";

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
    <div
      className="relative"
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-rojo text-blanco px-4 py-1 text-sm font-medium">
            {tCommon('popular')}
          </span>
        </div>
      )}

      <Card
        className={cn(
          "h-full flex flex-col",
          popular && "border-2 border-rojo "
        )}
      >
        <div className="space-y-4 pb-6 border-b border-niebla">
          <h3 className="text-2xl font-bold text-azul">{t(`${plan}.name`)}</h3>
          <div>
            <div className="text-3xl font-bold text-azul">{t(`${plan}.price`)}</div>
            <p className="text-sm text-pizarra mt-1">{t(`${plan}.description`)}</p>
          </div>
        </div>

        <div className="flex-1 pt-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-azul mb-3">{tCommon('included')}:</p>
            <ul className="space-y-2.5">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <Check className="h-5 w-5 text-rojo shrink-0 mt-0.5" />
                  <span className="text-sm text-pizarra leading-relaxed">
                    {t(`${plan}.features.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {notIncludedKeys.length > 0 && (
            <div className="pt-4">
              <p className="text-sm font-semibold text-pizarra mb-3">
                {tCommon('notIncluded')}:
              </p>
              <ul className="space-y-2.5">
                {notIncludedKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2.5">
                    <X className="h-5 w-5 text-pizarra shrink-0 mt-0.5" />
                    <span className="text-sm text-pizarra leading-relaxed">
                      {t(`${plan}.notIncluded.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-niebla">
          <ButtonLink
            variant={popular ? "principal" : "secundaria"}
            size="md"
            href="/contacto"
            className="w-full"
          >
            {tNav('requestQuote')}
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}
