# Fuentes / Fonts

Coloca aquí archivos de fuentes personalizadas (si las tienes).

## Nota importante:
**Actualmente el proyecto usa Google Fonts (Inter)** que se carga automáticamente.

## Si quieres usar fuentes custom:

### Formatos necesarios:
Para máxima compatibilidad, incluye:
- `.woff2` (formato moderno, más ligero) ⭐ Prioridad
- `.woff` (fallback para navegadores antiguos)
- `.ttf` o `.otf` (opcional)

### Estructura de archivos:
```
/fonts
  /inter (ejemplo)
    inter-regular.woff2
    inter-medium.woff2
    inter-semibold.woff2
    inter-bold.woff2
  /tu-fuente
    tu-fuente-regular.woff2
    tu-fuente-bold.woff2
```

## Pesos recomendados para incluir:
- **400** (Regular) - Texto normal
- **500** (Medium) - Botones, énfasis leve
- **600** (Semibold) - Subtítulos
- **700** (Bold) - Títulos principales

No incluyas todos los pesos (100-900) para mantener la web rápida.

## Cómo integrarlas:

### 1. Coloca los archivos aquí
Ejemplo: `/public/fonts/mi-fuente/mi-fuente-regular.woff2`

### 2. Actualiza globals.css
Añade al principio de `app/globals.css`:

```css
@font-face {
  font-family: 'MiFuente';
  src: url('/fonts/mi-fuente/mi-fuente-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'MiFuente';
  src: url('/fonts/mi-fuente/mi-fuente-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### 3. Actualiza tailwind.config.ts
```typescript
fontFamily: {
  sans: ['MiFuente', 'sans-serif'],
},
```

## Fuente actual:
**Inter** de Google Fonts
- Se carga desde: `app/layout.tsx`
- Configurada en: `tailwind.config.ts`
- Pesos usados: 400, 500, 600, 700

## Licencias:
⚠️ **Asegúrate de tener licencia** para usar las fuentes en web.
- Google Fonts = Gratis y de código abierto
- Fuentes comerciales = Verifica la licencia web

## Herramientas útiles:
- **Convertir TTF/OTF a WOFF2**: transfonter.org
- **Optimizar fuentes**: fontsquirrel.com/tools/webfont-generator
- **Subset de fuentes**: glyphanger (reduce tamaño, solo caracteres usados)
