import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"

export default function BlogPost() {
  
  return (
    <div className="min-h-screen flex flex-col">

        <Header/>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#f7f7f8] to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#00415f] mb-4 text-center">
            Navigating Regulatory Changes in the Insurance Sector
          </h1>
          <p className="text-center text-gray-600">Published on November 28, 2023</p>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Featured Image */}
        <div className="mb-12">
          {/* <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project_1_mock-qnC9awDj18qQAevZ9XS69FkJo6VCF3.png"
            alt="Business meeting with laptops and documents"
            width={800}
            height={400}
            className="rounded-lg w-full"
          /> */}
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#00415f] mb-4">Introduction to Regulatory Shifts</h2>
          <p className="text-gray-700 leading-relaxed">
            The insurance industry is constantly evolving, driven by economic shifts, technological advancements, and,
            crucially, regulatory changes. Insurers today face a complex web of regulations designed to protect
            consumers, ensure solvency, and maintain market stability. Understanding and adapting to these changes is
            not just about compliance; it's about strategic positioning for sustainable growth.
          </p>
        </section>

        {/* Key Regulatory Areas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#00415f] mb-4">Key Regulatory Areas Impacting Insurers</h2>
          <p className="text-gray-700 mb-4">
            Several key regulatory areas are currently in flux and significantly impacting insurance companies:
          </p>
          <ul className="space-y-4">
            <li>
              <strong className="text-[#00415f] block">IFRS 17 Implementation:</strong>
              <p className="text-gray-700">
                The new accounting standard for insurance contracts requires a fundamental shift in how insurers report
                their financials.
              </p>
            </li>
            <li>
              <strong className="text-[#00415f] block">Solvency II and Risk-Based Capital (RBC) Frameworks:</strong>
              <p className="text-gray-700">
                These frameworks are continuously being refined to better capture and manage the diverse risks insurers
                face.
              </p>
            </li>
            <li>
              <strong className="text-[#00415f] block">
                Data Privacy and Security Regulations (e.g., GDPR, CCPA):
              </strong>
              <p className="text-gray-700">
                With increasing reliance on data, regulations around data privacy and security are becoming stringent,
                impacting data handling and analytics practices.
              </p>
            </li>
            <li>
              <strong className="text-[#00415f] block">Climate Change and ESG Disclosures:</strong>
              <p className="text-gray-700">
                Regulatory bodies are increasingly expecting insurers to assess and disclose climate-related risks and
                integrate ESG factors into their strategies.
              </p>
            </li>
          </ul>
        </section>

        {/* Strategies Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#00415f] mb-4">Strategies for Navigating Regulatory Change</h2>
          <p className="text-gray-700 leading-relaxed">
            To effectively navigate this ever-changing landscape, insurers should consider the following strategies:
          </p>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#00415f] mb-4">Conclusion</h2>
          <p className="text-gray-700 leading-relaxed">
            Regulatory changes, while challenging, also present opportunities for insurers to innovate, strengthen their
            operations, and build greater trust with stakeholders. By proactively adapting and embracing a strategic
            approach to compliance, insurance companies can not only navigate uncertainty but also drive sustainable
            growth in this evolving landscape. Get2Act is committed to partnering with insurers on this journey,
            providing the actuarial expertise and data-driven solutions needed to thrive in a changing regulatory
            environment.
          </p>
        </section>

        {/* Back to Blogs Link */}
        <div className="border-t pt-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-[#0073a6] hover:text-[#00415f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blogs
          </Link>
        </div>
      </article>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

