import { TeamMemberForm } from "../team-member-form"

export default function NewTeamMemberPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add Team Member</h1>
      <TeamMemberForm />
    </div>
  )
}

