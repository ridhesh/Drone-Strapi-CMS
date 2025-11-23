import BlogClient from "@/components/BlogClient";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";

async function fetchPosts() {
  try {
    console.log('Fetching from:', `${API_URL}/articles?populate=*`);
    
    const res = await fetch(`${API_URL}/articles?populate=*`, {
      cache: "no-store"
    });

    if (!res.ok) {
      console.error('API not responding:', res.status);
      return []; // Return empty array instead of error
    }

    const json = await res.json();
    return json.data || [];
  } catch (error: any) {
    console.error('Connection failed - Strapi not running:', error.message);
    return []; // Return empty array for local development
  }
}

async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/categories?populate=*`, {
      cache: "no-store"
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Categories fetch failed');
    return [];
  }
}

export default async function BlogPage() {
  const [posts, categoriesData] = await Promise.all([
    fetchPosts(),
    fetchCategories()
  ]);

  console.log('Posts:', posts.length, 'Categories:', categoriesData.length);

  // If no data, show empty state
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl mb-4">Blog Loading...</h1>
          <p className="text-gray-400">Strapi backend not connected</p>
          <p className="text-gray-500 text-sm mt-2">
            Run: cd backend && npm run develop
          </p>
        </div>
      </div>
    );
  }

  const categories = categoriesData.map((cat: any) => cat.attributes?.name).filter(Boolean);

  return <BlogClient posts={posts} categories={categories} />;
}