"use client"

import { useState } from "react"
import { Search, Filter, Eye, Trash2, Bell, UserPlus, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminLayout from "../components/admin-layout"

// Mock data for demonstration
const supervisors = [
  {
    id: 1,
    name: "Dr. Robert Brown",
    email: "robert.brown@example.com",
    department: "Computer Science",
    specialization: "Artificial Intelligence",
    projects: 12,
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@example.com",
    department: "Electrical Engineering",
    specialization: "Embedded Systems",
    projects: 8,
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Dr. James Miller",
    email: "james.miller@example.com",
    department: "Mechanical Engineering",
    specialization: "Robotics",
    projects: 5,
    status: "Inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    email: "emily.davis@example.com",
    department: "Computer Science",
    specialization: "Machine Learning",
    projects: 10,
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const pendingSupervisors = [
  {
    id: 101,
    name: "Dr. Michael Johnson",
    email: "michael.johnson@example.com",
    department: "Computer Science",
    specialization: "Cybersecurity",
    projects: 0,
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 102,
    name: "Dr. Lisa Thompson",
    email: "lisa.thompson@example.com",
    department: "Electrical Engineering",
    specialization: "Power Systems",
    projects: 0,
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ManageSupervisorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSupervisor, setSelectedSupervisor] = useState<any>(null)
  const [notificationText, setNotificationText] = useState("")
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false)
  const [isAddSupervisorDialogOpen, setIsAddSupervisorDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  const filteredSupervisors = supervisors.filter(
    (supervisor) =>
      supervisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supervisor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supervisor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supervisor.specialization.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewProfile = (supervisor: any) => {
    setSelectedSupervisor(supervisor)
    setIsProfileDialogOpen(true)
  }

  const handleSendNotification = (supervisor: any) => {
    setSelectedSupervisor(supervisor)
    setIsNotificationDialogOpen(true)
  }

  const handleDeleteSupervisor = (id: number) => {
    // In a real application, this would make an API call to delete the supervisor
    console.log(`Deleting supervisor with ID: ${id}`)
    alert(`Supervisor with ID ${id} has been removed.`)
  }

  const sendNotification = () => {
    // In a real application, this would send the notification to the supervisor
    console.log(`Sending notification to ${selectedSupervisor.name}: ${notificationText}`)
    alert(`Notification sent to ${selectedSupervisor.name}`)
    setNotificationText("")
    setIsNotificationDialogOpen(false)
  }

  return (
    <AdminLayout activePage="manage-supervisors">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Manage Supervisors</h1>
          <div className="flex space-x-2">
            <Button onClick={() => setIsAddSupervisorDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" /> Add Supervisor
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search supervisors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" /> Import
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">Active Supervisors</TabsTrigger>
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Supervisors</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSupervisors.map((supervisor) => (
                      <TableRow key={supervisor.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={supervisor.avatar} alt={supervisor.name} />
                              <AvatarFallback>{supervisor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{supervisor.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{supervisor.email}</TableCell>
                        <TableCell>{supervisor.department}</TableCell>
                        <TableCell>{supervisor.specialization}</TableCell>
                        <TableCell>{supervisor.projects}</TableCell>
                        <TableCell>
                          <Badge variant={supervisor.status === "Active" ? "default" : "secondary"}>
                            {supervisor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewProfile(supervisor)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleSendNotification(supervisor)}>
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteSupervisor(supervisor.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Supervisor Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingSupervisors.map((supervisor) => (
                      <TableRow key={supervisor.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={supervisor.avatar} alt={supervisor.name} />
                              <AvatarFallback>{supervisor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{supervisor.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{supervisor.email}</TableCell>
                        <TableCell>{supervisor.department}</TableCell>
                        <TableCell>{supervisor.specialization}</TableCell>
                        <TableCell>
                          <Badge variant="warning">Pending</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewProfile(supervisor)}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button size="sm" variant="default">
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Profile View Dialog */}
        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Supervisor Profile</DialogTitle>
              <DialogDescription>Detailed information about the supervisor</DialogDescription>
            </DialogHeader>
            {selectedSupervisor && (
              <div className="space-y-4 py-4">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedSupervisor.avatar} alt={selectedSupervisor.name} />
                    <AvatarFallback>{selectedSupervisor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-center">{selectedSupervisor.name}</h3>
                  <p className="text-center text-gray-500">{selectedSupervisor.email}</p>
                  <div className="flex justify-center">
                    <Badge variant="outline">{selectedSupervisor.department}</Badge>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Supervisor Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Faculty ID:</span> FC{selectedSupervisor.id}12345
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Department:</span> {selectedSupervisor.department}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Specialization:</span> {selectedSupervisor.specialization}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span> {selectedSupervisor.status}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Project Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Projects Supervised:</span> {selectedSupervisor.projects}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Active Projects:</span>{" "}
                      {Math.floor(selectedSupervisor.projects * 0.6)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Completed Projects:</span>{" "}
                      {Math.floor(selectedSupervisor.projects * 0.4)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setIsProfileDialogOpen(false)
                      handleSendNotification(selectedSupervisor)
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
              <DialogDescription>Send a notification to {selectedSupervisor?.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={selectedSupervisor?.avatar} alt={selectedSupervisor?.name} />
                  <AvatarFallback>{selectedSupervisor?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedSupervisor?.name}</h3>
                  <p className="text-sm text-gray-500">{selectedSupervisor?.email}</p>
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

        {/* Add Supervisor Dialog */}
        <Dialog open={isAddSupervisorDialogOpen} onOpenChange={setIsAddSupervisorDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Supervisor</DialogTitle>
              <DialogDescription>Enter the details of the new supervisor</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="First Name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Last Name" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">
                  Department
                </label>
                <Input id="department" placeholder="Department" />
              </div>
              <div className="space-y-2">
                <label htmlFor="specialization" className="text-sm font-medium">
                  Specialization
                </label>
                <Input id="specialization" placeholder="Specialization" />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddSupervisorDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    alert("Supervisor added successfully!")
                    setIsAddSupervisorDialogOpen(false)
                  }}
                >
                  Add Supervisor
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

