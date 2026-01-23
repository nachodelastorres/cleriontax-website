"use client";

import { Link } from "@/i18n/navigation";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary via-primary-light to-primary text-white shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] before:transition-transform before:duration-700 hover:before:translate-x-[200%]",
        secondary:
          "bg-gradient-to-r from-accent-dark via-accent to-accent-dark text-white shadow-lg hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] before:transition-transform before:duration-700 hover:before:translate-x-[200%]",
        outline:
          "border-2 transition-colors duration-200",
        ghost: "hover:bg-neutral-100 text-primary",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
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
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size, className }))}>
      {children}
    </Link>
  );
}
