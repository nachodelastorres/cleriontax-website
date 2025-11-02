"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none
      prose-headings:font-bold prose-headings:text-navy prose-headings:scroll-mt-24
      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-accent
      prose-h3:text-2xl prose-h3:mb-5 prose-h3:mt-10
      prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-8
      prose-p:text-neutral-700 prose-p:leading-loose prose-p:mb-6 prose-p:text-lg
      prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:transition-all
      prose-strong:text-navy prose-strong:font-bold
      prose-code:text-accent-dark prose-code:bg-accent/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-base prose-code:before:content-[''] prose-code:after:content-['']
      prose-pre:bg-navy prose-pre:text-white prose-pre:border-2 prose-pre:border-navy/50 prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-8 prose-pre:overflow-x-auto
      prose-ul:my-6 prose-ul:list-disc prose-ul:pl-7 prose-ul:space-y-3
      prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-7 prose-ol:space-y-3
      prose-li:text-neutral-700 prose-li:leading-relaxed prose-li:text-lg
      prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:italic prose-blockquote:text-neutral-600 prose-blockquote:bg-accent/5 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:rounded-r-lg
      prose-table:w-full prose-table:border-collapse prose-table:my-8
      prose-thead:bg-navy/5 prose-thead:border-b-2 prose-thead:border-navy
      prose-th:border prose-th:border-neutral-300 prose-th:px-5 prose-th:py-4 prose-th:text-left prose-th:font-bold prose-th:text-navy prose-th:text-base
      prose-td:border prose-td:border-neutral-300 prose-td:px-5 prose-td:py-4 prose-td:text-neutral-700 prose-td:text-base
      prose-tr:even:bg-neutral-50
      prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10
      prose-hr:border-accent/30 prose-hr:my-12
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
