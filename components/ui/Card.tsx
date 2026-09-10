import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Realce al pasar el ratón. Solo cambia el color del borde (§12). */
  hover?: boolean;
}

/**
 * Tarjeta — Manual de marca §12.
 *
 * Esquinas rectas, borde de una línea y fondo plano. Sin sombras, sin bordes
 * en degradado y sin desplazamiento ni escala al pasar el ratón: el único
 * movimiento autorizado de la marca es la entrada de los cuatro cuadrantes.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border border-niebla bg-blanco p-6",
          hover && "transition-colors duration-200 hover:border-azul",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export default Card;
