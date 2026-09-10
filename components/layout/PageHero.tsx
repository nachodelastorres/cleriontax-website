"use client";

import { useTranslations } from 'next-intl';
import Container from "@/components/ui/Container";

interface PageHeroProps {
  namespace: string;
  className?: string;
}

export default function PageHero({ namespace, className = "" }: PageHeroProps) {
  const t = useTranslations(namespace);

  return (
    <section className={`pt-24 pb-16 md:pt-32 md:pb-20 bg-papel ${className}`}>
      <Container>
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-azul md:text-5xl lg:text-6xl leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-pizarra md:text-xl leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-azul/5 border border-azul/10">
              <span className="text-sm font-medium text-azul">✓ {t('trustIndicators.freeAnalysis')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-rojo/5 border border-rojo/10">
              <span className="text-sm font-medium text-rojo">✓ {t('trustIndicators.certifiedAdvisors')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-azul/5 border border-azul/10">
              <span className="text-sm font-medium text-azul">✓ {t('trustIndicators.supportedExchanges')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

