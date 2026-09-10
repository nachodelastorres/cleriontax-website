import { getTranslations } from 'next-intl/server';
import Container from "@/components/ui/Container";
import { Folder, FileText } from "lucide-react";
import Link from "next/link";
import clustersConfig from "@/messages/blog-posts/clusters-config.json";
import clustersIndex from "@/messages/blog-posts/clusters-index.json";
import metadata from "@/messages/blog-posts/metadata.json";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: 'Clusters Temáticos - Blog Cleriontax',
    description: 'Explora nuestro contenido organizado en clusters temáticos sobre fiscalidad de criptomonedas en España.',
  };
}

export default async function ClustersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-azul">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-blanco">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Clusters Temáticos
            </h1>
            <p className="text-xl text-blanco/90 mb-8">
              Contenido organizado por temas para facilitar tu búsqueda
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                <span>{clustersIndex.stats.totalClusters} Clusters</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>{clustersIndex.stats.totalPosts} Artículos</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Clusters Grid */}
      <section className="py-16 md:py-20 bg-blanco">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clustersConfig.clusters.map((cluster) => {
              const clusterPosts = metadata.posts.filter(post => post.cluster === cluster.id);

              return (
                <div
                  key={cluster.id}
                  className="group p-8 bg-blanco border-2 border-niebla hover:border-azul transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-papel group-hover:bg-azul group-hover:text-blanco transition-colors">
                      <Folder className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-azul mb-2 group-hover:text-rojo transition-colors">
                        {cluster.name[locale as 'es' | 'en' | 'ca']}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-pizarra">
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {clusterPosts.length} artículos
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-pizarra mb-6 leading-relaxed">
                    {cluster.description[locale as 'es' | 'en' | 'ca']}
                  </p>

                  {/* Keywords */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-pizarra uppercase tracking-wide mb-3">
                      Temas principales
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cluster.keywords[locale as 'es' | 'en' | 'ca'].slice(0, 8).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium bg-papel text-azul"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Prompts */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-pizarra uppercase tracking-wide mb-3">
                      Preguntas frecuentes
                    </p>
                    <ul className="space-y-2">
                      {cluster.aiPrompts[locale as 'es' | 'en' | 'ca'].slice(0, 3).map((prompt, idx) => (
                        <li key={idx} className="text-sm text-pizarra flex items-start gap-2">
                          <span className="text-rojo mt-1">→</span>
                          <span>{prompt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Posts List */}
                  {clusterPosts.length > 0 && (
                    <div className="pt-6 border-t border-niebla">
                      <p className="text-xs font-semibold text-pizarra uppercase tracking-wide mb-3">
                        Artículos en este cluster
                      </p>
                      <ul className="space-y-2">
                        {clusterPosts.slice(0, 5).map((post) => (
                          <li key={post.id}>
                            <Link
                              href={`/${locale}/blog/${post.slugTranslations.es}`}
                              className="group/link flex items-start gap-2 text-sm hover:text-azul transition-colors"
                            >
                              <FileText className="w-4 h-4 mt-0.5 text-pizarra group-hover/link:text-azul" />
                              <span className="flex-1 line-clamp-2">
                                {post.id.split('-').map(word =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                              </span>
                            </Link>
                          </li>
                        ))}
                        {clusterPosts.length > 5 && (
                          <li className="text-xs text-pizarra italic">
                            +{clusterPosts.length - 5} artículos más
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Empty State */}
                  {clusterPosts.length === 0 && (
                    <div className="pt-6 border-t border-niebla">
                      <p className="text-sm text-pizarra italic text-center py-4">
                        📝 Contenido próximamente
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-papel">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-azul mb-6 text-center">
              Estadísticas del Blog
            </h2>
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="p-8 bg-blanco text-center">
                <div className="text-4xl font-bold text-azul mb-2">
                  {clustersIndex.stats.totalClusters}
                </div>
                <div className="text-sm text-pizarra font-medium">Clusters Temáticos</div>
              </div>
              <div className="p-8 bg-blanco text-center">
                <div className="text-4xl font-bold text-rojo mb-2">
                  {clustersIndex.stats.totalPosts}
                </div>
                <div className="text-sm text-pizarra font-medium">Artículos Publicados</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
