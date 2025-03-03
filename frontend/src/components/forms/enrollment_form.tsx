import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select } from "@headlessui/react";
import clsx from "clsx";

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    coursetype: "Basic", // Default value
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        alert("Enrollment successful!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          coursetype: "Basic"
        });
      } else {
        console.error("Form submission failed:", response.status);
        alert(`Enrollment failed. Please try again. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCourseTypeChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      coursetype: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Name:
      </label>
      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />

      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email:
      </label>
      <Input id="email" name="email" value={formData.email} onChange={handleChange} required />

      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
        Phone:
      </label>
      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
        City:
      </label>
      <Input id="city" name="city" value={formData.city} onChange={handleChange} required />

      <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
        Course Type
      </label>
      <div className="border-1.5 rounded-lg flex items-stretch" id="course">
        <select
          name="coursetype"
          value={formData.coursetype}
          onChange={handleCourseTypeChange}
          className={clsx(
            " block w-full appearance-none rounded-lg border-none py-3 px-3 text-sm/6",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            // Make the text of each option black on Windows
            "*:text-black"
          )}
        >
          <option value="Basic">Basic</option>
          <option value="Advance">Advance</option>
        </select>
      </div>

      <Button type="submit">Enroll</Button>
    </form>
  );
}