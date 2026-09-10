import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Redirección 301 para la URL antigua de asesoría fiscal
      {
        source: '/servicios/asesoria-fiscal',
        destination: '/servicios/asesoria-fiscal-criptomonedas',
        permanent: true,
      },
      {
        // El parámetro va acotado a los idiomas reales a propósito: sin la
        // restricción, `:locale` casa con cualquier primer segmento, `api`
        // incluido, y /api/... acaba redirigido a una ruta que no existe.
        source: '/:locale(es|en|ca)/servicios/asesoria-fiscal',
        destination: '/:locale/servicios/asesoria-fiscal-criptomonedas',
        permanent: true,
      },
      /*
       * Renombrado de las cuatro líneas de servicio (manual v1.1, §02).
       * Los slugs antiguos describían el servicio hacia dentro; los nuevos
       * usan la forma con la que el cliente lo busca. Permanentes porque el
       * cambio es definitivo, y con el parámetro de idioma acotado para que
       * no capturen /api ni ningún otro primer segmento.
       */
      {
        source: '/:locale(es|en|ca)/servicios/analisis-carteras',
        destination: '/:locale/servicios/informe-fiscal-criptomonedas',
        permanent: true,
      },
      {
        source: '/:locale(es|en|ca)/servicios/liquidaciones-fiscales',
        destination: '/:locale/servicios/declarar-criptomonedas',
        permanent: true,
      },
      {
        // Seguimiento de cartera se absorbe como prestación dentro de
        // asesoría fiscal: cuatro líneas se recuerdan, cinco se diluyen.
        source: '/:locale(es|en|ca)/servicios/seguimiento-cartera',
        destination: '/:locale/servicios/asesoria-fiscal-criptomonedas',
        permanent: true,
      },
      // Redirect /contact → /contacto (el slug real de la página)
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/:locale(es|en|ca)/contact',
        destination: '/:locale/contacto',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 90],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
