'use client'

import ImageCarousel from "@/components/carousel/image-carousel"
import Header from "@/components/header/header"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: number
  title: string
  description: string
  image: string
  slug: string
}

export default function BlogListing() {
  const blogPosts : BlogPost[] = [
    // {
    //       id: 1,
    //       title: "Navigating Regulatory Changes in the Insurance Sector",
    //       description:
    //         "Explore the evolving regulatory landscape and how insurers can adapt and thrive in the face of change. Understand key compliance requirements and strategic approaches...",
    //       image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-swhDIjRcKB4AB9GfrhGaqyCBp9BlCO.png",
    //       slug: "regulatory-changes",
    //     },
  ]
  // const blogPosts: BlogPost[] = [
  //   {
  //     id: 1,
  //     title: "Navigating Regulatory Changes in the Insurance Sector",
  //     description:
  //       "Explore the evolving regulatory landscape and how insurers can adapt and thrive in the face of change. Understand key compliance requirements and strategic approaches...",
  //     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-swhDIjRcKB4AB9GfrhGaqyCBp9BlCO.png",
  //     slug: "regulatory-changes",
  //   },
  //   {
  //     id: 2,
  //     title: "The Role of Data Analytics in Modern Actuarial Practice",
  //     description:
  //       "Discover how data analytics is transforming actuarial practices, enhancing risk assessment, and enabling more informed decision-making for insurers...",
  //     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-swhDIjRcKB4AB9GfrhGaqyCBp9BlCO.png",
  //     slug: "data-analytics",
  //   },
  //   {
  //     id: 3,
  //     title: "Optimizing Capital with Risk-Based Capital (RBC)",
  //     description:
  //       "Learn about effective capital optimization strategies using RBC modelling and how it strengthens financial stability and regulatory compliance for insurance companies...",
  //     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-swhDIjRcKB4AB9GfrhGaqyCBp9BlCO.png",
  //     slug: "capital-optimization",
  //   },
  //   // Duplicate posts to match the layout
  //   {
  //     id: 4,
  //     title: "Navigating Regulatory Changes in the Insurance Sector",
  //     description:
  //       "Explore the evolving regulatory landscape and how insurers can adapt and thrive in the face of change. Understand key compliance requirements and strategic approaches...",
  //     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-swhDIjRcKB4AB9GfrhGaqyCBp9BlCO.png",
  //     slug: "regulatory-changes-2",
  //   },
  //   {
  //     id: 5,
  //     title: "The Role of Data Analytics in Modern Actuarial Practice",
  //     description:
  //       "Discover how data analytics is transforming actuarial practices, enhancing risk assessment, and enabling more informed decision-making for insurers...",
  //     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-swhDIjRcKB4AB9GfrhGaqyCBp9BlCO.png",
  //     slug: "data-analytics-2",
  //   },
  //   {
  //     id: 6,
  //     title: "Optimizing Capital with Risk-Based Capital (RBC)",
  //     description:
  //       "Learn about effective capital optimization strategies using RBC modelling and how it strengthens financial stability and regulatory compliance for insurance companies...",
  //     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-swhDIjRcKB4AB9GfrhGaqyCBp9BlCO.png",
  //     slug: "capital-optimization-2",
  //   },
  // ]

  return (
    <div className="min-h-screen flex flex-col justify-stretch items-stretch">

        <Header/>
      {/* Hero Section */}
      <div className="bg-[#0074a611] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageCarousel/>
          {/* <img
            src="/assets/Asset_3.webp"
            alt="Contact Background"
            className="object-cover w-full h-full opacity-30"
          /> */}
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {
              y: -50,
              opacity: 0,
            },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#00415f] mb-4">Blogs</h1>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {
              y: 50,
              opacity: 0,
            },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          className="relative z-10"
        >
          <p className="text-lg text-gray-700 max-w-3xl mx-auto px-4">
            Explore our insights and articles on actuarial science, insurance, and data analytics.
          </p>
        </motion.div>
      </div>

      {/* <section className="flex flex-col py-4">
          <div className="w-9/12 self-center">
          <h2 className="text-2xl font-bold text-[#0073A6] mb-8 text-left">All Blog Posts</h2>
          <div className="h-36 w-full content-center justify-center flex items-center text-gray-600">Nothing to display here</div>
          </div>
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 self-center max-w-7xl ">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-[#00415f] mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="text-[#0073a6] hover:text-[#00415f] font-semibold mt-auto">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section> */}

      
      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex w-full flex-col">
        <div className="w-full"><h2 className="text-2xl font-bold text-[#0073A6] mb-8 w-full text-left">All Blog Posts</h2></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-[#00415f] mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="text-[#0073a6] hover:text-[#00415f] font-semibold mt-auto">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="w-full flex justify-center py-12  "><h3>Nothing to show here.</h3></div>
      </div>

      {/* Footer */}
      <footer className="bg-[#00415f] text-white py-6 mt-auto">
        <div className="text-center">
          <p>© 2023 Get2Act Actuarial Services & Consultancy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

