'use client'

import type { Metadata } from "next";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Frame, Plus } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseStructure from "@/components/ui/course-item";
import Popup from 'reactjs-popup';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BlogForm } from "../dashboard/blogs/blog-form";
import { Input } from "@/components/ui/input";
import EnrollmentForm from "@/components/forms/enrollment_form";

// export const metadata: Metadata = {
//   title: "Get2Learn",
//   description: "Get2Learn is an initiative by Get2Act aimed at equipping budding actuaries with practical skills in insurance modelling, pricing, valuation, and data analytics.",
// };

export default function Get2LearnPage() {



  const trainingPrograms = [
    "Actuarial Modelling using different tools",
    "Pricing & Valuation of Life Insurance Products",
    "Embedded Value (EV) Framework",
    "Experience Studies for modelling assumptions",
    "Predictive Modelling & Data Science in Actuarial Practice",
  ]

  const courseStructure = [
    {
      number: 1,
      title: "Fundamentals of Life Insurance & Actuarial Science",
      description: "Types of life insurance products (Term, Endowment, Whole Life, ULIP, Annuities, etc.)...",
      points: <ul>
        <li>- Overview of the insurance industry</li>
        <li>- Types of life insurance products (Term, Endowment, Whole Life, ULIP, Annuities, etc.)</li>
        <li>- Role of an actuary in life insurance</li>
        <li>- Basic principles of risk, pooling, and underwriting</li>
        <li>- Introduction to policyholder behaviour &amp; mortality trends</li>
      </ul>
    },
    {
      number: 2,
      title: "Product Design & Features",
      description: "Core components of a life insurance policy...",
      points: <ul>
        <li>- Core components of a life insurance policy</li>
        <li>- Understanding premiums, benefits, riders, and surrender values</li>
        <li>- Participating vs. Non-Participating products</li>
        <li>- Embedded options and guarantees</li>
        <li>- Pricing considerations in product development</li>
      </ul>
    },
    {
      number: 3,
      title: "Actuarial Pricing & Reserving",
      description: "Premium Calculation: Gross premium, and expense loadings...",
      points: <ul>
        <li>- <strong>Premium Calculation</strong>: Gross premium, and expense loadings</li>
        <li>- <strong>Reserving Methods</strong>: Prospective vs. retrospective reserves</li>
        <li>- <strong>Discounting &amp; Interest Rates</strong>: Time value of money concepts</li>
        <li>- <strong>Profit Testing</strong>: Cash flow analysis &amp; profit margins</li>
        <li>- <strong>Sensitivity Analysis</strong>: Impact of key assumptions on profitability</li>
      </ul>
    },
    {
      number: 4,
      title: "Data Analytics in Actuarial Science",
      description: "Basics of data analytics and predictive modelling...",
      points: <ul>
        <li>- Basics of data analytics and predictive modelling</li>
        <li>- Using R and Python for actuarial data analysis</li>
        <li>- Experience analysis: Mortality, morbidity, and lapse studies</li>
        <li>- Claims analytics and fraud detection</li>
      </ul>
    },
    {
      number: 5,
      title: "Reinsurance & Risk Management",
      description: "Types of reinsurance: Quota share, surplus, excess of loss, etc...",
      points: <ol>
        <li>- Types of reinsurance: Quota share, surplus, excess of loss, etc.</li>
        <li>- Reinsurance pricing and treaty structures</li>
        <li>- Impact of reinsurance on profitability and solvency</li>
        <li>- Risk mitigation strategies for insurance companies</li>
      </ol>
    },
  ]

  const advanceCourse = [
    {
      number:1,
      title: "Market Consistent Embedded Value (MCEV)",
      description : "Understanding MCEV and how it differs from traditional embedded value",
      points: <ul>
        <li>- Understanding MCEV and how it differs from traditional embedded value</li>
        <li>- Components of MCEV: Present value of future profits (PVFP), risk margins, and cost of capital</li>
        <li>- Practical modelling of embedded value in Excel</li>
      </ul>
    },
    {
      number:2,
      title: "Risk-Based Capital (RBC) & Solvency",
      description : "Implementing an RBC framework for life insurers",
      points: <ul>
        <li>- What is RBC and why it matters?</li>
        <li>- Risk categories: Market risk, credit risk, insurance risk, and operational risk</li>
        <li>- Capital adequacy and solvency regulations</li>
        <li>- Implementing an RBC framework for life insurers</li>
      </ul>
    },
    {
      number:3,
      title: "IFRS 17 & Financial Reporting for Insurance",
      description : "Introduction to IFRS 17 and its impact on insurance companies",
      points: <ul>
        <li>- Introduction to IFRS 17 and its impact on insurance companies</li>
        <li>- Measurement models: GMM, PAA, and VFA</li>
        <li>- Understanding contract boundaries and discounting</li>
        <li>- Accounting treatment and disclosures</li>
      </ul>
    },
  ]

  const methodologies = [
    {
      title: "Lecture-Based Learning",
      description:
        "Engage in expert-led theoretical sessions designed to provide a foundational understanding of key concepts.",
    },
    {
      title: "Practical Demonstrations",
      description:
        "Observe live modeling sessions where experienced instructors demonstrate the practical application of the concepts learned in lectures.",
    },
    {
      title: "Hands-On Assignments",
      description:
        "Reinforce your learning through practical exercises designed to solidify your understanding and develop your skills.",
    },
    {
      title: "Group Case Studies",
      description: "Participate in collaborative problem-solving exercises that simulate real-world challenges.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-[#d7152f] text-2xl font-bold">Get<span className="text-[#e39e0f]">2</span><span className="text-[#517e23]">Learn</span></div>
          <nav>
            <Link href={"/"}><Button>Return to Get2Act</Button></Link>
          </nav>
        </div>
      </nav>

      {/* Hero Section */}
      {/* <div className="relative h-[500px] bg-[#333333] align-middle justify-center items-center flex">
        <div className=" inset-0 bg-[#333333] align-middle flex items-center ">
          <div className="max-w-7xl mx-auto  py-20 text-white text-center">
            <h1 className="text-7xl md:text-5xl font-bold mb-6">Start your learning with <span className="text-[#d7152f]">Get</span><span className="text-[#e39e0f]">2</span><span className="text-[#517e23]">Learn</span></h1>
            <p className="text-lg mb-8">
              Get2Learn is an initiative by Get2Act aimed at equipping budding actuaries with practical skills in
              Insurance Modelling, Pricing, Valuation, and Data Analytics. This education wing will provide structured
              training programs, ensuring hands-on experience in real-world actuarial applications.
            </p>
            <Link href={"#course-structure"}><Button className="bg-[#d7152f] hover:bg-[#d7152fc3] text-white p-3 font-medium" >Explore Our Course Structure</Button></Link>
          </div>
        </div>
      </div> */}
      <section>
      <div className="max-w-full mx-auto  py-28 text-white text-center bg-[#333333] px-3 justify-center align-middle items-center flex flex-col">
            <h1 className="text-6xl md:text-5xl font-bold mb-6">Start your learning with <span className="text-[#d7152f]">Get</span><span className="text-[#e39e0f]">2</span><span className="text-[#517e23]">Learn</span></h1>
            <p className="md:text-lg mb-8 sm:text-sm md:max-w-7xl text-center ">
              Get2Learn is an initiative by Get2Act aimed at equipping budding actuaries with practical skills in
              Insurance Modelling, Pricing, Valuation, and Data Analytics. This education wing will provide structured
              training programs, ensuring hands-on experience in real-world actuarial applications.
            </p>
            <Link href={"#course-structure"}><Button className="bg-[#d7152f] hover:bg-[#d7152fc3] text-white p-3 font-medium" >Explore Our Course Structure</Button></Link>
          </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-6 flex flex-col">
      <h2 className="text-3xl font-bold text-[#00415f] mb-4 text-center">Vision and Mission</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 grid-cols-1 md:gap-24 gap-12 content-center justify-center items-center">
          <div className="p-4 text-center bg-[#d7152f] rounded-full h-80 w-80 content-center">
            <p className="text-white text-xl">
              To bridge the gap between actuarial education and industry requirements by offering hands-on, practical
              learning experiences.
            </p>
          </div>
          <div className="p-4 text-center bg-[#e39e0f] rounded-full h-80 w-80 content-center">
            <p className="text-white text-xl">
            Provide high-quality training in actuarial science with a focus on real-world applications.
            </p>
          </div>
          <div className="p-4 text-center bg-[#517e23] rounded-full h-80 w-80 content-center">
            <p className="text-white text-xl">
            Develop industry-ready actuaries proficient in modeling, valuation, and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Key Offerings */}
      {/* <section className="bg-[#f7f7f8] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#00415f] mb-12 text-center">Key Offerings</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#00415f] mb-6">Training Program</h3>
              <ul className="space-y-4">
                {trainingPrograms.map((program, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#517d24] mt-1" />
                    <span className="text-gray-700">{program}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Students studying together"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Students studying together"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#00415f] mb-6">Training Program</h3>
              <ul className="space-y-4">
                {trainingPrograms.map((program, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#517d24] mt-1" />
                    <span className="text-gray-700">{program}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section> */}
      <CourseStructure
        courseStructure={courseStructure}
        advanceCourse={advanceCourse}
        id="course-structure"
      ></CourseStructure>
      <div className="flex flex-row justify-center mb-12">
          <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#0073a6]">
              Enroll Now
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-6xl overflow-y-scroll scroll-auto h-fit my-8 m-4 ">
            <DialogHeader>
              <DialogTitle>Fill details</DialogTitle>
            </DialogHeader>
              <EnrollmentForm />
            </DialogContent>
          </Dialog>
      </div>


      {/* <CourseStructure></CourseStructure> */}
      {/* Course Structure */}
      {/* <section className="py-16 px-6" id="course-structure">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#00415f] mb-12 text-center">Course Structure</h2>
          <div className="space-y-8">
            {courseStructure.map((item, index) => {
              const [hovered, setHovered] = useState(false);
              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-6 "
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  style={{ width: "100%", maxWidth: "100%" }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <div className="w-12 h-12 rounded-full bg-[#517d24] text-white flex items-center justify-center font-bold text-xl flex-shrink-0 align-middle">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#00415f] mb-1">{item.title}</h3>
                    
                    <AnimatePresence>
                      {hovered && item.points ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.points}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </section> */}

      {/* Learning Methodology */}
      <section className="bg-[#f7f7f8] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#00415f] mb-12 text-center">Learning Methodology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodologies.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#00415f] mb-3">{method.title}</h3>
                <p className="text-gray-700 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-6">
        <div className="text-center">
          <p>© 2023 Get2Learn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}



