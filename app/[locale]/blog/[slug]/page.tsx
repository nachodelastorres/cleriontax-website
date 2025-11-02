import { notFound } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import { getBlogPostBySlug, getAllBlogPosts, getAllBlogPostsWithContent } from "@/lib/blog";
import Container from "@/components/ui/Container";
import BlogContentMagazine from "@/components/blog/BlogContentMagazine";
import BlogContentMinimal from "@/components/blog/BlogContentMinimal";
import BlogContentStorytelling from "@/components/blog/BlogContentStorytelling";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogCard from "@/components/blog/BlogCard";
import ButtonLink from "@/components/ui/ButtonLink";
import { Calendar, Clock, Tag, Share2, ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  const locales = ['es', 'en', 'ca'];

  const params: { locale: string; slug: string }[] = [];

  posts.forEach(post => {
    locales.forEach(locale => {
      params.push({
        locale,
        slug: post.slugTranslations[locale as keyof typeof post.slugTranslations]
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

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords.join(', '),
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        'es': `/es/blog/${post.slugTranslations.es}`,
        'en': `/en/blog/${post.slugTranslations.en}`,
        'ca': `/ca/blog/${post.slugTranslations.ca}`,
      },
    },
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: 'article',
      locale: locale,
      url: `/${locale}/blog/${slug}`,
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

  if (!post) {
    notFound();
  }

  // Cargar posts relacionados con contenido
  const allPostsWithContent = await getAllBlogPostsWithContent(locale);
  const relatedPosts = allPostsWithContent
    .filter(p => p.slug !== post.slug && (
      p.category === post.category ||
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image.url,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cleriontax",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cleriontax.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://cleriontax.com/${locale}/blog/${slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(', '),
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readingTime}M`
  };

  return (
    <>
      {/* Structured Data */}
      <script
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
                href={`/${locale}/blog`}
                className="mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al blog
              </ButtonLink>

              {/* Category */}
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-sm font-bold uppercase tracking-wide">
                  {post.category}
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
                    <p className="font-semibold text-primary">{post.author.name}</p>
                    <p className="text-xs text-neutral-500">{post.author.role}</p>
                  </div>
                </div>

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
                  <span>{post.readingTime} min de lectura</span>
                </div>

                {post.updatedAt && (
                  <div className="text-xs text-neutral-500">
                    Actualizado: {new Date(post.updatedAt).toLocaleDateString('es-ES')}
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
                    {tag}
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
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
                  style={{
                    backgroundImage: `url(${post.image.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
            </div>
          </Container>
        </section>

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
                    ¿Te ha resultado útil este artículo?
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Compártelo con otros inversores que puedan necesitarlo
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors duration-300 font-semibold">
                  <Share2 className="w-5 h-5" />
                  Compartir
                </button>
              </div>
            </div>
          </Container>
        </section>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <Container>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Artículos relacionados
              </h2>
              <p className="text-lg text-neutral-600">
                Continúa aprendiendo sobre fiscalidad de criptomonedas
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
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-800 to-primary-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Necesitas ayuda con tu declaración de criptomonedas?
            </h2>
            <p className="text-lg text-white/90">
              Nuestro equipo de expertos puede analizar tu caso y preparar tu declaración fiscal completa
            </p>
            <ButtonLink
              variant="secondary"
              size="lg"
              href={`/${locale}/contacto`}
              className="shadow-xl hover:shadow-2xl"
            >
              Solicitar análisis gratuito
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
