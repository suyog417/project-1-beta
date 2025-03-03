'use client'

import { useEffect, useState } from "react";

interface Enrollment {
  _id: string;
  name: string;
  email: string;
  DOB: string;
  phone: string;
  city: string;
  coursetype: string;
  createdAt: string;
}

export default function EnrollmentsDashboard() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch("https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/enrollments");
        const data = await res.json();
        setEnrollments(data);
      } catch (error) {
        console.error("Error fetching enrollments", error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Enrollments Dashboard</h1>
      {enrollments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">Course Type</th>
                <th className="py-2 px-4 border-b">Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment._id}>
                  <td className="py-2 px-4 border-b">{enrollment.name}</td>
                  <td className="py-2 px-4 border-b">{enrollment.email}</td>
                  <td className="py-2 px-4 border-b">{enrollment.phone}</td>
                  <td className="py-2 px-4 border-b">{enrollment.city}</td>
                  <td className="py-2 px-4 border-b">{enrollment.coursetype}</td>
                  <td className="py-2 px-4 border-b">{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No enrollments found.</p>
      )}
    </div>
  );
}
