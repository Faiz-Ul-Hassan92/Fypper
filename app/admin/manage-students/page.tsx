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
const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Computer Science",
    year: "3rd Year",
    gpa: "3.8",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Electrical Engineering",
    year: "4th Year",
    gpa: "3.9",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    department: "Mechanical Engineering",
    year: "2nd Year",
    gpa: "3.5",
    status: "Inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "Computer Science",
    year: "3rd Year",
    gpa: "3.7",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    department: "Civil Engineering",
    year: "4th Year",
    gpa: "3.6",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const pendingStudents = [
  {
    id: 101,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    department: "Computer Science",
    year: "2nd Year",
    gpa: "3.4",
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 102,
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    department: "Electrical Engineering",
    year: "3rd Year",
    gpa: "3.8",
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ManageStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [notificationText, setNotificationText] = useState("")
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false)
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewProfile = (student: any) => {
    setSelectedStudent(student)
    setIsProfileDialogOpen(true)
  }

  const handleSendNotification = (student: any) => {
    setSelectedStudent(student)
    setIsNotificationDialogOpen(true)
  }

  const handleDeleteStudent = (id: number) => {
    // In a real application, this would make an API call to delete the student
    console.log(`Deleting student with ID: ${id}`)
    alert(`Student with ID ${id} has been removed.`)
  }

  const sendNotification = () => {
    // In a real application, this would send the notification to the student
    console.log(`Sending notification to ${selectedStudent.name}: ${notificationText}`)
    alert(`Notification sent to ${selectedStudent.name}`)
    setNotificationText("")
    setIsNotificationDialogOpen(false)
  }

  return (
    <AdminLayout activePage="manage-students">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Manage Students</h1>
          <div className="flex space-x-2">
            <Button onClick={() => setIsAddStudentDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" /> Add Student
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
                  placeholder="Search students..."
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
            <TabsTrigger value="active">Active Students</TabsTrigger>
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Students</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.year}</TableCell>
                        <TableCell>{student.gpa}</TableCell>
                        <TableCell>
                          <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewProfile(student)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleSendNotification(student)}>
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteStudent(student.id)}>
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
                <CardTitle>Pending Student Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.year}</TableCell>
                        <TableCell>{student.gpa}</TableCell>
                        <TableCell>
                          <Badge variant="warning">Pending</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewProfile(student)}>
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
              <DialogTitle>Student Profile</DialogTitle>
              <DialogDescription>Detailed information about the student</DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-4 py-4">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                    <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-center">{selectedStudent.name}</h3>
                  <p className="text-center text-gray-500">{selectedStudent.email}</p>
                  <div className="flex justify-center">
                    <Badge variant="outline">{selectedStudent.department}</Badge>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Student Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Student ID:</span> ST{selectedStudent.id}12345
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Year:</span> {selectedStudent.year}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">GPA:</span> {selectedStudent.gpa}/4.0
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span> {selectedStudent.status}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">FYP Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Project Title:</span> Smart IoT System for Healthcare
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Supervisor:</span> Dr. Robert Brown
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Team Members:</span> 3
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
                      handleSendNotification(selectedStudent)
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
              <DialogDescription>Send a notification to {selectedStudent?.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={selectedStudent?.avatar} alt={selectedStudent?.name} />
                  <AvatarFallback>{selectedStudent?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedStudent?.name}</h3>
                  <p className="text-sm text-gray-500">{selectedStudent?.email}</p>
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

        {/* Add Student Dialog */}
        <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter the details of the new student</DialogDescription>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium">
                    Year
                  </label>
                  <Input id="year" placeholder="Year" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="gpa" className="text-sm font-medium">
                    GPA
                  </label>
                  <Input id="gpa" placeholder="GPA" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddStudentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    alert("Student added successfully!")
                    setIsAddStudentDialogOpen(false)
                  }}
                >
                  Add Student
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

