import { Heart, Share2 } from "lucide-react";
import { getMockPostBySlug } from "@/lib/mockData";

type Props = {
  params: {
    categories: string;
    slug: string;
  };
};

async function getPostData(slug: string) {
  // Use mock data for now
  console.log('Using mock data for post:', slug);
  
  const mockData = getMockPostBySlug(slug);
  return mockData.data[0] || null;
}

// Helper function to render Strapi rich text content
function renderStrapiContent(content: any) {
  if (!content) {
    return (
      <p className="text-white/60 italic">No content available for this post.</p>
    );
  }

  // If content is a string (simple text), just render it
  if (typeof content === 'string') {
    return (
      <div className="prose prose-lg max-w-none text-white/80">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  return (
    <p className="text-white/60 italic">Content format not supported.</p>
  );
}

const SingleBlog = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = await getPostData(slug);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-white">Blog post not found</h1>
      </div>
    );
  }

  // Safe data extraction
  const attributes = blog.attributes;
  const title = attributes?.title || 'Untitled';
  const excerpt = attributes?.excerpt || '';
  const authorName = attributes?.author?.data?.attributes?.name || 'Unknown Author';
  const readTime = attributes?.readTime || '5 min';
  const featuredImage = attributes?.featuredImage?.data?.attributes?.url;
  const content = attributes?.content;

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
            src={featuredImage}
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