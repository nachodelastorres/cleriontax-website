# Guía: Cómo Actualizar el Sitemap en Google Search Console

## 📋 Resumen de Páginas Nuevas Añadidas

Se han añadido **15 nuevas URLs** al sitemap (5 páginas × 3 idiomas):

### 1. Índice de Clusters
- `/es/blog/clusters`
- `/en/blog/clusters`
- `/ca/blog/clusters`

### 2. Cluster: Fiscalidad Criptomonedas
- `/es/blog/tema/fiscalidad-criptomonedas`
- `/en/blog/tema/fiscalidad-criptomonedas`
- `/ca/blog/tema/fiscalidad-criptomonedas`

### 3. Cluster: Fiscalidad DeFi Avanzada (NUEVO)
- `/es/blog/tema/fiscalidad-defi-avanzada`
- `/en/blog/tema/fiscalidad-defi-avanzada`
- `/ca/blog/tema/fiscalidad-defi-avanzada`

### 4. Cluster: Ingeniería de Datos Fiscalidad
- `/es/blog/tema/ingenieria-datos-fiscalidad`
- `/en/blog/tema/ingenieria-datos-fiscalidad`
- `/ca/blog/tema/ingenieria-datos-fiscalidad`

### 5. Cluster: Guías Prácticas Específicas
- `/es/blog/tema/guias-practicas-especificas`
- `/en/blog/tema/guias-practicas-especificas`
- `/ca/blog/tema/guias-practicas-especificas`

---

## 🔧 Pasos para Actualizar en Google Search Console

### Opción 1: Envío Automático (Recomendado)

Google Search Console descubrirá automáticamente el sitemap actualizado, pero puedes acelerar el proceso:

1. **Accede a Google Search Console**
   - Ve a: https://search.google.com/search-console
   - Selecciona tu propiedad: `cleriontax.com`

2. **Ve a la sección "Sitemaps"**
   - En el menú lateral izquierdo, haz clic en **"Sitemaps"**
   - Verás el sitemap existente: `https://cleriontax.com/sitemap.xml`

3. **Solicita re-rastreo del sitemap**
   - Localiza el sitemap existente en la lista
   - Haz clic en el sitemap `sitemap.xml`
   - Google mostrará las estadísticas actuales
   - **No necesitas hacer nada más** - Google lo rastreará automáticamente en las próximas horas

### Opción 2: Forzar Re-rastreo (Más Rápido)

Si quieres acelerar el proceso:

1. **Elimina el sitemap antiguo (opcional)**
   - En la página de Sitemaps, haz clic en los 3 puntos `⋮` junto a `sitemap.xml`
   - Selecciona **"Eliminar sitemap"**

2. **Vuelve a enviar el sitemap**
   - En la parte superior, donde dice **"Añadir un sitemap nuevo"**
   - Escribe: `sitemap.xml`
   - Haz clic en **"ENVIAR"**

3. **Espera la confirmación**
   - Google confirmará que el sitemap se ha enviado
   - El estado cambiará a **"Correcto"** después del rastreo (puede tardar unas horas)

---

## 🚀 Indexación Rápida de Páginas Específicas (Opcional)

Para indexar las nuevas páginas de clusters más rápidamente:

### Método 1: Inspección de URL

1. **Accede a "Inspección de URL"** (icono de lupa en la parte superior)

2. **Inspecciona cada página nueva:**
   ```
   https://cleriontax.com/es/blog/clusters
   https://cleriontax.com/es/blog/tema/fiscalidad-defi-avanzada
   https://cleriontax.com/es/blog/tema/fiscalidad-criptomonedas
   https://cleriontax.com/es/blog/tema/ingenieria-datos-fiscalidad
   https://cleriontax.com/es/blog/tema/guias-practicas-especificas
   ```

3. **Solicita indexación**
   - Tras inspeccionar cada URL, haz clic en **"Solicitar indexación"**
   - Google la añadirá a la cola de rastreo prioritario
   - **Límite**: Puedes solicitar unas 10-20 URLs al día

### Método 2: Publicación en Redes Sociales

Compartir las URLs en redes sociales (Twitter, LinkedIn) ayuda a que Google las descubra más rápido.

---

## ⏱️ Tiempos de Rastreo Esperados

- **Sitemap automático**: 24-72 horas
- **Re-envío manual de sitemap**: 12-48 horas  
- **Solicitud de indexación por URL**: 1-7 días (prioritario)

---

## ✅ Verificación de Indexación

Después de 3-7 días, verifica que las páginas estén indexadas:

### Método 1: Búsqueda en Google
```
site:cleriontax.com/es/blog/clusters
site:cleriontax.com/es/blog/tema/fiscalidad-defi-avanzada
```

### Método 2: Google Search Console
- Ve a **"Rendimiento"**
- Filtra por **"Página"**
- Busca las nuevas URLs de clusters

---

## 📊 URLs del Sitemap Actualizadas

**Sitemap principal:**
- https://cleriontax.com/sitemap.xml

**Total de URLs en el sitemap:**
- Páginas estáticas: 18 (6 páginas × 3 idiomas)
- Servicios: 12 (4 servicios × 3 idiomas)
- Posts de blog: 36 (12 posts × 3 idiomas)
- Clusters temáticos: 15 (5 clusters × 3 idiomas)
- **TOTAL: ~81 URLs**

---

## 🎯 Resumen - Acción Recomendada

**Lo más simple y efectivo:**

1. Ve a https://search.google.com/search-console
2. Selecciona tu propiedad `cleriontax.com`
3. Ve a **"Sitemaps"** en el menú lateral
4. Verifica que `sitemap.xml` está enviado
5. **¡Listo!** - Google rastreará automáticamente las nuevas páginas en 24-72h

**Opcional para indexación más rápida:**
- Usa "Inspección de URL" para solicitar indexación de las 5 páginas de clusters principales (versión ES)

---

## 📞 Soporte

Si tienes algún problema o las páginas no se indexan después de 7 días, revisa:
- Estado del sitemap en Google Search Console
- Errores de rastreo en la sección "Cobertura"
- Robots.txt: https://cleriontax.com/robots.txt
