import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Redirects nativos para manejar idiomas sin middleware
  async redirects() {
    return [
      // Redirigir raíz a español
      {
        source: '/',
        destination: '/es',
        permanent: false,
      },
      // Redirigir rutas sin idioma a español
      {
        source: '/servicios',
        destination: '/es/servicios',
        permanent: false,
      },
      {
        source: '/blog',
        destination: '/es/blog',
        permanent: false,
      },
      {
        source: '/contacto',
        destination: '/es/contacto',
        permanent: false,
      },
      {
        source: '/sobre-nosotros',
        destination: '/es/sobre-nosotros',
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
