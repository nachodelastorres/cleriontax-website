import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta estricta - Solo estos colores
        'burgundy-dark': '#7b1923',    // Burgundy oscuro
        'red': '#dc2618',              // Rojo principal
        'navy': '#1b2042',             // Azul marino oscuro
        'plum': '#3b112a',             // Ciruela oscuro
        'gray-blue-light': '#acadba',  // Gris azulado claro
        'gray-blue': '#535671',        // Gris azulado medio
        'navy-darker': '#0d1236',      // Azul marino muy oscuro

        // Aliases para mantener compatibilidad
        primary: {
          DEFAULT: '#1b2042',  // Navy como principal
          dark: '#0d1236',     // Navy más oscuro
          light: '#535671',    // Gris azulado para variaciones
        },
        accent: {
          DEFAULT: '#dc2618',  // Rojo como acento
          dark: '#7b1923',     // Burgundy para hover
          light: '#dc2618',    // Mismo rojo
        },
        dark: {
          DEFAULT: '#1b2042',  // Navy
          light: '#535671',    // Gris azulado
          darker: '#0d1236',   // Navy muy oscuro
        },
        // Escala de grises neutral
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#acadba',      // De la paleta
          500: '#8a8c9e',
          600: '#535671',      // De la paleta
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Estados
        success: '#10b981',
        warning: '#f59e0b',
        error: '#dc2618',
        info: '#1b2042',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1b2042 0%, #0d1236 100%)',
        'gradient-accent': 'linear-gradient(135deg, #dc2618 0%, #7b1923 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1b2042 0%, #0d1236 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1b2042 0%, #0d1236 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
