"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlogForm } from "./blog-form";
import { cn } from "@/lib/utils";

// Interface strictly matching MongoDB response
interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  publishDate: string;
  status: "draft" | "published";
  image?: string;
  slug: string;
}

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBlog, setEditingBlog] = useState<Blog | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch blogs from local API
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete");
      }

      // Optimistic update
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSuccess = () => {
    fetchBlogs(); // Re-fetch to get latest data
    setIsDialogOpen(false);
    setEditingBlog(undefined);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#00415f]">Manage Blogs</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-[#0073a6] hover:bg-[#005a80]" 
              onClick={() => setEditingBlog(undefined)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
              </DialogTitle>
              <DialogDescription>
                {editingBlog 
                  ? "Update the details below." 
                  : "Fill in the details to publish a new article."}
              </DialogDescription>
            </DialogHeader>
            {/* We pass the key to force re-render when switching between edit/create */}
            <BlogForm 
              key={editingBlog ? editingBlog._id : "new"} 
              blog={editingBlog} 
              onSuccess={handleSuccess} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none shadow-none focus-visible:ring-0 max-w-sm"
        />
      </div>

      <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2 text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredBlogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                  No blogs found. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              filteredBlogs.map((blog) => (
                <TableRow key={blog._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium max-w-[300px] truncate" title={blog.title}>
                    {blog.title}
                  </TableCell>
                  <TableCell>
                    {blog.image ? (
                      <div className="h-10 w-16 relative rounded overflow-hidden bg-gray-100">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img 
                           src={blog.image} 
                           alt="Thumbnail" 
                           className="object-cover w-full h-full" 
                         />
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs italic">No image</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                        blog.status === "published"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      )}
                    >
                      {blog.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setEditingBlog(blog);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDelete(blog._id)}
                      >
                        <Trash className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}