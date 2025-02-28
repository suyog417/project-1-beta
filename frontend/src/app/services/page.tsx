'use client'


import ImageCarousel from "@/components/carousel/image-carousel"
import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import { motion } from "framer-motion"
import Image from "next/image"
import type React from "react" // Added import for React

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Header/>

      {/* <HeroSection
        title="Our Services"
        description="Explore our comprehensive suite of actuarial and data-driven solutions."
      /> */}

      {/* Hero Section */}
      <div className="bg-[#0074a611] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageCarousel/>
          {/* <img
            src="/assets/Asset_3.webp"
            alt="Services Background"
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
          <h1 className="text-4xl md:text-5xl font-bold text-[#00415f] mb-4">Our Services</h1>
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
            Explore our comprehensive suite of actuarial and data-driven solutions.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Actuarial & Risk Advisory Section */}
        <section className=" py-4">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-4">Actuarial & Risk Advisory</h2>
          <p className="text-gray-700 mb-8">
            We offer a wide range of actuarial and risk advisory services tailored to the unique needs of insurance
            companies.
          </p>

          <h3 className="text-2xl font-bold text-[#0073A6] mb-4">Core Actuarial Services</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/Product_Pricing_and_Development.jpg"} height={150} width={150} alt="Image"/>}
              title="Product Pricing & Development"
              description="Creating competitive, sustainable insurance products."
            />
            <ServiceCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/Statutory_Reserving.jpg"} height={150} width={150} alt="Image"/>}
              title="Statutory Reserving & Financial Reporting"
              description="From traditional actuarial consulting to cutting-edge data analytics."
            />
            <ServiceCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/Risk_Based_Capital.jpg"} height={150} width={150} alt="Image"/>}
              title="Risk-Based Capital (RBC) & Solvency Analysis"
              description="Deep understanding of international best practices and regional regulations."
            />
            <ServiceCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/EV_MCEV.jpg"} height={150} width={150} alt="Image"/>}
              title="Embedded Value (EV) & MCEV Modelling"
              description="We don't just solve immediate problems; we future-proof your business."
            />
          </div>
        </section>

        {/* Independent assessment */}
        <section className="py-4">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-4">Independent assessment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/Peer_Review.jpg"} height={150} width={150} alt="Image"/>}
              title="Peer Review"
              description="Objective evaluation to enhance accuracy and compliance."
            />
            <ServiceCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/With-Profits_Committee.jpg"} height={150} width={150} alt="Image"/>}
              title="With-Profits Committee"
              description="Expert insight on with-profits fund management and fairness to policyholders."
            />
            <ServiceCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/Independent_basis_review.jpg"} height={150} width={150} alt="Image"/>}
              title="Independent Certification & Review"
              description="Impartial analysis of existing methodologies to ensure sound actuarial practices."
            />
          </div>
        </section>

        {/* Data Analytics Section */}
        <section className="py-4">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-4">Data Analytics & Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/Experience_Studies_and_Assumption_Setting.jpg"} height={150} width={150} alt="Image"/>}
              title="Experience Studies & Assumption Setting"
              description="Mortality, morbidity, and lapse analysis."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: any
  title: string
  description: string
}) {
  return (
    <div className=" p-5 rounded-lg flex flex-col items-center text-center bg-[#0074a61f] justify-center">
      <div>{icon}</div>
      <h4 className="text-black font-semibold mb-2">{title}</h4>
      <p className="text-black text-sm">{description}</p>
    </div>
  )
}