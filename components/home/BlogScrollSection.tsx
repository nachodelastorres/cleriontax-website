"use client";

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import metadata from '@/messages/blog-posts/metadata.json';

export default function BlogScrollSection() {
  const locale = useLocale();
  const t = useTranslations('blogCTA');

  // Sort posts by publishedAt (newest first)
  const sortedPosts = [...metadata.posts].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Get slug based on locale
  const getSlugForLocale = (post: typeof metadata.posts[0]) => {
    return post.slugTranslations[locale as keyof typeof post.slugTranslations] || post.slugTranslations.es;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-100 to-white">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

      <Container>
        <div className="relative">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-accent to-burgundy-dark rounded-full" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                {t('badge')}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                  {t('title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl">
                  {t('description')}
                </p>
              </div>
              <Link
                href={`/${locale}/blog`}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-burgundy-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver todos los artículos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            {/* Gradient overlays for scroll indication */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrollable container */}
            <div className="overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide">
              <div className="flex gap-6 w-max">
                {sortedPosts.map((post, index) => {
                  const slug = getSlugForLocale(post);

                  return (
                    <Link
                      key={post.id}
                      href={`/${locale}/blog/${slug}`}
                      className="group relative block w-[380px] flex-shrink-0"
                    >
                      <article className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-accent/30">
                        {/* Image */}
                        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                          <Image
                            src={post.image.url}
                            alt={post.image.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Category badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 rounded-lg bg-accent/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wide shadow-lg">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Meta info */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt)}
                              </time>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              <span>{post.readingTime} min</span>
                            </div>
                          </div>

                          {/* Title - Get from translations */}
                          <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                            {post.seo.metaTitle.split('|')[0].trim()}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                            {post.seo.metaDescription}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                            Leer artículo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        {/* Bottom accent border */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-burgundy-dark to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Helper text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Desliza horizontalmente para ver más artículos →
            </p>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
