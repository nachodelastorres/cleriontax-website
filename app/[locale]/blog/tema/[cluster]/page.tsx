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
        className="relative min-h-[600px] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-papel"
      >
        {/* Background Pattern/Image */}
        <div className="absolute inset-0">
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
            className="inline-flex items-center gap-2 text-azul hover:text-rojo transition-colors mb-4"
            style={{ animationDelay: '0.05s', animationFillMode: 'both' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t('backToBlog')}</span>
          </Link>

          {/* Badge with Cluster Icon */}
          <div
            className="inline-flex flex-col items-center gap-4"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-azul/10">
                <Folder className="w-6 h-6 text-azul" />
              </div>
              <span className="text-xs font-semibold text-azul tracking-wider uppercase">
                {t('badge')}
              </span>
            </div>
            <div className="w-24 h-[2px] bg-rojo" />
          </div>

          {/* Main Title (H1) */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-azul leading-tight tracking-tight max-w-4xl"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            {clusterName}
          </h1>

          {/* Subtitle/Description */}
          <p
            className="text-lg md:text-xl text-pizarra max-w-3xl leading-relaxed"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            {clusterDescription}
          </p>

          {/* Stats */}
          <div
            className="flex flex-wrap justify-center gap-6 pt-4"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-3 bg-blanco px-6 py-3 transition- duration-300">
              <FileText className="w-5 h-5 text-azul" />
              <div className="text-left">
                <div className="text-2xl font-bold text-azul">{clusterPosts.length}</div>
                <div className="text-xs text-pizarra">
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
        <div className="absolute top-20 left-10 w-32 h-32 bg-rojo/5"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-azul/5" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Keywords Section - Tag Cloud Optimized */}
      <section className="py-12 bg-papel border-b border-papel">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Header - más discreto */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-12 bg-niebla"></div>
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-pizarra" />
                <span className="text-xs font-medium text-pizarra uppercase tracking-wider">
                  {t('keyTopics')}
                </span>
              </div>
              <div className="h-px w-12 bg-niebla"></div>
            </div>

            {/* Tag Cloud - Keywords con tamaños variables */}
            <div className="flex flex-wrap justify-center items-center gap-3 px-4">
              {clusterKeywords.map((keyword, idx) => {
                // Alternar tamaños: destacar cada 3er keyword
                const isHighlight = idx % 3 === 0;
                const isMedium = idx % 3 === 1;

                // Alternar colores sutiles para variedad visual
                const colorClasses = [
                  'bg-papel text-azul hover:bg-papel border-papel',
                  'bg-papel text-rojo hover:bg-rojo/10 border-rojo/30',
                  'bg-papel text-pizarra hover:bg-niebla border-niebla',
                ];
                const colorClass = colorClasses[idx % 3];

                return (
                  <span
                    key={idx}
                    itemProp="keywords"
                    className={`
 inline-block px-4 py-1.5 border
 font-medium transition-all duration-200
 ${colorClass}
 ${isHighlight ? 'text-base' : isMedium ? 'text-sm' : 'text-xs'}
   cursor-default
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
        <section className="py-16 md:py-20 bg-papel">
          <Container>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-azul mb-4">
                {t('allArticles.title')}
              </h2>
              <p className="text-lg text-pizarra">
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
        <section className="py-16 md:py-20 bg-blanco">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6">
                <FileText className="w-16 h-16 text-niebla mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-pizarra mb-4">
                {t('comingSoon.title')}
              </h2>
              <p className="text-pizarra">
                {t('comingSoon.description', { clusterName: clusterName.toLowerCase() })}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* FAQs Section */}
      <section className="py-16 md:py-20 bg-blanco">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-12">
              <div className="p-3 bg-rojo/10">
                <HelpCircle className="w-6 h-6 text-rojo" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-azul mb-2">
                  {t('faq.title')}
                </h2>
                <p className="text-lg text-pizarra">
                  {t('faq.description', { clusterName: clusterName.toLowerCase() })}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {clusterPrompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-papel border border-papel transition-"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-azul text-blanco flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-azul mb-3">
                        {prompt}
                      </h3>
                      <p className="text-pizarra leading-relaxed">
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
      <section className="py-16 bg-papel">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-azul mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-pizarra mb-8">
              {t('cta.description', { clusterName: clusterName.toLowerCase() })}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-rojo text-blanco hover:bg-rojo transition-colors font-semibold text-lg"
            >
              {t('cta.button')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
