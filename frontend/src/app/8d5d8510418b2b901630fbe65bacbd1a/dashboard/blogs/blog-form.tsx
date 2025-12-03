"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Using shadcn Select for better UI

interface BlogFormProps {
  blog?: {
    _id?: string; // Changed to _id to match MongoDB
    title: string;
    description: string;
    content: string;
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
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractDirectImageUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "www.google.com" && urlObj.pathname === "/imgres") {
        const imgUrlParam = urlObj.searchParams.get("imgurl");
        if (imgUrlParam) {
          return decodeURIComponent(imgUrlParam);
        }
      }
    } catch (e) {
      // Invalid URL, fall through to return original
    }
    return url;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawUrl = e.target.value;
    const directUrl = extractDirectImageUrl(rawUrl);
    setFormData({ ...formData, image: directUrl });
    setFile(null); // Clear file if URL is entered
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFormData({ ...formData, image: "" }); // Clear URL if file is selected
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Determine URL and Method based on whether we are editing or creating
      const url = blog?._id
        ? `/api/blogs/${blog._id}`
        : `/api/blogs`;
      
      const method = blog?._id ? "PUT" : "POST";

      let body: any;
      let headers: any = {};

      if (file) {
        // Use FormData if a file is selected
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("content", formData.content);
        data.append("status", formData.status);
        data.append("image", file);
        // When sending FormData, browser sets Content-Type automatically
        body = data;
      } else {
        // Use JSON if no file
        body = JSON.stringify(formData);
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Blog saved:", data);
      if (onSuccess) onSuccess();
      
    } catch (err: any) {
      console.error("Error saving blog:", err);
      setError(err.message || "An error occurred while saving the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 overflow-y-auto p-1"
      style={{ maxHeight: "70vh" }}
    >
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={loading}
          placeholder="Enter blog title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          disabled={loading}
          placeholder="A brief summary for the card view..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (HTML allowed)</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="min-h-[200px] font-mono text-sm"
          required
          disabled={loading}
          placeholder="<p>Write your blog content here...</p>"
        />
        <p className="text-xs text-gray-500">
          Tip: You can paste HTML here.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageLink">Cover Image (URL or Upload)</Label>
        
        <div className="flex flex-col gap-3">
            <div>
                <p className="text-sm font-medium mb-1">Option 1: Image URL</p>
                <Input
                id="imageLink"
                type="url"
                value={formData.image}
                onChange={handleImageChange}
                placeholder="https://example.com/image.jpg"
                disabled={loading || !!file}
                />
                <p className="text-xs text-gray-500 mt-1">
                Paste a direct image link.
                </p>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
            </div>

            <div>
                <p className="text-sm font-medium mb-1">Option 2: Upload Image</p>
                <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={loading || !!formData.image}
                />
            </div>
        </div>

        {(formData.image || file) && (
          <div className="mt-2 relative w-full h-32 bg-gray-100 rounded overflow-hidden">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
               src={file ? URL.createObjectURL(file) : formData.image} 
               alt="Preview" 
               className="w-full h-full object-cover opacity-80"
               onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
               }}
             />
             <Button 
                type="button" 
                variant="destructive" 
                size="sm" 
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => {
                    setFormData({...formData, image: ""});
                    setFile(null);
                }}
             >
                X
             </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select 
            value={formData.status} 
            onValueChange={(val: "draft" | "published") => setFormData({...formData, status: val})}
            disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" className="bg-[#0073a6] hover:bg-[#005a80]" disabled={loading}>
          {loading ? "Saving..." : blog ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
