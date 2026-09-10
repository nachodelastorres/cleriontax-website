import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-nota font-semibold text-azul mb-2">
            {label}
            {props.required && <span className="text-rojo ml-1">*</span>}
          </label>
        )}
        <input
          className={cn(
            "w-full border border-niebla bg-blanco px-4 py-2.5 text-azul placeholder:text-pizarra",
            "focus:border-rojo focus:outline-none focus:ring-2 focus:ring-rojo/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rojo focus:border-rojo focus:ring-rojo/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-nota text-rojo">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
