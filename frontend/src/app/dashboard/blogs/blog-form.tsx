"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlogFormProps {
  blog?: {
    id?: string;
    title: string;
    description: string;
    content?: string;
    status: "draft" | "published";
    image?: string;
  };
  onSuccess?: () => void;
}

export function BlogForm({ blog, onSuccess }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    description: blog?.description || "",
    content: blog?.content || "",
    status: blog?.status || "draft",
    image: blog?.image || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = blog?.id
        ? `https://https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/blogs/${blog.id}`
        : "https://https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/blogs/create";
      const method = blog?.id ? "put" : "post";

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("status", formData.status);
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios[method](url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Blog saved:", response.data);

      if (onSuccess) onSuccess();
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred while saving the blog. Please try again."
      );
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (status: "draft" | "published") => {
    setFormData({ ...formData, status });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setFormData({ ...formData, image: "" });
    }
  };

  const handleImageLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, image: e.target.value });
    setImageFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 overflow-y-auto"
      style={{ maxHeight: "70vh" }}
    >
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="min-h-[200px]"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Upload Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageLink">Or Add Image Link</Label>
        <Input
          id="imageLink"
          type="url"
          value={formData.image}
          onChange={handleImageLinkChange}
          placeholder="Paste image URL here"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={loading}>
              {formData.status}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleStatusChange("draft")}
              disabled={loading}
            >
              Draft
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusChange("published")}
              disabled={loading}
            >
              Published
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" className="bg-[#0073a6]" disabled={loading}>
          {loading ? "Saving..." : blog ? "Update" : "Create"} Blog Post
        </Button>
      </div>
    </form>
  );
}