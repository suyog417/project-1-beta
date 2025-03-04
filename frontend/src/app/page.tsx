"use client";

import ImageCarousel from "@/components/carousel/image-carousel";
import Footer from "@/components/footer/footer"
import Header from "@/components/header/header"
import { Button } from "@/components/ui/button"
import TeamImageCarousel from "@/components/ui/team_image_carousel";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart, Check, Globe, Lightbulb, Mail, Phone, Rocket } from "lucide-react";
import Image from "next/image"
import Link from "next/link"

export default function Home() {

  const whatweOffer: { icon: React.ReactNode; description: string, img:string }[] = [
    {
      icon : <Check/>,
      description : 'Years of actuarial experience in life insurance.',
      img: "/assets/Years_of_experience.jpg"
    },
    {
      icon : <Check/>,
      description : 'Expertise in Pricing, Reserving, EV, and RBC modelling.',
      img: "/assets/Expertise_in_pricnig.jpg"
    },
    {
      icon : <Check/>,
      description : 'Data-driven insights for claims analytics and portfolio optimization.',
      img: "/assets/Data_driven_insights.jpg"
    },
    {
      icon : <Check/>,
      description : 'Scalable, technology-driven solutions tailored to insurers’ needs.',
      img: "/assets/Scalable_technology.jpg"
    },
  ]

  const whyChooseGet2Act: { icon: React.ReactNode; title:string; description: string }[] = [
    {
      icon: <Lightbulb color="orange"/>,
      title : "Independent & Research-Driven",
      description: "We bring objective, analytical expertise to every project."
    },
    {
      icon: <BarChart color="orange"/>,
      title : "End-to-End Capabilities",
      description: "From traditional actuarial consulting to cutting-edge data analytics."
    },
    {
      icon: <Globe color="orange"/>,
      title : "Global & Local Expertise",
      description: "Deep understanding of international best practices and regional regulations."
    },
    {
      icon: <Rocket color="orange"/>,
      title : "Long-Term Strategic Focus",
      description: "We don't just solve immediate problems; we future-proof your business."
    },
  ]
  return (
    <div className="flex flex-wrap flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-[#0074a611] relative overflow-hidden pt-[6.5rem]">
        <div className="absolute inset-0 h-full w-full flex">
          <ImageCarousel />
          <div className="absolute inset-0 opacity-40"></div>
        </div>  
        <div className="flex md:flex-row flex-col-reverse items-end justify-center max-w-7xl align-bottom gap-2 h-fit py-32 relative z-10">
          {/* Section 1: Actuarial & Data-Driven Solutions */}
          <div className="text-left md:text-left px-4 md:w-3/4 flex flex-col">
            <motion.div
              initial={{opacity: 0, x: -100}}
              animate={{
                     opacity: 1,
                     x: 0,
                   }}
               transition={{duration: 0.5}}
            > 
            <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
            <span className="text-[#0073A6]">Actuarial</span> & <span className="text-[#0073A6]">Data-Driven</span> Solutions for a Changing <span className="text-[#0073A6]">Insurance Landscape</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Empowering insurers with cutting-edge actuarial services and data analytics to navigate the evolving
              insurance landscape.
            </p>
            <div className="flex justify-center">
            <Link href={"/services"}>
            <Button>
              Explore Our Services
            </Button>
            </Link>
            </div>
            </motion.div>
          </div>
          <div className="border-r-1 border-black"></div>
          {/* Section 2: Start Your Career with Get2Learn */}
        </div>
      </main>

      {/* What we offer */}

      <section className="flex justify-center flex-col self-center px-4">
      <motion.div
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        variants={{
          hidden: {
            scale: .8,
            opacity: 0
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: .4
            }
          },
        }}
      >
      <h3 className="text-3xl font-bold text-[#0073A6] text-center py-8">What we offer ?</h3>
      </motion.div>
      <AnimatePresence mode="popLayout">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl">
        {
          whatweOffer.map((card ,index) => (
             <motion.div
                key={index}
                layout
                initial={{ opacity: 0, x: 100 * index }}
                whileInView="visible" 
                variants={{
                  visible:{ opacity: 1, x: 0 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
             >
             <WhatWeOfferCard
              icon={card.icon}
              description={card.description}
              img={card.img}
             /> 
            </motion.div>
          ))
        }
      </div>
      </AnimatePresence>
      </section>


      {/* Who We Are */}

      <section className="justify-center items-center flex md:flex-row flex-col flex-grow gap-2 py-12 max-w-7xl self-center relative overflow-hidden">
        <div className="text-center md:text-left px-4 md:w-5/6 flex flex-col relative z-10 text-black">
          <h2 className="text-3xl font-bold  mb-4 text-[#0073A6]">Who We Are ?</h2>
          <p className="text-lg  mb-8">At Get2Act, we are more than just actuarial consultants—we are strategic partners in navigating risk, optimizing capital, and driving business growth. With expertise spanning across Product Pricing, Reserving, Risk-Based Capital (RBC), Embedded Value (EV) Modelling, and Data Analytics.</p>
          <Link href={'/about'}><p className="text-[#0073A6] hover:underline">Read More About Us</p></Link>
        </div>
        <div className="overflow-hidden w-4/6 md:w-full px-4 relative z-10 h-96">
          {/*  You can keep this or remove it, depending on whether you want a separate image in addition to the carousel */}
          <TeamImageCarousel
            imageUrls={[
              "/assets/carousel/group_1.jpg",
              "/assets/carousel/group_2.jpg",
              "/assets/carousel/group_3.jpg",
              "/assets/carousel/group_4.jpg",
              "/assets/carousel/group_5.jpg",
            ]}
            alt="Get2Act Team"
          />
        </div>
      </section>



      {/* Why choose get2act */}
      <section className="justify-center items-center flex flex-col flex-grow gap-4 py-12 max-w-7xl self-center px-4">
      <motion.div
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: {
              scale: .8,
              opacity: 0
            },
            visible: {
              scale: 1,
              opacity: 1,
            },
          }}
        >
          <h3 className="text-3xl font-bold text-[#0073A6] text-center">Why Choose Get2Act ?</h3>
        </motion.div>
        <AnimatePresence mode="popLayout">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl">
        {
          whyChooseGet2Act.map((card ,index) => (
             <motion.div
              key={index}
              layout
              initial={{ opacity: 0, x: -100 * index }}
              whileInView="visible" 
              variants={{
                visible:{ opacity: 1, x: 0 }
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
             >
             <ServiceCard
              icon={card.icon}
              title= {card.title}
              description={card.description}
             /> 
            </motion.div>
          ))
        }
      </div>
      </AnimatePresence>
      </section>

          {/* Latest Insights */}
          <section className="justify-center items-center flex flex-col flex-grow gap-4 py-9 self-center px-4">
            {/* <motion.div
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            > */}
              {/* <h3 className="text-4xl font-bold text-[#0073A6] text-center">Latest Insights</h3>
              <p className="text-gray-600 text-center py-4">Stay up-to-date with the latest actuarial trends and insights from our blog.</p>
              <div className="flex flex-col gap-4 max-w-7xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 py-8"> */}
                {/* Posts Start
                <motion.div
                  whileHover={{
                    scale : 1.1
                  }}
                >
                <div className="bg-[#0073A6] rounded-lg pb-2">
                  <Image src={"/assets/Asset_3.webp"} alt="Latest Insights" width={300} height={200} className="w-full rounded-se-lg rounded-ss-lg"/>
                  <h4 className="text-lg font-bold text-white mr-4 ml-4 mt-4">Latest Insights</h4>
                  <p className="text-white mb-4 mr-4 ml-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                </div>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale : 1.1
                  }}
                >
                <div className="bg-[#0073A6] rounded-lg pb-2">
                  <Image src={"/assets/Asset_3.webp"} alt="Latest Insights" width={300} height={200} className="w-full rounded-se-lg rounded-ss-lg"/>
                  <h4 className="text-lg font-bold text-white mr-4 ml-4 mt-4">Latest Insights</h4>
                  <p className="text-white mb-4 mr-4 ml-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                </div></motion.div>
                {/* <motion.div
                  whileHover={{
                    scale : 1.1
                  }}
                >
                <div className="bg-[#eaf0f3] rounded-lg pb-2">
                  <Image src={"/assets/Asset_3.webp"} alt="Latest Insights" width={300} height={200} className="w-full rounded-se-lg rounded-ss-lg"/>
                  <h4 className="text-lg font-bold text-gray-800 mr-4 ml-4 mt-4">Latest Insights</h4>
                  <p className="text-gray-600 mb-4 mr-4 ml-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                </div></motion.div> */}
                {/* Posts End*/}
              {/* </div>
              </div>
            </motion.div> */}
          </section>
      
          <div className="text-center md:text-left px-4 md:w-1/2 flex flex-col self-center py-12">
            <motion.div
              initial={{opacity: 0, x: 100}}
              animate={{
                     opacity: 1,
                     x: 0,
                   }}
               transition={{duration: 0.5}}
            >
            <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
              Start Your Learning with<span className="text-[#d7152f]"> Get</span><span className="text-[#e39e0f]">2</span><span className="text-[#517e23]">Learn</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Unlock your potential in the actuarial field with Get2Learn.<br></br> Start your journey towards a rewarding
              career.
            </p>
            <div className="flex justify-center">
            <Link href={"/get2learn"}>
            <Button>
              Learn More
            </Button></Link>
            </div>
            </motion.div>
          </div>

      {/* Ask an Actuary */}
      <section className="justify-center items-center flex flex-col flex-grow gap-4 py-9 bg-[#0074a611]">
        <motion.div
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: {
              scale: .8,
              opacity: 0
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: .4
              },
            },
          }}
        >
<h3 className="text-4xl font-bold text-[#0073A6] text-center">Ask an Actuary</h3>
        </motion.div>
        
        <p className="text-center px-4">Have a thought-provoking actuarial question? <br></br>Post your question below, and if it sparks an insightful discussion, we’ll feature it on our website!</p>
        <Link
          href={'/askAnActuary'}
        >
          <Button>Ask an Actuary</Button>
        </Link>
      </section>


      {/* Let's Connect */}
      {/* <section className="justify-center items-center flex flex-col flex-grow gap-4 py-9 bg-[#0074a611]">
        <motion.div
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: {
              scale: .8,
              opacity: 0
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: .4
              },
            },
          }}
        >
<h3 className="text-4xl font-bold text-gray-800 text-center">Let's Connect</h3>
        </motion.div>
        
        <p className="text-center px-4">Looking for expert actuarial advice? Reach out to us!</p>
        <div className="flex gap-6">
          <div className="flex gap-2">
          <Mail className="h-6"/>
          <a href="mailto:admin@get2act.in">admin@get2act.in</a>
          </div>
          <div className="flex gap-2">
          <Phone className="h-5"/>
          <a href="tel:+91 9004943299">+91 9004943299</a>
          </div>
          
        </div>
        <Link
          href={'/askAnActuary'}
        >
          <Button>Contact Us</Button>
        </Link>
      </section> */}

      <Footer/>
    </div>
  )
}



function WhatWeOfferCard({
  icon,
  description,
  img
}: {
  icon: React.ReactNode
  description: string
  img:string
}) {
  return (
    <div className="bg-[#0074a6] rounded-lg flex flex-col items-start text-left">
      <div className="mb-4 w-full object-cover">
        <Image 
          src={img}
          height={800}
          width={800} 
          alt={"Data"} 
          className="object-cover w-full h-56 rounded-t-lg"
        />
      </div>
      <p className="text-white text-sm text-center font-semibold pb-3 px-3">{description}</p>
    </div>
  )
}


function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-[#0073A6] p-4 rounded-lg flex flex-col items-center text-center border-2 h-full align-middle justify-center">
      <div className="">{icon}</div>
      <h4 className="text-[#fff] font-semibold mb-2">{title}</h4>
      <p className="text-white text-sm">{description}</p>
    </div>
  )
}