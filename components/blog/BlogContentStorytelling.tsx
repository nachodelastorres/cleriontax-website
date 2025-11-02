"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
        <div className="mb-12 pb-6 border-b border-neutral-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {metadata.author && (
                <>
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
                    {metadata.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{metadata.author.name}</p>
                    <p className="text-xs text-neutral-600">{metadata.author.role}</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-600">
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
      <div className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-navy
        prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
        prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:text-accent-dark prose-a:transition-colors
        prose-strong:text-navy prose-strong:font-bold
        prose-ul:my-6 prose-ul:space-y-4
        prose-ol:my-8 prose-ol:space-y-6
        prose-li:text-neutral-700 prose-li:leading-relaxed prose-li:text-lg
      ">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // H2 con diseño limpio y elegante
            h2({ children, ...props }) {
              sectionCounter++;

              return (
                <div className="my-14 scroll-mt-24" id={children?.toString().toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent font-bold text-lg">
                      {sectionCounter}
                    </div>
                    <h2 className="text-3xl font-bold text-navy mb-0 flex-1" {...props}>
                      {children}
                    </h2>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-accent/30 via-accent/10 to-transparent"></div>
                </div>
              );
            },

            // H3 simple y limpio
            h3({ children, ...props }) {
              return (
                <h3 className="text-2xl font-bold text-navy mt-10 mb-6" {...props}>
                  {children}
                </h3>
              );
            },

            // H4 simple con subrayado decorativo
            h4({ children, ...props }) {
              return (
                <div className="mt-8 mb-4">
                  <h4 className="text-xl font-bold text-navy inline-block" {...props}>
                    {children}
                  </h4>
                  <div className="w-16 h-1 bg-gradient-to-r from-accent to-transparent mt-2 rounded-full"></div>
                </div>
              );
            },

            // Blockquotes limpios y elegantes
            blockquote({ children, ...props }) {
              const text = children?.toString().toLowerCase() || '';
              let borderColor = 'border-accent';
              let bgColor = 'bg-accent/5';

              if (text.includes('importante') || text.includes('recordatorio') || text.includes('atención')) {
                borderColor = 'border-amber-400';
                bgColor = 'bg-amber-50';
              }

              return (
                <blockquote className={`my-8 p-6 ${bgColor} ${borderColor} border-l-4 rounded-r-xl italic text-neutral-700 leading-relaxed`} {...props}>
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
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-accent rounded-full mt-2.5"></span>
                  <span className="flex-1">{children}</span>
                </li>
              );
            },

            // Tablas con diseño moderno
            table({ children, ...props }) {
              return (
                <div className="my-12 overflow-hidden rounded-2xl border border-neutral-200 shadow-xl">
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
                <thead className="bg-gradient-to-r from-navy via-navy/95 to-navy/90" {...props}>
                  {children}
                </thead>
              );
            },

            th({ children, ...props }) {
              return (
                <th className="px-6 py-5 text-left font-bold text-white text-sm uppercase tracking-wider" {...props}>
                  {children}
                </th>
              );
            },

            td({ children, ...props }) {
              return (
                <td className="px-6 py-5 text-neutral-700 border-b border-neutral-200" {...props}>
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

            // Code blocks simples
            code({ node, inline, className, children, ...props }: any) {
              return inline ? (
                <code
                  className="px-2 py-1 bg-accent/10 text-accent-dark rounded font-mono text-base"
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <pre className="bg-navy text-neutral-100 p-6 rounded-xl overflow-x-auto my-8">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            },

            // Links simples
            a({ href, children, ...props }) {
              const isExternal = href?.startsWith('http');
              const isInternal = href?.startsWith('/');

              if (isInternal) {
                return (
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-semibold transition-colors mt-4"
                    {...props}
                  >
                    {children} →
                  </a>
                );
              }

              return (
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="text-accent font-semibold hover:text-accent-dark transition-colors"
                  {...props}
                >
                  {children}
                  {isExternal && ' ↗'}
                </a>
              );
            },

            // HR simple
            hr({ ...props }) {
              return (
                <div className="my-12 flex justify-center" {...props}>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
                    <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
                    <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
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
