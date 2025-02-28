'use client'

import { motion } from "framer-motion";

export default function HeroSection({title,description}: {title:string,description:string}){
    return (
        <div className="bg-[#0074a611] py-16 text-center">
        <motion.div
          initial="hidden"
          key=""
          whileInView="visible"
          exit="hidden"
          viewport={{
            once:true
          }}
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
        >
        <h1 className="text-4xl md:text-5xl font-bold text-[#00415f] mb-4">{title}</h1>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
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
        >
        <p className="text-lg text-gray-700 max-w-3xl mx-auto px-4">
          {description}
        </p></motion.div>
      </div>
    )
}

