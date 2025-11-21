"use client";

import { motion } from "framer-motion";
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
  const slug = post.slugTranslations[locale as keyof typeof post.slugTranslations] || post.slug;

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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl bg-white border border-neutral-200 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 ${
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
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wide shadow-lg">
              {translatedCategory}
            </span>
          </div>

          {/* Featured badge */}
          {post.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                {t('featured.badge')}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-6 ${featured ? 'lg:p-8 lg:w-1/2 flex flex-col justify-between' : ''}`}>
          <div>
            {/* Meta information */}
            <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
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
            <h3 className={`font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300 ${
              featured ? 'text-2xl lg:text-3xl' : 'text-xl'
            }`}>
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className={`text-neutral-600 leading-relaxed mb-4 ${
              featured ? 'text-base lg:text-lg' : 'text-sm'
            }`}>
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {translateTag(tag)}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Author & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                {translatedAuthor.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">{translatedAuthor.name}</p>
                <p className="text-xs text-neutral-500">{translatedAuthor.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all duration-300">
              <span>{t('readMore')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
