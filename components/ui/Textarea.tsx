import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-nota font-semibold text-azul mb-2">
            {label}
            {props.required && <span className="text-rojo ml-1">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            "w-full border border-niebla bg-blanco px-4 py-2.5 text-azul placeholder:text-pizarra",
            "focus:border-rojo focus:outline-none focus:ring-2 focus:ring-rojo/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-vertical min-h-[120px]",
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

Textarea.displayName = "Textarea";

export default Textarea;
