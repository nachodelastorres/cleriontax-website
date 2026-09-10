/**
 * Service Schema Generator
 * Generates individual Service schemas for service pages
 */

import { WithContext } from 'schema-dts';
import type { Locale } from './types';
import { getOrganizationReference } from './organization';

interface ServiceSchemaConfig {
  locale: Locale;
  serviceName: string;
  description: string;
  serviceType: string;
  url: string;
  image?: string;
  breadcrumb?: any;
  baseUrl?: string;
}

/**
 * Service type mapping for better SEO
 */
const serviceTypeCategories: Record<string, string> = {
  'informe-fiscal-criptomonedas': 'Financial Data Reconciliation Service',
  'declarar-criptomonedas': 'Tax Preparation Service',
  'litigacion-fiscal-criptomonedas': 'Tax Litigation Service',
  'asesoria-fiscal-criptomonedas': 'Tax Advisory Service'
};

/**
 * Generates a detailed Service schema for individual service pages
 * This creates rich snippets with service information, provider, and pricing
 */
export function generateServiceSchema(
  config: ServiceSchemaConfig
): WithContext<any> {
  const {
    locale,
    serviceName,
    description,
    serviceType,
    url,
    image,
    breadcrumb,
    baseUrl = 'https://www.cleriontax.com'
  } = config;

  // Get the appropriate service category
  const serviceCategory = serviceTypeCategories[serviceType] || 'Professional Service';

  // Localized availability text
  const availabilityText: Record<Locale, string> = {
    es: 'Servicio disponible en toda España',
    en: 'Service available throughout Spain',
    ca: 'Servei disponible a tot Espanya'
  };

  const schema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: serviceName,
    description,
    serviceType: serviceCategory,
    url,
    inLanguage: locale,

    provider: getOrganizationReference(baseUrl),

    areaServed: {
      '@type': 'Country',
      name: 'Spain',
      alternateName: 'España'
    },

    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: '+34663482301',
      serviceLocation: {
        '@type': 'Country',
        name: 'Spain'
      }
    },

    // Offer information without specific pricing
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      availabilityStarts: '2024-01-01',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
        price: '0',
        valueAddedTaxIncluded: true
      },
      description: availabilityText[locale],
      itemOffered: {
        '@type': 'Service',
        name: serviceName
      }
    },

    termsOfService: `${baseUrl}/${locale}/legal`,

    // Service features/benefits
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: []
    }
  };

  if (image) {
    schema.image = {
      '@type': 'ImageObject',
      url: image,
      contentUrl: image
    };
  }

  if (breadcrumb) {
    schema.breadcrumb = breadcrumb;
  }

  return schema;
}

/**
 * Generates a more detailed Service schema with specific features
 * Use this for services with clear feature lists
 */
export function generateDetailedServiceSchema(config: {
  locale: Locale;
  serviceName: string;
  description: string;
  serviceType: string;
  url: string;
  features?: string[];
  processingTime?: string;
  image?: string;
  breadcrumb?: any;
  baseUrl?: string;
}): WithContext<any> {
  const baseSchema = generateServiceSchema(config);

  if (config.features && config.features.length > 0) {
    baseSchema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: config.serviceName,
      itemListElement: config.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
          position: index + 1
        }
      }))
    };
  }

  if (config.processingTime) {
    baseSchema.hoursAvailable = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    };

    baseSchema.serviceOutput = {
      '@type': 'Thing',
      name: `${config.serviceName} - Delivery`,
      description: config.processingTime
    };
  }

  return baseSchema;
}

/**
 * Service slug to name mapping for Spanish
 */
/**
 * Las cuatro líneas del manual de marca v1.1, §02.
 * El nombre visible es el que el cliente usa cuando busca el servicio; el
 * método —la reconciliación de carteras— se explica dentro de la página.
 */
export const serviceNames: Record<string, Record<Locale, string>> = {
  'informe-fiscal-criptomonedas': {
    es: 'Informe fiscal de criptomonedas',
    en: 'Cryptocurrency Tax Report',
    ca: 'Informe fiscal de criptomonedes'
  },
  'declarar-criptomonedas': {
    es: 'Declaración de la renta cripto',
    en: 'Crypto Income Tax Return',
    ca: 'Declaració de la renda cripto'
  },
  'litigacion-fiscal-criptomonedas': {
    es: 'Litigación fiscal de criptomonedas',
    en: 'Crypto Tax Litigation',
    ca: 'Litigació fiscal de criptomonedes'
  },
  'asesoria-fiscal-criptomonedas': {
    es: 'Asesoría fiscal de criptomonedas',
    en: 'Cryptocurrency Tax Advisory',
    ca: 'Assessoria fiscal de criptomonedes'
  }
};

/**
 * Gets the localized service name for a given slug
 */
export function getServiceName(slug: string, locale: Locale): string {
  return serviceNames[slug]?.[locale] || slug;
}
