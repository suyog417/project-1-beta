"use client";

import ImageCarousel from "@/components/carousel/image-carousel";
import Header from "@/components/header/header";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

export default function BlogListing() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Use relative path - Next.js will route this to your local API
        const res = await fetch("/api/blogs"); 
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-stretch items-stretch">
      <Header />
      {/* Hero Section */}
      <div className="bg-[#0074a611] py-16 text-center relative overflow-hidden pt-[11.5rem]">
        <div className="absolute inset-0">
          <ImageCarousel />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { y: -50, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#00415f] mb-4">
            Blogs
          </h1>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          className="relative z-10"
        >
          <p className="text-lg text-gray-700 max-w-3xl mx-auto px-4">
            Explore our insights and articles on actuarial science, insurance,
            and data analytics.
          </p>
        </motion.div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex w-full flex-col">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-[#0073A6] mb-8 w-full text-left">
            All Blog Posts
          </h2>
        </div>

        {loading ? (
           // Simple Loading State
           <div className="w-full flex justify-center py-12">
             <div className="animate-pulse text-[#0073A6]">Loading blogs...</div>
           </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post._id}
                  className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 w-full">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill // Use fill for responsive sizing within the container
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-[#00415f] mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <Link
                      // Use post.slug if available, otherwise fallback to ID
                     href={`/blogs/${post.slug || post._id}`}
                      className="text-[#0073a6] hover:text-[#00415f] font-semibold mt-auto"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {blogPosts.length === 0 && (
              <div className="w-full flex justify-center py-12">
                <h3>At present there are no blogs.</h3>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#00415f] text-white py-6 mt-auto">
        <div className="text-center">
          <p>
            © 2023 Get2Act Actuarial Services & Consultancy. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}