"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/navigation';

interface BlogContentMinimalProps {
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

export default function BlogContentMinimal({ content, metadata }: BlogContentMinimalProps) {
  return (
    <div className="max-w-none">
      {/* Metadata Bar - Clean and minimal */}
      {metadata && (
        <div className="flex flex-col gap-3 mb-16 pb-8 border-b border-niebla">
          <div className="flex items-center gap-6 text-sm text-pizarra">
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
          {metadata.author && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rojo flex items-center justify-center text-blanco font-semibold text-sm">
                {metadata.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-azul text-sm">{metadata.author.name}</p>
                <p className="text-xs text-pizarra">{metadata.author.role}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content with minimal styling */}
      <div className="prose prose-xl max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-azul prose-p:text-pizarra prose-p:leading-loose prose-p:mb-8 prose-p:text-xl prose-p:font-light prose-a:text-azul prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-rojo prose-a:transition-colors prose-strong:text-azul prose-strong:font-semibold prose-ul:my-8 prose-ul:space-y-4 prose-ol:my-8 prose-ol:space-y-4 prose-li:text-pizarra prose-li:leading-loose prose-li:text-xl prose-li:font-light">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // H2 con números grandes - estilo Medium
            h2({ children, ...props }) {
              return (
                <div className="mb-16 mt-20 scroll-mt-24">
                  <h2
                    className="text-4xl md:text-5xl font-serif font-normal text-azul leading-tight mb-6"
                    {...props}
                  >
                    {children}
                  </h2>
                  <div className="w-16 h-1 bg-rojo"></div>
                </div>
              );
            },

            // H3 minimalista
            h3({ children, ...props }) {
              return (
                <h3
                  className="text-3xl font-serif font-normal text-azul mb-6 mt-12 leading-snug"
                  {...props}
                >
                  {children}
                </h3>
              );
            },

            // H4 simple
            h4({ children, ...props }) {
              return (
                <h4
                  className="text-2xl font-serif font-normal text-azul mb-4 mt-10"
                  {...props}
                >
                  {children}
                </h4>
              );
            },

            // Drop cap en el primer párrafo (letra inicial grande)
            p({ children, node, ...props }) {
              const text = children?.toString() || '';
              const firstLetter = typeof children === 'string' ? children.charAt(0) : '';

              // Solo aplicar drop cap si es el primer párrafo real (más de 50 caracteres)
              if (text.length > 50 && node?.position?.start.line === 1) {
                return (
                  <p className="first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-azul first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1" {...props}>
                    {children}
                  </p>
                );
              }

              return <p {...props}>{children}</p>;
            },

            // Blockquotes tipo pullquote - grandes y centrados
            blockquote({ children, ...props }) {
              return (
                <blockquote
                  className="my-16 py-12 border-y-2 border-niebla text-center"
                  {...props}
                >
                  <div className="text-3xl md:text-4xl font-serif italic text-azul leading-relaxed max-w-3xl mx-auto">
                    {children}
                  </div>
                </blockquote>
              );
            },

            // Listas minimalistas con numeración grande
            ul({ children, ...props }) {
              return (
                <ul className="space-y-6 my-12 list-none" {...props}>
                  {children}
                </ul>
              );
            },

            li({ children, ...props }) {
              return (
                <li className="flex gap-6 text-pizarra leading-loose pl-0" {...props}>
                  <span className="flex-shrink-0 w-2 h-2 bg-azul mt-3"></span>
                  <span className="flex-1">{children}</span>
                </li>
              );
            },

            // Listas ordenadas con números grandes y destacados
            ol({ children, ...props }) {
              return (
                <ol className="space-y-8 my-12 list-none counter-reset" {...props}>
                  {children}
                </ol>
              );
            },

            // Tablas minimalistas
            table({ children, ...props }) {
              return (
                <div className="my-16 overflow-hidden">
                  <table className="w-full" {...props}>
                    {children}
                  </table>
                </div>
              );
            },

            thead({ children, ...props }) {
              return (
                <thead className="border-b-2 border-azul" {...props}>
                  {children}
                </thead>
              );
            },

            th({ children, ...props }) {
              return (
                <th className="px-4 py-6 text-left font-semibold text-azul text-lg" {...props}>
                  {children}
                </th>
              );
            },

            td({ children, ...props }) {
              return (
                <td className="px-4 py-6 text-pizarra border-b border-niebla text-lg font-light" {...props}>
                  {children}
                </td>
              );
            },

            tr({ children, ...props }) {
              return (
                <tr className="hover:bg-papel/50 transition-colors" {...props}>
                  {children}
                </tr>
              );
            },

            // Code inline minimalista
            code({ node, inline, className, children, ...props }: any) {
              return inline ? (
                <code
                  className="px-2 py-0.5 bg-papel text-azul font-mono text-base"
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <pre className="bg-papel border-l-4 border-azul text-azul p-8 my-12 overflow-x-auto font-mono text-base leading-relaxed">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            },

            // Links integrados en el texto
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
                    className="text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2 transition-colors font-normal"
                    {...props}
                  >
                    {children}
                  </a>
                );
              }

              // Si ya tiene locale, usar <a> normal para evitar duplicación
              if (hasLocalePrefix) {
                return (
                  <a
                    href={href}
                    className="text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2 transition-colors font-normal"
                    {...props}
                  >
                    {children}
                  </a>
                );
              }

              return (
                <Link
                  href={href || '/'}
                  className="text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2 transition-colors font-normal"
                >
                  {children}
                </Link>
              );
            },

            // HR - separador minimalista
            hr({ ...props }) {
              return (
                <div className="my-20 flex justify-center" {...props}>
                  <div className="flex gap-3">
                    <span className="w-2 h-2 bg-niebla"></span>
                    <span className="w-2 h-2 bg-niebla"></span>
                    <span className="w-2 h-2 bg-niebla"></span>
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
