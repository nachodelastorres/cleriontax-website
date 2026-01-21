const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, 'messages', 'blog-posts', 'metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

// Mapeo de posts a clusters
const clusterMapping = {
  'stablecoins-tributacion-espana-mito': 'fiscalidad-criptomonedas',
  'modelos-100-721-714-criptomonedas': 'fiscalidad-criptomonedas',
  'mineria-criptomonedas-fiscalidad-espana': 'fiscalidad-criptomonedas',
  'fiscalidad-nfts-espana-2025': 'fiscalidad-criptomonedas',
  'modelo-721-criptomonedas': 'fiscalidad-criptomonedas',
  'errores-declarar-criptomonedas': 'fiscalidad-criptomonedas',
  'fiscalidad-defi-espana': 'fiscalidad-criptomonedas',
  'como-declarar-criptomonedas-renta-2025': 'fiscalidad-criptomonedas',
  'guia-completa-declaracion-fiscal-criptomonedas-2025': 'fiscalidad-criptomonedas',
  'herramientas-rastrear-criptomonedas': 'ingenieria-datos-fiscalidad',
  'clasificar-operaciones-criptomonedas': 'ingenieria-datos-fiscalidad'
};

// Mapeo de posts relacionados específicos por post
const specificRelatedPosts = {
  'stablecoins-tributacion-espana-mito': ['modelos-100-721-714-criptomonedas', 'errores-declarar-criptomonedas', 'guia-completa-declaracion-fiscal-criptomonedas-2025'],
  'modelos-100-721-714-criptomonedas': ['modelo-721-criptomonedas', 'como-declarar-criptomonedas-renta-2025', 'guia-completa-declaracion-fiscal-criptomonedas-2025'],
  'mineria-criptomonedas-fiscalidad-espana': ['como-declarar-criptomonedas-renta-2025', 'modelos-100-721-714-criptomonedas', 'errores-declarar-criptomonedas'],
  'fiscalidad-nfts-espana-2025': ['como-declarar-criptomonedas-renta-2025', 'modelos-100-721-714-criptomonedas', 'guia-completa-declaracion-fiscal-criptomonedas-2025'],
  'modelo-721-criptomonedas': ['modelos-100-721-714-criptomonedas', 'como-declarar-criptomonedas-renta-2025', 'fiscalidad-defi-espana'],
  'errores-declarar-criptomonedas': ['guia-completa-declaracion-fiscal-criptomonedas-2025', 'modelos-100-721-714-criptomonedas', 'como-declarar-criptomonedas-renta-2025'],
  'fiscalidad-defi-espana': ['modelo-721-criptomonedas', 'clasificar-operaciones-criptomonedas', 'como-declarar-criptomonedas-renta-2025'],
  'como-declarar-criptomonedas-renta-2025': ['guia-completa-declaracion-fiscal-criptomonedas-2025', 'modelos-100-721-714-criptomonedas', 'errores-declarar-criptomonedas'],
  'guia-completa-declaracion-fiscal-criptomonedas-2025': ['como-declarar-criptomonedas-renta-2025', 'modelos-100-721-714-criptomonedas', 'clasificar-operaciones-criptomonedas'],
  'herramientas-rastrear-criptomonedas': ['clasificar-operaciones-criptomonedas', 'guia-completa-declaracion-fiscal-criptomonedas-2025', 'fiscalidad-defi-espana'],
  'clasificar-operaciones-criptomonedas': ['herramientas-rastrear-criptomonedas', 'guia-completa-declaracion-fiscal-criptomonedas-2025', 'fiscalidad-defi-espana']
};

// Actualizar cada post con cluster y relatedPosts
metadata.posts = metadata.posts.map(post => {
  const cluster = clusterMapping[post.id];
  const relatedPosts = specificRelatedPosts[post.id] || [];

  return {
    ...post,
    cluster: cluster,
    relatedPosts: relatedPosts,
    aiOptimized: true
  };
});

fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
console.log('✓ Metadata actualizado con clusters y relatedPosts');
console.log(`✓ ${metadata.posts.length} posts procesados`);
