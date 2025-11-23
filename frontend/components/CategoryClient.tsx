"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SimplePost {
  id: string | number;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  excerpt: string;
  readTime: string;
  author: string;
}

interface Props {
  initialPosts: any[];
  categorySlug: string;
}

export default function CategoryClient({ initialPosts, categorySlug }: Props) {
  const [posts, setPosts] = useState<SimplePost[]>([]);

  useEffect(() => {
    const transformPosts = (posts: any[]): SimplePost[] => {
      return posts.map((post) => {
        // Handle both Strapi format and direct properties
        const attributes = post.attributes || post;
        
        return {
          id: post.id || attributes.id,
          title: attributes.title || "Untitled Post",
          slug: attributes.slug || String(post.id),
          thumbnail: resolveThumbnail(attributes.featuredImage || attributes.thumbnail),
          category: getCategoryName(attributes.category) || "Uncategorized",
          excerpt: attributes.excerpt || "No description available.",
          readTime: attributes.readTime || "5 min",
          author: getAuthorName(attributes.author) || "Unknown Author",
        };
      });
    };

    setPosts(transformPosts(initialPosts));
  }, [initialPosts]);

  function getCategoryName(category: any): string {
    if (!category) return "Uncategorized";
    if (typeof category === "string") return category;
    if (category.data?.attributes?.name) return category.data.attributes.name;
    if (category.attributes?.name) return category.attributes.name;
    if (category.name) return category.name;
    return "Uncategorized";
  }

  function getAuthorName(author: any): string {
    if (!author) return "Unknown Author";
    if (typeof author === "string") return author;
    if (author.data?.attributes?.name) return author.data.attributes.name;
    if (author.attributes?.name) return author.attributes.name;
    if (author.name) return author.name;
    return "Unknown Author";
  }

  function resolveThumbnail(thumbnail: any): string {
    if (!thumbnail) return "/placeholder-post.png";
    
    if (thumbnail.data?.attributes?.url) {
      const url = thumbnail.data.attributes.url;
      return url.startsWith("http") ? url : `/placeholder-post.png`;
    }
    
    if (typeof thumbnail === "string") {
      return thumbnail.startsWith("http") ? thumbnail : `/placeholder-post.png`;
    }
    
    if (thumbnail.url) {
      return thumbnail.url.startsWith("http") ? thumbnail.url : `/placeholder-post.png`;
    }
    
    return "/placeholder-post.png";
  }

  const categoryName = posts[0]?.category || 
    categorySlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold capitalize mb-4">
            {categoryName}
          </h1>
          <p className="text-white/60 text-lg">
            {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-xl mb-4">No posts found in this category.</p>
            <Link 
              href="/blog" 
              className="text-orange-500 hover:text-orange-400 transition-colors"
            >
              Back to all posts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${categorySlug}/${post.slug}`}
                className="group"
              >
                <article className="bg-gray-900/50 rounded-xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold text-xl mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-white/40">
                      <span>{post.readTime}</span>
                      <span>By {post.author}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}