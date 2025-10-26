"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import { useLocale } from 'next-intl';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export default function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const locale = useLocale();
  const slug = post.slugTranslations[locale as keyof typeof post.slugTranslations] || post.slug;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl bg-white border border-neutral-200 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 ${
        featured ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
    >
      <Link href={`/${locale}/blog/${slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/9]">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url(${post.image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wide shadow-lg">
              {post.category}
            </span>
          </div>

          {/* Featured badge */}
          {post.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                Destacado
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
          {/* Meta information */}
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('es-ES', {
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
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          {/* Author & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">{post.author.name}</p>
                <p className="text-xs text-neutral-500">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all duration-300">
              <span>Leer más</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
