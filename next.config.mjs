import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /*
   * Raíz del proyecto, explícita. Hay otro package-lock.json en el directorio
   * del usuario y Turbopack estaba eligiéndolo como raíz del workspace, con
   * el aviso correspondiente en cada arranque.
   */
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  async redirects() {
    return [
      /*
       * Las capas de servicios y situaciones desaparecen: cada búsqueda tiene
       * ahora una sola página, en la raíz (lib/paginas.ts). Cada URL vieja va
       * directa a su destino final, sin cadenas de saltos. Las de servicios
       * están publicadas; las de situaciones y /metodo nunca llegaron a
       * producción, pero se cubren igual por si alguien las enlazó.
       *
       * El parámetro de idioma va acotado a propósito: sin la restricción,
       * `:locale` casa con cualquier primer segmento, `api` incluido.
       * Las URLs sin idioma no hacen falta: el middleware les pone uno y la
       * segunda petición ya cae aquí.
       */
      ...[
        // Servicios publicados y sus slugs anteriores
        ['servicios', ''],
        ['servicios/asesoria-fiscal', ''],
        ['servicios/asesoria-fiscal-criptomonedas', ''],
        ['servicios/seguimiento-cartera', ''],
        ['servicios/analisis-carteras', 'informe-fiscal-criptomonedas'],
        ['servicios/informe-fiscal-criptomonedas', 'informe-fiscal-criptomonedas'],
        ['servicios/liquidaciones-fiscales', 'declarar-criptomonedas'],
        ['servicios/declarar-criptomonedas', 'declarar-criptomonedas'],
        ['servicios/litigacion-fiscal-criptomonedas', 'inspeccion-hacienda-criptomonedas'],
        // Situaciones
        ['situaciones', ''],
        ['situaciones/requerimiento-de-hacienda', 'requerimiento-hacienda-criptomonedas'],
        ['situaciones/recurrir-una-sancion', 'inspeccion-hacienda-criptomonedas'],
        ['situaciones/inspeccion-por-criptomonedas', 'inspeccion-hacienda-criptomonedas'],
        ['situaciones/regularizar-anos-anteriores', 'regularizar-criptomonedas'],
        ['situaciones/errores-en-mi-informe-automatico', 'revisar-informe-koinly-cointracking'],
        ['situaciones/miles-de-transacciones', 'informe-fiscal-criptomonedas'],
        ['situaciones/declarar-criptomonedas', 'declarar-criptomonedas'],
        ['situaciones/modelo-721', 'modelo-721-criptomonedas'],
        // Las dos situaciones informativas: su búsqueda es de blog
        ['situaciones/compensar-perdidas', 'blog/perdidas-criptomonedas-compensar-declaracion'],
        ['situaciones/defi-staking-airdrops', 'blog/fiscalidad-defi-espana'],
        // Páginas internas retiradas
        ['metodo', ''],
        ['muestrario', ''],
        // La página de revisión nombra las dos herramientas desde octubre de 2026.
        ['revisar-informe-koinly', 'revisar-informe-koinly-cointracking'],
      ].map(([origen, destino]) => ({
        source: `/:locale(es|en|ca)/${origen}`,
        destination: destino ? `/:locale/${destino}` : '/:locale',
        permanent: true,
      })),
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
