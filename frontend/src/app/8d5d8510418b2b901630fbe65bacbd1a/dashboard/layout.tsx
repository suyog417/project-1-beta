"use client";

import type React from "react";
import Head from 'next/head';
import { Sidebar } from "./components/sidebar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in (e.g., check for a token in local storage)
    const token = localStorage.getItem("authToken");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      router.push("/8d5d8510418b2b901630fbe65bacbd1a/dashboardLogin"); // Redirect to login page if not logged in
    }
  }, [router]);

  if (!loggedIn) {
    return null; // Or a loading indicator
  }

  return (
   <>
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        {/* Other head elements */}
      </Head>
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="py-8 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
    </>
  );
}
