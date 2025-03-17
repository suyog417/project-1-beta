'use client'

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

interface Enrollment {
  _id: string;
  name: string;
  email: string;
  DOB: string;
  phone: string;
  city: string;
  coursetype: string;
  createdAt: string;
  status: string;
}

type FilterStatus = "all" | "responded" | "pending" | "wrong_information"

export default function EnrollmentsDashboard() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")
  const [submissions, setSubmissions] = useState<Enrollment[]>(enrollments)
  const [selectedSubmission, setSelectedSubmission] = useState<Enrollment | null>(null)
  const [newStatus, setNewStatus] = useState<Enrollment["status"]>("pending")
  const [isLoading, setIsLoading] = useState(true);

  const fetchEnrollments = async () => {
    try {
      const res = await fetch("https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/enrollments");
      const data = await res.json();
      setEnrollments(data);
    } catch (error) {
      console.error("Error fetching enrollments", error);
    }
  };

  useEffect(() => {

    fetchEnrollments();
  }, []);


  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/enrollments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEnrollments(enrollments.filter((form) => form._id !== id));

        fetchEnrollments()
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

  const filteredSubmissions = enrollments.filter((submission) => {
    const matchesStatus = filterStatus === "all" || submission.status === filterStatus
    const matchesSearch =
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.coursetype.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/enrollments/update/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status:status }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setEnrollments(enrollments.filter((form) => form._id !== id));

        // fetchEnrollments()
        alert("Enrollment form updated successfully!");
      } else {
        console.error("Failed to update enrollment form");
        alert("Failed to update enrollment form.");
      }
    } catch (error) {
      console.error("Error updated enrollment form:", error);
      alert("Error updating enrollment form.");
    }
  };

  const getStatusBadge = (status: string) => {
      switch (status) {
        case "responded":
          return <Badge className="bg-green-500 hover:bg-green-600">Responded</Badge>
        case "pending":
          return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
        case "wrong_information":
          return <Badge className="bg-red-500 hover:bg-red-600">Wrong Information</Badge>
        default:
          return <Badge>Unknown</Badge>
      }
    }

  return (
    <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative md:w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-6 w-6 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as FilterStatus)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Submissions</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="wrong_information">Wrong Information</SelectItem>
              </SelectContent>
            </Select>
          </div>
    
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="hidden md:table-cell">City</TableHead>
                  <TableHead>Course Type</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">{submission.phone}</TableCell>
                      <TableCell>{submission.city}</TableCell>
                      <TableCell>{submission.coursetype}</TableCell>
                      <TableCell>{submission.createdAt}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-row">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedSubmission(submission)
                            setNewStatus(submission.status)
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(submission._id)}
                        >
                          Delete
                        </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No submissions found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
    
          <div className="text-sm text-muted-foreground">
            Showing {filteredSubmissions.length} of {enrollments.length} submissions
          </div>
    
          {/* Submission Details Dialog */}
          <Dialog open={selectedSubmission !== null} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Submission Details</DialogTitle>
                <DialogDescription>View the complete information for this Enrollment form submission.</DialogDescription>
              </DialogHeader>
    
              {selectedSubmission && (
                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-semibold">ID:</div>
                    <div className="col-span-2">{selectedSubmission._id}</div>
                  </div>
    
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-semibold">Name:</div>
                    <div className="col-span-2">{selectedSubmission.name}</div>
                  </div>
    
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-semibold">Email:</div>
                    <div className="col-span-2">
                      {selectedSubmission.email || <span className="text-red-500 italic">Not provided</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-semibold">Submitted On:</div>
                    <div className="col-span-2">
                      {selectedSubmission.createdAt}
                    </div>
                  </div>
    
    
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-semibold">Status:</div>
                    <div className="col-span-2">{getStatusBadge(selectedSubmission.status)}</div>
                  </div>
    
                  <div className="space-y-2">
                    <div className="font-semibold">Course type:</div>
                    <div className="p-3 bg-muted rounded-md whitespace-pre-wrap">{selectedSubmission.coursetype}</div>
                  </div>
    
                  {/* Status Update Section */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="font-semibold">Update Status:</div>
                    <div className="flex gap-4 items-center">
                      <Select value={newStatus} onValueChange={(value) => setNewStatus(value as Enrollment["status"])}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select new status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="responded">Responded</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="wrong_information">Wrong Information</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => {
                          updateStatus(selectedSubmission._id, newStatus)
                          // updateSubmissionStatus(selectedSubmission._id, newStatus)
                        }}
                        disabled={selectedSubmission.status === newStatus}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              )}
    
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
  );
}
