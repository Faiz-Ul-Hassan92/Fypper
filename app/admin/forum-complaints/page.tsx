"use client"

import { useState } from "react"
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminLayout from "../components/admin-layout"

// Mock data for demonstration
const complaints = [
  {
    id: 1,
    title: "Inappropriate content in forum post",
    reporter: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reported: {
      name: "Tech Solutions Inc.",
      email: "hr@techsolutions.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    post: {
      id: 101,
      title: "Job Opportunities Discussion",
      content: "This post contained inappropriate content that violated community guidelines.",
    },
    date: "2023-05-15",
    status: "Pending",
    severity: "High",
    description: "The forum post contains offensive language and inappropriate content.",
  },
  {
    id: 2,
    title: "Spam content in forum",
    reporter: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reported: {
      name: "Global Innovations",
      email: "careers@globalinnovations.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    post: {
      id: 102,
      title: "Project Collaboration",
      content: "This post contained spam content promoting unrelated products.",
    },
    date: "2023-05-10",
    status: "Resolved",
    severity: "Medium",
    description: "The forum post is promoting unrelated products and services.",
  },
  {
    id: 3,
    title: "Harassment in comments",
    reporter: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reported: {
      name: "Dr. James Miller",
      email: "james.miller@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    post: {
      id: 103,
      title: "FYP Discussion Thread",
      content: "The comments section contained harassing messages.",
    },
    date: "2023-05-05",
    status: "Under Review",
    severity: "High",
    description: "The user is posting harassing comments targeting specific students.",
  },
  {
    id: 4,
    title: "Misleading information",
    reporter: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reported: {
      name: "Future Systems",
      email: "recruitment@futuresystems.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    post: {
      id: 104,
      title: "Career Advice Thread",
      content: "This post contained misleading information about job requirements.",
    },
    date: "2023-05-01",
    status: "Pending",
    severity: "Low",
    description: "The forum post contains misleading information about job requirements and qualifications.",
  },
]

