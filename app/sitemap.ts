import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cleriontax.com';
  const locales = ['es', 'en', 'ca'];

  // Obtener todos los posts del blog
  const blogPosts = getAllBlogPosts();

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

  return [...staticUrls, ...blogUrls];
}
