"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CurrencyEuroIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

interface BlogContentMagazineProps {
  content: string;
  metadata?: {
    publishedAt?: string;
    readingTime?: number;
    category?: string;
    tags?: string[];
  };
  tagTranslations?: Record<string, string>;
}

// Función para generar IDs consistentes (debe coincidir con TableOfContents)
const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales excepto espacios y guiones
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Eliminar guiones múltiples
    .replace(/^-|-$/g, ''); // Eliminar guiones al inicio y final
};

// Mapa de iconos según palabras clave en los títulos
const getIconForHeading = (text: string) => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('importante') || lowerText.includes('por qué')) {
    return <ShieldCheckIcon className="w-8 h-8" />;
  }
  if (lowerText.includes('cuándo') || lowerText.includes('plazo') || lowerText.includes('fecha')) {
    return <CalendarIcon className="w-8 h-8" />;
  }
  if (lowerText.includes('calcular') || lowerText.includes('cálculo')) {
    return <ChartBarIcon className="w-8 h-8" />;
  }
  if (lowerText.includes('modelo') || lowerText.includes('declarar')) {
    return <DocumentTextIcon className="w-8 h-8" />;
  }
  if (lowerText.includes('error') || lowerText.includes('evitar')) {
    return <ExclamationTriangleIcon className="w-8 h-8" />;
  }
  if (lowerText.includes('tributación') || lowerText.includes('escala') || lowerText.includes('tipo')) {
    return <BanknotesIcon className="w-8 h-8" />;
  }
  if (lowerText.includes('conclusión') || lowerText.includes('clave')) {
    return <LightBulbIcon className="w-8 h-8" />;
  }

  return <DocumentTextIcon className="w-8 h-8" />;
};

