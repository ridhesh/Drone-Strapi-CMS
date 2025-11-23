"use client";

import { useState, useEffect } from "react";
import BlogHero from "@/components/BlogHero";
import Categories from "@/components/Categories";

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
    author?: {
      data?: {
        attributes?: {
          name?: string;
        };
      };
    };
    readTime?: string;
    publishedAt?: string;
    createdAt?: string;
  };
  // Fallback for direct properties (for mock data)
  title?: string;
  slug?: string;
  excerpt?: string;
  thumbnail?: any;
  category?: { name?: string; slug?: string } | string | null;
  authorName?: string;
  readTime?: string;
  publishedAt?: string;
  createdAt?: string;
}

interface BlogClientProps {
  posts: Post[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>(categories);
  const [showDebug, setShowDebug] = useState(true); // Set to false to hide debug

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCategories(categories);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = categories.filter((cat) =>
        cat.toLowerCase().includes(lowerQuery)
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  // Debug logging
  console.log('=== DEBUG BLOGC LIENT ===');
  console.log('Total posts:', posts.length);
  console.log('Categories:', categories);
  posts.forEach((post, index) => {
    console.log(`Post ${index}:`, {
      id: post.id,
      title: post.attributes?.title || post.title,
      category: post.attributes?.category?.data?.attributes?.name || post.category,
      hasAttributes: !!post.attributes,
      fullPost: post
    });
  });

  // TEMPORARY DEBUG VIEW - Remove this section once working
  if (showDebug) {
    return (
      <main className="min-h-screen bg-black p-8">
        <div className="max-w-6xl mx-auto">
          {/* Debug header */}
          <div className="bg-yellow-500 text-black p-4 rounded-lg mb-6">
            <h1 className="text-2xl font-bold">DEBUG MODE - Blog Data</h1>
            <p>Posts: {posts.length} | Categories: {categories.length}</p>
            <button 
              onClick={() => setShowDebug(false)}
              className="mt-2 bg-black text-white px-4 py-2 rounded"
            >
              Switch to Normal View
            </button>
          </div>
          
          {/* Simple display of all posts */}
          <section className="mb-8">
            <h2 className="text-3xl text-white mb-6">All Blog Posts ({posts.length})</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => {
                const title = post.attributes?.title || post.title || 'No Title';
                const excerpt = post.attributes?.excerpt || post.excerpt || 'No excerpt';
                const category = post.attributes?.category?.data?.attributes?.name || 
                                (typeof post.category === 'object' ? post.category?.name : post.category) || 
                                'Uncategorized';
                const slug = post.attributes?.slug || post.slug || `post-${post.id}`;
                
                return (
                  <div key={post.id} className="bg-gray-800 p-6 rounded-lg text-white border border-gray-600">
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="text-blue-400 text-sm mb-2">Category: {category}</p>
                    <p className="text-gray-300 mb-3">{excerpt}</p>
                    <p className="text-gray-500 text-xs">Slug: {slug} | ID: {post.id}</p>
                    {post.attributes?.featuredImage?.data?.attributes?.url && (
                      <p className="text-green-400 text-xs mt-2">
                        Has image: {post.attributes.featuredImage.data.attributes.url}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Display categories */}
          <section>
            <h2 className="text-2xl text-white mb-4">All Categories ({categories.length})</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <span key={category} className="bg-blue-500 text-white px-3 py-1 rounded">
                  {category}
                </span>
              ))}
            </div>
          </section>

          {/* Raw data view */}
          <section className="mt-8">
            <h2 className="text-2xl text-white mb-4">Raw Data</h2>
            <details className="bg-gray-900 p-4 rounded">
              <summary className="text-white cursor-pointer">View Raw Posts Data</summary>
              <pre className="text-white text-xs mt-2 overflow-auto">
                {JSON.stringify(posts, null, 2)}
              </pre>
            </details>
          </section>
        </div>
      </main>
    );
  }

  // ORIGINAL BLOGC LIENT CODE (keep your existing logic here)
  // Helper function to safely get post data
  const getPostData = (post: Post) => {
    // If post has attributes (Strapi data), use that
    if (post.attributes) {
      return {
        title: post.attributes.title || 'Untitled',
        slug: post.attributes.slug || `post-${post.id}`,
        excerpt: post.attributes.excerpt || '',
        featuredImage: post.attributes.featuredImage,
        category: post.attributes.category,
        author: post.attributes.author,
        readTime: post.attributes.readTime || '5 min',
        publishedAt: post.attributes.publishedAt || post.attributes.createdAt
      };
    }
    
    // Fallback for mock data structure
    return {
      title: post.title || 'Untitled',
      slug: post.slug || `post-${post.id}`,
      excerpt: post.excerpt || '',
      featuredImage: post.thumbnail ? { data: { attributes: { url: post.thumbnail.url || post.thumbnail } } } : undefined,
      category: typeof post.category === 'object' ? { data: { attributes: { name: post.category?.name } } } : 
                post.category ? { data: { attributes: { name: post.category } } } : undefined,
      author: post.authorName ? { data: { attributes: { name: post.authorName } } } : undefined,
      readTime: post.readTime || '5 min',
      publishedAt: post.publishedAt || post.createdAt
    };
  };

  // Filter posts by category and search query
  const getPostsByCategory = (categoryName: string) => {
    return posts.filter(post => {
      const postData = getPostData(post);
      const postCategory = postData.category?.data?.attributes?.name;
      
      const matchesCategory = postCategory === categoryName;
      const matchesSearch = !searchQuery || 
        postData.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        postData.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).map(post => ({
      ...post,
      // Add normalized data for consistent access in Categories component
      normalizedData: getPostData(post)
    }));
  };

  return (
    <main className="min-h-screen bg-black">
      <BlogHero onSearch={setSearchQuery} />
      
      <section className="max-w-7xl mx-auto px-6 py-12">
        {filteredCategories.length === 0 ? (
          <div className="text-white/70 text-center py-12">
            <p className="text-lg">No categories match your search.</p>
            <p className="text-sm text-white/50 mt-2">Try a different search term.</p>
          </div>
        ) : (
          filteredCategories.map((category, index) => {
            const categoryPosts = getPostsByCategory(category);
            console.log(`Category "${category}":`, categoryPosts.length, 'posts');
            
            return (
              <Categories 
                key={category} 
                title={category} 
                posts={categoryPosts} 
                searchQuery={searchQuery} 
              />
            );
          })
        )}
      </section>
    </main>
  );
}