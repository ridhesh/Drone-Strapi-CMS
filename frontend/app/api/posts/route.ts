import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

export async function GET() {
  try {
    // Fetch articles with category populated
    const response = await fetch(
      `${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts from Strapi');
    }
    
    const data = await response.json();
    
    // Transform Strapi response to match your frontend format
    const posts = data.data.map((article: any) => ({
      id: article.id,
      title: article.attributes.title,
      slug: article.attributes.slug,
      excerpt: article.attributes.excerpt,
      thumbnail: article.attributes.featuredImage?.data?.attributes?.url || '/placeholder-post.png',
      category: { 
        name: article.attributes.category?.data?.attributes?.name || 'Uncategorized'
      },
      readTime: "5 min", // You can calculate this or add as a field in Strapi
      author: { name: "Admin" }, // You can add author field in Strapi
      content: article.attributes.content,
      publishedAt: article.attributes.publishedAt || article.attributes.createdAt
    }));
    
    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}