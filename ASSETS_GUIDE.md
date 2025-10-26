# Guía de Assets - Cleriontax

## 📁 Estructura de Carpetas Creada

```
public/
├── images/
│   ├── logos/          ← Logos de la empresa
│   ├── illustrations/  ← Ilustraciones principales
│   ├── icons/          ← Iconos custom (opcional)
│   ├── team/           ← Fotos del equipo
│   ├── bg/             ← Fondos y patrones
│   ├── services/       ← Imágenes de servicios
│   └── testimonials/   ← Fotos de clientes/testimonios
└── fonts/              ← Fuentes personalizadas
```

---

## 🎯 Prioridades (Qué subir primero)

### ⭐ Alta Prioridad
1. **Logo principal** → `public/images/logos/logo.svg`
2. **Favicon** → `public/images/logos/favicon.ico`
3. **Ilustración Hero** → `public/images/illustrations/hero-main.svg`

### 📌 Media Prioridad
4. **Fotos del equipo** → `public/images/team/`
5. **Ilustraciones adicionales** → `public/images/illustrations/`
6. **Logo blanco** (para footer oscuro) → `public/images/logos/logo-white.svg`

### 📎 Baja Prioridad
7. Fondos decorativos
8. Iconos custom
9. Fuentes custom
10. Testimonios

---

## 📋 Checklist de Assets

### Logos
- [ ] `logo.svg` - Logo principal (SVG preferido)
- [ ] `logo.png` - Logo PNG (fallback)
- [ ] `logo-white.svg` - Logo blanco para fondos oscuros
- [ ] `logo-icon.svg` - Solo símbolo/icono
- [ ] `favicon.ico` - Favicon (16x16, 32x32, 48x48px)
- [ ] `favicon.svg` - Favicon SVG
- [ ] `apple-touch-icon.png` - iOS icon (180x180px)
- [ ] `og-image.png` - Imagen redes sociales (1200x630px)

**Ubicación actual del placeholder**:
- Navbar: `components/layout/Navbar.tsx:26-30`
- Footer: `components/layout/Footer.tsx:20-24`

### Ilustraciones
- [ ] `hero-main.svg` - Ilustración principal del Hero
- [ ] `data-analysis.svg` - Análisis de datos
- [ ] `tax-report.svg` - Informes fiscales
- [ ] `security.svg` - Seguridad
- [ ] `process-flow.svg` - Diagrama de proceso

**Ubicación actual del placeholder**:
- Hero: `components/home/Hero.tsx:84-100`

### Fotos del Equipo
- [ ] Foto(s) de fundador/es
- [ ] Foto asesor fiscal
- [ ] Foto analista de datos
- [ ] (Opcional) Foto de equipo completo

**Formato**: JPG, 800x800px, < 200KB cada una

### Fuentes
- [ ] Fuente principal (si no usas Inter de Google)
- [ ] Pesos: Regular (400), Medium (500), Semibold (600), Bold (700)

**Fuente actual**: Inter (Google Fonts) - No requiere archivos

---

## 🛠️ Cómo Integrar los Assets

### 1️⃣ Subir Logo

**Paso 1**: Coloca tu logo en `public/images/logos/logo.svg`

**Paso 2**: Avísame y actualizaré:
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `app/layout.tsx` (favicon)

### 2️⃣ Subir Ilustración Hero

**Paso 1**: Coloca la imagen en `public/images/illustrations/hero-main.svg`

**Paso 2**: Avísame y actualizaré `components/home/Hero.tsx`

### 3️⃣ Subir Fotos del Equipo

**Paso 1**: Coloca las fotos en `public/images/team/`

Nombres sugeridos:
- `founder-1.jpg`
- `asesor-fiscal.jpg`
- `analista-datos.jpg`

**Paso 2**: Avísame si quieres que cree una sección "Nuestro Equipo"

---

## 📐 Especificaciones Técnicas

### Logos
| Archivo | Tamaño | Formato | Uso |
|---------|--------|---------|-----|
| logo.svg | Variable | SVG | Principal |
| favicon.ico | 16x16, 32x32 | ICO | Browser tab |
| apple-touch-icon.png | 180x180px | PNG | iOS bookmark |
| og-image.png | 1200x630px | PNG/JPG | Redes sociales |

