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
        // Color principal - Azul oscuro Cleriontax
        primary: {
          DEFAULT: '#050a30', // Azul oscuro principal
          light: '#0a1454',   // Variante más clara
          dark: '#020515',    // Variante más oscura
          50: '#f0f1f9',
          100: '#d9ddf0',
          200: '#b3bbe1',
          300: '#8d99d2',
          400: '#6777c3',
          500: '#4155b4',
          600: '#1b3397',
          700: '#0f2170',
          800: '#050a30',     // Principal
          900: '#020515',
        },
        // Color de acento - Dorado/Ámbar elegante
        accent: {
          DEFAULT: '#d4a574', // Dorado principal
          light: '#e3c4a0',   // Variante más clara
          dark: '#c9a067',    // Variante más oscura
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe0d1',
          300: '#e0cfba',
          400: '#d4a574',     // Principal
          500: '#c9a067',
          600: '#b8915d',
          700: '#9a7a4f',
          800: '#735c3b',
          900: '#4d3e28',
        },
        // Color secundario - Verde azulado (Teal)
        secondary: {
          DEFAULT: '#14b8a6', // Teal principal
          light: '#2dd4bf',   // Variante más clara
          dark: '#0d9488',    // Variante más oscura
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',     // Principal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Escala de grises mejorada
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Estados
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',   // Rojo más suave para errores
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #050a30 0%, #0a1454 100%)',
        'gradient-accent': 'linear-gradient(135deg, #d4a574 0%, #e3c4a0 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)',
        'gradient-hero': 'linear-gradient(135deg, #050a30 0%, #0f2170 50%, #14b8a6 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
