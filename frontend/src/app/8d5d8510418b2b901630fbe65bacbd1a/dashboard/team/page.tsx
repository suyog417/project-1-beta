"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { TeamMembersTable } from "./team-members-table";

interface TeamMember {
  _id?: string,
  name: string,
  email: string,
  role: string,
  displayOnWebsite: boolean,
  dashboardAccess: boolean,
  dashboardPassword: string
}

export default function TeamMembersEditor() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const fetchTeamDetails = async () => {
    try {
      const res = await fetch("https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/teamMembers/");
      const data = await res.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team details.", error);
    }
  };
  // async function fetchTeamMembers() {
  //     try {
  //       const response = await fetch("")
  //       const data = await response.json()
  //       setTeamMembers(data)
  //     } catch (error) {
  //       console.error("Error fetching team members:", error)
  //     }
  //   }

  useEffect(() => {
    fetchTeamDetails();
  });
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
        <Button asChild>
          <Link href="/8d5d8510418b2b901630fbe65bacbd1a/dashboard/team/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Team Member
          </Link>
        </Button>
      </div>
      <TeamMembersTable data={teamMembers} />
      {/* <div className="bg-white shadow rounded-lg p-4 mt-5">
                <h2 className="text-lg font-semibold mb-2">Team Member Details</h2> */}
      {/* Add team member details display here.  Consider a component if it gets complex */}
      {/* <div className="text-gray-600">No team member selected.</div>
            </div> */}
    </div>
  );
}
