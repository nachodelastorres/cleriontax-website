/**
 * Organization Schema Generator
 * Generates ProfessionalService schema for Cleriontax
 */

import { WithContext } from 'schema-dts';
import type { Locale } from './types';

interface OrganizationSchemaConfig {
  locale: Locale;
  baseUrl?: string;
}

/**
 * Generates the main Organization/ProfessionalService schema
 * This should be included in the root layout for maximum SEO impact
 */
export function generateOrganizationSchema(
  config: OrganizationSchemaConfig
): WithContext<any> {
  const { locale, baseUrl = 'https://www.cleriontax.com' } = config;

  // Localized descriptions
  const descriptions: Record<Locale, string> = {
    es: 'Asesoría fiscal especializada en criptomonedas, DeFi y carteras complejas. Convertimos miles de transacciones de exchanges, wallets y blockchains en un informe fiscal trazable, con el origen y el criterio de cada cifra.',
    en: 'Tax advisory specialised in crypto, DeFi and complex portfolios. We turn thousands of transactions from exchanges, wallets and blockchains into a traceable tax report, with the source and criterion behind every figure.',
    ca: 'Assessoria fiscal especialitzada en criptomonedes, DeFi i carteres complexes. Convertim milers de transaccions d’exchanges, wallets i blockchains en un informe fiscal traçable, amb l’origen i el criteri de cada xifra.'
  };

  // Las cuatro líneas del manual v1.1, §02.
  const serviceTypes: Record<Locale, string[]> = {
    es: [
      'Informe fiscal de criptomonedas',
      'Declaración de la renta cripto',
      'Litigación fiscal de criptomonedas',
      'Asesoría fiscal de criptomonedas'
    ],
    en: [
      'Crypto tax report',
      'Crypto income tax return',
      'Crypto tax litigation',
      'Crypto tax advisory'
    ],
    ca: [
      'Informe fiscal de criptomonedes',
      'Declaració de la renda cripto',
      'Litigació fiscal de criptomonedes',
      'Assessoria fiscal de criptomonedes'
    ]
  };

  // Knowledge areas - important for SEO
  const knowledgeAreas = [
    'Cryptocurrency Taxation',
    'Bitcoin Tax Reporting',
    'Ethereum Tax Reporting',
    'DeFi Taxation',
    'NFT Taxation',
    'Crypto Mining Taxation',
    'Staking Rewards Taxation',
    'FIFO Methodology',
    'Spanish Tax Law (AEAT)',
    'Model 100 (Income Tax)',
    'Model 720 (Foreign Assets)',
    'Model 721 (Cryptocurrency Reporting)',
    'Model 714 (Wealth Tax)',
    'Data Engineering for Tax Purposes',
    'Blockchain Analysis',
    'Multi-chain Portfolio Analysis'
  ];

  const schema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: 'Cleriontax',
    legalName: 'Cleriontax',
    description: descriptions[locale],
    url: `${baseUrl}/${locale}`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${baseUrl}/#logo`,
      url: `${baseUrl}/images/logos/logo_fondo_transparente.svg`,
      contentUrl: `${baseUrl}/images/logos/logo_fondo_transparente.svg`,
      caption: 'Cleriontax Logo',
      inLanguage: locale,
      width: '500',
      height: '150'
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logos/logo_fondo_transparente.svg`,
      contentUrl: `${baseUrl}/images/logos/logo_fondo_transparente.svg`
    },
    foundingDate: '2024',
    email: 'info@cleriontax.com',
    telephone: '+34663482301',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+34663482301',
      contactType: 'Customer Service',
      email: 'info@cleriontax.com',
      availableLanguage: ['Spanish', 'English', 'Catalan'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Spain'
      }
    },
    areaServed: {
      '@type': 'Country',
      name: 'Spain',
      alternateName: 'España'
    },
    serviceType: serviceTypes[locale],
    priceRange: '$$',
    knowsAbout: knowledgeAreas,
    knowsLanguage: [
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Catalan', alternateName: 'ca' }
    ],
    slogan: locale === 'es'
      ? 'Expertos en fiscalidad de inversiones • Crypto & DeFi'
      : locale === 'en'
      ? 'Investment Tax Experts • Crypto & DeFi'
      : 'Experts en fiscalitat d\'inversions • Crypto & DeFi',

    // Additional properties for better rich snippets
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES'
    },

    // Prepared for future reviews/ratings
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '5',
    //   reviewCount: '0'
    // },

    // Prepared for social media profiles when available
    // sameAs: [
    //   'https://linkedin.com/company/cleriontax',
    //   'https://twitter.com/cleriontax'
    // ],

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceTypes[locale].join(', '),
      itemListElement: serviceTypes[locale].map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
          provider: {
            '@type': 'ProfessionalService',
            '@id': `${baseUrl}/#organization`
          }
        }
      }))
    }
  };

  return schema;
}

/**
 * Simplified Organization schema for embedding in other schemas
 * Use this when you need to reference the organization without full details
 */
export function getOrganizationReference(baseUrl = 'https://www.cleriontax.com') {
  return {
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: 'Cleriontax',
    url: baseUrl
  };
}
