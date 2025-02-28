import TeamMembersTable from "./team-members-table";


export default function TeamMembersEditor() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-semibold mb-5">Team Members</h1>
            <TeamMembersTable />
            <div className="bg-white shadow rounded-lg p-4 mt-5">
                <h2 className="text-lg font-semibold mb-2">Team Member Details</h2>
                {/* Add team member details display here.  Consider a component if it gets complex */}
                <div className="text-gray-600">No team member selected.</div>
            </div>
        </div>
    )
}