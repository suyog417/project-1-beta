'use client'

import { useEffect, useState } from "react"
import { TeamMemberForm } from "../../team-member-form"
import React from "react"

interface TeamMember {
    _id?: string,
    name: string,
    email: string,
    role: string,
    displayOnWebsite: boolean,
    dashboardAccess: boolean,
    dashboardPassword: string
  }

  interface EditTeamMemberPageProps {
    params: {
      id: string
    }
  }
export default function EditTeamMemberPage({ params }: EditTeamMemberPageProps) {
    const [teamMember, setTeamMember] = useState<TeamMember | null>(null)
  // In a real app, you would fetch the team member data based on the ID
  async function fetchMemberDetailById(id: string) {
    const response = await fetch(`https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/teamMembers/${id}`)
    return response.json()
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMemberDetailById(params.id);
      setTeamMember(data);
    };

    fetchData();
  }, [params.id]);

  return (


    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Team Member</h1>
      {teamMember ? (
        <TeamMemberForm defaultValues={teamMember} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
