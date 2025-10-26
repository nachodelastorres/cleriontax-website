# Cleriontax

Sitio web profesional para Cleriontax, consultoría especializada en análisis de datos y fiscalidad para inversores y usuarios con carteras de activos y criptoactivos.

## Tecnologías

- **Next.js 14+** - React Framework con App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos

## Comenzar

Primero, instala las dependencias:

```bash
npm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página home
│   └── globals.css        # Estilos globales
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Componentes de la home
│   └── ui/                # Componentes UI reutilizables
├── lib/                   # Utilidades y helpers
└── public/                # Assets estáticos
```

## Paleta de Colores

- **Primary**: #1B263B (Azul marino)
- **Accent**: #66C7A9 (Verde menta)
- **Neutral**: #EAEAEA (Gris claro)

## Scripts

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la build de producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Deploy

La forma más fácil de hacer deploy es usando [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/cleriontax)
