"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/header/header";
import { motion } from "framer-motion";

interface AboutData {
  hero: { title: string; description: string; image: string };
  leadership: {
    name: string;
    title: string;
    designation: string;
    description: string;
    image: string;
  };
  mission: { title: string; description: string };
  values: { title: string; description: string; image: string; _id?: string }[];
  roadAhead: { title: string; description: string };
  team: { name: string; title: string; image: string; _id?: string }[];
}

const defaultData: AboutData = {
  hero: {
    title: "About Us",
    description:
      "At Get2Act, we are more than just actuarial consultants—we are strategic partners in navigating risk, optimizing capital, and driving business growth. With expertise spanning across product pricing, reserving, risk-based capital (RBC), embedded value (EV) modelling, and data analytics, we help insurers make informed, forward-looking decisions.",
    image: "/assets/team/group.jpg",
  },
  leadership: {
    name: "Anuradha Lal",
    title: "Founder",
    designation: "FIA, FIAI",
    description:
      "Anuradha Lal's journey in the world of actuarial science spans over two decades, marked by a relentless pursuit of excellence and innovation. As the founder of Get2Act, Anuradha brings a wealth of experience from her time working with leading insurance companies. Her expertise in life insurance, product development, and risk management has been instrumental in shaping Get2Act's approach to solving complex actuarial challenges. Anuradha's vision is to bridge the gap between traditional actuarial methods and cutting-edge data analytics, providing insurers with the tools they need to thrive in an ever-changing landscape.",
    image: "/assets/team/Anuradha.jpg",
  },
  mission: {
    title: "Our Mission",
    description:
      "To deliver cutting-edge actuarial solutions that drive financial stability, regulatory compliance, and long-term growth for the insurance industry.",
  },
  values: [
    {
      title: "Integrity & Transparency",
      description: "Providing unbiased, data-backed insights.",
      image: "/assets/Integrity_&_Transparency.jpg",
    },
    {
      title: "Excellence & Innovation",
      description: "Leveraging technology for better decision making.",
      image: "/assets/about_us/excellence_and_innovation.jpg",
    },
    {
      title: "Collaboration & Knowledge-Sharing",
      description: "Building lasting partnerships with insurers.",
      image: "/assets/about_us/collaboration_&_knowledge_sharing.jpg",
    },
    {
      title: "Client-Centric Approach",
      description: "Solutions tailored to your business needs.",
      image: "/assets/about_us/client_centric_approach.jpg",
    },
  ],
  roadAhead: {
    title: "The Road Ahead",
    description:
      "We continue to evolve, innovate, and redefine actuarial consulting. Our goal is to expand our footprint, enhance our technology-driven solutions, and create lasting impact in the insurance industry.",
  },
  team: [
    {
      name: "Dhruv Arora",
      title: "Actuarial",
      image: "/assets/team/Dhruv.jpg",
    },
    {
      name: "Aastha Srivastava",
      title: "Actuarial",
      image: "/assets/team/Aastha.jpg",
    },
    {
      name: "Trishit Mukhopadhyay",
      title: "Actuarial",
      image: "/assets/team/Trishit.jpg",
    },
    {
      name: "Poulami Nandi",
      title: "Actuarial",
      image: "/assets/team/Poulami.jpg",
    },
    {
      name: "Supriya Shinde",
      title: "Actuarial",
      image: "/assets/team/Supriya.jpg",
    },
    {
      name: "Nikita Shinde",
      title: "Actuarial",
      image: "/assets/team/Nikita.jpg",
    },
  ],
};

