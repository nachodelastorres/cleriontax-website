import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * La escala tipográfica del manual (§11) genera clases `text-hero`,
 * `text-seccion`, `text-subtitulo`, `text-lectura`, `text-nota` y `text-dato`.
 *
 * tailwind-merge no las conoce, así que las clasifica como color de texto y
 * descarta el color anterior: `text-blanco ... text-lectura` acababa perdiendo
 * el blanco y el botón heredaba el color del enlace. Se registran aquí como
 * tamaños de fuente para que convivan con el color.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["hero", "seccion", "subtitulo", "lectura", "nota", "dato"],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
