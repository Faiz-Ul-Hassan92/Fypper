"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  MessageSquare,
  Users,
  History,
  FileText,
  Search,
  Building,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  User,
  GraduationCap,
  Download,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

// Types
interface Student {
  id: string
  name: string
  avatar: string
  degree: string
  semester: number
  gpa: number
  skills: { name: string; proficiency: string }[]
  projects: { title: string; description: string }[]
  resumeUrl?: string
}

interface Application {
  id: string
  projectId: string
  projectTitle: string
  student: Student
  status: "pending" | "approved" | "rejected"
  appliedDate: string
  coverLetter: string
}

// Mock data
const currentUser = {
  id: "user1",
  name: "Jane Smith",
  email: "jane.smith@techcorp.com",
  companyName: "TechCorp Solutions",
  companyLogo: "/placeholder.svg?height=40&width=40",
}

const mockApplications: Application[] = [
  {
    id: "app1",
    projectId: "proj1",
    projectTitle: "AI-Powered Customer Service Chatbot",
    student: {
      id: "stud1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      degree: "BS Computer Science",
      semester: 7,
      gpa: 3.8,
      skills: [
        { name: "Python", proficiency: "Advanced" },
        { name: "Machine Learning", proficiency: "Intermediate" },
        { name: "NLP", proficiency: "Intermediate" },
        { name: "JavaScript", proficiency: "Advanced" },
      ],
      projects: [
        {
          title: "Sentiment Analysis Tool",
          description: "Built a tool that analyzes sentiment in customer reviews using NLP techniques.",
        },
        {
          title: "Personal Portfolio Website",
          description: "Designed and developed a responsive portfolio website using React and Next.js.",
        },
      ],
      resumeUrl: "#",
    },
    status: "pending",
    appliedDate: "October 15, 2023",
    coverLetter:
      "I am excited to apply for the AI-Powered Customer Service Chatbot project. My background in NLP and machine learning makes me well-suited for this project. I have experience building chatbots and working with various NLP libraries such as NLTK and spaCy. I am particularly interested in improving customer service experiences through AI solutions.",
  },
  {
    id: "app2",
    projectId: "proj1",
    projectTitle: "AI-Powered Customer Service Chatbot",
    student: {
      id: "stud2",
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      degree: "BS Artificial Intelligence",
      semester: 6,
      gpa: 3.9,
      skills: [
        { name: "Python", proficiency: "Advanced" },
        { name: "TensorFlow", proficiency: "Advanced" },
        { name: "NLP", proficiency: "Advanced" },
        { name: "Data Analysis", proficiency: "Intermediate" },
      ],
      projects: [
        {
          title: "Virtual Assistant",
          description: "Developed a virtual assistant that can perform various tasks through voice commands.",
        },
      ],
      resumeUrl: "#",
    },
    status: "approved",
    appliedDate: "October 12, 2023",
    coverLetter:
      "I am applying for the AI-Powered Customer Service Chatbot project because it aligns perfectly with my academic focus and professional goals. I have been studying AI and NLP techniques, and I have built several chatbots for different purposes. I believe my experience with TensorFlow and deep learning models would be valuable for developing an intelligent chatbot that can understand and respond to customer inquiries effectively.",
  },
  {
    id: "app3",
    projectId: "proj2",
    projectTitle: "Blockchain-based Supply Chain Tracking",
    student: {
      id: "stud3",
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      degree: "BS Software Engineering",
      semester: 8,
      gpa: 3.5,
      skills: [
        { name: "Blockchain", proficiency: "Intermediate" },
        { name: "Solidity", proficiency: "Beginner" },
        { name: "JavaScript", proficiency: "Advanced" },
        { name: "React", proficiency: "Advanced" },
      ],
      projects: [
        {
          title: "Cryptocurrency Wallet",
          description: "Built a secure wallet application for managing various cryptocurrencies.",
        },
      ],
      resumeUrl: "#",
    },
    status: "rejected",
    appliedDate: "October 10, 2023",
    coverLetter:
      "I am interested in the Blockchain-based Supply Chain Tracking project because I want to gain more experience with blockchain technology. I have been learning about blockchain and smart contracts, and I have built a simple cryptocurrency wallet. I am eager to apply my software engineering skills to develop a solution that can enhance transparency and security in supply chains.",
  },
  {
    id: "app4",
    projectId: "proj3",
    projectTitle: "Mobile Health Monitoring Application",
    student: {
      id: "stud4",
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      degree: "BS Computer Science",
      semester: 7,
      gpa: 3.7,
      skills: [
        { name: "Flutter", proficiency: "Advanced" },
        { name: "Firebase", proficiency: "Intermediate" },
        { name: "UI/UX Design", proficiency: "Advanced" },
        { name: "Data Visualization", proficiency: "Intermediate" },
      ],
      projects: [
        {
          title: "Fitness Tracker App",
          description: "Developed a mobile app that tracks workouts and provides fitness analytics.",
        },
      ],
      resumeUrl: "#",
    },
    status: "pending",
    appliedDate: "October 14, 2023",
    coverLetter:
      "I am applying for the Mobile Health Monitoring Application project because I am passionate about using technology to improve healthcare. I have experience developing mobile applications with Flutter and integrating them with wearable devices. My previous project, a fitness tracker app, gave me insights into collecting and visualizing health data. I am excited about the opportunity to work on a project that can make a positive impact on people's health.",
  },
  {
    id: "app5",
    projectId: "proj5",
    projectTitle: "Cybersecurity Vulnerability Assessment Tool",
    student: {
      id: "stud5",
      name: "David Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      degree: "BS Information Technology",
      semester: 8,
      gpa: 3.6,
      skills: [
        { name: "Network Security", proficiency: "Advanced" },
        { name: "Python", proficiency: "Advanced" },
        { name: "Penetration Testing", proficiency: "Intermediate" },
        { name: "Risk Assessment", proficiency: "Intermediate" },
      ],
      projects: [
        {
          title: "Security Audit Tool",
          description: "Created a tool that performs security audits on web applications.",
        },
      ],
      resumeUrl: "#",
    },
    status: "pending",
    appliedDate: "October 13, 2023",
    coverLetter:
      "I am interested in the Cybersecurity Vulnerability Assessment Tool project because cybersecurity is my primary area of focus. I have experience with penetration testing and security auditing, and I have developed tools to automate security assessments. I am passionate about identifying and addressing security vulnerabilities to protect systems and data from potential threats.",
  },
]

