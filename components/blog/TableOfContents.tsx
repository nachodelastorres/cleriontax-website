"use client";

import { useEffect, useState } from 'react';
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
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extraer h2 del contenido markdown
    const h2Regex = /^## (.+)$/gm;
    const matches = [...content.matchAll(h2Regex)];

    const extractedHeadings = matches.map((match) => {
      const text = match[1];
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\s-]/g, '');
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
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-200">
          <ListBulletIcon className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-bold text-navy">Tabla de Contenidos</h3>
        </div>

        <nav className="space-y-2">
          {headings.map((heading, index) => (
            <button
              key={index}
              onClick={() => handleClick(heading.id)}
              className={`
                w-full text-left px-3 py-2 rounded-lg transition-all text-sm
                ${
                  activeId === heading.id
                    ? 'bg-accent text-white font-semibold shadow-md'
                    : 'text-neutral-700 hover:bg-accent/10 hover:text-accent-dark font-medium'
                }
              `}
            >
              <span className="line-clamp-2">{heading.text}</span>
            </button>
          ))}
        </nav>

        {/* Progress indicator */}
        <div className="mt-6 pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
            <span>Progreso de lectura</span>
            <span>{Math.round(((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-dark transition-all duration-300"
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
