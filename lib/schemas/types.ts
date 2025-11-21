/**
 * TypeScript types for Schema.org structured data
 * Based on schema.org vocabulary
 */

import { Organization, WithContext, BreadcrumbList, WebSite, Service, BlogPosting, WebPage, Person, ContactPage, ItemList, HowTo, FAQPage } from 'schema-dts';

export type {
  Organization,
  WithContext,
  BreadcrumbList,
  WebSite,
  Service,
  BlogPosting,
  WebPage,
  Person,
  ContactPage,
  ItemList,
  HowTo,
  FAQPage
};

/**
 * Breadcrumb item for generating breadcrumb schemas
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

/**
 * Locale type for i18n
 */
export type Locale = 'es' | 'en' | 'ca';

/**
 * Schema generator options
 */
export interface SchemaOptions {
  locale: Locale;
  baseUrl?: string;
}
