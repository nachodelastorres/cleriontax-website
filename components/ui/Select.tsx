import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-nota font-semibold text-azul mb-2">
            {label}
            {props.required && <span className="text-rojo ml-1">*</span>}
          </label>
        )}
        <select
          className={cn(
            "w-full border border-niebla bg-blanco px-4 py-2.5 text-azul",
            "focus:border-rojo focus:outline-none focus:ring-2 focus:ring-rojo/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rojo focus:border-rojo focus:ring-rojo/20",
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1.5 text-nota text-rojo">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
