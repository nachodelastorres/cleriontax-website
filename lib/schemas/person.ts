/**
 * Person Schema Generator
 * Generates Person/Author schemas for blog posts and content
 */

import { WithContext } from 'schema-dts';

interface PersonSchemaConfig {
  name: string;
  role?: string;
  avatar?: string;
  description?: string;
  url?: string;
  baseUrl?: string;
}

/**
 * Generates a Person schema for blog authors
 * This improves author rich snippets in search results
 */
export function generatePersonSchema(
  config: PersonSchemaConfig
): WithContext<any> {
  const {
    name,
    role,
    avatar,
    description,
    url,
    baseUrl = 'https://www.cleriontax.com'
  } = config;

  const schema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: url || baseUrl
  };

  if (role) {
    schema.jobTitle = role;
  }

  if (avatar) {
    schema.image = {
      '@type': 'ImageObject',
      url: avatar.startsWith('http') ? avatar : `${baseUrl}${avatar}`,
      contentUrl: avatar.startsWith('http') ? avatar : `${baseUrl}${avatar}`
    };
  }

  if (description) {
    schema.description = description;
  }

  // Add knowledge areas for Cleriontax team members
  if (name.toLowerCase().includes('cleriontax') || name.toLowerCase().includes('equipo')) {
    schema.knowsAbout = [
      'Cryptocurrency Taxation',
      'Spanish Tax Law',
      'Financial Advisory',
      'Blockchain Technology',
      'DeFi Taxation',
      'Data Analysis'
    ];

    schema.affiliation = {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Cleriontax'
    };
  }

  return schema;
}

/**
 * Generates a simplified Person reference for embedding in other schemas
 * Use this when you need to reference an author without full details
 */
export function getPersonReference(name: string, url?: string): any {
  return {
    '@type': 'Person',
    name,
    url: url || 'https://www.cleriontax.com'
  };
}

/**
 * Default Cleriontax team author schema
 * Use this for blog posts authored by the team
 */
export function generateCleriontaxTeamSchema(baseUrl = 'https://www.cleriontax.com'): WithContext<any> {
  return generatePersonSchema({
    name: 'Equipo Cleriontax',
    role: 'Tax Advisory & Data Analysis Team',
    description: 'Equipo de asesores fiscales y analistas de datos especializados en criptomonedas, DeFi y fiscalidad de inversiones en España.',
    url: `${baseUrl}/sobre-nosotros`,
    baseUrl
  });
}
