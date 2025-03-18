"use client";

import { useEffect, useState } from "react";
import TeamMembersTable from "./team-members-table";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function TeamMembersEditor() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const fetchTeamDetails = async () => {
    try {
      const res = await fetch("");
      const data = await res.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team details.", error);
    }
  };

  useEffect(() => {
    fetchTeamDetails();
  });
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-5">Team Members</h1>
      <TeamMembersTable data={teamMembers} />
      {/* <div className="bg-white shadow rounded-lg p-4 mt-5">
                <h2 className="text-lg font-semibold mb-2">Team Member Details</h2> */}
      {/* Add team member details display here.  Consider a component if it gets complex */}
      {/* <div className="text-gray-600">No team member selected.</div>
            </div> */}
    </div>
  );
}
