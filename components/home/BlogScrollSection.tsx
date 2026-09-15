import { getTranslations } from 'next-intl/server';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { getAllBlogPostsWithContent } from '@/lib/blog';

interface BlogScrollSectionProps {
  locale: string;
}

export default async function BlogScrollSection({ locale }: BlogScrollSectionProps) {
  const t = await getTranslations({ locale, namespace: 'blogCTA' });
  const tBlog = await getTranslations({ locale, namespace: 'blog' });

  // Get posts with translated content
  const posts = await getAllBlogPostsWithContent(locale);

  // Sort posts by publishedAt (newest first)
  const sortedPosts = [...posts].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="relative py-24 overflow-hidden bg-papel">
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
              <div className="h-1 w-12 bg-rojo" />
              <span className="text-sm font-semibold text-rojo uppercase tracking-wider">
                {t('badge')}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-azul mb-4">
                  {t('title')}
                </h2>
                <p className="text-lg text-pizarra max-w-2xl">
                  {t('description')}
                </p>
              </div>
              <Link
                href={`/${locale}/blog`}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-rojo text-blanco font-semibold hover:bg-rojo/90 transition-all duration-300"
              >
                {t('viewAllArticles')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            {/* Gradient overlays for scroll indication */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-papel z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-blanco z-10 pointer-events-none" />

            {/* Scrollable container */}
            <div className="overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide">
              <div className="flex gap-6 w-max">
                {sortedPosts.map((post) => {
                  return (
                    <Link
                      key={post.slug}
                      href={`/${locale}/blog/${post.slug}`}
                      className="group relative block w-[380px] flex-shrink-0"
                    >
                      <article className="h-full bg-blanco transition-all duration-300 overflow-hidden border border-niebla hover:border-rojo/30">
                        {/* Image */}
                        <div className="relative h-56 bg-papel overflow-hidden">
                          <Image
                            src={post.image.url}
                            alt={post.image.alt}
                            fill
                            className="object-cover"
                          />
                          {/* Category badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-rojo/90 backdrop- text-blanco text-xs font-bold uppercase tracking-wide">
                              {tBlog(`categoryTranslations.${post.category}`, { default: post.category })}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Meta info */}
                          <div className="flex items-center gap-4 text-sm text-pizarra mb-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt)}
                              </time>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              <span>{post.readingTime} {t('minRead')}</span>
                            </div>
                          </div>

                          {/* Title - Now using translated title */}
                          <h3 className="text-xl font-bold text-azul mb-3 line-clamp-2 group-hover:text-rojo transition-colors">
                            {post.title}
                          </h3>

                          {/* Excerpt - Now using translated excerpt */}
                          <p className="text-pizarra text-sm leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 bg-papel text-pizarra text-xs font-medium"
                              >
                                {tBlog(`tagTranslations.${tag}`, { default: tag })}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="inline-flex items-center gap-2 text-rojo font-semibold text-sm group-hover:gap-3 transition-all">
                            {t('readArticle')}
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Bottom accent border */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-rojo" />
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Helper text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-pizarra">
              {t('scrollHelper')}
            </p>
          </div>
        </div>
      </Container>

      <style>{`
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
