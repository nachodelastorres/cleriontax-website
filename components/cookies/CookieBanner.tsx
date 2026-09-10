"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCookieConsent, CookieConsent } from '@/contexts/CookieConsentContext';
import { X, Settings, Cookie } from 'lucide-react';

export default function CookieBanner() {
  const t = useTranslations('cookies.banner');
  const [isMounted, setIsMounted] = useState(false);
  const {
    showBanner,
    showSettings,
    acceptAll,
    rejectAll,
    acceptSelected,
    openSettings,
    closeSettings,
  } = useCookieConsent();

  const [selectedCategories, setSelectedCategories] = useState<Partial<CookieConsent>>({
    analytics: false,
    marketing: false,
  });

  // Wait for client-side mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || (!showBanner && !showSettings)) return null;

  const handleCategoryChange = (category: 'analytics' | 'marketing') => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSavePreferences = () => {
    acceptSelected(selectedCategories);
  };

  // Settings Modal
  if (showSettings) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto bg-blanco p-6">
          <button
            onClick={closeSettings}
            className="absolute right-4 top-4 text-pizarra hover:text-pizarra"
            aria-label={t('close')}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <Settings className="h-5 w-5 text-azul" />
              <h2 className="text-xl font-semibold text-azul">{t('settingsTitle')}</h2>
            </div>
            <p className="text-sm text-pizarra">{t('settingsDescription')}</p>
          </div>

          <div className="space-y-4">
            {/* Necessary Cookies - Always enabled */}
            <div className="border border-niebla p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-azul">{t('categories.necessary.title')}</h3>
                  <p className="text-sm text-pizarra">{t('categories.necessary.description')}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-pizarra mr-2">{t('alwaysActive')}</span>
                  <div className="h-6 w-11 bg-green-500 p-1">
                    <div className="h-4 w-4 translate-x-5 bg-blanco" />
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-niebla p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-azul">{t('categories.analytics.title')}</h3>
                  <p className="text-sm text-pizarra">{t('categories.analytics.description')}</p>
                </div>
                <button
                  onClick={() => handleCategoryChange('analytics')}
                  className={`h-6 w-11 p-1 transition-colors ${
 selectedCategories.analytics ? 'bg-green-500' : 'bg-niebla'
 }`}
                  aria-label={t('categories.analytics.title')}
                >
                  <div
                    className={`h-4 w-4 bg-blanco transition-transform ${
 selectedCategories.analytics ? 'translate-x-5' : 'translate-x-0'
 }`}
                  />
                </button>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="border border-niebla p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-azul">{t('categories.marketing.title')}</h3>
                  <p className="text-sm text-pizarra">{t('categories.marketing.description')}</p>
                </div>
                <button
                  onClick={() => handleCategoryChange('marketing')}
                  className={`h-6 w-11 p-1 transition-colors ${
 selectedCategories.marketing ? 'bg-green-500' : 'bg-niebla'
 }`}
                  aria-label={t('categories.marketing.title')}
                >
                  <div
                    className={`h-4 w-4 bg-blanco transition-transform ${
 selectedCategories.marketing ? 'translate-x-5' : 'translate-x-0'
 }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleSavePreferences}
              className="flex-1 bg-azul px-4 py-2.5 text-sm font-medium text-blanco transition-colors hover:bg-azul"
            >
              {t('savePreferences')}
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 border border-azul px-4 py-2.5 text-sm font-medium text-azul transition-colors hover:bg-azul/5"
            >
              {t('acceptAll')}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link href="/cookies" className="text-xs text-pizarra underline hover:text-azul">
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main Banner
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-niebla bg-blanco p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3 lg:flex-1">
            <Cookie className="mt-0.5 h-6 w-6 flex-shrink-0 text-azul" />
            <div>
              <h2 className="mb-1 font-semibold text-azul">{t('title')}</h2>
              <p className="text-sm text-pizarra">
                {t('description')}{' '}
                <Link href="/cookies" className="text-azul underline hover:text-azul">
                  {t('learnMore')}
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:flex-shrink-0">
            <button
              onClick={openSettings}
              className="flex items-center justify-center gap-2 border border-niebla px-4 py-2.5 text-sm font-medium text-pizarra transition-colors hover:bg-papel"
            >
              <Settings className="h-4 w-4" />
              {t('settings')}
            </button>
            <button
              onClick={rejectAll}
              className="border border-azul px-4 py-2.5 text-sm font-medium text-azul transition-colors hover:bg-azul/5"
            >
              {t('rejectAll')}
            </button>
            <button
              onClick={acceptAll}
              className="bg-azul px-4 py-2.5 text-sm font-medium text-blanco transition-colors hover:bg-azul"
            >
              {t('acceptAll')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
