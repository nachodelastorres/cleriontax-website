import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import clustersConfig from '@/messages/blog-posts/clusters-config.json';
import { SITE_URL, LOCALES } from '@/lib/site';
import { PAGINAS } from '@/lib/paginas';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const locales = LOCALES;

  // Obtener todos los posts del blog
  const blogPosts = getAllBlogPosts();

  // Clusters temáticos
  const clusterSlugs = clustersConfig.clusters.map(c => c.id);

  // Páginas estáticas principales
  const staticPages = [
    '',
    '/precios',
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
   * Las páginas de servicio: una por intención de búsqueda, en la raíz. Son
   * las de más valor después de la home.
   */
  const paginaUrls: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    PAGINAS.forEach(pagina => {
      paginaUrls.push({
        url: `${baseUrl}/${locale}/${pagina.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: {
            es: `${baseUrl}/es/${pagina.slug}`,
            en: `${baseUrl}/en/${pagina.slug}`,
            ca: `${baseUrl}/ca/${pagina.slug}`,
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
    ...paginaUrls,
    ...clusterUrls,
    ...blogUrls,
    ...legalUrls,
  ];
}
