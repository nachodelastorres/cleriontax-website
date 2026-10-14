import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import clustersConfig from '@/messages/blog-posts/clusters-config.json';
import { SITE_URL, LOCALES, type Locale } from '@/lib/site';
import { PAGINAS, rutaPagina } from '@/lib/paginas';

/**
 * Sitemap.
 *
 * La fecha de modificación es la del contenido, no la del despliegue: con
 * `new Date()` todas las URLs cambiaban en cada deploy y Google deja de fiarse
 * del dato. Cuando se edite una página, se actualiza aquí su fecha.
 *
 * Cada URL lleva sus alternativas de idioma con x-default (español). Las
 * páginas de servicio tienen el slug traducido.
 */

const ACTUALIZADO: Record<string, string> = {
  '': '2026-10-14',
  '/precios': '2026-10-14',
  '/despachos': '2026-10-14',
  '/sobre-nosotros': '2026-10-14',
  '/contacto': '2026-10-14',
  '/blog': '2026-10-14',
  servicios: '2026-10-14',
  clusters: '2026-10-14',
  legales: '2026-09-15',
};

/** Alternativas de idioma de una URL, con x-default al español. */
function idiomas(ruta: (locale: Locale) => string) {
  return {
    languages: {
      es: `${SITE_URL}/es${ruta('es')}`,
      en: `${SITE_URL}/en${ruta('en')}`,
      ca: `${SITE_URL}/ca${ruta('ca')}`,
      'x-default': `${SITE_URL}/es${ruta('es')}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  const estaticas = ['', '/precios', '/despachos', '/sobre-nosotros', '/contacto', '/blog'];
  // Las páginas fijas también tienen el slug traducido (la home y el blog, no).
  const local = (pagina: string, l: Locale) => (pagina ? rutaPagina(pagina.slice(1), l) : '');
  for (const locale of LOCALES) {
    for (const pagina of estaticas) {
      urls.push({
        url: `${SITE_URL}/${locale}${local(pagina, locale)}`,
        lastModified: new Date(ACTUALIZADO[pagina]),
        changeFrequency: pagina === '/blog' ? 'weekly' : 'monthly',
        priority: pagina === '' ? 1.0 : pagina === '/blog' ? 0.9 : 0.8,
        alternates: idiomas((l) => local(pagina, l)),
      });
    }
  }

  // Páginas de servicio: una por intención de búsqueda, con el slug de cada idioma.
  for (const locale of LOCALES) {
    for (const pagina of PAGINAS) {
      urls.push({
        url: `${SITE_URL}/${locale}${rutaPagina(pagina.slug, locale)}`,
        lastModified: new Date(ACTUALIZADO.servicios),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: idiomas((l) => rutaPagina(pagina.slug, l)),
      });
    }
  }

  // Temas del blog.
  for (const locale of LOCALES) {
    for (const cluster of clustersConfig.clusters) {
      const ruta = `/blog/tema/${cluster.id}`;
      urls.push({
        url: `${SITE_URL}/${locale}${ruta}`,
        lastModified: new Date(ACTUALIZADO.clusters),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: idiomas(() => ruta),
      });
    }
  }

  // Artículos: las tres versiones comparten el slug español, que es el que se enruta.
  for (const post of getAllBlogPosts()) {
    const ruta = `/blog/${post.slugTranslations.es}`;
    for (const locale of LOCALES) {
      urls.push({
        url: `${SITE_URL}/${locale}${ruta}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly',
        priority: post.featured ? 0.8 : 0.7,
        alternates: idiomas(() => ruta),
      });
    }
  }

  // Páginas legales: se indexan, con prioridad baja.
  for (const locale of LOCALES) {
    for (const pagina of ['/aviso-legal', '/privacidad', '/cookies']) {
      urls.push({
        url: `${SITE_URL}/${locale}${pagina}`,
        lastModified: new Date(ACTUALIZADO.legales),
        changeFrequency: 'yearly',
        priority: 0.3,
        alternates: idiomas(() => pagina),
      });
    }
  }

  return urls;
}
