"use client";

import { useTranslations } from 'next-intl';
import { FileText, Building2, Target, Copyright, AlertTriangle, ExternalLink, RefreshCw, Scale, Mail } from 'lucide-react';

export default function LegalNoticePageClient() {
  const t = useTranslations('legalNotice.page');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <div className="flex items-center gap-2 text-gray-300">
            <FileText className="h-5 w-5" />
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
          {/* Identification */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.identification.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.identification.content')}
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li><strong>{t('sections.identification.details.owner')}</strong></li>
                <li>{t('sections.identification.details.cif')}</li>
                <li>{t('sections.identification.details.address')}</li>
                <li>{t('sections.identification.details.email')}</li>
                <li>{t('sections.identification.details.activity')}</li>
              </ul>
            </div>
          </section>

          {/* Purpose */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.purpose.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.purpose.content')}
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Copyright className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.intellectualProperty.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.intellectualProperty.content')}
            </p>
            <p className="text-red-700 bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
              {t('sections.intellectualProperty.prohibition')}
            </p>
          </section>

          {/* Liability */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.liability.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.liability.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('sections.liability.items.availability')}</li>
              <li>{t('sections.liability.items.accuracy')}</li>
              <li>{t('sections.liability.items.thirdParty')}</li>
              <li>{t('sections.liability.items.links')}</li>
            </ul>
            <p className="text-gray-600 italic mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              {t('sections.liability.disclaimer')}
            </p>
          </section>

          {/* Links */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <ExternalLink className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.links.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.links.content')}
            </p>
          </section>

          {/* Modifications */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.modifications.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.modifications.content')}
            </p>
          </section>

          {/* Jurisdiction */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.jurisdiction.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.jurisdiction.content')}
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
