import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

export async function GET() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories from Strapi');
    }
    
    const data = await response.json();
    
    // Transform Strapi response to match your frontend format
    const categories = data.data.map((category: any) => ({
      id: category.id,
      name: category.attributes.name,
      slug: category.attributes.slug,
      description: category.attributes.description || `${category.attributes.name} related content`
    }));
    
    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}