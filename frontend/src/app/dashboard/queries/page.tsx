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

interface Query {
  _id: string;
  name: string;
  email: string;
  message: string;
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("https://portflio-plum.vercel.app/api/askAnActuary/all");
        if (response.ok) {
          const data = await response.json();
          setQueries(data);
        } else {
          console.error("Failed to fetch queries");
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://portflio-plum.vercel.app/api/askAnActuary/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setQueries(queries.filter((query) => query._id !== id));
        alert("Query deleted successfully!");
      } else {
        console.error("Failed to delete query");
        alert("Failed to delete query.");
      }
    } catch (error) {
      console.error("Error deleting query:", error);
      alert("Error deleting query.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#00415f] mb-4">Queries</h1>
      <Table>
        <TableCaption>A list of all queries.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Question</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries.map((query) => (
            <TableRow key={query._id}>
              <TableCell className="font-medium">{query.name}</TableCell>
              <TableCell>{query.email}</TableCell>
              <TableCell>{query.message}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="icon" onClick={() => handleDelete(query._id)}>
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
