import { StudentLayout } from "../components/student-layout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function OpenForum() {
  return (
    <StudentLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Open Forum</h1>
            <p className="text-muted-foreground">View and participate in discussions about FYPs.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </div>

        <div className="space-y-4">
          {/* Announcements would go here */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">FYP Submission Deadline Extended</h3>
              <div className="text-sm text-muted-foreground">2 days ago</div>
            </div>
            <p className="text-sm mb-4">
              The deadline for final project submissions has been extended by one week to accommodate students affected
              by the recent system outage.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Posted by: Alex Johnson</span>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}

