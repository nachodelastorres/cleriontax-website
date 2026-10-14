import { existsSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Slugs de las páginas de servicio en cada idioma (los mismos que usa lib/paginas.ts).
const RUTAS = JSON.parse(readFileSync(new URL('./lib/rutas-paginas.json', import.meta.url), 'utf-8'));

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
  /*
   * Metadatos siempre en el <head>, para cualquier rastreador. Next los envía
   * en streaming a los navegadores, y algunos bots los recibían en el <body>.
   */
  htmlLimitedBots: /.*/,

  async redirects() {
    const idiomas = ['es', 'en', 'ca'];
    // A dónde va un destino en un idioma: las páginas de servicio, a su slug traducido.
    const destino = (d, l) => (!d ? `/${l}` : RUTAS[d] ? `/${l}/${RUTAS[d][l]}` : `/${l}/${d}`);

    /*
     * URLs que ya no existen, con su destino final. Las de servicios están
     * publicadas en producción; las de situaciones y /metodo nunca llegaron a
     * publicarse, pero se cubren por si alguien las enlazó. Cada una va directa
     * a su destino en cada idioma, sin cadenas de saltos.
     */
    const antiguas = [
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
      // Páginas retiradas
      ['metodo', ''],
      ['muestrario', ''],
      ['blog/clusters', 'blog'],
      // La página de revisión nombra las dos herramientas desde octubre de 2026.
      ['revisar-informe-koinly', 'revisar-informe-koinly-cointracking'],
    ];

    const reglas = [];
    for (const l of idiomas) {
      for (const [origen, d] of antiguas) {
        reglas.push({ source: `/${l}/${origen}`, destination: destino(d, l), permanent: true });
      }
      /*
       * Cada página de servicio tiene un slug por idioma. Un slug de otro
       * idioma —un enlace viejo, o el selector de idioma, que conserva la ruta—
       * va al de este.
       */
      for (const slugs of Object.values(RUTAS)) {
        for (const otro of new Set(Object.values(slugs))) {
          if (otro !== slugs[l]) {
            reglas.push({ source: `/${l}/${otro}`, destination: `/${l}/${slugs[l]}`, permanent: true });
          }
        }
      }
    }

    // Las URLs publicadas sin idioma van directas al español, sin pasar por el middleware.
    for (const [origen, d] of antiguas.filter(([o]) => o.startsWith('servicios'))) {
      reglas.push({ source: `/${origen}`, destination: destino(d, 'es'), permanent: true });
    }
    reglas.push({ source: '/contact', destination: '/es/contacto', permanent: true });

    return reglas;
  },

  /*
   * Las páginas fijas (precios, contacto…) tienen carpeta propia con el nombre
   * en español; su slug en inglés y catalán se sirve desde esa carpeta. La
   * redirección de arriba lleva el slug español a este, así que no hay dos URLs.
   */
  async rewrites() {
    const reglas = [];
    for (const [slug, slugs] of Object.entries(RUTAS)) {
      if (!existsSync(new URL(`./app/[locale]/${slug}/page.tsx`, import.meta.url))) continue;
      for (const [l, local] of Object.entries(slugs)) {
        if (local !== slug) reglas.push({ source: `/${l}/${local}`, destination: `/${l}/${slug}` });
      }
    }
    return { beforeFiles: reglas };
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
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
    // Un mes: las imágenes no cambian de contenido sin cambiar de nombre.
    minimumCacheTTL: 2678400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
