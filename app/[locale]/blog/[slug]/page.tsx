import { notFound } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts, getAllBlogPostsWithContent } from "@/lib/blog";
import Container from "@/components/ui/Container";
import BlogContentMagazine from "@/components/blog/BlogContentMagazine";
import BlogContentMinimal from "@/components/blog/BlogContentMinimal";
import BlogContentStorytelling from "@/components/blog/BlogContentStorytelling";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogCard from "@/components/blog/BlogCard";
import ButtonLink from "@/components/ui/ButtonLink";
import { Calendar, Clock, Tag, Share2, ArrowLeft, Folder, FileText } from "lucide-react";
import {
  generateBlogBreadcrumbSchema,
  generatePersonSchema,
  getOrganizationReference
} from "@/lib/schemas";
import clustersConfig from "@/messages/blog-posts/clusters-config.json";
import { SITE_URL, canonicalFor, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  const locales = ['es', 'en', 'ca'];

  const params: { locale: string; slug: string }[] = [];

  // IMPORTANTE: Siempre usar el slug español para todas las URLs (requisito SEO)
  // Las URLs deben ser /{locale}/blog/{slug-español} independientemente del idioma
  posts.forEach(post => {
    const spanishSlug = post.slugTranslations.es;
    locales.forEach(locale => {
      params.push({
        locale,
        slug: spanishSlug
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  // IMPORTANTE: Solo aceptar el slug español para evitar URLs duplicadas
  if (slug !== post.slugTranslations.es) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  const postUrl = canonicalFor(locale as Locale, `/blog/${slug}`);

  // IMPORTANTE: Siempre usar el slug español para hreflang (requisito SEO)
  const spanishSlug = post.slugTranslations.es;

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords.join(', '),
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: postUrl,
      languages: {
        'es': canonicalFor('es', `/blog/${spanishSlug}`),
        'en': canonicalFor('en', `/blog/${spanishSlug}`),
        'ca': canonicalFor('ca', `/blog/${spanishSlug}`),
      },
    },
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: 'article',
      locale: locale,
      url: postUrl,
      images: [
        {
          url: post.seo.ogImage || post.image.url,
          width: 1200,
          height: 630,
          alt: post.image.alt,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      images: [post.seo.ogImage || post.image.url],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;

  const post = await getBlogPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  if (!post) {
    notFound();
  }

  // IMPORTANTE: Solo aceptar el slug español para evitar URLs duplicadas
  // URLs como /en/blog/how-to-get-csv... deben devolver 404
  if (slug !== post.slugTranslations.es) {
    notFound();
  }

  // Cargar posts relacionados con contenido
  const allPostsWithContent = await getAllBlogPostsWithContent(locale);

  // Priorizar posts relacionados del cluster (si existen en metadata)
  let relatedPosts: typeof allPostsWithContent = [];
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    // Buscar posts relacionados por sus IDs desde metadata
    relatedPosts = allPostsWithContent
      .filter(p => post.relatedPosts?.includes(p.slug.replace(/^.*\//, '')))
      .slice(0, 3);
  }

  // Fallback: si no hay suficientes related posts del cluster, usar lógica por categoría/tags
  if (relatedPosts.length < 3) {
    const additionalPosts = allPostsWithContent
      .filter(p => p.slug !== post.slug &&
                   !relatedPosts.find(rp => rp.slug === p.slug) &&
                   (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...additionalPosts];
  }

  // Generate structured data schemas
  const postUrl = canonicalFor(locale as Locale, `/blog/${slug}`);

  // Breadcrumb Schema
  const breadcrumbSchema = generateBlogBreadcrumbSchema({
    locale: locale as Locale,
    blogSlug: slug,
    blogTitle: post.title,
    baseUrl: SITE_URL
  });

  // Person/Author Schema
  const authorSchema = generatePersonSchema({
    name: post.author.name,
    role: post.author.role,
    avatar: post.author.avatar,
    baseUrl: SITE_URL
  });

  // Enhanced BlogPosting Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    "headline": post.title,
    "alternativeHeadline": post.seo.metaTitle,
    "description": post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": post.image.url,
      "width": post.image.width,
      "height": post.image.height,
      "caption": post.image.alt
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": authorSchema,
    "publisher": getOrganizationReference(SITE_URL),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${postUrl}#webpage`,
      "url": postUrl
    },
    "isPartOf": {
      "@type": "Blog",
      "@id": `${canonicalFor(locale as Locale, '/blog')}#blog`,
      "name": "Cleriontax Blog"
    },
    "inLanguage": locale,
    "articleSection": post.category,
    "keywords": post.tags,
    "wordCount": post.content ? post.content.split(/\s+/).length : 0,
    "timeRequired": `PT${post.readingTime}M`,
    "breadcrumb": breadcrumbSchema,
    "url": postUrl
  };

  return (
    <>
      {/* Structured Data - Breadcrumb */}
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Structured Data - Author */}
      <script
        id="author-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      {/* Structured Data - BlogPosting */}
      <script
        id="blogposting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Article Header */}
      <article>
        <header className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-neutral-50 to-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Back button */}
              <ButtonLink
                variant="outline"
                size="sm"
                href="/blog"
                className="mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('post.backToBlog')}
              </ButtonLink>

              {/* Category */}
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-sm font-bold uppercase tracking-wide">
                  {t(`categoryTranslations.${post.category}`, { default: post.category })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 pb-8 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-primary">
                      {t(`authorTranslations.${post.author.name}.name`, { default: post.author.name })}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {t(`authorTranslations.${post.author.name}.role`, { default: post.author.role })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} {t('post.minRead')}</span>
                </div>

                {post.updatedAt && (
                  <div className="text-xs text-neutral-500">
                    {t('post.updated')}: {new Date(post.updatedAt).toLocaleDateString(locale)}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-colors duration-300"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {t(`tagTranslations.${tag}`, { default: tag })}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </header>

        {/* Featured Image */}
        <section className="py-8 bg-white">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.image.url}
                  alt={post.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  quality={90}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
              </div>
            </div>
          </Container>
        </section>

        {/* Cluster Section - Inicio del artículo */}
        {post.cluster && (() => {
          const cluster = clustersConfig.clusters.find(c => c.id === post.cluster);
          if (!cluster) return null;

          const clusterName = cluster.name[locale as 'es' | 'en' | 'ca'];
          const clusterDescription = cluster.description[locale as 'es' | 'en' | 'ca'];
          const clusterKeywords = cluster.keywords[locale as 'es' | 'en' | 'ca'].slice(0, 6);

          // Obtener posts relacionados del mismo cluster
          const clusterRelatedPosts = relatedPosts.slice(0, 5);

          return (
            <section className="py-12 bg-gradient-to-br from-primary-50 to-accent-50">
              <Container>
                <div className="max-w-4xl mx-auto">
                  {/* Header del cluster */}
                  <div className="flex items-start gap-4 p-8 bg-white rounded-2xl shadow-xl border-2 border-primary-200 mb-8">
                    <div className="p-4 bg-gradient-to-br from-primary to-primary-600 rounded-xl shadow-lg">
                      <Folder className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">
                          Cluster Temático
                        </span>
                      </div>
                      <Link
                        href={`/${locale}/blog/tema/${post.cluster}`}
                        className="group inline-block"
                      >
                        <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                          {clusterName}
                        </h3>
                      </Link>
                      <p className="text-neutral-700 mb-4 leading-relaxed">
                        {clusterDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {clusterKeywords.map((keyword, idx) => (
                          <span key={idx} className="px-3 py-1.5 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/${locale}/blog/tema/${post.cluster}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
                      >
                        Ver todos los artículos del cluster →
                      </Link>
                    </div>
                  </div>

                  {/* Posts relacionados del cluster */}
                  {clusterRelatedPosts.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
                      <h4 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Artículos Relacionados en este Cluster
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        {clusterRelatedPosts.map((relatedPost) => (
                          <Link
                            key={relatedPost.slug}
                            href={`/${locale}/blog/${relatedPost.slug}`}
                            className="group p-4 border border-neutral-200 rounded-xl hover:border-primary hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden">
                                <Image
                                  src={relatedPost.image.url}
                                  alt={relatedPost.title}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-1">
                                  {relatedPost.title}
                                </h5>
                                <p className="text-xs text-neutral-500">
                                  {new Date(relatedPost.publishedAt).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })} • {relatedPost.readingTime} min lectura
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </section>
          );
        })()}

        {/* Article Content with Table of Contents */}
        <section className="py-16 bg-white">
          <Container>
            {post.layoutType === 'minimal' ? (
              // Layout Minimalista - Sin sidebar
              <div className="max-w-3xl mx-auto">
                <BlogContentMinimal
                  content={post.content}
                  metadata={{
                    publishedAt: post.publishedAt,
                    readingTime: post.readingTime,
                    category: post.category,
                    author: post.author
                  }}
                />
              </div>
            ) : post.layoutType === 'storytelling' ? (
              // Layout Storytelling - Visual immersive
              <div className="max-w-5xl mx-auto">
                <BlogContentStorytelling
                  content={post.content}
                  metadata={{
                    publishedAt: post.publishedAt,
                    readingTime: post.readingTime,
                    category: post.category,
                    author: post.author
                  }}
                />
              </div>
            ) : (
              // Layout Magazine - Con sidebar (default)
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-8">
                    <BlogContentMagazine
                      content={post.content}
                      metadata={{
                        publishedAt: post.publishedAt,
                        readingTime: post.readingTime,
                        category: post.category,
                        tags: post.tags
                      }}
                      tagTranslations={t.raw('tagTranslations') as Record<string, string>}
                    />
                  </div>

                  {/* Table of Contents Sidebar - Hidden on mobile */}
                  <aside className="hidden lg:block lg:col-span-4">
                    <TableOfContents content={post.content} />
                  </aside>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* Share Section */}
        <section className="py-12 bg-neutral-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-neutral-200">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {t('post.shareSection.title')}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {t('post.shareSection.description')}
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors duration-300 font-semibold">
                  <Share2 className="w-5 h-5" />
                  {t('post.shareSection.button')}
                </button>
              </div>
            </div>
          </Container>
        </section>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (() => {
        const cluster = clustersConfig.clusters.find(c => c.id === post.cluster);
        const clusterName = cluster?.name[locale as 'es' | 'en' | 'ca'];
        const isClusterRelated = post.cluster && post.relatedPosts && post.relatedPosts.length > 0;

        return (
          <section className="py-16 md:py-20 bg-white">
            <Container>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  {isClusterRelated && clusterName
                    ? `Más artículos del cluster: ${clusterName}`
                    : t('post.relatedArticles.title')}
                </h2>
                <p className="text-lg text-neutral-600">
                  {isClusterRelated
                    ? 'Explora más contenido relacionado dentro de este cluster temático'
                    : t('post.relatedArticles.description')}
                </p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </Container>
        </section>
        );
      })()}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-800 to-primary-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('post.cta.title')}
            </h2>
            <p className="text-lg text-white/90">
              {t('post.cta.description')}
            </p>
            <ButtonLink
              variant="secondary"
              size="lg"
              href="/contacto"
              className="shadow-xl hover:shadow-2xl"
            >
              {t('post.cta.button')}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
