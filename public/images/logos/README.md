# Logos Cleriontax

Esta carpeta contiene los logos oficiales de Cleriontax en diferentes variantes.

## Archivos disponibles:

### Logos completos (con texto)
- `logo_fondo_blanco.svg` / `.png` - Logo para usar en fondos oscuros (elementos blancos)
- `logo_fondo_oscuro.svg` / `.png` - Logo para usar en fondos claros (elementos oscuros)
- `logo_fondo_transparente.svg` / `.png` - Logo con fondo transparente

### Iconos (solo símbolo)
- `icono_fondo_blanco.svg` / `.png` - Icono para fondos oscuros
- `icono_fondo_oscuro.svg` / `.png` - Icono para fondos claros
- `icono_fondo_transparente.svg` / `.png` - Icono con fondo transparente

## Uso en el código:

### Componente Logo
Se ha creado un componente reutilizable `components/ui/Logo.tsx`:

```tsx
import Logo from '@/components/ui/Logo';

// Logo transparente (recomendado)
<Logo variant="transparent" type="full" />

// Logo para fondos claros
<Logo variant="dark" type="full" />

// Logo para fondos oscuros
<Logo variant="light" type="full" />

// Solo icono
<Logo variant="transparent" type="icon" />

// Con link
<Logo variant="transparent" type="full" href="/es" />

// Tamaño personalizado
<Logo variant="transparent" type="full" height={40} />
```

### Ubicaciones actuales:
- **Navbar** (`components/layout/Navbar.tsx`): Logo transparente
- **Footer** (`components/layout/Footer.tsx`): Logo transparente
- **Favicon**: Icono transparente en `app/icon.svg` y `app/apple-icon.png`
- **Meta tags**: Configurado en `app/[locale]/layout.tsx` para OpenGraph y SEO

## Características:
- Formato SVG para máxima calidad y escalabilidad
- PNG de alta resolución disponible
- Variantes para diferentes tipos de fondos
- Optimizados para web
