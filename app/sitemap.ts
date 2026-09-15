import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import clustersConfig from '@/messages/blog-posts/clusters-config.json';
import { SITE_URL, LOCALES } from '@/lib/site';
import { SITUACIONES_VIVAS } from '@/lib/situaciones';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const locales = LOCALES;

  // Obtener todos los posts del blog
  const blogPosts = getAllBlogPosts();

  // Servicios dinámicos
  // Las cuatro líneas del manual de marca v1.1, §02.
  const serviceSlugs = [
    'informe-fiscal-criptomonedas',
    'declarar-criptomonedas',
    'litigacion-fiscal-criptomonedas',
    'asesoria-fiscal-criptomonedas',
  ];

  // Clusters temáticos
  const clusterSlugs = clustersConfig.clusters.map(c => c.id);

  // Páginas estáticas principales
  const staticPages = [
    '',
    '/servicios',
    '/situaciones',
    '/metodo',
    '/despachos',
    '/sobre-nosotros',
    '/contacto',
    '/blog',
    '/blog/clusters',
  ];

  // Páginas legales: se indexan, pero con prioridad baja.
  const legalPages = ['/aviso-legal', '/privacidad', '/cookies'];

  // Generar URLs para todas las páginas estáticas en todos los idiomas
  const staticUrls: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    staticPages.forEach(page => {
      staticUrls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '/blog' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/blog' ? 0.9 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es${page}`,
            en: `${baseUrl}/en${page}`,
            ca: `${baseUrl}/ca${page}`,
          },
        },
      });
    });
  });

  const legalUrls: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    legalPages.forEach(page => {
      legalUrls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
        alternates: {
          languages: {
            es: `${baseUrl}/es${page}`,
            en: `${baseUrl}/en${page}`,
            ca: `${baseUrl}/ca${page}`,
          },
        },
      });
    });
  });

  /*
   * Capa 2 — las situaciones. Solo las que tienen contenido escrito:
   * SITUACIONES_VIVAS es lo que existe hoy, no el registro completo, para no
   * anunciar en el sitemap una landing que todavía no está redactada.
   */
  const situacionUrls: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    SITUACIONES_VIVAS.forEach(situacion => {
      situacionUrls.push({
        url: `${baseUrl}/${locale}/situaciones/${situacion.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        // Los casos con plazo administrativo son la entrada de más valor.
        priority: situacion.urgente ? 0.9 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es/situaciones/${situacion.slug}`,
            en: `${baseUrl}/en/situaciones/${situacion.slug}`,
            ca: `${baseUrl}/ca/situaciones/${situacion.slug}`,
          },
        },
      });
    });
  });

  // Generar URLs para todos los servicios dinámicos en todos los idiomas
  const serviceUrls: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    serviceSlugs.forEach(slug => {
      serviceUrls.push({
        url: `${baseUrl}/${locale}/servicios/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: {
            es: `${baseUrl}/es/servicios/${slug}`,
            en: `${baseUrl}/en/servicios/${slug}`,
            ca: `${baseUrl}/ca/servicios/${slug}`,
          },
        },
      });
    });
  });

  // Generar URLs para todos los posts del blog en todos los idiomas
  // IMPORTANTE: Siempre usar el slug español para todas las URLs (requisito SEO)
  const blogUrls: MetadataRoute.Sitemap = [];

  blogPosts.forEach(post => {
    const spanishSlug = post.slugTranslations.es;

    locales.forEach(locale => {
      blogUrls.push({
        url: `${baseUrl}/${locale}/blog/${spanishSlug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly',
        priority: post.featured ? 0.9 : 0.7,
        alternates: {
          languages: {
            es: `${baseUrl}/es/blog/${spanishSlug}`,
            en: `${baseUrl}/en/blog/${spanishSlug}`,
            ca: `${baseUrl}/ca/blog/${spanishSlug}`,
          },
        },
      });
    });
  });

  // Generar URLs para todos los clusters temáticos en todos los idiomas
  const clusterUrls: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    clusterSlugs.forEach(slug => {
      clusterUrls.push({
        url: `${baseUrl}/${locale}/blog/tema/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: {
          languages: {
            es: `${baseUrl}/es/blog/tema/${slug}`,
            en: `${baseUrl}/en/blog/tema/${slug}`,
            ca: `${baseUrl}/ca/blog/tema/${slug}`,
          },
        },
      });
    });
  });

  return [
    ...staticUrls,
    ...serviceUrls,
    ...situacionUrls,
    ...clusterUrls,
    ...blogUrls,
    ...legalUrls,
  ];
}
