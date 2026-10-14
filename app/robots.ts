import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nunca /_next/: ahí están el CSS, el JS y las imágenes optimizadas
        // que Google necesita para renderizar la página y rastrear sus imágenes.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
