import { Heart, Share2 } from "lucide-react";

// Define props with Promise
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";

async function fetchPostBySlug(slug: string) {
  try {
    const res = await fetch(
      `${API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    const json = await res.json();
    return json.data[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Simple content renderer
function renderStrapiContent(content: any) {
  if (!content) {
    return <p className="text-white/60 italic">Content coming soon...</p>;
  }
  
  if (typeof content === 'string') {
    return (
      <div className="text-white/80 leading-relaxed space-y-4">
        {content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    );
  }
  
  return <p className="text-white/60 italic">Content loaded successfully.</p>;
}

const SingleBlog = async ({ params }: Props) => {
  // AWAIT the params
  const { slug } = await params;
  const blog = await fetchPostBySlug(slug);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-white">Blog post not found</h1>
      </div>
    );
  }

  // Safe data extraction
  const title = blog.attributes?.title || 'Untitled';
  const excerpt = blog.attributes?.excerpt || '';
  const authorName = blog.attributes?.author?.data?.attributes?.name || 'Unknown Author';
  const readTime = blog.attributes?.readTime || '5 min';
  const featuredImage = blog.attributes?.featuredImage?.data?.attributes?.url;
  const content = blog.attributes?.content;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4 text-white">{title}</h1>
        <p className="text-white/90 mb-2">
          {authorName} 
          <span className="text-white/50 pl-4"> {readTime}</span>
        </p>
        {excerpt && (
          <p className="text-xl text-white/70">{excerpt}</p>
        )}
      </header>

      {featuredImage ? (
        <div className="w-full rounded-lg mb-8 overflow-hidden">
          <img 
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '')}${featuredImage}`}
            alt={title}
            className="w-full h-96 object-cover"
          />
        </div>
      ) : (
        <div className="w-full rounded-lg mb-8 bg-gray-800 h-96 flex items-center justify-center">
          <span className="text-white/60">No image available</span>
        </div>
      )}

      {renderStrapiContent(content)}

      <div className="px-5 py-4 bg-[#262626] rounded-2xl mt-8">
        <div className="flex gap-3 justify-between">
          <div className="flex gap-1 items-center">  
            <Heart size={20} /> 
            <h1 className="text-white">2+</h1>
          </div>
          <button className="cursor-pointer">
            <Share2 size={20} className="text-white" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default SingleBlog;