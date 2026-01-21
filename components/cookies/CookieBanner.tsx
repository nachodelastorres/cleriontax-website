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
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
          <button
            onClick={closeSettings}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            aria-label={t('close')}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <Settings className="h-5 w-5 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('settingsTitle')}</h2>
            </div>
            <p className="text-sm text-gray-600">{t('settingsDescription')}</p>
          </div>

          <div className="space-y-4">
            {/* Necessary Cookies - Always enabled */}
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-navy">{t('categories.necessary.title')}</h3>
                  <p className="text-sm text-gray-500">{t('categories.necessary.description')}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 mr-2">{t('alwaysActive')}</span>
                  <div className="h-6 w-11 rounded-full bg-green-500 p-1">
                    <div className="h-4 w-4 translate-x-5 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-navy">{t('categories.analytics.title')}</h3>
                  <p className="text-sm text-gray-500">{t('categories.analytics.description')}</p>
                </div>
                <button
                  onClick={() => handleCategoryChange('analytics')}
                  className={`h-6 w-11 rounded-full p-1 transition-colors ${
                    selectedCategories.analytics ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  aria-label={t('categories.analytics.title')}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
                      selectedCategories.analytics ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-navy">{t('categories.marketing.title')}</h3>
                  <p className="text-sm text-gray-500">{t('categories.marketing.description')}</p>
                </div>
                <button
                  onClick={() => handleCategoryChange('marketing')}
                  className={`h-6 w-11 rounded-full p-1 transition-colors ${
                    selectedCategories.marketing ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  aria-label={t('categories.marketing.title')}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
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
              className="flex-1 rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-darker"
            >
              {t('savePreferences')}
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 rounded-lg border border-navy px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy/5"
            >
              {t('acceptAll')}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link href="/cookies" className="text-xs text-gray-500 underline hover:text-navy">
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main Banner
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gray-200 bg-white p-4 shadow-lg sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3 lg:flex-1">
            <Cookie className="mt-0.5 h-6 w-6 flex-shrink-0 text-navy" />
            <div>
              <h2 className="mb-1 font-semibold text-navy">{t('title')}</h2>
              <p className="text-sm text-gray-600">
                {t('description')}{' '}
                <Link href="/cookies" className="text-navy underline hover:text-navy-darker">
                  {t('learnMore')}
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:flex-shrink-0">
            <button
              onClick={openSettings}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Settings className="h-4 w-4" />
              {t('settings')}
            </button>
            <button
              onClick={rejectAll}
              className="rounded-lg border border-navy px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy/5"
            >
              {t('rejectAll')}
            </button>
            <button
              onClick={acceptAll}
              className="rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-darker"
            >
              {t('acceptAll')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
