# Arquitectura de Clusters Temáticos del Blog

## Descripción General

Este documento describe la arquitectura del sistema de clusters temáticos implementado en el blog de Cleriontax para optimizar la visibilidad en sistemas de IA (Google AI Overview, ChatGPT Search, Perplexity) y mejorar el SEO semántico.

## Objetivos

1. **Transform Blog → Knowledge Base**: Convertir artículos narrativos en piezas de referencia técnicas
2. **AI-Optimized Content**: Estructurar contenido para fácil extracción por sistemas de IA
3. **Semantic SEO**: Organizar contenido en clusters temáticos relacionados
4. **Internal Linking**: Fortalecer la estructura de enlaces internos mediante related posts

## Estructura del Sistema

### 1. Archivos de Configuración

#### `clusters-config.json`
Define los 4 clusters temáticos con:
- Nombres multiidioma (es/en/ca)
- Descripciones SEO-optimizadas
- Keywords específicos por cluster
- AI Prompts (preguntas comunes que IA debería responder)

**Clusters definidos:**
- `fiscalidad-criptomonedas` (9 posts)
- `fiscalidad-defi-avanzada` (0 posts, futuro)
- `ingenieria-datos-fiscalidad` (2 posts)
- `guias-practicas-especificas` (0 posts, futuro)

#### `metadata.json`
Contiene metadata de todos los posts con campos agregados:
- `cluster`: ID del cluster al que pertenece
- `relatedPosts`: Array de IDs de posts relacionados dentro del cluster
- `aiOptimized`: Boolean indicando si el post está optimizado para IA

#### `clusters-index.json`
Índice maestro que consolida:
- Lista completa de clusters
- Posts por cluster
- Estadísticas de optimización
- Next steps para completar el proyecto

### 2. Tipos TypeScript (`lib/blog.ts`)

```typescript
export interface BlogPost {
  // ... campos existentes
  cluster?: string;
  relatedPosts?: string[];
  aiOptimized?: boolean;
}
```

### 3. Lógica de Related Posts (`app/[locale]/blog/[slug]/page.tsx`)

**Priorización:**
1. **Primero**: Posts relacionados definidos en `metadata.json` (mismo cluster)
2. **Fallback**: Posts por categoría/tags (lógica anterior)

```typescript
// Priorizar posts del cluster
if (post.relatedPosts && post.relatedPosts.length > 0) {
  relatedPosts = allPostsWithContent
    .filter(p => post.relatedPosts?.includes(p.slug.replace(/^.*\//, '')))
    .slice(0, 3);
}

// Fallback si no hay suficientes
if (relatedPosts.length < 3) {
  // Completar con posts por categoría/tags
}
```

## Formato de Posts AI-Optimized

Los posts reestructurados siguen este patrón:

### 1. Definición Clara (Inicio)
```markdown
## Definición: [Tema] a efectos fiscales

[Definición técnica precisa]

**Criterio oficial AEAT**: [Criterio específico]

**Consecuencia fiscal clave**: [Implicación principal]
```

### 2. Datos Clave (Bullets)
```markdown
## Datos clave sobre [tema]

- **Clasificación fiscal**: [tipo]
- **Modelo aplicable**: [modelo]
- **Tributación**: [porcentajes]
- **Plazo**: [fechas]
...
```

### 3. Marco Legal
Subsecciones con criterios AEAT, consultas vinculantes, normativa aplicable.

### 4. Guías Paso a Paso
Procedimientos numerados con ejemplos de cálculo exactos.

### 5. Casos Prácticos
Ejemplos completos con números reales y cálculos detallados.

### 6. Errores Frecuentes
Estructura: Error → Realidad → Consecuencia → Solución

### 7. FAQ Completa
15-20 preguntas en formato Q&A fácilmente extractable.

### 8. Bloques de Código y Cálculos
```
Operación: [descripción]
Cálculo:
- Variable 1: X€
- Variable 2: Y€
Resultado: Z€
```

## Estado Actual del Proyecto

### ✅ Completado

- [x] Definición de 4 clusters temáticos
- [x] Creación de `clusters-config.json`
- [x] Actualización de `metadata.json` (11 posts con cluster y relatedPosts)
- [x] Actualización de interface TypeScript `BlogPost`
- [x] Creación de `clusters-index.json`
- [x] Actualización de lógica related posts en página de blog
- [x] Reestructuración AI-optimized de 2 posts ejemplo:
  - `stablecoins-tributacion-espana-mito.json` ✅
  - `mineria-criptomonedas-fiscalidad-espana.json` ✅

### 🔄 En Progreso

- [ ] Reestructuración de 9 posts restantes del Cluster 1
- [ ] Reestructuración de 2 posts del Cluster 3

### 📋 Pendiente

