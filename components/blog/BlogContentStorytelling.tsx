"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/navigation';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb,
  Shield
} from 'lucide-react';

interface BlogContentStorytellingProps {
  content: string;
  metadata?: {
    publishedAt?: string;
    readingTime?: number;
    category?: string;
    author?: {
      name: string;
      role: string;
    };
  };
}

// Contador global para secciones
let sectionCounter = 0;

export default function BlogContentStorytelling({ content, metadata }: BlogContentStorytellingProps) {
  // Reset counter on component mount
  sectionCounter = 0;

  return (
    <div className="max-w-none">
      {/* Metadata Bar - Simple and clean */}
      {metadata && (
        <div className="mb-12 pb-6 border-b border-niebla">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {metadata.author && (
                <>
                  <div className="w-10 h-10 bg-rojo flex items-center justify-center text-blanco font-semibold">
                    {metadata.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-azul text-sm">{metadata.author.name}</p>
                    <p className="text-xs text-pizarra">{metadata.author.role}</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-pizarra">
              {metadata.publishedAt && (
                <time dateTime={metadata.publishedAt}>
                  {new Date(metadata.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              {metadata.readingTime && (
                <span>{metadata.readingTime} min de lectura</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content with storytelling visual design */}
      <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-azul prose-p:text-pizarra prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-a:text-rojo prose-a:font-semibold prose-a:no-underline hover:prose-a:text-rojo prose-a:transition-colors prose-strong:text-azul prose-strong:font-bold prose-ul:my-6 prose-ul:space-y-4 prose-ol:my-8 prose-ol:space-y-6 prose-li:text-pizarra prose-li:leading-relaxed prose-li:text-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // H2 con diseño limpio y elegante
            h2({ children, ...props }) {
              sectionCounter++;

              return (
                <div className="my-14 scroll-mt-24" id={children?.toString().toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-rojo/10 flex items-center justify-center text-rojo font-bold text-lg">
                      {sectionCounter}
                    </div>
                    <h2 className="text-3xl font-bold text-azul mb-0 flex-1" {...props}>
                      {children}
                    </h2>
                  </div>
                  <div className="w-full h-px bg-rojo"></div>
                </div>
              );
            },

            // H3 simple y limpio
            h3({ children, ...props }) {
              return (
                <h3 className="text-2xl font-bold text-azul mt-10 mb-6" {...props}>
                  {children}
                </h3>
              );
            },

            // H4 simple con subrayado decorativo
            h4({ children, ...props }) {
              return (
                <div className="mt-8 mb-4">
                  <h4 className="text-xl font-bold text-azul inline-block" {...props}>
                    {children}
                  </h4>
                  <div className="w-16 h-1 bg-rojo mt-2"></div>
                </div>
              );
            },

            // Blockquotes limpios y elegantes
            blockquote({ children, ...props }) {
              const text = children?.toString().toLowerCase() || '';
              let borderColor = 'border-rojo';
              let bgColor = 'bg-rojo/5';

              if (text.includes('importante') || text.includes('recordatorio') || text.includes('atención')) {
                borderColor = 'border-amber-400';
                bgColor = 'bg-amber-50';
              }

              return (
                <blockquote className={`my-8 p-6 ${bgColor} ${borderColor} border-l-4 italic text-pizarra leading-relaxed`} {...props}>
                  {children}
                </blockquote>
              );
            },

            // Listas con numeración visual grande
            ol({ children, ...props }) {
              return (
                <ol className="space-y-6 my-10 list-none counter-reset" {...props}>
                  {children}
                </ol>
              );
            },

            // Items de lista simples
            li({ children, ...props }) {
              return (
                <li className="flex gap-3 items-start" {...props}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-rojo mt-2.5"></span>
                  <span className="flex-1">{children}</span>
                </li>
              );
            },

            // Tablas con diseño moderno
            table({ children, ...props }) {
              return (
                <div className="my-12 overflow-hidden border border-niebla">
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
                <th className="px-6 py-5 text-left font-bold text-blanco text-sm uppercase tracking-wider" {...props}>
                  {children}
                </th>
              );
            },

            td({ children, ...props }) {
              return (
                <td className="px-6 py-5 text-pizarra border-b border-niebla" {...props}>
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

            // Pre blocks simples
            pre({ children, ...props }: any) {
              return (
                <pre className="bg-azul text-papel p-6 overflow-x-auto my-8" {...props}>
                  {children}
                </pre>
              );
            },

            // Code simples
            code({ node, inline, className, children, ...props }: any) {
              return (
                <code
                  className={inline ? "px-2 py-1 bg-rojo/10 text-rojo  font-mono text-base" : className}
                  {...props}
                >
                  {children}
                </code>
              );
            },

            // Links simples
            a({ href, children, ...props }) {
              const isExternal = href?.startsWith('http');

              // Detectar si el enlace ya tiene prefijo de locale
              const hasLocalePrefix = href && (
                href.startsWith('/es/') ||
                href.startsWith('/en/') ||
                href.startsWith('/ca/')
              );

              if (isExternal) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-rojo font-semibold hover:text-rojo hover:underline transition-colors"
                    {...props}
                  >
                    {children}
                    {' ↗'}
                  </a>
                );
              }

              // Si ya tiene locale, usar <a> normal para evitar duplicación
              if (hasLocalePrefix) {
                return (
                  <a
                    href={href}
                    className="text-rojo font-semibold hover:text-rojo hover:underline transition-colors"
                    {...props}
                  >
                    {children}
                  </a>
                );
              }

              return (
                <Link
                  href={href || '/'}
                  className="text-rojo font-semibold hover:text-rojo hover:underline transition-colors"
                >
                  {children}
                </Link>
              );
            },

            // HR simple
            hr({ ...props }) {
              return (
                <div className="my-12 flex justify-center" {...props}>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-rojo/30"></div>
                    <div className="w-2 h-2 bg-rojo/30"></div>
                    <div className="w-2 h-2 bg-rojo/30"></div>
                  </div>
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
