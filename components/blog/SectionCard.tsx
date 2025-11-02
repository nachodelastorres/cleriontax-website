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
    default: 'bg-white border border-neutral-200 shadow-md hover:shadow-lg',
    gradient: 'bg-gradient-to-br from-accent/5 via-white to-accent/5 border border-accent/20 shadow-lg',
    outlined: 'bg-white border-2 border-accent/30 shadow-sm hover:border-accent hover:shadow-md',
  };

  return (
    <div className={`rounded-2xl p-6 my-6 transition-all ${variantStyles[variant]}`}>
      {(icon || title) && (
        <div className="flex items-start gap-4 mb-4">
          {icon && (
            <div className="flex-shrink-0 text-accent">
              {icon}
            </div>
          )}
          {title && (
            <h3 className="text-xl font-bold text-navy flex-1">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="text-neutral-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
