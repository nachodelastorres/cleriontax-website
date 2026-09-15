# Actualización de Paleta de Colores - Cleriontax

## Colores de Marca

Se ha actualizado toda la aplicación con la paleta de colores oficial de Cleriontax:

### Colores Principales
- **Azul Oscuro**: `#050a30` - Color principal de la marca
- **Rojo**: `#dc2618` - Color de acento/CTA
- **Blanco**: `#FFFFFF` - Color de texto en fondos oscuros

## Cambios Realizados

### 1. Configuración Tailwind (`tailwind.config.ts`)
Se ha actualizado completamente la paleta de colores con:

#### Color Primary (Azul Oscuro)
- `primary-DEFAULT`: `#050a30`
- Escala completa: 50-900 para mayor flexibilidad
- Gradientes: `bg-gradient-primary`, `bg-gradient-hero`

#### Color Accent (Rojo)
- `accent-DEFAULT`: `#dc2618`
- Escala completa: 50-900
- Gradiente: `bg-gradient-accent`

#### Neutrales
- Escala de grises mejorada: 50-900
- Mejor contraste y accesibilidad

### 2. Componentes Actualizados

#### Navbar (`components/layout/Navbar.tsx`)
- Logo con variante oscura integrado
- Enlaces en `primary-800`
- Hover en `accent`
- CTA con variante `secondary` (rojo)
- Menú móvil actualizado con nuevos colores
- Sombra sutil añadida

#### Footer (`components/layout/Footer.tsx`)
- Fondo con gradiente sutil `from-neutral-50 to-primary-50/30`
- Logo integrado
- Títulos en `primary`
- Hover effects en `accent`
- Animaciones en iconos de contacto

#### Hero (`components/home/Hero.tsx`)
- Fondo con gradiente `from-white via-primary-50/10 to-accent-50/10`
- Badge con borde y fondo en `accent`
- Título en `primary-800`
- CTA principal en rojo (`secondary`)
- CTA secundario con outline
- Stats con gradiente de texto `from-primary to-accent`
- Elementos decorativos animados con blur

#### Benefits (`components/home/Benefits.tsx`)
- Fondo con gradiente `from-white to-primary-50/20`
- Iconos alternando entre `primary` y `accent`
- Título en `primary-800`

#### ServiceSteps (`components/home/ServiceSteps.tsx`)
- Fondo con gradiente `from-primary-50/20 to-white`
- Iconos con colores de marca
- Título en `primary-800`

#### CTASection (`components/home/CTASection.tsx`)
- Fondo con gradiente `from-primary-800 via-primary-700 to-accent-900`
- Elementos decorativos animados
- Botones con efectos mejorados
- Indicadores de confianza con check en `accent-light`

### 3. Componentes UI

#### ButtonLink (`components/ui/ButtonLink.tsx`)
Ya estaba usando las variables correctas, ahora apuntan a:
- `primary`: Azul oscuro `#050a30`
- `secondary`: Rojo `#dc2618` (nuevo)
- `outline`: Borde en primary
- `ghost`: Hover sutil

#### Logo (`components/ui/Logo.tsx`)
- Componente reutilizable creado
- Soporte para variantes `light` y `dark`
- Tipos `full` (con texto) e `icon` (solo símbolo)
- Integrado en Navbar y Footer

## Características del Diseño

### Gradientes
Se han añadido gradientes personalizados:
- `bg-gradient-primary`: Azul oscuro
- `bg-gradient-accent`: Rojo
- `bg-gradient-hero`: Combinación azul-rojo

### Animaciones
- Elementos decorativos con `animate-pulse`
- Transiciones suaves en hover
- Gradientes de texto en estadísticas
- Efectos de escala en iconos

### Accesibilidad
- Contraste mejorado en todos los textos
- Escala completa de colores (50-900)
- Estados de hover claros
- Focus rings visibles

## Resultado Visual

La web ahora presenta:
- ✅ Identidad de marca coherente con azul oscuro (`#050a30`) y rojo (`#dc2618`)
- ✅ Gradientes sutiles que añaden profundidad
- ✅ CTAs destacados en rojo para maximizar conversión
- ✅ Elementos decorativos animados
- ✅ Mejor jerarquía visual
- ✅ Diseño moderno y profesional

## Testing

El servidor de desarrollo está corriendo en:
**http://localhost:3000**

Puedes verificar los cambios navegando por:
- `/es` - Página principal
- `/es/servicios` - Servicios
- `/es/contacto` - Contacto
- `/es/sobre-nosotros` - Sobre nosotros

## Archivos Modificados

1. `tailwind.config.ts` - Paleta de colores completa
2. `components/layout/Navbar.tsx` - Navbar con nuevos colores
3. `components/layout/Footer.tsx` - Footer con gradiente
4. `components/home/Hero.tsx` - Hero section rediseñada
5. `components/home/Benefits.tsx` - Sección beneficios
6. `components/home/ServiceSteps.tsx` - Pasos del servicio
7. `components/home/CTASection.tsx` - Call to action mejorada
8. `app/[locale]/layout.tsx` - Favicon y meta tags

## Próximos Pasos Sugeridos

1. Revisar las demás páginas (servicios, contacto, sobre-nosotros) y aplicar los mismos principios de color
2. Añadir las ilustraciones que faltan en `/public/images/illustrations/`
3. Considerar añadir modo oscuro usando la variante `light` de los logos
4. Optimizar las imágenes del logo para mejor rendimiento
