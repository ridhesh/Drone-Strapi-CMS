"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface Post {
  id: number | string;
  attributes?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    featuredImage?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
    category?: {
      data?: {
        attributes?: {
          name?: string;
          slug?: string;
        };
      };
    };
  };
  // Add these properties for direct access
  slug?: string;
  title?: string;
  excerpt?: string;
  thumbnail?: any;
  category?: any;
  featuredImage?: any; // ADDED THIS LINE
  normalizedData?: any;
}

interface CategoriesProps {
  title: string;            
  posts: Post[];             
  searchQuery?: string;      
}

const container: Variants = { 
  hidden: {}, 
  show: { 
    transition: { 
      staggerChildren: 0.06 
    } 
  } 
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.45, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

function slugify(input = "") {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-");
}

function getCategoryName(cat: any): string | null {
  if (!cat) return null;
  if (typeof cat === "string") return cat;
  if (cat.attributes?.name) return cat.attributes.name;
  if (cat.data?.attributes?.name) return cat.data.attributes.name;
  if (cat.name) return cat.name;
  return null;
}

function resolveThumbnail(thumbnail: any): string {
  if (!thumbnail) return "/placeholder-post.png";
  
  // Handle Strapi format
  if (thumbnail.data?.attributes?.url) {
    const url = thumbnail.data.attributes.url;
    return url.startsWith("http") ? url : `http://localhost:1337${url}`;
  }
  
  // Handle direct URL
  if (typeof thumbnail === "string") {
    return thumbnail.startsWith("http") ? thumbnail : `/placeholder-post.png`;
  }
  
  // Handle object with url
  if (thumbnail.url) {
    return thumbnail.url.startsWith("http") ? thumbnail.url : `/placeholder-post.png`;
  }
  
  return "/placeholder-post.png";
}

// FIXED: Better post property access with proper typing
function getPostProperty(post: Post, property: 'slug' | 'title' | 'excerpt' | 'category' | 'featuredImage'): any {
  // First try normalizedData from BlogClient
  if (post.normalizedData && post.normalizedData[property]) {
    return post.normalizedData[property];
  }
  // Then try attributes (Strapi format)
  if (post.attributes?.[property as keyof typeof post.attributes]) {
    return post.attributes[property as keyof typeof post.attributes];
  }
  // Finally try direct property
  return (post as any)[property];
}

// UPDATED: Better category matching logic
function doesPostMatchCategory(post: Post, categoryTitle: string): boolean {
  const postCategory = getPostProperty(post, 'category');
  const postCategoryName = getCategoryName(postCategory);
  
  if (!postCategoryName) return false;
  
  // More flexible matching - handle case differences and variations
  return postCategoryName.toLowerCase() === categoryTitle.toLowerCase();
}

export default function Categories({ title, posts, searchQuery }: CategoriesProps) {
  const safePosts = Array.isArray(posts) ? posts : [];
  const desiredSlug = slugify(title);

  console.log(`🔍 Categories Component - "${title}"`);
  console.log(`Total posts received: ${safePosts.length}`);
  safePosts.forEach((post, index) => {
    const postCategory = getPostProperty(post, 'category');
    const postCategoryName = getCategoryName(postCategory);
    console.log(`Post ${index}:`, {
      id: post.id,
      title: getPostProperty(post, 'title'),
      category: postCategoryName,
      matchesCurrentCategory: doesPostMatchCategory(post, title)
    });
  });

  const filteredPosts = safePosts.filter((post) => {
    const matchesCategory = doesPostMatchCategory(post, title);
    
    const postTitle = getPostProperty(post, 'title') || '';
    const postExcerpt = getPostProperty(post, 'excerpt') || '';
    
    const matchesSearch = !searchQuery || 
      postTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      postExcerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  console.log(`✅ Filtered posts for "${title}": ${filteredPosts.length}`);

  return (
    <section className="w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {title} ({filteredPosts.length})
          </h2>

          {filteredPosts.length > 0 && (
            <Link
              href={`/blog/${desiredSlug}`}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center text-white/60">
            No posts found {searchQuery ? `matching "${searchQuery}"` : "in this category"}.
            <div className="text-xs mt-2 text-white/40">
              Debug: Received {safePosts.length} total posts for this category section
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredPosts.map((post) => {
              const postSlug = getPostProperty(post, 'slug');
              const postTitle = getPostProperty(post, 'title') || "Untitled";
              const postExcerpt = getPostProperty(post, 'excerpt') || "";
              const thumbnail = getPostProperty(post, 'featuredImage');
              
              const href = `/blog/${desiredSlug}/${postSlug}`;

              console.log(`📄 Rendering post: ${postTitle}`, {
                slug: postSlug,
                thumbnail: thumbnail
              });

              return (
                <Link key={String(post.id)} href={href}>
                  <motion.article
                    variants={cardVariants}
                    whileHover={{ 
                      y: -4, 
                      transition: { duration: 0.2 } 
                    }}
                    className="group block rounded-xl overflow-hidden bg-gray-900/50 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="aspect-video overflow-hidden bg-gray-800">
                      <img
                        src={resolveThumbnail(thumbnail)}
                        alt={postTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.src = "/placeholder-post.png";
                        }}
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                        {postTitle}
                      </h3>
                      <p className="text-white/60 text-sm line-clamp-3">
                        {postExcerpt}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}