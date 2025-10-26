import { getTranslations } from 'next-intl/server';
import { getAllBlogPosts, getFeaturedBlogPosts, getAllCategories } from "@/lib/blog";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { FileText, TrendingUp } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.blog' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: 'blog fiscalidad criptomonedas, noticias cripto España, guías fiscales crypto, impuestos bitcoin, declaración criptoactivos, AEAT criptomonedas, asesoría fiscal blockchain, actualidad normativa cripto',
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        'es': '/es/blog',
        'en': '/en/blog',
        'ca': '/ca/blog',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('blog');

  const allPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();
  const categories = getAllCategories();

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Cleriontax Blog - Fiscalidad de Criptomonedas",
    "description": "Guías, noticias y análisis sobre la fiscalidad de criptomonedas en España. Expertos en IRPF, modelo 100, 720 y optimización fiscal crypto.",
    "url": `https://cleriontax.com/${locale}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Cleriontax",
      "url": "https://cleriontax.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cleriontax.com/images/logo.png"
      }
    },
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
        "@id": `https://cleriontax.com/${locale}/blog/${post.slugTranslations[locale as keyof typeof post.slugTranslations]}`
      }
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-accent/20 mb-4">
              <FileText className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-800 via-primary-600 to-accent bg-clip-text text-transparent md:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>

            <p className="text-lg text-neutral-600 md:text-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-primary">{allPosts.length}</div>
                  <div className="text-sm text-neutral-600">{t('hero.stats.articles')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-accent">{categories.length}</div>
                  <div className="text-sm text-neutral-600">{t('hero.stats.categories')}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <Container>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {t('featured.title')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('featured.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  index={index}
                  featured={index === 0}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary-50/20">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t('allArticles.title')}
            </h2>
            <p className="text-lg text-neutral-600">
              {t('allArticles.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              {t('categories.title')}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 border border-accent/20 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer group"
                >
                  <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
