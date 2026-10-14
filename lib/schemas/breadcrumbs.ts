/**
 * BreadcrumbList Schema Generator
 * Dynamically generates breadcrumb structured data based on URL path
 */

import { WithContext } from 'schema-dts';
import type { Locale, BreadcrumbItem } from './types';

interface BreadcrumbConfig {
  locale: Locale;
  path: string; // e.g., '/es/informe-fiscal-criptomonedas'
  customLabels?: Record<string, string>; // Custom labels for specific paths
  baseUrl?: string;
}

/**
 * Default labels for common path segments by locale
 */
const defaultLabels: Record<Locale, Record<string, string>> = {
  es: {
    'servicios': 'Servicios',
    'blog': 'Blog',
    'sobre-nosotros': 'Sobre Nosotros',
    'contacto': 'Contacto',
    'precios': 'Precios',
    'despachos': 'Despachos',
    'informe-fiscal-criptomonedas': 'Informe fiscal de criptomonedas',
    'declarar-criptomonedas': 'Declaración de la renta cripto',
    'litigacion-fiscal-criptomonedas': 'Litigación fiscal de criptomonedas',
    'asesoria-fiscal-criptomonedas': 'Asesoría fiscal de criptomonedas'
  },
  en: {
    'servicios': 'Services',
    'blog': 'Blog',
    'sobre-nosotros': 'About Us',
    'contacto': 'Contact',
    'pricing': 'Pricing',
    'about-us': 'About Us',
    'contact': 'Contact',
    'for-advisory-firms': 'For advisory firms',
    'informe-fiscal-criptomonedas': 'Cryptocurrency Tax Report',
    'declarar-criptomonedas': 'Crypto Income Tax Return',
    'litigacion-fiscal-criptomonedas': 'Crypto Tax Litigation',
    'asesoria-fiscal-criptomonedas': 'Cryptocurrency Tax Advisory'
  },
  ca: {
    'servicios': 'Serveis',
    'blog': 'Blog',
    'sobre-nosotros': 'Sobre Nosaltres',
    'contacto': 'Contacte',
    'preus': 'Preus',
    'sobre-nosaltres': 'Sobre Nosaltres',
    'contacte': 'Contacte',
    'despatxos': 'Despatxos',
    'informe-fiscal-criptomonedas': 'Informe fiscal de criptomonedes',
    'declarar-criptomonedas': 'Declaració de la renda cripto',
    'litigacion-fiscal-criptomonedas': 'Litigació fiscal de criptomonedes',
    'asesoria-fiscal-criptomonedas': 'Assessoria fiscal de criptomonedes'
  }
};

/**
 * Home labels by locale
 */
const homeLabels: Record<Locale, string> = {
  es: 'Inicio',
  en: 'Home',
  ca: 'Inici'
};

/**
 * Generates BreadcrumbList schema from a URL path
 *
 * @example
 * generateBreadcrumbSchema({
 *   locale: 'es',
 *   path: '/es/informe-fiscal-criptomonedas',
 *   baseUrl: 'https://www.cleriontax.com'
 * })
 *
 * Returns:
 * Home > Servicios > Análisis de Carteras
 */
export function generateBreadcrumbSchema(
  config: BreadcrumbConfig
): WithContext<any> {
  const { locale, path, customLabels = {}, baseUrl = 'https://www.cleriontax.com' } = config;

  // Parse the path into segments
  const segments = path.split('/').filter(segment => segment && segment !== locale);

  // Build breadcrumb items
  const items: BreadcrumbItem[] = [];

  // Always start with Home
  items.push({
    name: homeLabels[locale],
    url: `${baseUrl}/${locale}`,
    position: 1
  });

  // Add intermediate segments
  let currentPath = `${baseUrl}/${locale}`;
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Get label from custom labels, default labels, or capitalize segment
    const label = customLabels[segment]
      || defaultLabels[locale][segment]
      || capitalizeSegment(segment);

    items.push({
      name: label,
      url: currentPath,
      position: index + 2
    });
  });

  // Generate schema
  const schema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url
    }))
  };

  return schema;
}

/**
 * Capitalizes and formats a URL segment into a readable label
 * Converts 'informe-fiscal-criptomonedas' to 'Informe Fiscal Criptomonedas'
 */
function capitalizeSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generates breadcrumb schema for blog posts
 * Includes the blog index page in the breadcrumb trail
 *
 * @example
 * generateBlogBreadcrumbSchema({
 *   locale: 'es',
 *   blogSlug: 'fiscalidad-nfts-espana-2025',
 *   blogTitle: 'Fiscalidad de NFTs en España 2025',
 *   baseUrl: 'https://www.cleriontax.com'
 * })
 */
export function generateBlogBreadcrumbSchema(config: {
  locale: Locale;
  blogSlug: string;
  blogTitle: string;
  baseUrl?: string;
}): WithContext<any> {
  const { locale, blogSlug, blogTitle, baseUrl = 'https://www.cleriontax.com' } = config;

  const items: BreadcrumbItem[] = [
    {
      name: homeLabels[locale],
      url: `${baseUrl}/${locale}`,
      position: 1
    },
    {
      name: defaultLabels[locale]['blog'],
      url: `${baseUrl}/${locale}/blog`,
      position: 2
    },
    {
      name: blogTitle,
      url: `${baseUrl}/${locale}/blog/${blogSlug}`,
      position: 3
    }
  ];

  const schema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url
    }))
  };

  return schema;
}

/**
 * Generates breadcrumb schema for service pages
 * Service pages hang directly from home
 *
 * @example
 * generateServiceBreadcrumbSchema({
 *   locale: 'es',
 *   serviceSlug: 'informe-fiscal-criptomonedas',
 *   serviceTitle: 'Análisis de Carteras de Criptomonedas',
 *   baseUrl: 'https://www.cleriontax.com'
 * })
 */
export function generateServiceBreadcrumbSchema(config: {
  locale: Locale;
  serviceSlug: string;
  serviceTitle: string;
  baseUrl?: string;
}): WithContext<any> {
  const { locale, serviceSlug, serviceTitle, baseUrl = 'https://www.cleriontax.com' } = config;

  const items: BreadcrumbItem[] = [
    {
      name: homeLabels[locale],
      url: `${baseUrl}/${locale}`,
      position: 1
    },
    {
      // Las páginas de servicio viven en la raíz (lib/paginas.ts): no hay
      // un nivel intermedio de servicios.
      name: serviceTitle,
      url: `${baseUrl}/${locale}/${serviceSlug}`,
      position: 2
    }
  ];

  const schema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url
    }))
  };

  return schema;
}
