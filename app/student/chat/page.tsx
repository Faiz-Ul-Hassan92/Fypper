import { StudentLayout } from "../components/student-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentChat() {
  return (
    <StudentLayout>
      <div className="flex h-full">
        {/* Chat list */}
        <div className="w-64 border-r h-full">
          <div className="p-4 border-b">
            <Input placeholder="Search conversations..." />
          </div>

          <Tabs defaultValue="individual">
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="individual" className="flex-1">
                  Individual
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex-1">
                  Groups
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="individual" className="p-0">
              <div className="divide-y">
                {/* Chat list items would go here */}
                <div className="p-3 hover:bg-accent cursor-pointer">
                  <div className="font-medium">Dr. Sarah Wilson</div>
                  <div className="text-xs text-muted-foreground truncate">Supervisor</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="groups" className="p-0">
              <div className="divide-y">
                {/* Group chat list items would go here */}
                <div className="p-3 hover:bg-accent cursor-pointer">
                  <div className="font-medium">FYP Team</div>
                  <div className="text-xs text-muted-foreground truncate">3 members</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat content */}
        <div className="flex-1 flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="font-medium">Dr. Sarah Wilson</h2>
            <p className="text-xs text-muted-foreground">Supervisor • AI & Machine Learning</p>
          </div>

          <div className="flex-1 p-4 overflow-auto">{/* Chat messages would go here */}</div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}

