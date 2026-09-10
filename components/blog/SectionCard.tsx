"use client";

import { ReactNode } from 'react';

interface SectionCardProps {
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'outlined';
}

export default function SectionCard({
  icon,
  title,
  children,
  variant = 'default'
}: SectionCardProps) {
  const variantStyles = {
    default: 'bg-blanco border border-niebla  ',
    gradient: 'bg-papel border border-rojo/20 ',
    outlined: 'bg-blanco border-2 border-rojo/30  hover:border-rojo ',
  };

  return (
    <div className={` p-6 my-6 transition-all ${variantStyles[variant]}`}>
      {(icon || title) && (
        <div className="flex items-start gap-4 mb-4">
          {icon && (
            <div className="flex-shrink-0 text-rojo">
              {icon}
            </div>
          )}
          {title && (
            <h3 className="text-xl font-bold text-azul flex-1">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="text-pizarra leading-relaxed">
        {children}
      </div>
    </div>
  );
}
