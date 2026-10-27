"use client";

import { Link } from '@/i18n/navigation';
import Image from "next/image";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import { useLocale, useTranslations } from 'next-intl';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export default function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const locale = useLocale();
  const t = useTranslations('blog');
  // IMPORTANTE: Siempre usar el slug español para URLs (requisito SEO)
  const slug = post.slugTranslations.es || post.slug;

  // Traducir categoría, tags y autor
  const categoryTranslations = t.raw('categoryTranslations') as Record<string, string> || {};
  const tagTranslations = t.raw('tagTranslations') as Record<string, string> || {};
  const authorTranslations = t.raw('authorTranslations') as Record<string, { name: string; role: string }> || {};

  const translatedCategory = categoryTranslations[post.category] || post.category;
  const translateTag = (tag: string) => tagTranslations[tag] || tag;
  const translatedAuthor = authorTranslations[post.author.name] || {
    name: post.author.name,
    role: post.author.role
  };

  return (
    <article
      className={`group relative overflow-hidden bg-blanco border border-niebla hover:border-rojo/30 transition-all duration-500   ${
 featured ? 'lg:col-span-2' : ''
 }`}
    >
      <Link href={`/blog/${slug}`} className={`block ${featured ? 'lg:flex lg:flex-row' : ''}`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2 aspect-[16/9] lg:aspect-auto' : 'aspect-[16/9]'}`}>
          <Image
            src={post.image.url}
            alt={post.image.alt}
            fill
            className="object-cover"
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            quality={85}
          />
          <div className="absolute inset-0 bg-azul/55 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-4 py-1.5 bg-rojo text-blanco text-xs font-bold uppercase tracking-wide">
              {translatedCategory}
            </span>
          </div>

          {/* Featured badge */}
          {post.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-4 py-1.5 bg-azul text-blanco text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blanco"></span>
                {t('featured.badge')}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-6 ${featured ? 'lg:p-8 lg:w-1/2 flex flex-col justify-between' : ''}`}>
          <div>
            {/* Meta information */}
            <div className="flex items-center gap-4 text-sm text-pizarra mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'ca' ? 'ca-ES' : 'es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min</span>
              </div>
            </div>

            {/* Title */}
            <h3 className={`font-bold text-azul mb-3 group-hover:text-rojo transition-colors duration-300 ${
 featured ? 'text-2xl lg:text-3xl' : 'text-xl'
 }`}>
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className={`text-pizarra leading-relaxed mb-4 ${
 featured ? 'text-base lg:text-lg' : 'text-sm'
 }`}>
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-azul/5 text-azul text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {translateTag(tag)}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 bg-papel text-pizarra text-xs font-medium">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Author & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-niebla">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-azul flex items-center justify-center text-blanco font-bold">
                {translatedAuthor.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-azul">{translatedAuthor.name}</p>
                <p className="text-xs text-pizarra">{translatedAuthor.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-rojo font-semibold text-sm group-hover:gap-3 transition-all duration-300">
              <span>{t('readMore')}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