export default function BlogContentMagazine({ content, metadata, tagTranslations = {} }: BlogContentMagazineProps) {
  const translateTag = (tag: string) => tagTranslations[tag] || tag;
  return (
    <div className="max-w-none">
      {/* Metadata Bar */}
      {metadata && (
        <div className="flex flex-wrap items-center gap-4 mb-12 pb-6 border-b-2 border-neutral-200">
          {metadata.publishedAt && (
            <div className="flex items-center gap-2 text-neutral-600">
              <CalendarIcon className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">
                {new Date(metadata.publishedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
          {metadata.readingTime && (
            <div className="flex items-center gap-2 text-neutral-600">
              <ClockIcon className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">{metadata.readingTime} min de lectura</span>
            </div>
          )}
          {metadata.category && (
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 bg-accent/10 text-accent-dark text-sm font-semibold rounded-full">
                {metadata.category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {metadata?.tags && metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <TagIcon className="w-5 h-5 text-neutral-500 mt-1" />
          {metadata.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-neutral-100 hover:bg-accent/10 text-neutral-700 text-xs font-medium rounded-md transition-colors cursor-pointer border border-neutral-200"
            >
              {translateTag(tag)}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-navy
        prose-p:text-neutral-700 prose-p:leading-loose prose-p:mb-6 prose-p:text-lg
        prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:transition-all
        prose-strong:text-navy prose-strong:font-bold
        prose-ul:my-6 prose-ul:space-y-3
        prose-ol:my-6 prose-ol:space-y-3
        prose-li:text-neutral-700 prose-li:leading-relaxed prose-li:text-lg
      ">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // H2 con iconos y diseño magazine
            h2({ children, ...props }) {
              const text = children?.toString() || '';
              const icon = getIconForHeading(text);
              const headingId = generateHeadingId(text);

              return (
                <div className="mb-10 mt-16 scroll-mt-24" id={headingId}>
                  <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-accent/5 via-accent/3 to-transparent rounded-2xl border-l-4 border-accent shadow-sm">
                    <div className="flex-shrink-0 text-accent mt-1">
                      {icon}
                    </div>
                    <h2 className="text-3xl font-bold text-navy mb-0 flex-1" {...props}>
                      {children}
                    </h2>
                  </div>
                </div>
              );
            },

            // H3 con estilo limpio
            h3({ children, ...props }) {
              return (
                <h3
                  className="text-2xl font-bold text-navy mb-5 mt-10 pb-2 border-b border-neutral-200"
                  {...props}
                >
                  {children}
                </h3>
              );
            },

            // H4 con badge style
            h4({ children, ...props }) {
              return (
                <h4
                  className="text-xl font-bold text-navy mb-4 mt-8 flex items-center gap-2"
                  {...props}
                >
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  {children}
                </h4>
              );
            },

            // Blockquotes mejorados con iconos
            blockquote({ children, ...props }) {
              const text = children?.toString().toLowerCase() || '';
              let icon = <InformationCircleIcon className="w-6 h-6" />;
              let bgColor = 'bg-blue-50';
              let borderColor = 'border-blue-400';
              let iconColor = 'text-blue-600';

              if (text.includes('importante') || text.includes('recordatorio')) {
                icon = <ExclamationTriangleIcon className="w-6 h-6" />;
                bgColor = 'bg-amber-50';
                borderColor = 'border-amber-400';
                iconColor = 'text-amber-600';
              } else if (text.includes('recomendación') || text.includes('solución')) {
                icon = <CheckCircleIcon className="w-6 h-6" />;
                bgColor = 'bg-green-50';
                borderColor = 'border-green-400';
                iconColor = 'text-green-600';
              }

              return (
                <div className={`flex gap-4 ${bgColor} ${borderColor} border-l-4 rounded-r-xl p-6 my-8 shadow-sm`}>
                  <div className={`flex-shrink-0 ${iconColor}`}>
                    {icon}
                  </div>
                  <blockquote className="m-0 flex-1 font-medium text-neutral-800" {...props}>
                    {children}
                  </blockquote>
                </div>
              );
            },

            // Listas con viñetas personalizadas
            ul({ children, ...props }) {
              return (
                <ul className="space-y-3 my-6" {...props}>
                  {children}
                </ul>
              );
            },

            li({ children, ...props }) {
              return (
                <li className="flex gap-3 text-neutral-700 leading-relaxed" {...props}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-accent rounded-full mt-2.5"></span>
                  <span className="flex-1">{children}</span>
                </li>
              );
            },

            // Listas ordenadas con números destacados
            ol({ children, ...props }) {
              return (
                <ol className="space-y-4 my-6 list-none counter-reset-item" {...props}>
                  {children}
                </ol>
              );
            },

            // Tablas con diseño moderno
            table({ children, ...props }) {
              return (
                <div className="my-10 overflow-hidden rounded-xl border border-neutral-200 shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full" {...props}>
                      {children}
                    </table>
                  </div>
                </div>
              );
            },

            thead({ children, ...props }) {
              return (
                <thead className="bg-gradient-to-r from-navy to-navy/90" {...props}>
                  {children}
                </thead>
              );
            },

            th({ children, ...props }) {
              return (
                <th className="px-6 py-4 text-left font-bold text-white text-sm uppercase tracking-wider" {...props}>
                  {children}
                </th>
              );
            },

            td({ children, ...props }) {
              return (
                <td className="px-6 py-4 text-neutral-700 border-b border-neutral-200" {...props}>
                  {children}
                </td>
              );
            },

            tr({ children, ...props }) {
              return (
                <tr className="hover:bg-accent/5 transition-colors" {...props}>
                  {children}
                </tr>
              );
            },

            // Pre blocks con estilo mejorado
            pre({ children, ...props }: any) {
              return (
                <pre className="bg-gradient-to-br from-navy to-navy/90 text-neutral-100 p-6 rounded-xl overflow-x-auto my-8 shadow-lg border border-navy/50" {...props}>
                  {children}
                </pre>
              );
            },

            // Code con estilo mejorado
            code({ node, inline, className, children, ...props }: any) {
              return (
                <code
                  className={inline ? "px-2 py-1 bg-accent/10 text-accent-dark rounded font-mono text-base font-semibold" : className}
                  {...props}
                >
                  {children}
                </code>
              );
            },

            // Links con icono externo
            a({ href, children, ...props }) {
              const isExternal = href?.startsWith('http');

              return (
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="text-accent font-semibold hover:underline transition-colors"
                  {...props}
                >
                  {children}
                  {isExternal && (
                    <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </a>
              );
            },

            // HR con estilo decorativo
            hr({ ...props }) {
              return (
                <div className="my-12 flex items-center gap-4" {...props}>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-accent/60 rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-accent/30 rounded-full"></span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
                </div>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
