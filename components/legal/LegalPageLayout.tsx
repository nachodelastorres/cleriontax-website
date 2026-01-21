"use client";

import { useTranslations } from 'next-intl';

interface LegalSection {
  title: string;
  content: string;
  items?: Record<string, string>;
  details?: Record<string, string>;
  browsers?: Record<string, string>;
  services?: Record<string, string>;
  prohibition?: string;
  disclaimer?: string;
  howTo?: string;
  warning?: string;
  examples?: string;
}

interface LegalPageLayoutProps {
  translationKey: string;
  sections: string[];
  lastUpdated?: string;
}

export default function LegalPageLayout({
  translationKey,
  sections,
  lastUpdated = "2024-12-01"
}: LegalPageLayoutProps) {
  const t = useTranslations(translationKey);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-gray-300">
            {t('lastUpdated')}: {lastUpdated}
          </p>
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
          {sections.map((sectionKey) => (
            <Section
              key={sectionKey}
              t={t}
              sectionKey={sectionKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ t, sectionKey }: { t: ReturnType<typeof useTranslations>; sectionKey: string }) {
  const title = t(`sections.${sectionKey}.title`);
  const content = t(`sections.${sectionKey}.content`);

  // Try to get optional fields
  let items: Record<string, string> | null = null;
  let details: Record<string, string> | null = null;
  let browsers: Record<string, string> | null = null;
  let services: Record<string, string> | null = null;
  let prohibition: string | null = null;
  let disclaimer: string | null = null;
  let howTo: string | null = null;
  let warning: string | null = null;

  try {
    // Check for items
    const itemKeys = ['contact', 'financial', 'navigation', 'communications',
                      'services', 'communication', 'legal', 'marketing', 'improvement',
                      'consent', 'contract', 'interest',
                      'access', 'rectification', 'erasure', 'restriction', 'portability', 'objection', 'withdraw',
                      'availability', 'accuracy', 'thirdParty', 'links'];

    for (const key of itemKeys) {
      try {
        const value = t.raw(`sections.${sectionKey}.items.${key}`);
        if (value) {
          if (!items) items = {};
          items[key] = String(value);
        }
      } catch {}
    }

    // Check for details
    const detailKeys = ['company', 'address', 'email', 'cif', 'owner', 'activity'];
    for (const key of detailKeys) {
      try {
        const value = t.raw(`sections.${sectionKey}.details.${key}`);
        if (value) {
          if (!details) details = {};
          details[key] = String(value);
        }
      } catch {}
    }

    // Check for browsers
    const browserKeys = ['chrome', 'firefox', 'safari', 'edge'];
    for (const key of browserKeys) {
      try {
        const value = t.raw(`sections.${sectionKey}.browsers.${key}`);
        if (value) {
          if (!browsers) browsers = {};
          browsers[key] = String(value);
        }
      } catch {}
    }

    // Check for services
    try {
      const ahrefsValue = t.raw(`sections.${sectionKey}.services.ahrefs`);
      if (ahrefsValue) {
        services = { ahrefs: String(ahrefsValue) };
      }
    } catch {}

    // Check for prohibition
    try {
      prohibition = t(`sections.${sectionKey}.prohibition`);
    } catch {}

    // Check for disclaimer
    try {
      disclaimer = t(`sections.${sectionKey}.disclaimer`);
    } catch {}

    // Check for howTo
    try {
      howTo = t(`sections.${sectionKey}.howTo`);
    } catch {}

    // Check for warning
    try {
      warning = t(`sections.${sectionKey}.warning`);
    } catch {}

  } catch {}

  return (
    <section className="border-b border-gray-200 pb-8 last:border-b-0">
      <h2 className="text-xl font-semibold text-navy mb-4">{title}</h2>
      <p className="text-gray-700 leading-relaxed mb-4">{content}</p>

      {details && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <ul className="space-y-2">
            {Object.entries(details).map(([key, value]) => (
              <li key={key} className="text-gray-700">{value}</li>
            ))}
          </ul>
        </div>
      )}

      {items && (
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          {Object.entries(items).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      )}

      {browsers && (
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
          {Object.entries(browsers).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      )}

      {services && (
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
          {Object.entries(services).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      )}

      {prohibition && (
        <p className="text-gray-700 leading-relaxed mt-4">{prohibition}</p>
      )}

      {disclaimer && (
        <p className="text-gray-600 italic mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          {disclaimer}
        </p>
      )}

      {howTo && (
        <p className="text-gray-700 leading-relaxed mt-4 bg-blue-50 p-4 rounded-lg">
          {howTo}
        </p>
      )}

      {warning && (
        <p className="text-amber-700 mt-4 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
          {warning}
        </p>
      )}
    </section>
  );
}
