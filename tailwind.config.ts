import type { Config } from "tailwindcss";

/**
 * Sistema de diseño Cleriontax — derivado del Manual de marca v1.0.
 *
 * Reglas que este fichero hace cumplir:
 *  §10 Color        Dos colores de marca (azul y rojo), neutros y dos colores de estado.
 *                   El rojo es acento: si una pieza tiene más rojo que azul, está mal.
 *  §11 Tipografía   Plus Jakarta Sans para todo, IBM Plex Mono solo para datos.
 *  §12 Bordes       Esquinas rectas siempre. El único radio de la marca es el arco
 *                   del símbolo, y solo aparece en el símbolo.
 *  §12 Fondos       Color plano o el patrón isométrico. Sin degradados.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Colores de marca (§10) ----
        azul: "#050A30", // Azul Cleriontax — 40 % de la superficie
        rojo: "#DC2618", // Rojo Señal — acento, ~10 %

        // ---- Neutros (§10) ----
        blanco: "#FFFFFF", // Fondo principal
        papel: "#F2F3F6", // Fondo secundario
        niebla: "#C9CCD6", // Líneas y estados inactivos
        pizarra: "#4A5A66", // Texto secundario

        // ---- Colores funcionales de estado (§10) ----
        // Solo describen el estado real de un dato. Nunca decoran.
        "verde-conciliado": "#17706A", // Estado: verificado
        "ambar-revision": "#D4941C", // Estado: requiere revisión
        // El ámbar no alcanza 4,5:1 sobre blanco: solo relleno o icono, nunca texto.

      },

      // ---- Escala tipográfica (§11) ----
      // Titulares con interletrado negativo; texto de lectura a 17/27.
      fontSize: {
        hero: ["52px", { lineHeight: "55px", letterSpacing: "-0.04em", fontWeight: "800" }],
        seccion: ["33px", { lineHeight: "38px", letterSpacing: "-0.03em", fontWeight: "700" }],
        subtitulo: ["21px", { lineHeight: "28px", letterSpacing: "-0.02em", fontWeight: "600" }],
        lectura: ["17px", { lineHeight: "27px" }],
        nota: ["14px", { lineHeight: "22px" }],
        dato: ["13px", { lineHeight: "20px" }],
      },

      fontFamily: {
        // Familia principal: todo el texto.
        sans: ["var(--font-jakarta)", "system-ui", "-apple-system", "sans-serif"],
        // Familia de datos: cifras, importes, hashes, modelos, fechas en tabla.
        // Es la principal; lo que la distingue son las cifras tabulares, que
        // globals.css activa en toda clase font-dato.
        dato: ["var(--font-jakarta)", "system-ui", "-apple-system", "sans-serif"],
        // Sin monoespaciada en todo el sitio, código del blog incluido. Tailwind
        // aplica esta familia por defecto a code, pre, kbd y samp: apunta a la
        // principal para que ninguna monoespaciada se cuele por ahí.
        mono: ["var(--font-jakarta)", "system-ui", "-apple-system", "sans-serif"],
      },

      // ---- Esquinas rectas (§12) ----
      // Toda la escala a cero: neutraliza el radio en todo el sitio de una vez,
      // incluidas las clases rounded-* que quedan pendientes de retirar.
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
    },
  },
  plugins: [],
};

export default config;
