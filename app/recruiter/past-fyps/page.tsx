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
  Calendar,
  User,
  Download,
  ExternalLink,
  Filter,
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Types
interface Student {
  id: string
  name: string
  avatar: string
  degree: string
}

interface Supervisor {
  id: string
  name: string
  department: string
  avatar: string
}

interface PastProject {
  id: string
  title: string
  domain: string
  description: string
  year: string
  semester: string
  students: Student[]
  supervisor: Supervisor
  companyName: string
  companyLogo: string
  tags: string[]
  grade: string
  reportUrl?: string
  demoUrl?: string
}

// Mock data
const currentUser = {
  id: "user1",
  name: "Jane Smith",
  email: "jane.smith@techcorp.com",
  companyName: "TechCorp Solutions",
  companyLogo: "/placeholder.svg?height=40&width=40",
}

const mockPastProjects: PastProject[] = [
  {
    id: "proj1",
    title: "AI-Powered Customer Service Chatbot",
    domain: "Artificial Intelligence",
    description:
      "Developed an intelligent chatbot that handles customer service inquiries using natural language processing and machine learning. The chatbot was able to understand customer queries, provide relevant responses, and escalate complex issues to human agents when necessary.",
    year: "2023",
    semester: "Spring",
    students: [
      {
        id: "stud1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        degree: "BS Computer Science",
      },
      {
        id: "stud2",
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        degree: "BS Artificial Intelligence",
      },
    ],
    supervisor: {
      id: "sup1",
      name: "Dr. Robert Chen",
      department: "Computer Science",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    companyName: "TechCorp Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    tags: ["NLP", "Machine Learning", "Python", "API Integration"],
    grade: "A",
    reportUrl: "#",
    demoUrl: "#",
  },
  {
    id: "proj2",
    title: "Blockchain-based Supply Chain Tracking",
    domain: "Blockchain",
    description:
      "Created a blockchain solution for tracking products through a supply chain. The system provided transparency, traceability, and security for all stakeholders involved in the supply chain process.",
    year: "2022",
    semester: "Fall",
    students: [
      {
        id: "stud3",
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        degree: "BS Software Engineering",
      },
      {
        id: "stud4",
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        degree: "BS Computer Science",
      },
      {
        id: "stud5",
        name: "David Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        degree: "BS Information Technology",
      },
    ],
    supervisor: {
      id: "sup2",
      name: "Prof. Sarah Johnson",
      department: "Software Engineering",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    companyName: "TechCorp Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    tags: ["Blockchain", "Smart Contracts", "Web Development", "Database Design"],
    grade: "A-",
    reportUrl: "#",
  },
  {
    id: "proj3",
    title: "Mobile Health Monitoring Application",
    domain: "Mobile Development",
    description:
      "Developed a mobile application that connects to wearable devices to monitor health metrics such as heart rate, sleep patterns, and activity levels. The app provided insights and recommendations based on the collected data.",
    year: "2022",
    semester: "Spring",
    students: [
      {
        id: "stud6",
        name: "Sophia Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        degree: "BS Mobile Computing",
      },
      {
        id: "stud7",
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        degree: "BS Health Informatics",
      },
    ],
    supervisor: {
      id: "sup3",
      name: "Dr. James Wilson",
      department: "Artificial Intelligence",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    companyName: "TechCorp Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    tags: ["Mobile Development", "IoT", "Data Visualization", "Health Informatics"],
    grade: "B+",
    reportUrl: "#",
    demoUrl: "#",
  },
]

export default function PastFYPsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null)

  // Navigation handlers
  const navigateTo = (path: string) => {
    router.push(path)
  }

  // Filter projects based on search query and filters
  const filteredProjects = mockPastProjects.filter((project) => {
    // Search filter
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.students.some((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.supervisor.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Year filter
    const matchesYear = !selectedYear || project.year === selectedYear

    // Domain filter
    const matchesDomain = !selectedDomain || project.domain === selectedDomain

    // Grade filter
    const matchesGrade = !selectedGrade || project.grade === selectedGrade

    return matchesSearch && matchesYear && matchesDomain && matchesGrade
  })

  // Get unique values for filters
  const years = Array.from(new Set(mockPastProjects.map((p) => p.year)))
  const domains = Array.from(new Set(mockPastProjects.map((p) => p.domain)))
  const grades = Array.from(new Set(mockPastProjects.map((p) => p.grade)))

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
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/applications")}
                >
                  <Users className="h-5 w-5" />
                  <span>Student Applications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center space-x-2 text-blue-700" isActive>
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
              <h1 className="text-2xl font-bold text-blue-800">Past FYPs Offered</h1>
              <p className="text-blue-600">{currentUser.companyName}</p>
            </div>
            <SidebarTrigger className="md:hidden" />
          </header>

          {/* Search and Filters */}
          <div className="bg-white p-4 border-b border-blue-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                <Input
                  placeholder="Search past projects..."
                  className="pl-10 border-blue-200 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select onValueChange={(value) => setSelectedYear(value === "all" ? null : value)}>
                  <SelectTrigger className="w-[120px] border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setSelectedDomain(value === "all" ? null : value)}>
                  <SelectTrigger className="w-[180px] border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setSelectedGrade(value === "all" ? null : value)}>
                  <SelectTrigger className="w-[120px] border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-700"
                  onClick={() => {
                    setSelectedYear(null)
                    setSelectedDomain(null)
                    setSelectedGrade(null)
                    setSearchQuery("")
                  }}
                >
                  <Filter className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="flex-1 overflow-auto bg-white p-6">
            <div className="space-y-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <Card key={project.id} className="border-blue-200 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={project.companyLogo} alt={project.companyName} />
                            <AvatarFallback>{project.companyName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl text-blue-800">{project.title}</CardTitle>
                            <div className="flex items-center text-sm text-blue-600">
                              <Calendar className="h-4 w-4 mr-1" /> {project.semester} {project.year}
                              <Badge className="ml-2 bg-green-100 text-green-800">Grade: {project.grade}</Badge>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-blue-50 text-blue-700">{project.domain}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-800 mb-4">{project.description}</p>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="team">
                          <AccordionTrigger className="text-blue-700">Team Members</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-blue-600" />
                                <span className="font-medium text-blue-700">Supervisor:</span>
                              </div>
                              <div className="flex items-center ml-6 mb-2">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={project.supervisor.avatar} alt={project.supervisor.name} />
                                  <AvatarFallback>{project.supervisor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{project.supervisor.name}</p>
                                  <p className="text-xs text-blue-600">{project.supervisor.department}</p>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-blue-600" />
                                <span className="font-medium text-blue-700">Students:</span>
                              </div>
                              <div className="space-y-2 ml-6">
                                {project.students.map((student) => (
                                  <div key={student.id} className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage src={student.avatar} alt={student.name} />
                                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm font-medium">{student.name}</p>
                                      <p className="text-xs text-blue-600">{student.degree}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-blue-100 pt-4">
                      <div className="text-sm text-blue-600">{project.companyName}</div>
                      <div className="flex space-x-2">
                        {project.reportUrl && (
                          <Button variant="outline" size="sm" className="text-blue-700">
                            <Download className="mr-1 h-4 w-4" /> Report
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button variant="outline" size="sm" className="text-blue-700">
                            <ExternalLink className="mr-1 h-4 w-4" /> Demo
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <History className="mx-auto h-12 w-12 text-blue-300 mb-4" />
                  <h3 className="text-xl font-medium text-blue-800 mb-2">No projects found</h3>
                  <p className="text-blue-600 max-w-md mx-auto">
                    No past projects match your search criteria. Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

