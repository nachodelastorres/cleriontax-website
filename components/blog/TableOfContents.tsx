"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ListBulletIcon } from '@heroicons/react/24/outline';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const t = useTranslations('blog.post');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Función para generar IDs consistentes (debe coincidir con BlogContentMagazine)
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

  useEffect(() => {
    // Extraer h2 del contenido markdown
    const h2Regex = /^## (.+)$/gm;
    const matches = [...content.matchAll(h2Regex)];

    const extractedHeadings = matches.map((match) => {
      const text = match[1];
      const id = generateHeadingId(text);
      return { id, text, level: 2 };
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="bg-blanco border border-niebla p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-niebla">
          <ListBulletIcon className="w-5 h-5 text-rojo" />
          <h3 className="text-lg font-bold text-azul">{t('tableOfContents')}</h3>
        </div>

        <nav className="space-y-2">
          {headings.map((heading, index) => (
            <button
              key={index}
              onClick={() => handleClick(heading.id)}
              className={`
 w-full text-left px-3 py-2 transition-all text-sm
 ${
 activeId === heading.id
 ? 'bg-rojo text-blanco font-semibold '
 : 'text-pizarra hover:bg-rojo/10 hover:text-rojo font-medium'
 }
 `}
            >
              <span className="line-clamp-2">{heading.text}</span>
            </button>
          ))}
        </nav>

        {/* Progress indicator */}
        <div className="mt-6 pt-4 border-t border-niebla">
          <div className="flex items-center justify-between text-xs text-pizarra mb-2">
            <span>{t('readingProgress')}</span>
            <span>{Math.round(((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-papel overflow-hidden">
            <div
              className="h-full bg-rojo transition-all duration-300"
              style={{
                width: `${((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
