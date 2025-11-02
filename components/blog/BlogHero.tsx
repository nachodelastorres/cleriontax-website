"use client";

import { useTranslations } from 'next-intl';
import { FileText, TrendingUp } from "lucide-react";
import Image from 'next/image';

interface BlogHeroProps {
  postsCount: number;
  categoriesCount: number;
}

export default function BlogHero({ postsCount, categoriesCount }: BlogHeroProps) {
  const t = useTranslations('blog.hero');

  return (
    <section
      id="hero-blog"
      className="relative min-h-[600px] md:min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8F9FA] to-white"
    >
      {/* Background Pattern/Image */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(27,32,66,0.08),_transparent_70%)]">
        <div className="absolute inset-0 opacity-[0.25]">
          <Image
            src="/images/illustrations/blog-fiscalidad-cripto.webp"
            alt="Blog sobre fiscalidad de criptomonedas y activos digitales - Cleriontax"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center space-y-6 md:space-y-8">

        {/* Badge */}
        <div
          className="inline-flex flex-col items-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          <span className="text-xs font-semibold text-navy tracking-wider uppercase">
            {t('badge')}
          </span>
          <div className="w-24 h-[2px] bg-red" />
        </div>

        {/* Main Title (H1) */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-navy leading-tight tracking-tight max-w-4xl animate-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          {t('title')}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-gray-blue max-w-3xl leading-relaxed animate-fade-in"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          {t('subtitle')}
        </p>

        {/* Stats */}
        <div
          className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in"
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
              <FileText className="w-6 h-6 text-navy" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-navy">{postsCount}</div>
              <div className="text-sm text-gray-blue">{t('stats.articles')}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-accent">{categoriesCount}</div>
              <div className="text-sm text-gray-blue">{t('stats.categories')}</div>
            </div>
          </div>
        </div>

        {/* SEO Additional Text - Visually Hidden but Crawlable */}
        <div className="sr-only" aria-hidden="true">
          <p>
            Blog de Cleriontax sobre fiscalidad de criptomonedas en España. Guías completas sobre declaración IRPF crypto,
            modelo 100 Bitcoin, modelo 720 y 721, optimización fiscal de activos digitales, y actualidad normativa AEAT.
            Artículos escritos por asesores fiscales colegiados expertos en blockchain, DeFi, NFTs y criptoactivos.
            Aprende sobre impuestos de criptomonedas, ganancias patrimoniales, staking, trading y minería crypto.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-navy/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}

