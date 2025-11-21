/**
 * BreadcrumbList Schema Generator
 * Dynamically generates breadcrumb structured data based on URL path
 */

import { WithContext } from 'schema-dts';
import type { Locale, BreadcrumbItem } from './types';

interface BreadcrumbConfig {
  locale: Locale;
  path: string; // e.g., '/es/servicios/analisis-carteras'
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
    'analisis-carteras': 'Análisis de Carteras',
    'liquidaciones-fiscales': 'Liquidaciones Fiscales',
    'seguimiento-cartera': 'Seguimiento de Cartera',
    'asesoria-fiscal': 'Asesoría Fiscal'
  },
  en: {
    'servicios': 'Services',
    'blog': 'Blog',
    'sobre-nosotros': 'About Us',
    'contacto': 'Contact',
    'analisis-carteras': 'Portfolio Analysis',
    'liquidaciones-fiscales': 'Tax Settlements',
    'seguimiento-cartera': 'Portfolio Tracking',
    'asesoria-fiscal': 'Tax Advisory'
  },
  ca: {
    'servicios': 'Serveis',
    'blog': 'Blog',
    'sobre-nosotros': 'Sobre Nosaltres',
    'contacto': 'Contacte',
    'analisis-carteras': 'Anàlisi de Carteres',
    'liquidaciones-fiscales': 'Liquidacions Fiscals',
    'seguimiento-cartera': 'Seguiment de Cartera',
    'asesoria-fiscal': 'Assessoria Fiscal'
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
 *   path: '/es/servicios/analisis-carteras',
 *   baseUrl: 'https://cleriontax.com'
 * })
 *
 * Returns:
 * Home > Servicios > Análisis de Carteras
 */
export function generateBreadcrumbSchema(
  config: BreadcrumbConfig
): WithContext<any> {
  const { locale, path, customLabels = {}, baseUrl = 'https://cleriontax.com' } = config;

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
 * Converts 'analisis-carteras' to 'Analisis Carteras'
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
 *   baseUrl: 'https://cleriontax.com'
 * })
 */
export function generateBlogBreadcrumbSchema(config: {
  locale: Locale;
  blogSlug: string;
  blogTitle: string;
  baseUrl?: string;
}): WithContext<any> {
  const { locale, blogSlug, blogTitle, baseUrl = 'https://cleriontax.com' } = config;

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
 * Includes the services index page in the breadcrumb trail
 *
 * @example
 * generateServiceBreadcrumbSchema({
 *   locale: 'es',
 *   serviceSlug: 'analisis-carteras',
 *   serviceTitle: 'Análisis de Carteras de Criptomonedas',
 *   baseUrl: 'https://cleriontax.com'
 * })
 */
export function generateServiceBreadcrumbSchema(config: {
  locale: Locale;
  serviceSlug: string;
  serviceTitle: string;
  baseUrl?: string;
}): WithContext<any> {
  const { locale, serviceSlug, serviceTitle, baseUrl = 'https://cleriontax.com' } = config;

  const items: BreadcrumbItem[] = [
    {
      name: homeLabels[locale],
      url: `${baseUrl}/${locale}`,
      position: 1
    },
    {
      name: defaultLabels[locale]['servicios'],
      url: `${baseUrl}/${locale}/servicios`,
      position: 2
    },
    {
      name: serviceTitle,
      url: `${baseUrl}/${locale}/servicios/${serviceSlug}`,
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
