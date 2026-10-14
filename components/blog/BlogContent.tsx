import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/navigation';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none
      prose-headings:font-bold prose-headings:text-azul prose-headings:scroll-mt-24
      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-rojo
      prose-h3:text-2xl prose-h3:mb-5 prose-h3:mt-10
      prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-8
      prose-p:text-pizarra prose-p:leading-loose prose-p:mb-6 prose-p:text-lg
      prose-a:text-rojo prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:transition-all
      prose-strong:text-azul prose-strong:font-bold
      prose-code:text-rojo prose-code:bg-rojo/10 prose-code:px-2 prose-code:py-1 prose-code:text-base prose-code:before:content-[''] prose-code:after:content-['']
      prose-pre:bg-azul prose-pre:text-blanco prose-pre:border-2 prose-pre:border-azul/50  prose-pre:p-6 prose-pre:my-8 prose-pre:overflow-x-auto
      prose-ul:my-6 prose-ul:list-disc prose-ul:pl-7 prose-ul:space-y-3
      prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-7 prose-ol:space-y-3
      prose-li:text-pizarra prose-li:leading-relaxed prose-li:text-lg
      prose-blockquote:border-l-4 prose-blockquote:border-rojo prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:italic prose-blockquote:text-pizarra prose-blockquote:bg-rojo/5 prose-blockquote:py-4 prose-blockquote:my-8 
      prose-table:w-full prose-table:border-collapse prose-table:my-8
      prose-thead:bg-azul/5 prose-thead:border-b-2 prose-thead:border-azul
      prose-th:border prose-th:border-niebla prose-th:px-5 prose-th:py-4 prose-th:text-left prose-th:font-bold prose-th:text-azul prose-th:text-base
      prose-td:border prose-td:border-niebla prose-td:px-5 prose-td:py-4 prose-td:text-pizarra prose-td:text-base
      prose-tr:even:bg-papel
        prose-img:my-10
      prose-hr:border-rojo/30 prose-hr:my-12
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
              <pre className="bg-azul text-papel p-4 overflow-x-auto my-6">
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
                <a href={href} {...props}>
                  {children}
                </a>
              );
            }

            return (
              <Link href={href || '/'}>
                {children}
              </Link>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
