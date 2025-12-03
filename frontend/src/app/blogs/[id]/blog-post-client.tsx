"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // To get the ID from URL
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { motion } from "framer-motion";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

// Interface matching your Mongoose Model + API response
interface BlogPost {
  _id: string;
  title: string;
  description: string;
  content: string; // This will contains HTML
  image: string;
  publishDate: string;
  slug: string;
}

export default function BlogPost() {
  const { id } = useParams(); // Get ID or Slug from URL
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) {
           if(res.status === 404) throw new Error("Blog not found");
           throw new Error("Failed to load blog");
        }
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // --- LOADING STATE (Skeleton UI) ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full">
           <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 animate-pulse"></div>
           <div className="h-12 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
           <div className="h-64 bg-gray-200 rounded w-full mb-8 animate-pulse"></div>
           <div className="space-y-4">
             <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
             <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
             <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
           </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-3xl font-bold text-[#00415f] mb-4">Oops!</h2>
          <p className="text-gray-600 mb-8">{error || "We couldn't find the blog you're looking for."}</p>
          <Link
            href="/blogs"
            className="px-6 py-3 bg-[#0073a6] text-white rounded-lg hover:bg-[#00415f] transition-colors"
          >
            Return to Blog Listing
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // --- MAIN SUCCESS STATE ---
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[#0074a611] py-16 pt-[8rem] border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb / Back Link */}
            <Link
                href="/blogs"
                className="inline-flex items-center text-[#0073a6] font-medium hover:text-[#00415f] transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to all blogs
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00415f] mb-6 leading-tight">
                {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm md:text-base">
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-[#0073a6]" />
                    {formatDate(post.publishDate)}
                </div>
                {/* Optional: Add Reading Time if you calculate it later */}
                {/* <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-[#0073a6]" />
                    5 min read
                </div> */}
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12 flex-grow w-full">
        {/* Featured Image */}
        {post.image && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 relative w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={post.image.startsWith("http") ? post.image : `${BACKEND_BASE_URL}/${post.image}`}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </motion.div>
        )}

        {/* Main Content Area 
           Using 'prose' class from tailwindcss/typography to automatically style 
           headings, paragraphs, lists, and blockquotes inside the HTML string.
        */}
        <div 
            className="
                prose prose-lg max-w-none 
                prose-headings:text-[#00415f] 
                prose-a:text-[#0073a6] hover:prose-a:text-[#00415f]
                prose-strong:text-[#00415f]
                prose-img:rounded-lg
                text-gray-700 leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: post.content }} 
        />
            
        {/* Share / Footer of Article */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 italic">
                Did you find this article helpful?
            </p>
            <button 
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-gray-700"
            >
                <Share2 className="w-4 h-4" />
                <span>Share this article</span>
            </button>
        </div>
      </article>

      <Footer />
    </div>
  );
}
