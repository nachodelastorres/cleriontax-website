/**
 * WebSite Schema Generator
 * Generates WebSite schema with navigation and search capabilities
 */

import { WithContext } from 'schema-dts';
import type { Locale } from './types';

interface WebSiteSchemaConfig {
  locale: Locale;
  baseUrl?: string;
}

/**
 * Generates the WebSite schema
 * This should be included in the root layout
 */
export function generateWebSiteSchema(
  config: WebSiteSchemaConfig
): WithContext<any> {
  const { locale, baseUrl = 'https://cleriontax.com' } = config;

  // Localized site names
  const names: Record<Locale, string> = {
    es: 'Cleriontax - Asesoría Fiscal en Criptomonedas y DeFi',
    en: 'Cleriontax - Cryptocurrency and DeFi Tax Advisory',
    ca: 'Cleriontax - Assessoria Fiscal en Criptomonedes i DeFi'
  };

  // Localized descriptions
  const descriptions: Record<Locale, string> = {
    es: 'Especialistas en fiscalidad de criptomonedas. Te ayudamos con tu declaración fiscal de Bitcoin, Ethereum y otros criptoactivos en España.',
    en: 'Cryptocurrency tax specialists. We help you with your tax declaration for Bitcoin, Ethereum and other crypto assets in Spain.',
    ca: 'Especialistes en fiscalitat de criptomonedes. T\'ajudem amb la teva declaració fiscal de Bitcoin, Ethereum i altres criptoactius a Espanya.'
  };

  // Navigation elements for SiteNavigationElement
  const navigationLinks: Record<Locale, Array<{ name: string; url: string }>> = {
    es: [
      { name: 'Inicio', url: `${baseUrl}/es` },
      { name: 'Servicios', url: `${baseUrl}/es/servicios` },
      { name: 'Blog', url: `${baseUrl}/es/blog` },
      { name: 'Sobre Nosotros', url: `${baseUrl}/es/sobre-nosotros` },
      { name: 'Contacto', url: `${baseUrl}/es/contacto` }
    ],
    en: [
      { name: 'Home', url: `${baseUrl}/en` },
      { name: 'Services', url: `${baseUrl}/en/servicios` },
      { name: 'Blog', url: `${baseUrl}/en/blog` },
      { name: 'About Us', url: `${baseUrl}/en/sobre-nosotros` },
      { name: 'Contact', url: `${baseUrl}/en/contacto` }
    ],
    ca: [
      { name: 'Inici', url: `${baseUrl}/ca` },
      { name: 'Serveis', url: `${baseUrl}/ca/servicios` },
      { name: 'Blog', url: `${baseUrl}/ca/blog` },
      { name: 'Sobre Nosaltres', url: `${baseUrl}/ca/sobre-nosotros` },
      { name: 'Contacte', url: `${baseUrl}/ca/contacto` }
    ]
  };

  const schema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: names[locale],
    alternateName: 'Cleriontax',
    description: descriptions[locale],
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,

    publisher: {
      '@type': 'ProfessionalService',
      '@id': `${baseUrl}/#organization`
    },

    // Potential search functionality (uncomment when implemented)
    // potentialAction: {
    //   '@type': 'SearchAction',
    //   target: {
    //     '@type': 'EntryPoint',
    //     urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`
    //   },
    //   'query-input': 'required name=search_term_string'
    // },

    // Main navigation
    hasPart: navigationLinks[locale].map((link, index) => ({
      '@type': 'WebPage',
      '@id': `${link.url}#webpage`,
      url: link.url,
      name: link.name,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`
      }
    }))
  };

  return schema;
}

/**
 * Generates a simple WebPage schema for individual pages
 * Use this on specific pages to indicate they're part of the website
 */
export function generateWebPageSchema(config: {
  locale: Locale;
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: any;
  baseUrl?: string;
}): WithContext<any> {
  const { locale, title, description, url, datePublished, dateModified, breadcrumb, baseUrl = 'https://cleriontax.com' } = config;

  const schema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale,

    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`
    },

    about: {
      '@type': 'ProfessionalService',
      '@id': `${baseUrl}/#organization`
    },

    publisher: {
      '@type': 'ProfessionalService',
      '@id': `${baseUrl}/#organization`
    }
  };

  if (datePublished) {
    schema.datePublished = datePublished;
  }

  if (dateModified) {
    schema.dateModified = dateModified;
  }

  if (breadcrumb) {
    schema.breadcrumb = breadcrumb;
  }

  return schema;
}
