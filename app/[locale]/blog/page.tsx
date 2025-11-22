import { getTranslations } from 'next-intl/server';
import { getAllBlogPostsWithContent } from "@/lib/blog";
import Container from "@/components/ui/Container";
import BlogHero from "@/components/blog/BlogHero";
import { generateBreadcrumbSchema, getOrganizationReference } from "@/lib/schemas";
import Link from "next/link";
import { Folder, FileText, Calendar, ArrowRight } from "lucide-react";
import clustersConfig from "@/messages/blog-posts/clusters-config.json";
import metadata from "@/messages/blog-posts/metadata.json";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.blog' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: 'blog fiscalidad criptomonedas, noticias cripto España, guías fiscales crypto, impuestos bitcoin, declaración criptoactivos, AEAT criptomonedas, asesoría fiscal blockchain, actualidad normativa cripto',
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        'es': `${baseUrl}/es/blog`,
        'en': `${baseUrl}/en/blog`,
        'ca': `${baseUrl}/ca/blog`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';

  // Cargar todos los posts con su contenido en el idioma actual
  const allPosts = await getAllBlogPostsWithContent(locale);

  // Obtener el último post publicado
  const latestPost = allPosts[0];

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema({
    locale: locale as 'es' | 'en' | 'ca',
    path: `/${locale}/blog`,
    baseUrl
  });

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Cleriontax Blog - Fiscalidad de Criptomonedas",
    "description": "Guías, noticias y análisis sobre la fiscalidad de criptomonedas en España. Expertos en IRPF, modelo 100, 720 y optimización fiscal crypto.",
    "url": `${baseUrl}/${locale}/blog`,
    "publisher": getOrganizationReference(baseUrl),
    "breadcrumb": breadcrumbSchema,
    "blogPost": allPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image.url,
      "datePublished": post.publishedAt,
      "dateModified": post.updatedAt || post.publishedAt,
      "author": {
        "@type": "Person",
        "name": post.author.name
      },
      "publisher": getOrganizationReference(baseUrl),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/${locale}/blog/${post.slugTranslations[locale as keyof typeof post.slugTranslations]}`
      }
    }))
  };

  // Calcular estadísticas
  const totalPosts = metadata.posts.length;
  const activeClusters = clustersConfig.clusters.filter(cluster =>
    metadata.posts.some(post => post.cluster === cluster.id)
  ).length;

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Structured Data */}
      <script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section Original */}
      <BlogHero postsCount={allPosts.length} categoriesCount={activeClusters} />

      {/* Latest Post Featured */}
      {latestPost && (
        <section className="py-12 bg-white border-b border-neutral-200">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {t('latestPost.title')}
                </h2>
                <p className="text-neutral-600">
                  {t('latestPost.subtitle')}
                </p>
              </div>

              <Link
                href={`/${locale}/blog/${latestPost.slug}`}
                className="group block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border-2 border-primary-100 hover:border-primary hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={latestPost.image.url}
                      alt={latestPost.image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wide">
                        {t(`categoryTranslations.${latestPost.category}`, { default: latestPost.category })}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                      {latestPost.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 line-clamp-3">
                      {latestPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(latestPost.publishedAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div>•</div>
                      <span>{latestPost.readingTime} {t('latestPost.readingTime')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                      <span>{t('latestPost.readFullArticle')}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Clusters Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-neutral-50">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('clusters.title')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {t('clusters.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {clustersConfig.clusters.map((cluster) => {
              // Obtener posts del cluster
              const clusterPosts = metadata.posts.filter(post => post.cluster === cluster.id);

              // Obtener posts con contenido completo
              const clusterPostsWithContent = allPosts.filter(post =>
                clusterPosts.some(cp => cp.id === post.slug.replace(/^.*\//, ''))
              ).slice(0, 5);

              return (
                <Link
                  key={cluster.id}
                  href={`/${locale}/blog/tema/${cluster.id}`}
                  className="group block p-8 bg-white border-2 border-neutral-200 rounded-2xl hover:border-primary hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary-100 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                      <Folder className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                        {cluster.name[locale as 'es' | 'en' | 'ca']}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {clusterPosts.length} {clusterPosts.length === 1 ? t('clusters.article') : t('clusters.articles')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {cluster.description[locale as 'es' | 'en' | 'ca']}
                  </p>

                  {/* Posts List */}
                  {clusterPostsWithContent.length > 0 ? (
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                        {t('clusters.recentArticles')}
                      </p>
                      <ul className="space-y-3">
                        {clusterPostsWithContent.map((post) => (
                          <li key={post.slug}>
                            <span className="group/link flex items-start gap-3 text-sm">
                              <Calendar className="w-4 h-4 mt-0.5 text-neutral-400 flex-shrink-0" />
                              <div className="flex-1">
                                <span className="line-clamp-2 font-medium text-neutral-700">
                                  {post.title}
                                </span>
                                <span className="text-xs text-neutral-500 block mt-1">
                                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </span>
                          </li>
                        ))}
                      </ul>
                      {clusterPosts.length > 5 && (
                        <p className="text-xs text-neutral-500 italic mt-3">
                          +{clusterPosts.length - 5} {t('clusters.moreArticles')}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg text-center">
                      <p className="text-sm text-neutral-500 italic">
                        {t('clusters.comingSoon')}
                      </p>
                    </div>
                  )}

                  {/* CTA Indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                      {t('clusters.viewAll')}
                    </span>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              {t('cta.description')}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent-600 transition-colors font-semibold text-lg"
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
