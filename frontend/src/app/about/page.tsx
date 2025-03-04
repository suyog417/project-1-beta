'use client'

import type React from "react"
import Image from "next/image"
import Header from "@/components/header/header"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">

      <Header/>

      {/* <HeroSection
        title="About Us"
        description="Explore our comprehensive suite of actuarial and data-driven solutions."
      /> */}
      {/* Hero Section */}
      <div className="bg-[#0074a611] py-16 h-fit md:h-[32rem] content-end text-center relative overflow-hidden">
        <div className="absolute inset-0 md:top-[8px] z-0">
          {/* Replace with your actual ImageCarousel component */}
          <img
              src="/assets/team/group.jpg"
              alt="Carousel Image"
              width={4160}
              height={2773}
              className="object-cover w-full md:top-[64] rounded-lg opacity-30 md:h-fit h-full"
              style={{
                aspectRatio: "700 / 400",
                objectFit: "cover",
              }}
            />
          {/* <Image alt="Get2ActTeam" src={"/assets/team/group.jpg"} width={2773} height={4260} className="object-cover w-full h-full md:h-fit rounded-lg relative"/> */}
          <div className="absolute inset-0 opacity-0"></div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{once:true}}
          variants={{
            hidden: {
              y:-50,
              opacity:0
            },
            visible: {
              y:0,
              opacity:1
            }
          }}
          className="z-99 relative"
        >
        <h1 className="text-4xl md:text-5xl font-bold text-[#00415f] mb-4">About Us</h1>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{once:true}}
          variants={{
            hidden: {
              y:50,
              opacity:0
            },
            visible: {
              y:0,
              opacity:1
            }
          }}
          className="relative"
        >
        <p className="md:text-lg text-gray-700 max-w-3xl mx-auto px-4 md:font-semibold text-sm">
        At Get2Act, we are more than just actuarial consultants—we are strategic partners in navigating risk,
        optimizing capital, and driving business growth. With expertise spanning across product pricing, reserving,
        risk-based capital (RBC), embedded value (EV) modelling, and data analytics, we help insurers make informed,
        forward-looking decisions.
        </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Who We Are Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-6">Who We Are ?</h2>

          {/* Leadership Profile */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className=" rounded-lg">
              <Image
                src="/assets/team/Anuradha.jpg"
                alt="Anuradha Lal"
                width={1024}
                height={1024}
                className="rounded-lg h-64 w-64 object-cover"
              />
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-bold text-[#0073A6] mb-2">Anuradha Lal, FIA, FIAI</h3>
              <p className="text-2xl font-bold text-[#0073A6] mb-4">Founder</p>
              <p className="text-gray-700 mb-4">
              Anuradha Lal's journey in the world of actuarial science spans over two decades, marked by a relentless pursuit of excellence and innovation. <br></br><br></br>
As the founder of Get2Act, Anuradha brings a wealth of experience from her time working with leading insurance companies. Her expertise in life insurance, product development, and risk management has been instrumental in shaping Get2Act's approach to solving complex actuarial challenges. Anuradha's vision is to bridge the gap between traditional actuarial methods and cutting-edge data analytics, providing insurers with the tools they need to thrive in an ever-changing landscape.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <h3 className="text-2xl font-bold text-[#0073A6] mb-6">Our Team</h3>
          <p className="pb-6">
            Our team brings a diverse blend of expertise in actuarial science, statistics, data analytics, and predictive modeling. With strong analytical skills, a deep understanding of stochastic processes, and proficiency in statistical methodologies, we are well-equipped to tackle complex actuarial challenges. Our collective strengths include machine learning, artificial intelligence, coding across multiple languages, and leveraging data-driven insights for strategic decision-making. Committed to continuous learning and innovation, we strive to enhance analytical capabilities and drive impactful solutions.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            {[
              { name: "Dhruv Arora", title: "Actuarial" ,img:"/assets/team/Dhruv.jpg"},
              { name: "Debankan Chowdhury", title: "Actuarial" ,img:"/assets/team/Debankan.jpg" },
              { name: "Aastha Srivastava", title: "Actuarial" ,img:"/assets/team/Aastha.jpg" },
              { name: "Trishit Mukhopadhyay", title: "Actuarial" ,img:"/assets/team/Trishit.jpg" },
              { name: "Poulami Nandi", title: "Analytics", img:"/assets/team/Poulami.jpg"}
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center ">
                <div className="w-48 h-60 relative mb-4">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={2048}
                    height={2048}
                    className="rounded-lg bg-[#8383833f] content-center object-cover h-60 w-48"
                  />
                </div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{once: true}}
                  variants={{
                    hidden:{
                      opacity :0,
                      y: 50
                    },
                    visible:{
                      opacity: 1,
                      y:0 
                    }
                  }}
                >
                <h4 className="text-lg font-semibold text-[#0073A6] text-center">{member.name}</h4>
                <p className="text-gray-600 text-center">{member.title}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-6">Our Mission</h2>
          <p className="text-gray-700">
            To deliver cutting-edge actuarial solutions that drive financial stability, regulatory compliance, and
            long-term growth for the insurance industry.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/Integrity_&_Transparency.jpg"} height={150} width={150} alt="Image"/>}
              title="Integrity & Transparency"
              description="Providing unbiased, data-backed insights."
            />
            <ValueCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/about_us/excellence_and_innovation.jpg"} height={150} width={150} alt="Image"/>}
              title="Excellence & Innovation"
              description="Leveraging technology for better decision making."
            />
            <ValueCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/about_us/collaboration_&_knowledge_sharing.jpg"} height={150} width={150} alt="Image"/>}
              title="Collaboration & Knowledge-Sharing"
              description="Building lasting partnerships with insurers."
            />
            <ValueCard
              icon={<Image style={{backgroundColor: 'transparent', mixBlendMode: "multiply"}} src={"/assets/about_us/client_centric_approach.jpg"} height={150} width={150} alt="Image"/>}
              title="Client-Centric Approach"
              description="Solutions tailored to your business needs."
            />
          </div>
        </section>

        {/* Road Ahead Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-6">The Road Ahead</h2>
          <p className="text-gray-700">
            We continue to evolve, innovate, and redefine actuarial consulting. Our goal is to expand our footprint,
            enhance our technology-driven solutions, and create lasting impact in the insurance industry.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#00415f] text-white py-6 mt-auto">
        <div className="text-center">
          <p>© 2023 Get2Act Actuarial Services & Consultancy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-[#0074a61f] p-4 rounded-lg flex flex-col items-center text-center">
      <div className="mb-4 text-[#00415f]">{icon}</div>
      <h4 className="text-black font-semibold mb-2">{title}</h4>
      <p className="text-black text-sm">{description}</p>
    </div>
  )
}

