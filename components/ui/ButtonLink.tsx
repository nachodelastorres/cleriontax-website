"use client";

import { Link } from "@/i18n/navigation";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Botón de enlace — Manual de marca §17.
 *
 * «Un titular, una frase de apoyo, una acción principal en rojo y una
 *  secundaria en contorno azul. Nunca dos botones del mismo peso.»
 *
 * De ahí que las variantes se llamen por su papel en la página y no por un
 * color: en un bloque solo puede haber una `principal`.
 *
 * §12 — Sin esquinas redondeadas y sin animación al pasar el ratón: el estado
 * hover cambia color, nunca escala ni desplaza.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rojo focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        /** Acción principal. Una por bloque. */
        principal: "bg-rojo text-blanco hover:bg-rojo/90",
        /** Acción secundaria sobre fondo claro. */
        secundaria: "border-2 border-azul text-azul hover:bg-azul hover:text-blanco",
        /** Acción secundaria sobre azul o sobre fotografía oscura. */
        "secundaria-inversa":
          "border-2 border-blanco text-blanco hover:bg-blanco hover:text-azul",
        /** Enlace de apoyo, sin peso de botón. */
        ghost: "text-azul hover:bg-papel",
      },
      size: {
        sm: "h-9 px-4 text-nota",
        md: "h-11 px-6 text-lectura",
        lg: "h-14 px-8 text-subtitulo",
      },
    },
    defaultVariants: {
      variant: "principal",
      size: "md",
    },
  }
);

export interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
}: ButtonLinkProps) {
  const clases = cn(buttonVariants({ variant, size, className }));

  // Anclas y esquemas (tel:, mailto:) no llevan prefijo de idioma.
  if (href.startsWith("#") || /^[a-z]+:/i.test(href)) {
    return (
      <a href={href} className={clases}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={clases}>
      {children}
    </Link>
  );
}