- [ ] Creación de componente visual para mostrar cluster del post
- [ ] Página índice de clusters (`/blog/clusters`)
- [ ] Creación de contenido para clusters vacíos
- [ ] Medición de AI citation rates
- [ ] A/B testing de formato AI-optimized vs narrativo

## Cómo Reestructurar un Post

### Paso 1: Leer el post actual
```bash
cat messages/blog-posts/es/[post-id].json
```

### Paso 2: Aplicar estructura AI-optimized

1. **Inicio**: Definición técnica + datos clave (bullets)
2. **Cuerpo**: Marco legal + guías paso a paso + casos prácticos
3. **Errores**: Lista estructurada Error/Realidad/Consecuencia/Solución
4. **FAQ**: 15-20 preguntas Q&A
5. **Final**: CTA + Disclaimer + Metadatos

### Paso 3: Verificar elementos clave

- [ ] Definición clara primeras 3 líneas
- [ ] Datos clave en bullets fácilmente escaneables
- [ ] Ejemplos con números exactos
- [ ] Casos prácticos completos
- [ ] FAQ extractable
- [ ] Tono técnico-experto (no narrativo)
- [ ] Bloques cortos citables (<150 palabras)

### Paso 4: Actualizar metadata.json

```json
{
  "id": "post-id",
  "cluster": "fiscalidad-criptomonedas",
  "relatedPosts": ["post-1", "post-2", "post-3"],
  "aiOptimized": true
}
```

## Ejemplos de Transformación

### ❌ Antes (Narrativo)
```
Imagina esta situación: Compraste Bitcoin a 30.000€ y ahora vale 60.000€.
El mercado parece inestable y decides «proteger» tus ganancias convirtiéndolas
a USDT. No has vendido a euros, solo has pasado a una moneda estable...
```

### ✅ Después (AI-Optimized)
```
## Definición: Conversión BTC → USDT a efectos fiscales

**Operación**: BTC → USDT es una permuta entre dos criptomonedas que genera
hecho imponible.

**Tributación**: Ganancia patrimonial en base del ahorro (19%-30%).

**Ejemplo de cálculo**:
Compra: 1 BTC a 30.000€
Conversión: 1 BTC → USDT cuando BTC = 60.000€
Ganancia patrimonial: 30.000€
Impuesto (tramo 21%): 6.300€
```

## Métricas de Éxito

### Indicadores técnicos
- **AI Optimization Rate**: 2/11 posts (18%) → Target: 100%
- **Cluster Coverage**: 2/4 clusters activos (50%) → Target: 100%
- **Average FAQ Questions**: 15 per post → Target: 15-20

### Indicadores de negocio
- **AI Citation Rate**: Por medir (Google AI Overview, ChatGPT, Perplexity)
- **Organic Traffic**: Por comparar pre/post optimización
- **Time on Page**: Por medir (expectativa: +30%)
- **Bounce Rate**: Por medir (expectativa: -20%)

## Mantenimiento

### Actualización de posts existentes
```bash
# 1. Identificar post a actualizar
# 2. Aplicar estructura AI-optimized
# 3. Actualizar aiOptimized: true en metadata.json
# 4. Verificar build: npm run build
# 5. Commit: "feat: AI-optimize [post-name]"
```

### Creación de nuevos posts
1. Escribir directamente en formato AI-optimized
2. Asignar a cluster existente o crear nuevo
3. Definir 3 related posts del mismo cluster
4. Marcar `aiOptimized: true` desde inicio
5. Incluir en `clusters-index.json`

## Scripts Útiles

### Verificar integridad del sistema
```bash
# Contar posts AI-optimized
grep -r "aiOptimized.*true" messages/blog-posts/metadata.json | wc -l

# Listar posts sin cluster
grep -A5 '"cluster":' messages/blog-posts/metadata.json | grep 'null'

# Verificar build
npm run build
```

### Actualizar índice maestro
```javascript
// update-cluster-index.js
const metadata = require('./messages/blog-posts/metadata.json');
const index = require('./messages/blog-posts/clusters-index.json');

// Recalcular stats
index.stats.aiOptimizedPosts = metadata.posts.filter(p => p.aiOptimized).length;
index.stats.optimizationProgress =
  `${Math.round((index.stats.aiOptimizedPosts / metadata.posts.length) * 100)}%`;
```

## Referencias

- **Documentación Next.js**: https://nextjs.org/docs
- **Schema.org BlogPosting**: https://schema.org/BlogPosting
- **Google AI Overview**: https://blog.google/products/search/generative-ai-search/
- **Semantic SEO Guide**: Internal wiki

## Contacto

Para dudas sobre la arquitectura de clusters:
- **Equipo**: Cleriontax Engineering
- **Última actualización**: 2025-01-21
- **Versión**: 1.0

---

**Nota**: Este sistema está en evolución continua. Se recomienda revisar este README antes de realizar cambios estructurales al blog.