export default function AboutPage() {
  const [data, setData] = useState<AboutData>(defaultData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/about`,
        );
        if (res.ok) {
          const json = await res.json();
          // Merge with default data to ensure structure
          if (json) {
            // If arrays are empty in DB (initial state), we might want to keep default or show empty.
            // Assuming if DB entry exists, it overrides default.
            // We just handle potential missing nested objects if specific section wasn't saved.
            setData({
              hero: { ...defaultData.hero, ...json.hero },
              leadership: { ...defaultData.leadership, ...json.leadership },
              mission: { ...defaultData.mission, ...json.mission },
              values:
                json.values && json.values.length > 0
                  ? json.values
                  : defaultData.values,
              roadAhead: { ...defaultData.roadAhead, ...json.roadAhead },
              team:
                json.team && json.team.length > 0
                  ? json.team
                  : defaultData.team,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch about data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="bg-[#0074a611] py-16 h-fit md:h-[32rem] content-end text-center relative overflow-hidden mt-[5rem]">
        <div className="absolute inset-0 md:top-[8px] z-0">
          <Image
            src={data.hero.image}
            alt="Hero Image"
            width={4160}
            height={2773}
            className="object-cover w-full md:top-[64] rounded-lg opacity-30 md:h-fit h-full"
            style={{
              aspectRatio: "700 / 400",
              objectFit: "cover",
            }}
          />
          <div className="absolute inset-0 opacity-0"></div>
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
          className="z-99 relative"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#00415f] mb-4">
            {data.hero.title}
          </h1>
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
          className="relative"
        >
          <p className="md:text-lg text-gray-700 max-w-3xl mx-auto px-4 md:font-semibold text-sm whitespace-pre-line">
            {data.hero.description}
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Who We Are Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-6">
            Who We Are ?
          </h2>

          {/* Leadership Profile */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className=" rounded-lg">
              {data.leadership.image && (
                <Image // using img to support both local assets and remote uploads seamlessly
                  src={data.leadership.image}
                  alt={data.leadership.name}
                  width={1024}
                  height={1024}
                  className="rounded-lg h-64 w-64 object-cover"
                />
              )}
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-bold text-[#0073A6] mb-2">
                {data.leadership.name}, {data.leadership.designation}
              </h3>
              <p className="text-2xl font-bold text-[#0073A6] mb-4">
                {data.leadership.title}
              </p>
              <p className="text-gray-700 mb-4 whitespace-pre-line">
                {data.leadership.description}
              </p>
            </div>
          </div>

          {/* Team Section */}
          <h3 className="text-2xl font-bold text-[#0073A6] mb-6">Our Team</h3>
          <p className="pb-6">
            Our team brings a diverse blend of expertise in actuarial science,
            statistics, data analytics, and predictive modeling. With strong
            analytical skills, a deep understanding of stochastic processes, and
            proficiency in statistical methodologies, we are well-equipped to
            tackle complex actuarial challenges. Our collective strengths
            include machine learning, artificial intelligence, coding across
            multiple languages, and leveraging data-driven insights for
            strategic decision-making. Committed to continuous learning and
            innovation, we strive to enhance analytical capabilities and drive
            impactful solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {data.team.map((member, index) => (
              <motion.div
                key={index}
                className="w-full sm:w-[calc(50%-4rem)] lg:w-[calc(25%-2rem)] max-w-[16rem] group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  },
                }}
              >
                <div className="w-full aspect-[4/5] relative overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={600}
                    height={750}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-lg font-bold text-[#0073A6] mb-1">
                    {member.name}
                  </h4>
                  <p className="text-gray-600 font-medium text-xs">
                    {member.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-6">
            {data.mission.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {data.mission.description}
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.values.map((val, index) => (
              <ValueCard
                key={index}
                icon={
                  <Image
                    style={{
                      backgroundColor: "transparent",
                      mixBlendMode: "multiply",
                    }}
                    src={val.image}
                    height={150}
                    width={150}
                    alt="Icon"
                  />
                }
                title={val.title}
                description={val.description}
              />
            ))}
          </div>
        </section>

        {/* Road Ahead Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#0073A6] mb-6">
            {data.roadAhead.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {data.roadAhead.description}
          </p>
        </section>
      </main>

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

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#0074a61f] p-4 rounded-lg flex flex-col items-center text-center">
      <div className="mb-4 text-[#00415f]">{icon}</div>
      <h4 className="text-black font-semibold mb-2">{title}</h4>
      <p className="text-black text-sm">{description}</p>
    </div>
  );
}
