import { Metadata } from "next";
import BlogPost from "./blog-post-client";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  try {
    const { id } = await params;
    // Fetch data from backend
    const res = await fetch(`${BACKEND_BASE_URL}/api/blogs/${id}`, { next: { revalidate: 60 } }); // Revalidate every 60s
    
    if (!res.ok) {
      return {
        title: "Blog Post | Get2Act",
        description: "Detailed insights and analysis from Get2Act.",
      };
    }
    
    const blog = await res.json();
 
    return {
      title: `${blog.title} | Get2Act`,
      description: blog.description || blog.title,
      openGraph: {
        title: blog.title,
        description: blog.description,
        images: blog.image ? [blog.image.startsWith('http') ? blog.image : `${BACKEND_BASE_URL}/${blog.image}`] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post | Get2Act",
      description: "Detailed insights and analysis from Get2Act.",
    };
  }
}

export default function Page() {
  return <BlogPost />;
}
