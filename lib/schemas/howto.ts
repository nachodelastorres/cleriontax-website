/**
 * HowTo Schema Generator
 * Generates HowTo schemas for step-by-step guides and processes
 */

import { WithContext } from 'schema-dts';
import type { Locale } from './types';

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaConfig {
  locale: Locale;
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration format (e.g., "PT2H" for 2 hours)
  image?: string;
  url?: string;
  baseUrl?: string;
}

/**
 * Generates a HowTo schema for step-by-step processes
 * This creates rich snippets with numbered steps in search results
 *
 * @example
 * generateHowToSchema({
 *   locale: 'es',
 *   name: 'Cómo declarar criptomonedas en la AEAT',
 *   description: 'Guía paso a paso para declarar tus criptomonedas',
 *   steps: [
 *     { name: 'Recopilar datos', text: 'Descarga tus movimientos...' },
 *     { name: 'Analizar transacciones', text: 'Clasifica cada operación...' }
 *   ],
 *   totalTime: 'PT1H'
 * })
 */
export function generateHowToSchema(
  config: HowToSchemaConfig
): WithContext<any> {
  const {
    locale,
    name,
    description,
    steps,
    totalTime,
    image,
    url,
    baseUrl = 'https://www.cleriontax.com'
  } = config;

  const schema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    inLanguage: locale,

    step: steps.map((step, index) => {
      const stepSchema: any = {
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        itemListElement: {
          '@type': 'HowToDirection',
          text: step.text
        }
      };

      if (step.image) {
        stepSchema.image = {
          '@type': 'ImageObject',
          url: step.image.startsWith('http') ? step.image : `${baseUrl}${step.image}`,
          contentUrl: step.image.startsWith('http') ? step.image : `${baseUrl}${step.image}`
        };
      }

      if (step.url) {
        stepSchema.url = step.url;
      }

      return stepSchema;
    })
  };

  if (totalTime) {
    schema.totalTime = totalTime;
  }

  if (image) {
    schema.image = {
      '@type': 'ImageObject',
      url: image.startsWith('http') ? image : `${baseUrl}${image}`,
      contentUrl: image.startsWith('http') ? image : `${baseUrl}${image}`
    };
  }

  if (url) {
    schema.url = url;
  }

  return schema;
}

/**
 * Generates a simplified HowTo schema from service sections
 * Automatically extracts steps from service page structure
 */
export function generateServiceHowToSchema(config: {
  locale: Locale;
  serviceName: string;
  serviceDescription: string;
  sections: Array<{
    title: string;
    description: string;
    steps?: Array<{ title: string; description: string }>;
  }>;
  url: string;
  baseUrl?: string;
}): WithContext<any> | null {
  const { locale, serviceName, serviceDescription, sections, url, baseUrl } = config;

  // Find section with steps
  const stepsSection = sections.find(section => section.steps && section.steps.length > 0);

  if (!stepsSection || !stepsSection.steps) {
    return null;
  }

  const howToSteps: HowToStep[] = stepsSection.steps.map(step => ({
    name: step.title,
    text: step.description
  }));

  return generateHowToSchema({
    locale,
    name: `${serviceName} - ${stepsSection.title}`,
    description: serviceDescription,
    steps: howToSteps,
    url,
    baseUrl
  });
}

/**
 * Common HowTo schemas for Cleriontax services
 */
