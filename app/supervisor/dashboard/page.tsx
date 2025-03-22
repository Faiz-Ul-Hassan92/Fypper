import SupervisorLayout from "../components/supervisor-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, MessageSquare, Users } from "lucide-react"

export default function SupervisorDashboard() {
  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current FYPs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4/6</div>
              <p className="text-xs text-muted-foreground">Supervising 4 out of 6 allowed projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Proposals awaiting your response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Scheduled in the next 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">From 5 different conversations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: <Users className="h-4 w-4" />, title: "New proposal from Group 7", time: "2 hours ago" },
                  {
                    icon: <MessageSquare className="h-4 w-4" />,
                    title: "Message from John in Group 3",
                    time: "Yesterday",
                  },
                  {
                    icon: <Calendar className="h-4 w-4" />,
                    title: "Meeting scheduled with Group 5",
                    time: "Yesterday",
                  },
                  {
                    icon: <Users className="h-4 w-4" />,
                    title: "Recruiter from TechCorp requested collaboration",
                    time: "2 days ago",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">{item.icon}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>FYP Progress</CardTitle>
              <CardDescription>Current status of supervised projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Smart Home Automation", progress: 75, status: "On Track" },
                  { title: "AI-Powered Health Monitoring", progress: 60, status: "Needs Attention" },
                  { title: "Blockchain for Supply Chain", progress: 40, status: "Delayed" },
                  { title: "AR Navigation System", progress: 85, status: "On Track" },
                ].map((project, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{project.title}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.status === "On Track"
                            ? "bg-green-100 text-green-800"
                            : project.status === "Needs Attention"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <p className="text-xs text-right text-muted-foreground">{project.progress}% complete</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SupervisorLayout>
  )
}

