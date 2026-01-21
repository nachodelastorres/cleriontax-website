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
  'analisis-carteras': 'Financial Advisory Service',
  'liquidaciones-fiscales': 'Tax Preparation Service',
  'seguimiento-cartera': 'Financial Monitoring Service',
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
export const serviceNames: Record<string, Record<Locale, string>> = {
  'analisis-carteras': {
    es: 'Análisis de Carteras de Criptomonedas',
    en: 'Cryptocurrency Portfolio Analysis',
    ca: 'Anàlisi de Carteres de Criptomonedes'
  },
  'liquidaciones-fiscales': {
    es: 'Liquidaciones Fiscales y Modelos AEAT',
    en: 'Tax Settlements and AEAT Forms',
    ca: 'Liquidacions Fiscals i Models AEAT'
  },
  'seguimiento-cartera': {
    es: 'Seguimiento de Cartera en Tiempo Real',
    en: 'Real-Time Portfolio Tracking',
    ca: 'Seguiment de Cartera en Temps Real'
  },
  'asesoria-fiscal-criptomonedas': {
    es: 'Asesoría Fiscal Especializada en Criptoactivos',
    en: 'Specialized Tax Advisory for Crypto Assets',
    ca: 'Assessoria Fiscal Especialitzada en Criptoactius'
  }
};

/**
 * Gets the localized service name for a given slug
 */
export function getServiceName(slug: string, locale: Locale): string {
  return serviceNames[slug]?.[locale] || slug;
}
