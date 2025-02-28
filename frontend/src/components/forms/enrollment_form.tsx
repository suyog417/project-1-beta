import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select } from "@headlessui/react";
import clsx from "clsx";

export default function EnrollmentForm (){

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        DOB: "",
        phone: "",
        city:"",
        coursetype : ""
      })
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log("Form submitted:", formData)
      }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }

    return <div className="flex flex-col gap-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
        <Input id="name" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
        <Input id="name" name="phone" value={formData.phone} onChange={handleChange} required />

        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">City:</label>
        <Input id="name" name="phone" value={formData.city} onChange={handleChange} required />
        
        {/* <DropDown></DropDown> */}
        <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Course Type</label>
        <div className="border-1.5 rounded-lg flex items-stretch" id="course">
        <Select name="status" className={clsx(
              ' block w-full appearance-none rounded-lg border-none py-3 px-3 text-sm/6',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
              // Make the text of each option black on Windows
              '*:text-black'
            )}>
            <option value="active">Basic</option>
            <option value="paused">Advance</option>
        </Select>
        </div>

        <Button type="submit">Enroll</Button>
        
    </div>
}