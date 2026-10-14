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
  'informe-fiscal-criptomonedas': 'Cryptocurrency Tax Report',
  'revisar-informe-koinly-cointracking': 'Crypto Tax Report Review',
  'requerimiento-hacienda-criptomonedas': 'Tax Authority Request Response',
  'inspeccion-hacienda-criptomonedas': 'Tax Audit Defense',
  'regularizar-criptomonedas': 'Tax Regularization',
  'declarar-criptomonedas': 'Tax Preparation Service',
  'modelo-721-criptomonedas': 'Foreign Crypto Assets Information Return'
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

    // Sin «offers» aquí: un precio 0 decía que el servicio era gratis. La
    // página añade un AggregateOffer real solo cuando se cotiza por tramos.
    termsOfService: `${baseUrl}/${locale}/aviso-legal`,
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
    en: 'Crypto tax report',
    ca: 'Informe fiscal de criptomonedes'
  },
  'declarar-criptomonedas': {
    es: 'Declaración de la renta cripto',
    en: 'Crypto income tax return',
    ca: 'Declaració de la renda cripto'
  },
  'litigacion-fiscal-criptomonedas': {
    es: 'Litigación fiscal de criptomonedas',
    en: 'Crypto tax litigation',
    ca: 'Litigació fiscal de criptomonedes'
  },
  'asesoria-fiscal-criptomonedas': {
    es: 'Asesoría fiscal de criptomonedas',
    en: 'Crypto tax advisory',
    ca: 'Assessoria fiscal de criptomonedes'
  }
};

/**
 * Gets the localized service name for a given slug
 */
export function getServiceName(slug: string, locale: Locale): string {
  return serviceNames[slug]?.[locale] || slug;
}
