"use client";

import { useTranslations } from 'next-intl';
import { FileText, TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";

interface BlogHeroProps {
  postsCount: number;
  categoriesCount: number;
}

export default function BlogHero({ postsCount, categoriesCount }: BlogHeroProps) {
  const t = useTranslations('blog.hero');

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-accent/20 mb-4">
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold text-primary uppercase tracking-wide">
              {t('badge')}
            </span>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-5xl lg:text-6xl">
            {t('title')}
          </h1>

          <p className="text-lg text-neutral-600 md:text-xl leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-primary">{postsCount}</div>
                <div className="text-sm text-neutral-600">{t('stats.articles')}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-accent">{categoriesCount}</div>
                <div className="text-sm text-neutral-600">{t('stats.categories')}</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

