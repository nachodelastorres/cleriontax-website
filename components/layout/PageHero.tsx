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
    <section className={`pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-neutral-50 to-white ${className}`}>
      <Container>
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-5xl lg:text-6xl leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-neutral-600 md:text-xl leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
              <span className="text-sm font-medium text-primary-700">✓ {t('trustIndicators.freeAnalysis')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10">
              <span className="text-sm font-medium text-accent-dark">✓ {t('trustIndicators.certifiedAdvisors')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
              <span className="text-sm font-medium text-primary-700">✓ {t('trustIndicators.supportedExchanges')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