export default function ForumComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.reporter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.reported.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredByStatus =
    activeTab === "all"
      ? filteredComplaints
      : filteredComplaints.filter((complaint) => complaint.status.toLowerCase() === activeTab.toLowerCase())

  const handleViewComplaint = (complaint: any) => {
    setSelectedComplaint(complaint)
    setIsComplaintDialogOpen(true)
  }

  const handleResolveComplaint = (id: number) => {
    // In a real application, this would make an API call to resolve the complaint
    console.log(`Resolving complaint with ID: ${id}`)
    alert(`Complaint with ID ${id} has been resolved.`)
  }

  const handleDismissComplaint = (id: number) => {
    // In a real application, this would make an API call to dismiss the complaint
    console.log(`Dismissing complaint with ID: ${id}`)
    alert(`Complaint with ID ${id} has been dismissed.`)
  }

  return (
    <AdminLayout activePage="forum-complaints">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Forum Complaints</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Complaints</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="under review">Under Review</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Forum Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead>Post</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredByStatus.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell>{complaint.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.reporter.avatar} alt={complaint.reporter.name} />
                              <AvatarFallback>{complaint.reporter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{complaint.reporter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.reported.avatar} alt={complaint.reported.name} />
                              <AvatarFallback>{complaint.reported.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{complaint.reported.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{complaint.post.title}</span>
                        </TableCell>
                        <TableCell>{complaint.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              complaint.status === "Pending"
                                ? "outline"
                                : complaint.status === "Under Review"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {complaint.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              complaint.severity === "High"
                                ? "destructive"
                                : complaint.severity === "Medium"
                                  ? "warning"
                                  : "outline"
                            }
                          >
                            {complaint.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewComplaint(complaint)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleResolveComplaint(complaint.id)}>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDismissComplaint(complaint.id)}>
                              <XCircle className="h-4 w-4 text-red-500" />
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
                <CardTitle>Pending Forum Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead>Post</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredByStatus.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell>{complaint.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.reporter.avatar} alt={complaint.reporter.name} />
                              <AvatarFallback>{complaint.reporter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{complaint.reporter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.reported.avatar} alt={complaint.reported.name} />
                              <AvatarFallback>{complaint.reported.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{complaint.reported.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{complaint.post.title}</span>
                        </TableCell>
                        <TableCell>{complaint.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              complaint.severity === "High"
                                ? "destructive"
                                : complaint.severity === "Medium"
                                  ? "warning"
                                  : "outline"
                            }
                          >
                            {complaint.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewComplaint(complaint)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleResolveComplaint(complaint.id)}>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDismissComplaint(complaint.id)}>
                              <XCircle className="h-4 w-4 text-red-500" />
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

          <TabsContent value="under review">
            <Card>
              <CardHeader>
                <CardTitle>Forum Complaints Under Review</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead>Post</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredByStatus.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell>{complaint.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.reporter.avatar} alt={complaint.reporter.name} />
                              <AvatarFallback>{complaint.reporter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{complaint.reporter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.reported.avatar} alt={complaint.reported.name} />
                              <AvatarFallback>{complaint.reported.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{complaint.reported.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{complaint.post.title}</span>
                        </TableCell>
                        <TableCell>{complaint.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              complaint.severity === "High"
                                ? "destructive"
                                : complaint.severity === "Medium"
                                  ? "warning"
                                  : "outline"
                            }
                          >
                            {complaint.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewComplaint(complaint)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleResolveComplaint(complaint.id)}>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDismissComplaint(complaint.id)}>
                              <XCircle className="h-4 w-4 text-red-500" />
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

          <TabsContent value="resolved">
            <Card>
              <CardHeader>
                <CardTitle>Resolved Forum Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead>Post</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredByStatus.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell>{complaint.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.reporter.avatar} alt={complaint.reporter.name} />
                              <AvatarFallback>{complaint.reporter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{complaint.reporter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={complaint.reported.avatar} alt={complaint.reported.name} />
                              <AvatarFallback>{complaint.reported.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{complaint.reported.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{complaint.post.title}</span>
                        </TableCell>
                        <TableCell>{complaint.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              complaint.severity === "High"
                                ? "destructive"
                                : complaint.severity === "Medium"
                                  ? "warning"
                                  : "outline"
                            }
                          >
                            {complaint.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewComplaint(complaint)}>
                              <Eye className="h-4 w-4" />
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

        {/* Complaint View Dialog */}
        <Dialog open={isComplaintDialogOpen} onOpenChange={setIsComplaintDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Forum Complaint Details</DialogTitle>
              <DialogDescription>Review the forum complaint information</DialogDescription>
            </DialogHeader>
            {selectedComplaint && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{selectedComplaint.title}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        selectedComplaint.status === "Pending"
                          ? "outline"
                          : selectedComplaint.status === "Under Review"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {selectedComplaint.status}
                    </Badge>
                    <Badge
                      variant={
                        selectedComplaint.severity === "High"
                          ? "destructive"
                          : selectedComplaint.severity === "Medium"
                            ? "warning"
                            : "outline"
                      }
                    >
                      {selectedComplaint.severity}
                    </Badge>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Reporter</h4>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={selectedComplaint.reporter.avatar} alt={selectedComplaint.reporter.name} />
                      <AvatarFallback>{selectedComplaint.reporter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedComplaint.reporter.name}</p>
                      <p className="text-sm text-gray-500">{selectedComplaint.reporter.email}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Reported</h4>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={selectedComplaint.reported.avatar} alt={selectedComplaint.reported.name} />
                      <AvatarFallback>{selectedComplaint.reported.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedComplaint.reported.name}</p>
                      <p className="text-sm text-gray-500">{selectedComplaint.reported.email}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Forum Post</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">{selectedComplaint.post.title}</p>
                    <p className="text-sm mt-1">{selectedComplaint.post.content}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm">{selectedComplaint.description}</p>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Date Reported</h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">{selectedComplaint.date}</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsComplaintDialogOpen(false)}>
                    Close
                  </Button>
                  {selectedComplaint.status !== "Resolved" && (
                    <>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          handleDismissComplaint(selectedComplaint.id)
                          setIsComplaintDialogOpen(false)
                        }}
                      >
                        Dismiss
                      </Button>
                      <Button
                        onClick={() => {
                          handleResolveComplaint(selectedComplaint.id)
                          setIsComplaintDialogOpen(false)
                        }}
                      >
                        Resolve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