export default function ApplicationsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [projectFilter, setProjectFilter] = useState<string | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [studentDetailsOpen, setStudentDetailsOpen] = useState(false)
  const [applications, setApplications] = useState<Application[]>(mockApplications)

  // Navigation handlers
  const navigateTo = (path: string) => {
    router.push(path)
  }

  // Filter applications based on search query and filters
  const filteredApplications = applications.filter((app) => {
    // Search filter
    const matchesSearch =
      app.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.student.skills.some((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))

    // Status filter
    const matchesStatus = !statusFilter || app.status === statusFilter

    // Project filter
    const matchesProject = !projectFilter || app.projectId === projectFilter

    return matchesSearch && matchesStatus && matchesProject
  })

  // Get unique projects for filter
  const projects = Array.from(
    new Set(applications.map((app) => ({ id: app.projectId, title: app.projectTitle }))),
  ).reduce(
    (acc, curr) => {
      acc[curr.id] = curr.title
      return acc
    },
    {} as Record<string, string>,
  )

  // Handle application status change
  const handleStatusChange = (applicationId: string, newStatus: "approved" | "rejected") => {
    const updatedApplications = applications.map((app) =>
      app.id === applicationId ? { ...app, status: newStatus } : app,
    )
    setApplications(updatedApplications)

    if (selectedApplication?.id === applicationId) {
      setSelectedApplication({ ...selectedApplication, status: newStatus })
    }
  }

  // Count applications by status
  const pendingCount = applications.filter((app) => app.status === "pending").length
  const approvedCount = applications.filter((app) => app.status === "approved").length
  const rejectedCount = applications.filter((app) => app.status === "rejected").length

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Sidebar */}
        <Sidebar className="border-r border-blue-200">
          <SidebarHeader className="border-b border-blue-200 p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-800">FYP Connect</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/dashboard")}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/chat")}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center space-x-2 text-blue-700" isActive>
                  <Users className="h-5 w-5" />
                  <span>Student Applications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/past-fyps")}
                >
                  <History className="h-5 w-5" />
                  <span>Past FYPs Offered</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/projects")}
                >
                  <FileText className="h-5 w-5" />
                  <span>Post Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-blue-200 p-4">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={currentUser.companyLogo} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-blue-800">{currentUser.name}</p>
                <p className="text-xs text-blue-600">Recruiter</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-blue-800">Student Applications</h1>
              <p className="text-blue-600">{currentUser.companyName}</p>
            </div>
            <SidebarTrigger className="md:hidden" />
          </header>

          {/* Tabs and Filters */}
          <div className="bg-white p-4 border-b border-blue-200">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <TabsList>
                  <TabsTrigger value="all">
                    All <Badge className="ml-2 bg-gray-100 text-gray-800">{applications.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending <Badge className="ml-2 bg-yellow-100 text-yellow-800">{pendingCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="approved">
                    Approved <Badge className="ml-2 bg-green-100 text-green-800">{approvedCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="rejected">
                    Rejected <Badge className="ml-2 bg-red-100 text-red-800">{rejectedCount}</Badge>
                  </TabsTrigger>
                </TabsList>

                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                    <Input
                      placeholder="Search applications..."
                      className="pl-10 border-blue-200 focus:border-blue-500 w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Select onValueChange={(value) => setProjectFilter(value === "all" ? null : value)}>
                    <SelectTrigger className="w-[180px] border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Filter by Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      {Object.entries(projects).map(([id, title]) => (
                        <SelectItem key={id} value={id}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-700"
                    onClick={() => {
                      setStatusFilter(null)
                      setProjectFilter(null)
                      setSearchQuery("")
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <ApplicationsList
                  applications={filteredApplications}
                  onSelect={setSelectedApplication}
                  onStatusChange={handleStatusChange}
                  onViewDetails={() => setStudentDetailsOpen(true)}
                />
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                <ApplicationsList
                  applications={filteredApplications.filter((app) => app.status === "pending")}
                  onSelect={setSelectedApplication}
                  onStatusChange={handleStatusChange}
                  onViewDetails={() => setStudentDetailsOpen(true)}
                />
              </TabsContent>

              <TabsContent value="approved" className="mt-0">
                <ApplicationsList
                  applications={filteredApplications.filter((app) => app.status === "approved")}
                  onSelect={setSelectedApplication}
                  onStatusChange={handleStatusChange}
                  onViewDetails={() => setStudentDetailsOpen(true)}
                />
              </TabsContent>

              <TabsContent value="rejected" className="mt-0">
                <ApplicationsList
                  applications={filteredApplications.filter((app) => app.status === "rejected")}
                  onSelect={setSelectedApplication}
                  onStatusChange={handleStatusChange}
                  onViewDetails={() => setStudentDetailsOpen(true)}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Application Details */}
          <div className="flex-1 overflow-auto bg-white">
            {selectedApplication ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-800">{selectedApplication.projectTitle}</h2>
                    <div className="flex items-center mt-1">
                      <p className="text-blue-600">Application from</p>
                      <Button variant="link" className="px-1 text-blue-700" onClick={() => setStudentDetailsOpen(true)}>
                        {selectedApplication.student.name}
                      </Button>
                      <p className="text-blue-600">on {selectedApplication.appliedDate}</p>
                    </div>
                  </div>
                  <ApplicationStatusBadge status={selectedApplication.status} />
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">Cover Letter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-800 whitespace-pre-line">{selectedApplication.coverLetter}</p>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">Student Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-800 mr-2">Degree:</span>
                        <span>{selectedApplication.student.degree}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-800 mr-2">Semester:</span>
                        <span>{selectedApplication.student.semester}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-800 mr-2">GPA:</span>
                        <span>{selectedApplication.student.gpa.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium text-blue-700 mb-2">Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.student.skills.map((skill, index) => (
                          <Badge key={index} className="bg-blue-50 text-blue-800">
                            {skill.name} ({skill.proficiency})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 border-t border-blue-100 pt-4">
                    <Button variant="outline" className="text-blue-700" onClick={() => setStudentDetailsOpen(true)}>
                      <User className="mr-2 h-4 w-4" /> View Full Profile
                    </Button>
                    {selectedApplication.student.resumeUrl && (
                      <Button variant="outline" className="text-blue-700">
                        <Download className="mr-2 h-4 w-4" /> Download Resume
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                {selectedApplication.status === "pending" && (
                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleStatusChange(selectedApplication.id, "rejected")}
                    >
                      <XCircle className="mr-2 h-4 w-4" /> Reject Application
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleStatusChange(selectedApplication.id, "approved")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" /> Approve Application
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <Users className="mx-auto h-12 w-12 text-blue-300 mb-4" />
                  <h3 className="text-xl font-medium text-blue-800 mb-2">No application selected</h3>
                  <p className="text-blue-600 max-w-md">Select an application from the list to view details.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Details Dialog */}
      {selectedApplication && (
        <Dialog open={studentDetailsOpen} onOpenChange={setStudentDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Student Profile</DialogTitle>
              <DialogDescription>Detailed information about {selectedApplication.student.name}</DialogDescription>
            </DialogHeader>

            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedApplication.student.avatar} alt={selectedApplication.student.name} />
                <AvatarFallback>{selectedApplication.student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold text-blue-800">{selectedApplication.student.name}</h3>
                <p className="text-blue-600">{selectedApplication.student.degree}</p>
                <div className="flex items-center mt-1">
                  <GraduationCap className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm">
                    Semester {selectedApplication.student.semester} • GPA: {selectedApplication.student.gpa.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.student.skills.map((skill, index) => (
                      <Badge key={index} className="bg-blue-50 text-blue-800">
                        {skill.name} ({skill.proficiency})
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Projects:</h4>
                  <div className="space-y-3">
                    {selectedApplication.student.projects.map((project, index) => (
                      <div key={index} className="border border-blue-100 rounded-md p-3">
                        <h5 className="font-medium text-blue-800">{project.title}</h5>
                        <p className="text-sm text-blue-600 mt-1">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="flex justify-between items-center">
              <Button variant="outline" className="text-blue-700">
                <Mail className="mr-2 h-4 w-4" /> Contact Student
              </Button>
              <div className="space-x-2">
                {selectedApplication.student.resumeUrl && (
                  <Button variant="outline" className="text-blue-700">
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </Button>
                )}
                <Button onClick={() => setStudentDetailsOpen(false)}>Close</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </SidebarProvider>
  )
}

// Helper Components
function ApplicationStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 flex items-center">
          <Clock className="mr-1 h-4 w-4" /> Pending
        </Badge>
      )
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center">
          <CheckCircle className="mr-1 h-4 w-4" /> Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 flex items-center">
          <XCircle className="mr-1 h-4 w-4" /> Rejected
        </Badge>
      )
    default:
      return null
  }
}

function ApplicationsList({
  applications,
  onSelect,
  onStatusChange,
  onViewDetails,
}: {
  applications: Application[]
  onSelect: (app: Application) => void
  onStatusChange: (id: string, status: "approved" | "rejected") => void
  onViewDetails: () => void
}) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-blue-300 mb-4" />
        <h3 className="text-xl font-medium text-blue-800 mb-2">No applications found</h3>
        <p className="text-blue-600 max-w-md mx-auto">
          No applications match your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card
          key={application.id}
          className="border-blue-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelect(application)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={application.student.avatar} alt={application.student.name} />
                  <AvatarFallback>{application.student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-blue-800">{application.student.name}</h3>
                  <p className="text-sm text-blue-600">{application.student.degree}</p>
                  <div className="flex items-center mt-1">
                    <GraduationCap className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-xs">GPA: {application.student.gpa.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ApplicationStatusBadge status={application.status} />
                <span className="text-xs text-blue-500">{application.appliedDate}</span>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm font-medium text-blue-700">Applied for: {application.projectTitle}</p>
              <p className="text-sm text-blue-600 line-clamp-2 mt-1">{application.coverLetter}</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {application.student.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {skill.name}
                </Badge>
              ))}
              {application.student.skills.length > 3 && (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  +{application.student.skills.length - 3} more
                </Badge>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Button
                variant="link"
                className="p-0 h-auto text-blue-700"
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetails()
                }}
              >
                View Full Profile
              </Button>

              {application.status === "pending" && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      onStatusChange(application.id, "rejected")
                    }}
                  >
                    <XCircle className="mr-1 h-4 w-4" /> Reject
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      onStatusChange(application.id, "approved")
                    }}
                  >
                    <CheckCircle className="mr-1 h-4 w-4" /> Approve
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

