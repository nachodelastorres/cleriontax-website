import { WithContext } from 'schema-dts';
import type { Locale } from './types';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSchemaConfig {
  locale: Locale;
  items: FAQItem[];
  /** URL de la página que contiene las preguntas. */
  url: string;
}

/**
 * Genera el schema FAQPage a partir de las preguntas que la página ya muestra.
 *
 * Requisito de Google: solo debe emitirse cuando las preguntas y respuestas
 * son visibles en la propia página, cosa que aquí siempre se cumple porque el
 * schema se construye desde el mismo contenido que se renderiza.
 *
 * El texto de la respuesta se limpia de etiquetas: `acceptedAnswer.text` admite
 * un subconjunto de HTML, pero conviene no arrastrar el marcado de presentación.
 */
export function generateFAQSchema(config: FAQSchemaConfig): WithContext<any> | null {
  const { locale, items, url } = config;

  if (!items || items.length === 0) return null;

  const limpiar = (s: string) =>
    s
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: limpiar(item.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: limpiar(item.a),
      },
    })),
  };
}
