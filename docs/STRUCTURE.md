# Estructura del Proyecto Cleriontax

## Visión General

Sitio web profesional construido con Next.js 14 (App Router), TypeScript, TailwindCSS y Framer Motion. Diseñado para ofrecer servicios de análisis de datos y asesoramiento fiscal para inversores.

## Stack Tecnológico

- **Framework**: Next.js 16.0.0 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS 4.x
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Utilidades**: class-variance-authority, clsx, tailwind-merge

## Estructura de Directorios

```
Cleriontax/
├── app/                          # App Router de Next.js
│   ├── layout.tsx               # Layout raíz con Navbar y Footer
│   ├── page.tsx                 # Página principal (Home)
│   └── globals.css              # Estilos globales + Tailwind
│
├── components/
│   ├── layout/                  # Componentes de layout
│   │   ├── Navbar.tsx          # Navegación principal (sticky)
│   │   └── Footer.tsx          # Pie de página
│   │
│   ├── home/                    # Componentes específicos de Home
│   │   ├── Hero.tsx            # Sección hero con CTA
│   │   ├── Benefits.tsx        # Beneficios del servicio
│   │   ├── ServiceSteps.tsx    # Proceso en 4 pasos
│   │   └── CTASection.tsx      # Call to action final
│   │
│   └── ui/                      # Componentes UI reutilizables
│       ├── Button.tsx          # Botón estándar
│       ├── ButtonLink.tsx      # Botón como Link de Next.js
│       ├── Card.tsx            # Card con hover opcional
│       └── Container.tsx       # Container responsive
│
├── lib/
│   └── utils.ts                 # Función cn() para clsx + tailwind-merge
│
├── public/
│   └── images/                  # Assets estáticos
│
├── tailwind.config.ts           # Configuración TailwindCSS
├── tsconfig.json                # Configuración TypeScript
├── next.config.mjs              # Configuración Next.js
├── postcss.config.mjs           # Configuración PostCSS
└── package.json                 # Dependencias y scripts
```

## Componentes Principales

### Layout Components

#### Navbar (`components/layout/Navbar.tsx`)
- Navegación fija (sticky) con backdrop blur
- Menú desktop con links + botón CTA
- Menú móvil animado con Framer Motion
- Responsive: hamburger menu < 768px

#### Footer (`components/layout/Footer.tsx`)
- Grid de 4 columnas (responsive)
- Secciones: Brand, Empresa, Legal, Contacto
- Links a redes sociales y contacto
- Copyright dinámico

### Home Components

#### Hero (`components/home/Hero.tsx`)
- Grid 2 columnas (contenido + ilustración)
- Badge de especialidad
- Título principal H1
- 2 CTAs (primario + secundario)
- Estadísticas (500+ clientes, 10K+ transacciones, 99% precisión)
- Animaciones de entrada con Framer Motion

#### Benefits (`components/home/Benefits.tsx`)
- Grid de 4 beneficios principales
- Iconos con Lucide React
- Cards con hover effect
- Scroll animations

#### ServiceSteps (`components/home/ServiceSteps.tsx`)
- Proceso visual en 4 pasos
- Iconos personalizados por paso
- Línea conectora entre pasos (desktop)
- Números de paso con efecto decorativo

#### CTASection (`components/home/CTASection.tsx`)
- Fondo gradient oscuro (primary)
- Elementos decorativos con blur
- 2 botones CTA
- Trust indicators (sin compromiso, respuesta 24h, seguro)

### UI Components

#### Button/ButtonLink
- Variantes: primary, secondary, outline, ghost
- Tamaños: sm, md, lg
- States automáticos (hover, focus, disabled)
- ButtonLink: versión optimizada con Next.js Link

#### Card
- Prop `hover` para animación
- Bordes redondeados y sombra
- Fully customizable con className

#### Container
- Tamaños: sm, md, lg, full
- Padding responsive
- Max-width consistente

## Paleta de Colores

```javascript
primary: {
  DEFAULT: '#1B263B',  // Azul marino
  light: '#2D3E5F',
  dark: '#0F1621',
}
accent: {
  DEFAULT: '#66C7A9',  // Verde menta
  light: '#8ED9C3',
  dark: '#4DA888',
}
neutral: {
  50: '#FAFAFA',
  100: '#EAEAEA',
  200: '#D5D5D5',
  800: '#2A2A2A',
  900: '#1A1A1A',
}
error: '#FF6B6B'
```

## Tipografía

- **Font Family**: Inter (Google Fonts)
- **Headings**: Semibold, color primary
- **Body**: Regular, color neutral-900
- **Scale responsive**: 4xl → 6xl (títulos principales)

## Animaciones

Todas las animaciones usan Framer Motion:
- **Fade in + slide**: opacity 0→1, y: 20→0
- **Scale**: para ilustraciones (0.9→1)
- **Viewport trigger**: `whileInView` con `once: true`
- **Delays escalonados**: 0.1s entre elementos de lista

## SEO

- Metadata en `app/layout.tsx`
- Títulos semánticos (H1, H2, H3)
- Alt text en imágenes (placeholder actualmente)
- Estructura semántica (section, nav, footer)
- Open Graph tags configurados

## Responsive Design

Breakpoints (Tailwind):
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

Mobile-first approach:
- Stack vertical en móvil
- Grid 2-4 columnas en desktop
- Menú hamburguesa < md
- Font sizes escalables

## Scripts Disponibles

```bash
npm run dev      # Desarrollo (http://localhost:3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

## Próximos Pasos Sugeridos

1. **Páginas adicionales**:
   - `/servicios` - Detalle de planes con pricing
   - `/sobre-nosotros` - Equipo y valores
   - `/contacto` - Formulario completo con upload CSV
   - `/privacidad` y `/aviso-legal`

2. **Componentes adicionales**:
   - PricingCard para planes
   - ContactForm con validación
   - FileUpload para CSVs
   - Testimonials
   - FAQ accordion

3. **Funcionalidades**:
   - API route para envío de formulario
   - Integración con servicio de email (Resend/SendGrid)
   - Google Analytics
   - Sitemap.xml automático

4. **Assets**:
   - Logo definitivo (SVG)
   - Ilustraciones profesionales
   - Imágenes de equipo
   - Favicons

## Notas de Desarrollo

- El servidor se ejecuta en puerto 3001 si 3000 está ocupado
- TypeScript strict mode activado
- ESLint configurado con reglas de Next.js
- Turbopack habilitado por defecto en Next.js 16
