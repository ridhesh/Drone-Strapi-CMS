import CategoryClient from "@/components/CategoryClient";
import { getMockPostsByCategory } from "@/lib/mockData";

type Props = {
  params: { categories: string };
};

async function getCategoryData(categorySlug: string) {
  // Use mock data for now
  console.log('Using mock data for category:', categorySlug);
  
  const mockData = getMockPostsByCategory(categorySlug);
  return mockData.data;
}

export default async function CategoryPage({ params }: Props) {
  const { categories: categorySlug } = await params;
  const posts = await getCategoryData(categorySlug);

  return <CategoryClient initialPosts={posts} categorySlug={categorySlug} />;
}