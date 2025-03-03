"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ContactForm {
  _id: string;
  name: string;
  email: string;
  profession?: string;
  company?: string;
  phone?: string;
  message: string;
}

export default function ContactFormsPage() {
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);

  useEffect(() => {
    const fetchContactForms = async () => {
      try {
        const response = await fetch("https://https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/contact/all");
        if (response.ok) {
          const data = await response.json();
          setContactForms(data);
        } else {
          console.error("Failed to fetch contact forms");
        }
      } catch (error) {
        console.error("Error fetching contact forms:", error);
      }
    };

    fetchContactForms();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/contact/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContactForms(contactForms.filter((form) => form._id !== id));
        alert("Contact form deleted successfully!");
      } else {
        console.error("Failed to delete contact form");
        alert("Failed to delete contact form.");
      }
    } catch (error) {
      console.error("Error deleting contact form:", error);
      alert("Error deleting contact form.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#00415f] mb-4">Contact Form Submissions</h1>
      <Table>
        <TableCaption>A list of all contact form submissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Profession</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contactForms.map((form) => (
            <TableRow key={form._id}>
              <TableCell className="font-medium">{form.name}</TableCell>
              <TableCell>{form.email}</TableCell>
              <TableCell>{form.profession}</TableCell>
              <TableCell>{form.company}</TableCell>
              <TableCell>{form.phone}</TableCell>
              <TableCell>{form.message}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="icon" onClick={() => handleDelete(form._id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
