import CategoryClient from "@/components/CategoryClient";

// Define props with Promise
type Props = {
  params: Promise<{ categories: string }>;
};

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";

async function fetchPostsByCategory(categoryName: string) {
  try {
    const res = await fetch(
      `${API_URL}/articles?filters[category][name][$eq]=${categoryName}&populate=*`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Using fallback data:', error);
    return [];
  }
}

function slugify(input = "") {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-");
}

export default async function CategoryPage({ params }: Props) {
  // AWAIT the params
  const { categories: categorySlug } = await params;
  
  // Convert slug back to category name
  const categoryName = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const posts = await fetchPostsByCategory(categoryName);

  return <CategoryClient initialPosts={posts} categorySlug={categorySlug} />;
}