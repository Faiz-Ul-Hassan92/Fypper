import { StudentLayout } from "../components/student-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export default function GroupFormation() {
  return (
    <StudentLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Group Formation</h1>
        <p className="text-muted-foreground mb-6">Find teammates and form your FYP group.</p>

        <Tabs defaultValue="findGroup">
          <TabsList className="mb-4">
            <TabsTrigger value="findGroup">Find me a Group</TabsTrigger>
            <TabsTrigger value="proposals">Proposal Offers</TabsTrigger>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="findGroup">
            <div className="rounded-lg border">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Find a Group to Join</h3>
                <p className="text-muted-foreground mb-4">Search for groups looking for additional members.</p>

                {/* Search form would go here */}
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by project topic, skills, or department..."
                      className="w-full px-4 py-2 border rounded-md"
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="text-center text-muted-foreground py-8">
                    No groups found matching your search criteria.
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="proposals">
            <div className="rounded-lg border">
              {/* Proposal offers content would go here */}
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Pending Proposal Offers</h3>
                <p className="text-muted-foreground mb-4">Review and respond to group invitations.</p>
                <div className="text-center text-muted-foreground py-8">No pending proposal offers.</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <div className="rounded-lg border">
              {/* My requests content would go here */}
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">My Group Requests</h3>
                <p className="text-muted-foreground mb-4">Track the status of your sent requests.</p>
                <div className="text-center text-muted-foreground py-8">No active requests.</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}

