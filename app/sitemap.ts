import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import clustersConfig from '@/messages/blog-posts/clusters-config.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cleriontax.com';
  const locales = ['es', 'en', 'ca'];

  // Obtener todos los posts del blog
  const blogPosts = getAllBlogPosts();

  // Servicios dinámicos
  const serviceSlugs = ['analisis-carteras', 'liquidaciones-fiscales', 'seguimiento-cartera', 'asesoria-fiscal'];

  // Clusters temáticos
  const clusterSlugs = clustersConfig.clusters.map(c => c.id);

  // Páginas estáticas principales
  const staticPages = [
    '',
    '/servicios',
    '/sobre-nosotros',
    '/contacto',
    '/blog',
  ];

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
  const blogUrls: MetadataRoute.Sitemap = [];

  blogPosts.forEach(post => {
    locales.forEach(locale => {
      const slug = post.slugTranslations[locale as keyof typeof post.slugTranslations];

      blogUrls.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly',
        priority: post.featured ? 0.9 : 0.7,
        alternates: {
          languages: {
            es: `${baseUrl}/es/blog/${post.slugTranslations.es}`,
            en: `${baseUrl}/en/blog/${post.slugTranslations.en}`,
            ca: `${baseUrl}/ca/blog/${post.slugTranslations.ca}`,
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

  return [...staticUrls, ...serviceUrls, ...clusterUrls, ...blogUrls];
}
