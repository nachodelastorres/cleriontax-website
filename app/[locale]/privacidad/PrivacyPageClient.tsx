"use client";

import { useTranslations } from 'next-intl';
import { Shield, Building2, Database, Target, Scale, Clock, UserCheck, Lock, Users, RefreshCw, Mail } from 'lucide-react';

export default function PrivacyPageClient() {
  const t = useTranslations('privacy.page');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <div className="flex items-center gap-2 text-gray-300">
            <Shield className="h-5 w-5" />
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
          {/* Data Controller */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.controller.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.controller.content')}
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li><strong>{t('sections.controller.details.company')}</strong></li>
                <li>{t('sections.controller.details.address')}</li>
                <li>{t('sections.controller.details.email')}</li>
                <li>{t('sections.controller.details.cif')}</li>
              </ul>
            </div>
          </section>

          {/* Data Collected */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.dataCollected.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.dataCollected.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('sections.dataCollected.items.contact')}</li>
              <li>{t('sections.dataCollected.items.financial')}</li>
              <li>{t('sections.dataCollected.items.navigation')}</li>
              <li>{t('sections.dataCollected.items.communications')}</li>
            </ul>
          </section>

          {/* Purposes */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.purposes.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.purposes.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('sections.purposes.items.services')}</li>
              <li>{t('sections.purposes.items.communication')}</li>
              <li>{t('sections.purposes.items.legal')}</li>
              <li>{t('sections.purposes.items.marketing')}</li>
              <li>{t('sections.purposes.items.improvement')}</li>
            </ul>
          </section>

          {/* Legal Basis */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.legalBasis.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.legalBasis.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('sections.legalBasis.items.consent')}</li>
              <li>{t('sections.legalBasis.items.contract')}</li>
              <li>{t('sections.legalBasis.items.legal')}</li>
              <li>{t('sections.legalBasis.items.interest')}</li>
            </ul>
          </section>

          {/* Retention */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.retention.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.retention.content')}
            </p>
          </section>

          {/* Rights */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.rights.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.rights.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('sections.rights.items.access')}</li>
              <li>{t('sections.rights.items.rectification')}</li>
              <li>{t('sections.rights.items.erasure')}</li>
              <li>{t('sections.rights.items.restriction')}</li>
              <li>{t('sections.rights.items.portability')}</li>
              <li>{t('sections.rights.items.objection')}</li>
              <li>{t('sections.rights.items.withdraw')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4 bg-blue-50 p-4 rounded-lg">
              {t('sections.rights.howTo')}
            </p>
          </section>

          {/* Security */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.security.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.security.content')}
            </p>
          </section>

          {/* Sharing */}
          <section className="border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-navy" />
              <h2 className="text-xl font-semibold text-navy">{t('sections.sharing.title')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.sharing.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>{t('sections.sharing.items.consent')}</li>
              <li>{t('sections.sharing.items.legal')}</li>
              <li>{t('sections.sharing.items.services')}</li>
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
