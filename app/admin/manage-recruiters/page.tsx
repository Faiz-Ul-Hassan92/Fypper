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
const recruiters = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    email: "hr@techsolutions.com",
    industry: "Software Development",
    projects: 5,
    employees: 250,
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Global Innovations",
    email: "careers@globalinnovations.com",
    industry: "IT Consulting",
    projects: 3,
    employees: 120,
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Future Systems",
    email: "recruitment@futuresystems.com",
    industry: "Cybersecurity",
    projects: 2,
    employees: 85,
    status: "Inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Digital Dynamics",
    email: "jobs@digitaldynamics.com",
    industry: "AI & Machine Learning",
    projects: 7,
    employees: 180,
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const pendingRecruiters = [
  {
    id: 101,
    name: "Quantum Computing Ltd.",
    email: "info@quantumcomputing.com",
    industry: "Quantum Technology",
    projects: 0,
    employees: 45,
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 102,
    name: "Smart Solutions",
    email: "contact@smartsolutions.com",
    industry: "IoT",
    projects: 0,
    employees: 65,
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ManageRecruitersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecruiter, setSelectedRecruiter] = useState<any>(null)
  const [notificationText, setNotificationText] = useState("")
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false)
  const [isAddRecruiterDialogOpen, setIsAddRecruiterDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  const filteredRecruiters = recruiters.filter(
    (recruiter) =>
      recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewProfile = (recruiter: any) => {
    setSelectedRecruiter(recruiter)
    setIsProfileDialogOpen(true)
  }

  const handleSendNotification = (recruiter: any) => {
    setSelectedRecruiter(recruiter)
    setIsNotificationDialogOpen(true)
  }

  const handleDeleteRecruiter = (id: number) => {
    // In a real application, this would make an API call to delete the recruiter
    console.log(`Deleting recruiter with ID: ${id}`)
    alert(`Recruiter with ID ${id} has been removed.`)
  }

  const sendNotification = () => {
    // In a real application, this would send the notification to the recruiter
    console.log(`Sending notification to ${selectedRecruiter.name}: ${notificationText}`)
    alert(`Notification sent to ${selectedRecruiter.name}`)
    setNotificationText("")
    setIsNotificationDialogOpen(false)
  }

  return (
    <AdminLayout activePage="manage-recruiters">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Manage Recruiters</h1>
          <div className="flex space-x-2">
            <Button onClick={() => setIsAddRecruiterDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" /> Add Recruiter
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
                  placeholder="Search recruiters..."
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
            <TabsTrigger value="active">Active Recruiters</TabsTrigger>
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Recruiters</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecruiters.map((recruiter) => (
                      <TableRow key={recruiter.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={recruiter.avatar} alt={recruiter.name} />
                              <AvatarFallback>{recruiter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{recruiter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{recruiter.email}</TableCell>
                        <TableCell>{recruiter.industry}</TableCell>
                        <TableCell>{recruiter.projects}</TableCell>
                        <TableCell>{recruiter.employees}</TableCell>
                        <TableCell>
                          <Badge variant={recruiter.status === "Active" ? "default" : "secondary"}>
                            {recruiter.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewProfile(recruiter)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleSendNotification(recruiter)}>
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteRecruiter(recruiter.id)}>
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
                <CardTitle>Pending Recruiter Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRecruiters.map((recruiter) => (
                      <TableRow key={recruiter.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={recruiter.avatar} alt={recruiter.name} />
                              <AvatarFallback>{recruiter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{recruiter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{recruiter.email}</TableCell>
                        <TableCell>{recruiter.industry}</TableCell>
                        <TableCell>{recruiter.employees}</TableCell>
                        <TableCell>
                          <Badge variant="warning">Pending</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewProfile(recruiter)}>
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
              <DialogTitle>Recruiter Profile</DialogTitle>
              <DialogDescription>Detailed information about the recruiter</DialogDescription>
            </DialogHeader>
            {selectedRecruiter && (
              <div className="space-y-4 py-4">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedRecruiter.avatar} alt={selectedRecruiter.name} />
                    <AvatarFallback>{selectedRecruiter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-center">{selectedRecruiter.name}</h3>
                  <p className="text-center text-gray-500">{selectedRecruiter.email}</p>
                  <div className="flex justify-center">
                    <Badge variant="outline">{selectedRecruiter.industry}</Badge>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Company Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Company ID:</span> CO{selectedRecruiter.id}12345
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Industry:</span> {selectedRecruiter.industry}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Employees:</span> {selectedRecruiter.employees}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span> {selectedRecruiter.status}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Project Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Projects Posted:</span> {selectedRecruiter.projects}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Active Projects:</span>{" "}
                      {Math.floor(selectedRecruiter.projects * 0.7)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Completed Projects:</span>{" "}
                      {Math.floor(selectedRecruiter.projects * 0.3)}
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
                      handleSendNotification(selectedRecruiter)
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
              <DialogDescription>Send a notification to {selectedRecruiter?.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={selectedRecruiter?.avatar} alt={selectedRecruiter?.name} />
                  <AvatarFallback>{selectedRecruiter?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedRecruiter?.name}</h3>
                  <p className="text-sm text-gray-500">{selectedRecruiter?.email}</p>
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

        {/* Add Recruiter Dialog */}
        <Dialog open={isAddRecruiterDialogOpen} onOpenChange={setIsAddRecruiterDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Recruiter</DialogTitle>
              <DialogDescription>Enter the details of the new recruiter</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium">
                  Company Name
                </label>
                <Input id="companyName" placeholder="Company Name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium">
                  Industry
                </label>
                <Input id="industry" placeholder="Industry" />
              </div>
              <div className="space-y-2">
                <label htmlFor="employees" className="text-sm font-medium">
                  Number of Employees
                </label>
                <Input id="employees" type="number" placeholder="Number of Employees" />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddRecruiterDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    alert("Recruiter added successfully!")
                    setIsAddRecruiterDialogOpen(false)
                  }}
                >
                  Add Recruiter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