### Ilustraciones
- **Formato**: SVG (preferido) o PNG
- **Tamaño**: Máximo 500KB
- **Colores**: Usar paleta Cleriontax (#1B263B, #66C7A9)

### Fotos
- **Tamaño**: 800x800px (equipo), 1920x1080px (backgrounds)
- **Formato**: JPG (fotografías), PNG (transparencia)
- **Peso**: < 200KB por imagen
- **Optimizar con**: TinyPNG.com, Squoosh.app

### Fuentes
- **Formato**: WOFF2 (prioritario), WOFF (fallback)
- **Pesos**: Solo los necesarios (400, 500, 600, 700)

---

## 🎨 Paleta de Colores (Referencia)

Para que las ilustraciones coincidan con el diseño:

```css
Primary (Azul marino): #1B263B
Primary Light:         #2D3E5F
Primary Dark:          #0F1621

Accent (Verde menta):  #66C7A9
Accent Light:          #8ED9C3
Accent Dark:           #4DA888

Neutral:
  - 50:  #FAFAFA
  - 100: #EAEAEA
  - 200: #D5D5D5
  - 800: #2A2A2A
  - 900: #1A1A1A

Error (Coral):         #FF6B6B
```

---

## 🚀 Proceso de Integración

### Opción A: Tú subes, yo integro
1. Tú colocas los archivos en las carpetas correspondientes
2. Me avisas qué archivos has subido
3. Yo actualizo el código para usarlos

### Opción B: Me pasas los archivos
1. Me compartes los archivos (Drive, Dropbox, etc.)
2. Yo los coloco y los integro en el código
3. Te confirmo cuando esté listo

---

## 📦 Herramientas Recomendadas

### Optimización de Imágenes
- **TinyPNG** - https://tinypng.com
- **Squoosh** - https://squoosh.app
- **ImageOptim** (Mac) - https://imageoptim.com

### Conversión de Formatos
- **CloudConvert** - https://cloudconvert.com
- **SVGOMG** (SVG optimizer) - https://jakearchibald.github.io/svgomg/

### Ilustraciones Gratis
- **unDraw** - https://undraw.co
- **Storyset** - https://storyset.com
- **DrawKit** - https://drawkit.com
- **Illustrations** - https://illustrations.co

### Iconos
- **Lucide** (ya instalado) - https://lucide.dev
- **Heroicons** - https://heroicons.com
- **Feather Icons** - https://feathericons.com

### Fuentes
- **Google Fonts** - https://fonts.google.com
- **Font Squirrel** - https://fontsquirrel.com
- **Transfonter** (conversión) - https://transfonter.org

---

## ✅ Estado Actual

### ✅ Ya implementado
- Sistema de colores
- Iconos (Lucide React)
- Fuente Inter (Google Fonts)
- Placeholders para logo e ilustraciones
- Estructura responsive

### ⏳ Pendiente (según tus assets)
- Logo definitivo
- Ilustraciones
- Fotos del equipo
- Favicon personalizado
- Imágenes OG para redes sociales

---

## 💡 Tips Importantes

1. **Optimiza siempre**: Las imágenes pesadas ralentizan la web
2. **Usa SVG cuando sea posible**: Escalable, ligero, nítido
3. **Nombres descriptivos**: `logo-cleriontax.svg` mejor que `img1.svg`
4. **Formatos modernos**: WebP/AVIF para fotos (Next.js lo hace automático)
5. **Lazy loading**: Next.js lo hace automáticamente con `<Image>`

---

## 📞 Próximos Pasos

1. **Revisa** cada carpeta y su README
2. **Prepara** los assets según las especificaciones
3. **Optimiza** las imágenes antes de subirlas
4. **Avísame** cuando tengas archivos listos
5. **Yo integro** y te confirmo

---

**¿Tienes los assets listos?** Solo avísame qué archivos subes y en qué carpeta, y los integro inmediatamente en el código. 🚀
