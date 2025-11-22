// Sistema de gestión de contenido del blog con soporte i18n
// Metadata y contenido separados para mejor escalabilidad

import metadata from '@/messages/blog-posts/metadata.json';

export interface BlogPost {
  slug: string;
  slugTranslations: {
    es: string;
    en: string;
    ca: string;
  };
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  category: string;
  tags: string[];
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
    ogImageAlt?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
  };
  featured: boolean;
  layoutType?: 'magazine' | 'minimal' | 'storytelling';
  cluster?: string;
  relatedPosts?: string[];
  aiOptimized?: boolean;
}

// Interfaz para el contenido traducido del blog
interface BlogPostContent {
  title: string;
  excerpt: string;
  content: string;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Función para cargar el contenido de un blog post en un idioma específico
async function loadBlogPostContent(postId: string, locale: string): Promise<BlogPostContent> {
  try {
    const content = await import(`@/messages/blog-posts/${locale}/${postId}.json`);
    return content.default;
  } catch (error) {
    console.error(`Error loading blog post content for ${postId} in ${locale}:`, error);
    // Fallback a español si no existe la traducción
    if (locale !== 'es') {
      try {
        const content = await import(`@/messages/blog-posts/es/${postId}.json`);
        return content.default;
      } catch (fallbackError) {
        // Si falla completamente, devolver valores por defecto
        return {
          title: 'Post no disponible',
          excerpt: 'Este contenido no está disponible.',
          content: 'Este contenido no está disponible en este idioma.'
        };
      }
    }
    // Si falla en español, devolver valores por defecto
    return {
      title: 'Post no disponible',
      excerpt: 'Este contenido no está disponible.',
      content: 'Este contenido no está disponible.'
    };
  }
}

// Obtener todos los posts del blog (sin contenido, solo metadata)
export function getAllBlogPosts(): Array<Omit<BlogPost, 'title' | 'excerpt' | 'content'>> {
  return metadata.posts.map(post => ({
    slug: post.slugTranslations.es, // Slug por defecto en español
    slugTranslations: post.slugTranslations,
    author: post.author,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    readingTime: post.readingTime,
    category: post.category,
    tags: post.tags,
    image: post.image,
    seo: post.seo,
    featured: post.featured,
    layoutType: (post as any).layoutType || 'magazine',
    title: '', // Se cargará dinámicamente
    excerpt: '', // Se cargará dinámicamente
    content: '' // Se cargará dinámicamente
  })).sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Obtener posts destacados
export function getFeaturedBlogPosts(): Array<Omit<BlogPost, 'title' | 'excerpt' | 'content'>> {
  return getAllBlogPosts().filter(post => post.featured);
}

// Obtener un post específico por slug con su contenido en el idioma especificado
export async function getBlogPostBySlug(slug: string, locale: string = 'es'): Promise<BlogPost | null> {
  // Buscar el post por slug (puede ser en cualquier idioma)
  const postMetadata = metadata.posts.find(post =>
    post.slugTranslations.es === slug ||
    post.slugTranslations.en === slug ||
    post.slugTranslations.ca === slug
  );

  if (!postMetadata) {
    return null;
  }

  try {
    // Cargar el contenido en el idioma especificado
    const content = await loadBlogPostContent(postMetadata.id, locale);

    // Determinar el slug correcto según el idioma
    const localizedSlug = postMetadata.slugTranslations[locale as keyof typeof postMetadata.slugTranslations] || postMetadata.slugTranslations.es;

    // Usar SEO del contenido traducido si existe, sino usar el del metadata
    const seo = content.seo || postMetadata.seo;

    return {
      slug: localizedSlug,
      slugTranslations: postMetadata.slugTranslations,
      title: content.title,
      excerpt: content.excerpt,
      content: content.content,
      author: postMetadata.author,
      publishedAt: postMetadata.publishedAt,
      updatedAt: postMetadata.updatedAt,
      readingTime: postMetadata.readingTime,
      category: postMetadata.category,
      tags: postMetadata.tags,
      image: postMetadata.image,
      seo: seo,
      featured: postMetadata.featured,
      layoutType: (postMetadata as any).layoutType || 'magazine'
    };
  } catch (error) {
    console.error(`Error loading blog post ${postMetadata.id}:`, error);
    return null;
  }
}

// Obtener posts por categoría
export function getBlogPostsByCategory(category: string): Array<Omit<BlogPost, 'title' | 'excerpt' | 'content'>> {
  return getAllBlogPosts().filter(post => post.category === category);
}

// Obtener posts por tag
export function getBlogPostsByTag(tag: string): Array<Omit<BlogPost, 'title' | 'excerpt' | 'content'>> {
  return getAllBlogPosts().filter(post => post.tags.includes(tag));
}

// Obtener todas las categorías
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  metadata.posts.forEach(post => categories.add(post.category));
  return Array.from(categories);
}

// Obtener todos los tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  metadata.posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags);
}

// Función helper para cargar posts con contenido en el idioma especificado (para páginas de listado)
export async function getAllBlogPostsWithContent(locale: string = 'es'): Promise<BlogPost[]> {
  const posts = getAllBlogPosts();
  const postsWithContent = await Promise.all(
    posts.map(async (post) => {
      const postMetadata = metadata.posts.find(p => p.slugTranslations.es === post.slug);
      if (!postMetadata) return null;

      try {
        const content = await loadBlogPostContent(postMetadata.id, locale);
        return {
          ...post,
          title: content.title,
          excerpt: content.excerpt,
          content: content.content
        } as BlogPost;
      } catch (error) {
        console.error(`Error loading content for post ${post.slug}:`, error);
        return null;
      }
    })
  );

  return postsWithContent.filter((post): post is BlogPost => post !== null);
}
