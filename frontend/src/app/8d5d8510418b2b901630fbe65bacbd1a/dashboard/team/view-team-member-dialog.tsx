import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ViewTeamMemberDialogProps {
  member: {
    id: string
    name: string
    email: string
    role: string
    displayOnWebsite: boolean
    dashboardAccess: boolean
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewTeamMemberDialog({ member, open, onOpenChange }: ViewTeamMemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Team Member Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Name:</span>
            <span className="col-span-2">{member.name}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Email:</span>
            <span className="col-span-2">{member.email}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Role:</span>
            <span className="col-span-2">{member.role}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Website Display:</span>
            <span className="col-span-2">
              {member.displayOnWebsite ? (
                <Badge variant="default">Visible</Badge>
              ) : (
                <Badge variant="outline">Hidden</Badge>
              )}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-sm font-medium">Dashboard Access:</span>
            <span className="col-span-2">
              {member.dashboardAccess ? (
                <Badge variant="default">Enabled</Badge>
              ) : (
                <Badge variant="outline">Disabled</Badge>
              )}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

