"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

interface Blog {
  _id: string;
  id: string;
  title: string;
  description: string;
  content: string;
  publishDate: string;
  status: "draft" | "published";
  image?: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/blogs");
      const data = await response.json();
      console.log(data)
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    console.log(id)
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`https://https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/blogs/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Specify content type
          },
        });

        if (!response.ok) {
          // Attempt to parse the error message from the response body
          console.log(response.body)
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage; // Use the message from the server if available
          } catch (parseError) {
            console.error("Failed to parse error message from response:", parseError);
          }
          throw new Error(errorMessage);
        }

        // If the deletion was successful on the server, update the state
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } catch (error: any) {
        console.error("Error deleting blog:", error);
        alert(`Failed to delete the blog post: ${error.message || error}`); // Show the error message to the user
      }
    }
  };

  const refreshBlogs = () => {
    fetchBlogs();
    setEditingBlog(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#00415f]">Blog Posts</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0073a6]" onClick={() => setEditingBlog(null)}>
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
              <DialogDescription>
                {editingBlog ? "Edit the blog post details." : "Add a new blog post to your website."}
              </DialogDescription>
            </DialogHeader>
            <BlogForm blog={editingBlog || undefined} onSuccess={refreshBlogs} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.map((blog,index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                      blog.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    )}
                  >
                    {blog.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(blog.publishDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingBlog(blog);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={async () => handleDelete(blog._id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}