/**
 * Organization Schema Generator
 * Generates ProfessionalService schema for Cleriontax
 */

import { WithContext } from 'schema-dts';
import type { Locale } from './types';
import { PAGINAS, rutaPagina } from '@/lib/paginas';
import es from '@/messages/es.json';
import en from '@/messages/en.json';
import ca from '@/messages/ca.json';

const NOMBRES = { es: es.paginas.nombres, en: en.paginas.nombres, ca: ca.paginas.nombres };

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

  // Los siete servicios (lib/paginas.ts), con el nombre del menú y su URL en cada idioma.
  const servicios = PAGINAS.map((p) => ({
    nombre: (NOMBRES[locale] as Record<string, string>)[p.slug],
    url: `${baseUrl}/${locale}${rutaPagina(p.slug, locale)}`,
  }));

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
    serviceType: servicios.map((x) => x.nombre),
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

    parentOrganization: {
      '@type': 'Organization',
      name: 'Benavides Asociados'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleriontax',
      itemListElement: servicios.map((servicio) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: servicio.nombre,
          url: servicio.url,
          provider: { '@id': `${baseUrl}/#organization` }
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
