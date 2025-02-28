"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header/header"
import { Select } from "@headlessui/react"
import { motion } from "framer-motion"
import ImageCarousel from "@/components/carousel/image-carousel"
import { LinkedIn, Place } from "@mui/icons-material"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
    company: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        console.log("Form submitted successfully!")
        // Optionally, reset the form
        setFormData({
          name: "",
          email: "",
          profession: "",
          company: "",
          phone: "",
          message: "",
        })
        alert("Form submitted successfully!");
      } else {
        console.error("Form submission failed:", response.status)
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred. Please try again later.");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
        <Header/>
      {/* Hero Section */}
      <div className="bg-[#0074a611] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          {/* <img
            src="/assets/Asset_3.webp"
            alt="Contact Background"
            className="object-cover w-full h-full opacity-30"
          /> */}
          <ImageCarousel/>
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
          <h1 className="text-4xl md:text-5xl font-bold text-[#00415f] mb-4">Contact Us</h1>
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
            We're here to help. Reach out to us for expert actuarial advice.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[#0073A6] mb-6">Let's Connect</h2>
            <p className="text-gray-600 mb-8">
              Have a query related to insurance, risk modelling, or financial valuations? We'd love to hear from you.
              Please use the contact form below or reach us directly using the details provided.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[#0073A6] mb-4">Office Address</h3>
                {/* <div className="flex gap-1">
                  <Place className="h-5 w-5 text-[#0073a6]" style={{"color":"red"}}/>
                  <address className="not-italic text-gray-600">
                  Get2Act Actuarial Services & Consultancy,
                  <br />
                  Office no.-144, Satra Plaza, Sector 19D,
                  <br />
                  Vashi, Navi Mumbai – 400705
                </address></div> */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4065.149954688001!2d73.0032396110788!3d19.082464382048872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1005266d7ab%3A0xbcb577e9c5937651!2sGet2Act!5e1!3m2!1sen!2sin!4v1740634295568!5m2!1sen!2sin" width="600" height="450" loading="lazy" className="rounded-md h-80 w-full"></iframe>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0073A6] mb-4">Phone & Email</h3>
                <div className="space-y-3">
                  <div className="flex gap-2 text-gray-600 items-center pl-[1.5]">
                    <Phone className="h-5 w-5 text-[#0073a6]"/>
                    <a href="tel:+91 9004943299">+91 9004943299</a>
                  </div>
                  <div className="flex gap-2 text-gray-600 items-center pl-[1.5]">
                    <Mail className="h-5 w-5 text-[#0073a6]"/>
                    <a href="mailto:admin@get2act.in">admin@get2act.in</a>
                  </div>
                  <div className="flex gap-1 text-gray-600 items-center">
                    <LinkedIn className="h-5 w-5 text-[#0073a6] p-0 m-0"/>
                    <a href="https://www.linkedin.com/company/get2act/">linkedin.com/company/get2act/</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#0073A6] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name:
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              
              {/* profession */}
              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                  Profession
                </label>
                <select
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0073a6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Profession</option>
                  <option value="Student">Student</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              {/* <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                  Profession
                </label>
                <Select 
                value={formData.profession}
                name="Profession" 
                aria-label="Profession"
                onChange={handleChange}
                // defaultValue={"Student"}
                className="flex h-12 w-full rounded-md border border-input bg-white px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0073a6] disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="Student">Student</option>
                  <option value="Employee">Employee</option>
                </Select>
              </div> */}

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company/College Name
                </label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full bg-[#0073a6] hover:bg-[#00415f] text-white">
                Send Message
              </Button>
            </form>
          </div>
        </div>
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
