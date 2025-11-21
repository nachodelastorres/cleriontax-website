/**
 * Schema.org Structured Data Library
 * Centralized exports for all schema generators
 */

// Types
export type { Locale, BreadcrumbItem, SchemaOptions } from './types';

// Organization schemas
export {
  generateOrganizationSchema,
  getOrganizationReference
} from './organization';

// WebSite schemas
export {
  generateWebSiteSchema,
  generateWebPageSchema
} from './website';

// Breadcrumb schemas
export {
  generateBreadcrumbSchema,
  generateBlogBreadcrumbSchema,
  generateServiceBreadcrumbSchema
} from './breadcrumbs';

// Service schemas
export {
  generateServiceSchema,
  generateDetailedServiceSchema,
  getServiceName,
  serviceNames
} from './service';

// Person/Author schemas
export {
  generatePersonSchema,
  getPersonReference,
  generateCleriontaxTeamSchema
} from './person';

// HowTo schemas
export {
  generateHowToSchema,
  generateServiceHowToSchema,
  commonHowToSchemas
} from './howto';

/**
 * Utility function to render schema as JSON-LD script tag
 * Use this in your components to embed schema in the HTML
 *
 * @example
 * <Script
 *   id="organization-schema"
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 * />
 */
export function renderSchemaScript(schema: any, id: string) {
  return {
    id: `schema-${id}`,
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema, null, 0) // Minified for production
    }
  };
}
