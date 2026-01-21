"use client";

import { useTranslations } from 'next-intl';
import { Cookie, Shield, Settings, BarChart3, Megaphone, Globe, RefreshCw, Mail } from 'lucide-react';

export default function CookiesPageClient() {
  const t = useTranslations('cookies.page');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <div className="flex items-center gap-2 text-gray-300">
            <Cookie className="h-5 w-5" />
            <p>{t('lastUpdated')}: 2024-12-01</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          {t('intro')}
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {/* What are cookies */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Cookie className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.whatAreCookies.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.whatAreCookies.content')}
            </p>
          </section>

          {/* Types of cookies */}
          <section className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-navy mb-6">{t('sections.typesOfCookies.title')}</h2>

            <div className="space-y-6">
              {/* Necessary */}
              <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">{t('sections.typesOfCookies.necessary.title')}</h3>
                </div>
                <p className="text-green-700 mb-2">{t('sections.typesOfCookies.necessary.description')}</p>
                <p className="text-sm text-green-600 italic">{t('sections.typesOfCookies.necessary.examples')}</p>
              </div>

              {/* Analytics */}
              <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">{t('sections.typesOfCookies.analytics.title')}</h3>
                </div>
                <p className="text-blue-700 mb-2">{t('sections.typesOfCookies.analytics.description')}</p>
                <p className="text-sm text-blue-600 italic">{t('sections.typesOfCookies.analytics.examples')}</p>
              </div>

              {/* Marketing */}
              <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <Megaphone className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-800">{t('sections.typesOfCookies.marketing.title')}</h3>
                </div>
                <p className="text-purple-700 mb-2">{t('sections.typesOfCookies.marketing.description')}</p>
                <p className="text-sm text-purple-600 italic">{t('sections.typesOfCookies.marketing.examples')}</p>
              </div>
            </div>
          </section>

          {/* How to manage */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.howToManage.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.howToManage.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('sections.howToManage.browsers.chrome')}</li>
              <li>{t('sections.howToManage.browsers.firefox')}</li>
              <li>{t('sections.howToManage.browsers.safari')}</li>
              <li>{t('sections.howToManage.browsers.edge')}</li>
            </ul>
            <p className="text-amber-700 mt-4 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              {t('sections.howToManage.warning')}
            </p>
          </section>

          {/* Third party cookies */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.thirdPartyCookies.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.thirdPartyCookies.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('sections.thirdPartyCookies.services.ahrefs')}</li>
            </ul>
          </section>

          {/* Changes */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.changes.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.changes.content')}
            </p>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.contact.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-2">
              {t('sections.contact.content')}
            </p>
            <a
              href={`mailto:${t('sections.contact.email')}`}
              className="text-navy font-semibold hover:underline"
            >
              {t('sections.contact.email')}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
