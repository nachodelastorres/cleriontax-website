import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-neutral-200/50 bg-white p-6 shadow-md relative overflow-hidden",
          "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-accent/20 before:via-transparent before:to-primary/20 before:-z-10",
          "after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-accent/30 after:to-transparent",
          hover && "transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 hover:border-accent/30 hover:scale-[1.02]",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export default Card;
