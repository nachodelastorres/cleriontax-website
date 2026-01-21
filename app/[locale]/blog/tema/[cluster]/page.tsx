import { getTranslations } from 'next-intl/server';
import { getAllBlogPostsWithContent } from "@/lib/blog";
import Container from "@/components/ui/Container";
import { generateBreadcrumbSchema, getOrganizationReference } from "@/lib/schemas";
import Link from "next/link";
import { Folder, FileText, Calendar, ArrowLeft, HelpCircle, Tag } from "lucide-react";
import clustersConfig from "@/messages/blog-posts/clusters-config.json";
import metadata from "@/messages/blog-posts/metadata.json";
import BlogCard from "@/components/blog/BlogCard";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SITE_URL, getAlternates, canonicalFor, type Locale } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; cluster: string }>;
};

export async function generateStaticParams() {
  // Generar rutas estáticas para todos los clusters en todos los idiomas
  const locales = ['es', 'en', 'ca'];
  const clusters = clustersConfig.clusters.map(c => c.id);

  return locales.flatMap(locale =>
    clusters.map(cluster => ({
      locale,
      cluster,
    }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, cluster } = await params;

  const clusterData = clustersConfig.clusters.find(c => c.id === cluster);

  if (!clusterData) {
    return {
      title: 'Cluster no encontrado',
      description: 'El cluster solicitado no existe',
    };
  }

  const clusterName = clusterData.name[locale as Locale];
  const clusterDescription = clusterData.description[locale as Locale];
  const clusterKeywords = clusterData.keywords[locale as Locale];
  const clusterPath = `/blog/tema/${cluster}`;

  return {
    title: `${clusterName} - Blog Cleriontax`,
    description: clusterDescription,
    keywords: clusterKeywords.join(', '),
    alternates: getAlternates(locale as Locale, clusterPath),
    openGraph: {
      title: `${clusterName} - Blog Cleriontax`,
      description: clusterDescription,
      type: 'website',
      locale: locale,
      url: canonicalFor(locale as Locale, clusterPath),
    },
  };
}

export default async function ClusterPage({ params }: Props) {
  const { locale, cluster } = await params;
  const t = await getTranslations({ locale, namespace: 'blog.clusterPage' });

  // Buscar cluster
  const clusterData = clustersConfig.clusters.find(c => c.id === cluster);

  if (!clusterData) {
    notFound();
  }

  // Obtener posts del cluster
  const clusterPostsMeta = metadata.posts.filter(post => post.cluster === cluster);
  const allPosts = await getAllBlogPostsWithContent(locale);
  const clusterPosts = allPosts.filter(post =>
    clusterPostsMeta.some(cp => cp.id === post.slug.replace(/^.*\//, ''))
  );

  const clusterName = clusterData.name[locale as Locale];
  const clusterDescription = clusterData.description[locale as Locale];
  const clusterKeywords = clusterData.keywords[locale as Locale];
  const clusterPrompts = clusterData.aiPrompts[locale as Locale];

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema({
    locale: locale as Locale,
    path: `/${locale}/blog/tema/${cluster}`,
    baseUrl: SITE_URL
  });

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Header */}
      <section
        id="hero-cluster"
        className="relative min-h-[600px] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8F9FA] to-white"
      >
        {/* Background Pattern/Image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(27,32,66,0.08),_transparent_70%)]">
          <div className="absolute inset-0 opacity-[0.2]">
            <Image
              src="/images/illustrations/blog-fiscalidad-cripto.webp"
              alt={`${clusterName} - Cluster temático de fiscalidad de criptomonedas`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center space-y-6 md:space-y-8">

          {/* Back Link */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-4 animate-fade-in"
            style={{ animationDelay: '0.05s', animationFillMode: 'both' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t('backToBlog')}</span>
          </Link>

          {/* Badge with Cluster Icon */}
          <div
            className="inline-flex flex-col items-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Folder className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-semibold text-navy tracking-wider uppercase">
                {t('badge')}
              </span>
            </div>
            <div className="w-24 h-[2px] bg-accent" />
          </div>

          {/* Main Title (H1) */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-navy leading-tight tracking-tight max-w-4xl animate-fade-in"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            {clusterName}
          </h1>

          {/* Subtitle/Description */}
          <p
            className="text-lg md:text-xl text-gray-blue max-w-3xl leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            {clusterDescription}
          </p>

          {/* Stats */}
          <div
            className="flex flex-wrap justify-center gap-6 pt-4 animate-fade-in"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-3 bg-white rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FileText className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold text-navy">{clusterPosts.length}</div>
                <div className="text-xs text-gray-blue">
                  {clusterPosts.length === 1 ? t('article') : t('articles')}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Additional Text - Visually Hidden but Crawlable */}
          <div className="sr-only" aria-hidden="true">
            <p>
              {t('seoText', {
                clusterName: clusterName.toLowerCase(),
                keywords: clusterKeywords.join(', ')
              })}
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-navy/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Keywords Section - Tag Cloud Optimized */}
      <section className="py-12 bg-gradient-to-b from-white to-neutral-50/50 border-b border-neutral-100">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Header - más discreto */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-300"></div>
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {t('keyTopics')}
                </span>
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-300"></div>
            </div>

            {/* Tag Cloud - Keywords con tamaños variables */}
            <div className="flex flex-wrap justify-center items-center gap-3 px-4">
              {clusterKeywords.map((keyword, idx) => {
                // Alternar tamaños: destacar cada 3er keyword
                const isHighlight = idx % 3 === 0;
                const isMedium = idx % 3 === 1;

                // Alternar colores sutiles para variedad visual
                const colorClasses = [
                  'bg-primary-50 text-primary-700 hover:bg-primary-100 border-primary-100',
                  'bg-accent-50 text-accent-700 hover:bg-accent-100 border-accent-100',
                  'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-200',
                ];
                const colorClass = colorClasses[idx % 3];

                return (
                  <span
                    key={idx}
                    itemProp="keywords"
                    className={`
                      inline-block px-4 py-1.5 rounded-full border
                      font-medium transition-all duration-200
                      ${colorClass}
                      ${isHighlight ? 'text-base' : isMedium ? 'text-sm' : 'text-xs'}
                      hover:scale-105 hover:shadow-md cursor-default
                    `}
                  >
                    {keyword}
                  </span>
                );
              })}
            </div>

            {/* SEO Hidden Keywords - Variaciones para crawlers */}
            <div className="sr-only" aria-hidden="true">
              <p itemProp="about">
                {t('seoKeywordsPrefix', {
                  keywords1: clusterKeywords.slice(0, 5).join(', '),
                  keywords2: clusterKeywords.slice(5, 10).join(', '),
                  clusterName: clusterName.toLowerCase()
                })}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Posts Grid */}
      {clusterPosts.length > 0 ? (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary-50/20">
          <Container>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {t('allArticles.title')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('allArticles.description', { clusterName: clusterName.toLowerCase() })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clusterPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  index={index}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <section className="py-16 md:py-20 bg-white">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6">
                <FileText className="w-16 h-16 text-neutral-300 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-600 mb-4">
                {t('comingSoon.title')}
              </h2>
              <p className="text-neutral-500">
                {t('comingSoon.description', { clusterName: clusterName.toLowerCase() })}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* FAQs Section */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-12">
              <div className="p-3 bg-accent/10 rounded-xl">
                <HelpCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {t('faq.title')}
                </h2>
                <p className="text-lg text-neutral-600">
                  {t('faq.description', { clusterName: clusterName.toLowerCase() })}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {clusterPrompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-3">
                        {prompt}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {t('faq.answerText')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              {t('cta.description', { clusterName: clusterName.toLowerCase() })}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent-600 transition-colors font-semibold text-lg"
            >
              {t('cta.button')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
