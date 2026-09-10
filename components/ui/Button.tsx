import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Botón — Manual de marca §17. Mismas variantes que ButtonLink, para que un
 * envío de formulario y un enlace de acción pesen igual en la página.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rojo focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