export const commonHowToSchemas = {
  /**
   * How to declare cryptocurrencies process
   */
  cryptoDeclarationProcess: (locale: Locale, baseUrl = 'https://www.cleriontax.com'): WithContext<any> => {
    const steps: Record<Locale, HowToStep[]> = {
      es: [
        {
          name: 'Recopilar datos de transacciones',
          text: 'Descarga los historiales de transacciones de todos tus exchanges, wallets y plataformas DeFi. Incluye archivos CSV, APIs y registros blockchain.'
        },
        {
          name: 'Consolidar y limpiar datos',
          text: 'Unifica todos los datos en un formato coherente. Elimina duplicidades, identifica movimientos internos entre tus propias wallets, y corrige errores.'
        },
        {
          name: 'Clasificar operaciones fiscalmente',
          text: 'Clasifica cada transacción según criterios fiscales españoles: compras, ventas, staking, airdrops, swaps, etc. Aplica metodología FIFO para calcular ganancias y pérdidas.'
        },
        {
          name: 'Generar informe fiscal',
          text: 'Crea el informe fiscal completo con todas las operaciones clasificadas, cálculos de ganancias patrimoniales, y rendimientos del capital mobiliario.'
        },
        {
          name: 'Presentar en la AEAT',
          text: 'Integra los resultados en los modelos correspondientes (100, 720, 721) y presenta tu declaración ante la Agencia Tributaria.'
        }
      ],
      en: [
        {
          name: 'Collect transaction data',
          text: 'Download transaction histories from all your exchanges, wallets, and DeFi platforms. Include CSV files, APIs, and blockchain records.'
        },
        {
          name: 'Consolidate and clean data',
          text: 'Unify all data into a coherent format. Remove duplicates, identify internal movements between your own wallets, and correct errors.'
        },
        {
          name: 'Classify operations fiscally',
          text: 'Classify each transaction according to Spanish tax criteria: purchases, sales, staking, airdrops, swaps, etc. Apply FIFO methodology to calculate gains and losses.'
        },
        {
          name: 'Generate tax report',
          text: 'Create the complete tax report with all classified operations, capital gains calculations, and investment income.'
        },
        {
          name: 'Submit to Spanish Tax Agency',
          text: 'Integrate results into corresponding forms (100, 720, 721) and submit your declaration to the Tax Agency.'
        }
      ],
      ca: [
        {
          name: 'Recopilar dades de transaccions',
          text: 'Descarrega els històrics de transaccions de tots els teus exchanges, wallets i plataformes DeFi. Inclou arxius CSV, APIs i registres blockchain.'
        },
        {
          name: 'Consolidar i netejar dades',
          text: 'Unifica totes les dades en un format coherent. Elimina duplicitats, identifica moviments interns entre les teves pròpies wallets, i corregeix errors.'
        },
        {
          name: 'Classificar operacions fiscalment',
          text: 'Classifica cada transacció segons criteris fiscals espanyols: compres, vendes, staking, airdrops, swaps, etc. Aplica metodologia FIFO per calcular guanys i pèrdues.'
        },
        {
          name: 'Generar informe fiscal',
          text: 'Crea l\'informe fiscal complet amb totes les operacions classificades, càlculs de guanys patrimonials, i rendiments del capital mobiliari.'
        },
        {
          name: 'Presentar a l\'AEAT',
          text: 'Integra els resultats en els models corresponents (100, 720, 721) i presenta la teva declaració davant l\'Agència Tributària.'
        }
      ]
    };

    const names: Record<Locale, string> = {
      es: 'Cómo declarar criptomonedas en España',
      en: 'How to declare cryptocurrencies in Spain',
      ca: 'Com declarar criptomonedes a Espanya'
    };

    const descriptions: Record<Locale, string> = {
      es: 'Proceso completo para declarar tus criptomonedas ante la AEAT. Desde la recopilación de datos hasta la presentación del modelo 100.',
      en: 'Complete process to declare your cryptocurrencies to the Spanish Tax Agency. From data collection to submitting form 100.',
      ca: 'Procés complet per declarar les teves criptomonedes davant l\'AEAT. Des de la recopilació de dades fins a la presentació del model 100.'
    };

    return generateHowToSchema({
      locale,
      name: names[locale],
      description: descriptions[locale],
      steps: steps[locale],
      totalTime: 'PT8H',
      url: `${baseUrl}/${locale}/servicios`,
      baseUrl
    });
  }
};
