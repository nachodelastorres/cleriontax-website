"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none
      prose-headings:font-bold prose-headings:text-primary prose-headings:scroll-mt-24
      prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
      prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-accent/20
      prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
      prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4
      prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:transition-all
      prose-strong:text-primary prose-strong:font-bold
      prose-code:text-accent-dark prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
      prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:border prose-pre:border-neutral-700 prose-pre:rounded-xl prose-pre:p-4 prose-pre:my-6 prose-pre:overflow-x-auto
      prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
      prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
      prose-li:text-neutral-700 prose-li:my-2
      prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-neutral-600 prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:my-6
      prose-table:w-full prose-table:border-collapse prose-table:my-6
      prose-thead:bg-primary/5
      prose-th:border prose-th:border-neutral-300 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-bold prose-th:text-primary
      prose-td:border prose-td:border-neutral-300 prose-td:px-4 prose-td:py-3 prose-td:text-neutral-700
      prose-tr:even:bg-neutral-50
      prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
      prose-hr:border-accent/20 prose-hr:my-8
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            return inline ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-xl overflow-x-auto my-6">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          // Mejorar el renderizado de tablas para mejor accesibilidad
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full">{children}</table>
              </div>
            );
          },
          // Agregar iconos a los enlaces externos
          a({ href, children, ...props }) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
