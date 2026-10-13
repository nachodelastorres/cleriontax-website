"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/navigation';
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
        <div className="flex flex-wrap items-center gap-4 mb-12 pb-6 border-b-2 border-niebla">
          {metadata.publishedAt && (
            <div className="flex items-center gap-2 text-pizarra">
              <CalendarIcon className="w-5 h-5 text-rojo" />
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
            <div className="flex items-center gap-2 text-pizarra">
              <ClockIcon className="w-5 h-5 text-rojo" />
              <span className="text-sm font-medium">{metadata.readingTime} min de lectura</span>
            </div>
          )}
          {metadata.category && (
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 bg-rojo/10 text-rojo text-sm font-semibold">
                {metadata.category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {metadata?.tags && metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <TagIcon className="w-5 h-5 text-pizarra mt-1" />
          {metadata.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-papel hover:bg-rojo/10 text-pizarra text-xs font-medium transition-colors cursor-pointer border border-niebla"
            >
              {translateTag(tag)}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-azul prose-p:text-pizarra prose-p:leading-loose prose-p:mb-6 prose-p:text-lg prose-a:text-rojo prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:transition-all prose-strong:text-azul prose-strong:font-bold prose-ul:my-6 prose-ul:space-y-3 prose-ol:my-6 prose-ol:space-y-3 prose-li:text-pizarra prose-li:leading-relaxed prose-li:text-lg">
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
                  <div className="flex items-start gap-4 p-6 bg-papel border-l-4 border-rojo">
                    <div className="flex-shrink-0 text-rojo mt-1">
                      {icon}
                    </div>
                    <h2 className="text-3xl font-bold text-azul mb-0 flex-1" {...props}>
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
                  className="text-2xl font-bold text-azul mb-5 mt-10 pb-2 border-b border-niebla"
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
                  className="text-xl font-bold text-azul mb-4 mt-8 flex items-center gap-2"
                  {...props}
                >
                  <span className="w-2 h-2 bg-rojo"></span>
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
                <div className={`flex gap-4 ${bgColor} ${borderColor} border-l-4 p-6 my-8 `}>
                  <div className={`flex-shrink-0 ${iconColor}`}>
                    {icon}
                  </div>
                  <blockquote className="m-0 flex-1 font-medium text-azul" {...props}>
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
                <li className="flex gap-3 text-pizarra leading-relaxed" {...props}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-rojo mt-2.5"></span>
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
                <div className="my-10 overflow-hidden border border-niebla">
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
                <thead className="bg-azul" {...props}>
                  {children}
                </thead>
              );
            },

            th({ children, ...props }) {
              return (
                <th className="px-6 py-4 text-left font-bold text-blanco text-sm uppercase tracking-wider" {...props}>
                  {children}
                </th>
              );
            },

            td({ children, ...props }) {
              return (
                <td className="px-6 py-4 text-pizarra border-b border-niebla" {...props}>
                  {children}
                </td>
              );
            },

            tr({ children, ...props }) {
              return (
                <tr className="hover:bg-rojo/5 transition-colors" {...props}>
                  {children}
                </tr>
              );
            },

            // Pre blocks con estilo mejorado
            pre({ children, ...props }: any) {
              return (
                <pre className="bg-azul text-papel p-6 overflow-x-auto my-8 border border-azul/50" {...props}>
                  {children}
                </pre>
              );
            },

            // Code con estilo mejorado
            code({ node, inline, className, children, ...props }: any) {
              return (
                <code
                  className={inline ? "px-2 py-1 bg-rojo/10 text-rojo text-base font-semibold" : className}
                  {...props}
                >
                  {children}
                </code>
              );
            },

            // Links - internos con next-intl Link, externos con <a>
            a({ href, children, ...props }) {
              const isExternal = href?.startsWith('http');

              // Detectar si el enlace ya tiene prefijo de locale
              const hasLocalePrefix = href && (
                href.startsWith('/es/') ||
                href.startsWith('/en/') ||
                href.startsWith('/ca/')
              );

              // Para enlaces externos, usar <a> normal
              if (isExternal) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-rojo font-semibold hover:underline transition-colors"
                    {...props}
                  >
                    {children}
                    <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                );
              }

              // Si ya tiene locale, usar <a> normal para evitar duplicación
              if (hasLocalePrefix) {
                return (
                  <a
                    href={href}
                    className="text-rojo font-semibold hover:underline transition-colors"
                    {...props}
                  >
                    {children}
                  </a>
                );
              }

              // Para enlaces internos sin locale, usar Link de next-intl (añade locale automáticamente)
              return (
                <Link
                  href={href || '/'}
                  className="text-rojo font-semibold hover:underline transition-colors"
                >
                  {children}
                </Link>
              );
            },

            // HR con estilo decorativo
            hr({ ...props }) {
              return (
                <div className="my-12 flex items-center gap-4" {...props}>
                  <div className="flex-1 h-px bg-rojo"></div>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-rojo"></span>
                    <span className="w-1.5 h-1.5 bg-rojo/60"></span>
                    <span className="w-1.5 h-1.5 bg-rojo/30"></span>
                  </div>
                  <div className="flex-1 h-px bg-rojo"></div>
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
