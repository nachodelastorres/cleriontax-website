import { getTranslations } from 'next-intl/server';
import { getAllBlogPostsWithContent, getAllCategories } from "@/lib/blog";
import Container from "@/components/ui/Container";
import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";

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
  const t = await getTranslations({ locale, namespace: 'blog' });

  // Cargar todos los posts con su contenido en el idioma actual
  const allPosts = await getAllBlogPostsWithContent(locale);
  const featuredPosts = allPosts.filter(post => post.featured);
  const categories = getAllCategories();

  // Obtener traducciones de categorías
  const categoryTranslations = t.raw('categoryTranslations') as Record<string, string> || {};

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
      <BlogHero postsCount={allPosts.length} categoriesCount={categories.length} />

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
                    {categoryTranslations[category] || category}
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
