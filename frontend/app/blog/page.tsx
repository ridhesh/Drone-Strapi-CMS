import BlogClient from "@/components/BlogClient";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337/api";
// Remove API_TOKEN since you set public permissions
// const API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchPosts() {
  try {
    const res = await fetch(`${API_URL}/articles?populate=*`, {
      cache: "no-store" // Remove headers since public permissions are set
    });

    if (!res.ok) {
      console.error('Failed to fetch articles:', res.status);
      return [];
    }
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/categories?populate=*`, {
      cache: "no-store" // Remove headers
    });

    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status);
      return [];
    }
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function BlogPage() {
  const [posts, categoriesData] = await Promise.all([
    fetchPosts(),
    fetchCategories()
  ]);

  console.log('Fetched posts:', posts.length);
  console.log('Fetched categories:', categoriesData.length);

  // Extract category names
  const categories = categoriesData.map((cat: any) => 
    cat.attributes?.name
  ).filter(Boolean);

  // If no categories from API, extract from posts
  const categoriesFromPosts = Array.from(
    new Set(
      posts.map((post: any) => 
        post.attributes?.category?.data?.attributes?.name
      ).filter(Boolean)
    )
  );

  const allCategories = categories.length > 0 ? categories : categoriesFromPosts;

  return <BlogClient posts={posts} categories={allCategories} />;
}