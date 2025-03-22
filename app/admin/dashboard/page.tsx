"use client"

import { useState } from "react"
import { Check, X, Eye, Bell, Users, Briefcase, GraduationCap, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AdminLayout from "../components/admin-layout"

// Mock data for demonstration
const pendingStudents = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Computer Science",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Electrical Engineering",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    department: "Mechanical Engineering",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const pendingSupervisors = [
  {
    id: 1,
    name: "Dr. Robert Brown",
    email: "robert.brown@example.com",
    department: "Computer Science",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@example.com",
    department: "Electrical Engineering",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const pendingRecruiters = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    email: "hr@techsolutions.com",
    industry: "Software Development",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Global Innovations",
    email: "careers@globalinnovations.com",
    industry: "IT Consulting",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Future Systems",
    email: "recruitment@futuresystems.com",
    industry: "Cybersecurity",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationText, setNotificationText] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)

  // Stats for the dashboard
  const stats = [
    { title: "Total Students", value: "1,245", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Supervisors", value: "86", icon: <GraduationCap className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Recruiters", value: "38", icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
    { title: "Pending Approvals", value: "8", icon: <Clock className="h-4 w-4 text-muted-foreground" /> },
  ]

  const handleApprove = (type: string, id: number) => {
    // In a real application, this would make an API call to approve the user
    console.log(`Approved ${type} with ID: ${id}`)
    // Then update the UI accordingly
    alert(`${type} approved successfully!`)
  }

  const handleReject = (type: string, id: number) => {
    // In a real application, this would make an API call to reject the user
    console.log(`Rejected ${type} with ID: ${id}`)
    // Then update the UI accordingly
    alert(`${type} rejected.`)
  }

  const handleViewProfile = (type: string, user: any) => {
    setSelectedUser({ ...user, type })
    setIsProfileDialogOpen(true)
  }

  const handleSendNotification = (user: any) => {
    setSelectedUser(user)
    setIsNotificationDialogOpen(true)
  }

  const sendNotification = () => {
    // In a real application, this would send the notification to the user
    console.log(`Sending notification to ${selectedUser.name}: ${notificationText}`)
    alert(`Notification sent to ${selectedUser.name}`)
    setNotificationText("")
    setIsNotificationDialogOpen(false)
  }

  return (
    <AdminLayout activePage="dashboard">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">{stat.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Approvals Tabs */}
      <Tabs defaultValue="students" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="supervisors">Supervisors</TabsTrigger>
            <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="students">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {pendingStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.email}</p>
                        <Badge variant="outline" className="mt-1">
                          {student.department}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewProfile("student", student)}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSendNotification(student)}>
                        <Bell className="h-4 w-4 mr-1" /> Notify
                      </Button>
                      <Button size="sm" variant="default" onClick={() => handleApprove("student", student.id)}>
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject("student", student.id)}>
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supervisors">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {pendingSupervisors.map((supervisor) => (
                  <div key={supervisor.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={supervisor.avatar} alt={supervisor.name} />
                        <AvatarFallback>{supervisor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{supervisor.name}</h3>
                        <p className="text-sm text-gray-500">{supervisor.email}</p>
                        <Badge variant="outline" className="mt-1">
                          {supervisor.department}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewProfile("supervisor", supervisor)}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSendNotification(supervisor)}>
                        <Bell className="h-4 w-4 mr-1" /> Notify
                      </Button>
                      <Button size="sm" variant="default" onClick={() => handleApprove("supervisor", supervisor.id)}>
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject("supervisor", supervisor.id)}>
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recruiters">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {pendingRecruiters.map((recruiter) => (
                  <div key={recruiter.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={recruiter.avatar} alt={recruiter.name} />
                        <AvatarFallback>{recruiter.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{recruiter.name}</h3>
                        <p className="text-sm text-gray-500">{recruiter.email}</p>
                        <Badge variant="outline" className="mt-1">
                          {recruiter.industry}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewProfile("recruiter", recruiter)}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSendNotification(recruiter)}>
                        <Bell className="h-4 w-4 mr-1" /> Notify
                      </Button>
                      <Button size="sm" variant="default" onClick={() => handleApprove("recruiter", recruiter.id)}>
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject("recruiter", recruiter.id)}>
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions performed in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Approved student registration</p>
                <p className="text-xs text-gray-500">Michael Brown • 10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-red-100 rounded-full">
                <X className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Rejected recruiter application</p>
                <p className="text-xs text-gray-500">Invalid Company Ltd. • 45 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Bell className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Sent notification to all supervisors</p>
                <p className="text-xs text-gray-500">Admin • 2 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile View Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              {selectedUser?.type === "student" && "Student profile details"}
              {selectedUser?.type === "supervisor" && "Supervisor profile details"}
              {selectedUser?.type === "recruiter" && "Recruiter profile details"}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-center">{selectedUser.name}</h3>
                <p className="text-center text-gray-500">{selectedUser.email}</p>
                <div className="flex justify-center">
                  <Badge variant="outline">{selectedUser.department || selectedUser.industry}</Badge>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Additional Information</h4>
                <div className="space-y-2">
                  {selectedUser.type === "student" && (
                    <>
                      <p className="text-sm">
                        <span className="font-medium">Student ID:</span> ST{selectedUser.id}12345
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Year:</span> 3rd Year
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">GPA:</span> 3.8/4.0
                      </p>
                    </>
                  )}
                  {selectedUser.type === "supervisor" && (
                    <>
                      <p className="text-sm">
                        <span className="font-medium">Faculty ID:</span> FC{selectedUser.id}12345
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Specialization:</span> Artificial Intelligence
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Projects Supervised:</span> 12
                      </p>
                    </>
                  )}
                  {selectedUser.type === "recruiter" && (
                    <>
                      <p className="text-sm">
                        <span className="font-medium">Company ID:</span> CO{selectedUser.id}12345
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Industry:</span> {selectedUser.industry}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Projects Posted:</span> 5
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsProfileDialogOpen(false)
                    handleSendNotification(selectedUser)
                  }}
                >
                  Send Notification
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Notification Dialog */}
      <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>Send a notification to {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={selectedUser?.avatar} alt={selectedUser?.name} />
                <AvatarFallback>{selectedUser?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedUser?.name}</h3>
                <p className="text-sm text-gray-500">{selectedUser?.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="notification" className="text-sm font-medium">
                Notification Message
              </label>
              <textarea
                id="notification"
                className="w-full min-h-[100px] p-3 border rounded-md"
                placeholder="Type your notification message here..."
                value={notificationText}
                onChange={(e) => setNotificationText(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsNotificationDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={sendNotification} disabled={!notificationText.trim()}>
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}

