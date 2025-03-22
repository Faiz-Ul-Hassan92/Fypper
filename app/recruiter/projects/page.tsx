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
  Plus,
  Building,
  ChevronRight,
  Calendar,
  GraduationCap,
  Briefcase,
  Tag,
  X,
  Edit,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Types
interface Supervisor {
  id: string
  name: string
  department: string
  avatar: string
}

interface Project {
  id: string
  title: string
  domain: string
  gpaRequirement: number
  description: string
  skills: string[]
  duration: string
  deadline: string
  maxStudents: number
  collaboratingSupervisor?: Supervisor
  companyName: string
  companyLogo: string
  postedDate: string
}

// Mock data
const currentUser = {
  id: "user1",
  name: "Jane Smith",
  email: "jane.smith@techcorp.com",
  companyName: "TechCorp Solutions",
  companyLogo: "/placeholder.svg?height=40&width=40",
}

const mockSupervisors: Supervisor[] = [
  {
    id: "sup1",
    name: "Dr. Robert Chen",
    department: "Computer Science",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "sup2",
    name: "Prof. Sarah Johnson",
    department: "Software Engineering",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "sup3",
    name: "Dr. James Wilson",
    department: "Artificial Intelligence",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockProjects: Project[] = [
  {
    id: "proj1",
    title: "AI-Powered Customer Service Chatbot",
    domain: "Artificial Intelligence",
    gpaRequirement: 3.5,
    description:
      "Develop an intelligent chatbot that can handle customer service inquiries using natural language processing and machine learning. The chatbot should be able to understand customer queries, provide relevant responses, and escalate complex issues to human agents when necessary.",
    skills: ["Python", "NLP", "Machine Learning", "API Integration"],
    duration: "4-6 months",
    deadline: "December 15, 2023",
    maxStudents: 2,
    collaboratingSupervisor: mockSupervisors[0],
    companyName: "TechCorp Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    postedDate: "October 5, 2023",
  },
  {
    id: "proj2",
    title: "Blockchain-based Supply Chain Tracking",
    domain: "Blockchain",
    gpaRequirement: 3.2,
    description:
      "Create a blockchain solution for tracking products through a supply chain. The system should provide transparency, traceability, and security for all stakeholders involved in the supply chain process.",
    skills: ["Blockchain", "Smart Contracts", "Web Development", "Database Design"],
    duration: "5-7 months",
    deadline: "January 20, 2024",
    maxStudents: 3,
    companyName: "TechCorp Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    postedDate: "October 10, 2023",
  },
  {
    id: "proj3",
    title: "Mobile Health Monitoring Application",
    domain: "Mobile Development",
    gpaRequirement: 3.0,
    description:
      "Develop a mobile application that connects to wearable devices to monitor health metrics such as heart rate, sleep patterns, and activity levels. The app should provide insights and recommendations based on the collected data.",
    skills: ["Mobile Development", "IoT", "Data Visualization", "Health Informatics"],
    duration: "3-5 months",
    deadline: "November 30, 2023",
    maxStudents: 2,
    collaboratingSupervisor: mockSupervisors[1],
    companyName: "TechCorp Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    postedDate: "September 28, 2023",
  },
  {
    id: "proj4",
    title: "Cloud-based Enterprise Resource Planning System",
    domain: "Cloud Computing",
    gpaRequirement: 3.3,
    description:
      "Design and implement a cloud-based ERP system that integrates various business processes including inventory management, order processing, accounting, and human resources.",
    skills: ["Cloud Services", "Database Design", "API Development", "UI/UX Design"],
    duration: "6-8 months",
    deadline: "February 15, 2024",
    maxStudents: 4,
    companyName: "TechCorp Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    postedDate: "October 12, 2023",
  },
  {
    id: "proj5",
    title: "Cybersecurity Vulnerability Assessment Tool",
    domain: "Cybersecurity",
    gpaRequirement: 3.7,
    description:
      "Create a tool that can scan networks and systems to identify security vulnerabilities. The tool should provide detailed reports and recommendations for addressing identified issues.",
    skills: ["Network Security", "Penetration Testing", "Programming", "Risk Assessment"],
    duration: "4-6 months",
    deadline: "January 10, 2024",
    maxStudents: 2,
    collaboratingSupervisor: mockSupervisors[2],
    companyName: "TechCorp Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    postedDate: "October 3, 2023",
  },
  {
    id: "proj6",
    title: "Augmented Reality Educational Platform",
    domain: "AR/VR",
    gpaRequirement: 3.4,
    description:
      "Develop an augmented reality platform for educational purposes that can overlay digital information onto physical objects to enhance learning experiences.",
    skills: ["AR Development", "3D Modeling", "Mobile Development", "Educational Technology"],
    duration: "5-7 months",
    deadline: "December 20, 2023",
    maxStudents: 3,
    companyName: "TechCorp Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    postedDate: "September 25, 2023",
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false)
  const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false)
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  // Project form state
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: "",
    domain: "",
    gpaRequirement: 3.0,
    description: "",
    skills: [],
    duration: "",
    deadline: "",
    maxStudents: 2,
    companyName: currentUser.companyName,
    companyLogo: currentUser.companyLogo,
  })
  const [newSkill, setNewSkill] = useState("")
  const [selectedSupervisor, setSelectedSupervisor] = useState<string | null>(null)

  // Navigation handlers
  const navigateTo = (path: string) => {
    router.push(path)
  }

  // Filter projects based on search query
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle adding a new project
  const handleAddProject = () => {
    if (!projectForm.title || !projectForm.domain || !projectForm.description) {
      alert("Please fill in all required fields")
      return
    }

    const collaboratingSupervisor = selectedSupervisor
      ? mockSupervisors.find((sup) => sup.id === selectedSupervisor)
      : undefined

    const projectToAdd: Project = {
      id: `proj${Date.now()}`,
      title: projectForm.title || "",
      domain: projectForm.domain || "",
      gpaRequirement: projectForm.gpaRequirement || 3.0,
      description: projectForm.description || "",
      skills: projectForm.skills || [],
      duration: projectForm.duration || "",
      deadline: projectForm.deadline || "",
      maxStudents: projectForm.maxStudents || 2,
      collaboratingSupervisor,
      companyName: currentUser.companyName,
      companyLogo: currentUser.companyLogo,
      postedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    }

    setProjects([projectToAdd, ...projects])
    setNewProjectDialogOpen(false)

    // Reset form
    resetProjectForm()
  }

  // Handle editing a project
  const handleEditProject = () => {
    if (!selectedProject || !projectForm.title || !projectForm.domain || !projectForm.description) {
      alert("Please fill in all required fields")
      return
    }

    const collaboratingSupervisor = selectedSupervisor
      ? mockSupervisors.find((sup) => sup.id === selectedSupervisor)
      : undefined

    const updatedProject: Project = {
      ...selectedProject,
      title: projectForm.title,
      domain: projectForm.domain,
      gpaRequirement: projectForm.gpaRequirement || 3.0,
      description: projectForm.description,
      skills: projectForm.skills || [],
      duration: projectForm.duration || "",
      deadline: projectForm.deadline || "",
      maxStudents: projectForm.maxStudents || 2,
      collaboratingSupervisor,
    }

    setProjects(projects.map((p) => (p.id === selectedProject.id ? updatedProject : p)))
    setSelectedProject(updatedProject)
    setEditProjectDialogOpen(false)
  }

  // Handle deleting a project
  const handleDeleteProject = () => {
    if (!projectToDelete) return

    setProjects(projects.filter((p) => p.id !== projectToDelete.id))

    if (selectedProject?.id === projectToDelete.id) {
      setSelectedProject(null)
    }

    setProjectToDelete(null)
    setDeleteAlertOpen(false)
  }

  // Initialize edit form with selected project data
  const initEditForm = (project: Project) => {
    setProjectForm({
      title: project.title,
      domain: project.domain,
      gpaRequirement: project.gpaRequirement,
      description: project.description,
      skills: [...project.skills],
      duration: project.duration,
      deadline: project.deadline,
      maxStudents: project.maxStudents,
      companyName: project.companyName,
      companyLogo: project.companyLogo,
    })

    setSelectedSupervisor(project.collaboratingSupervisor?.id || null)
    setEditProjectDialogOpen(true)
  }

  // Reset project form
  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      domain: "",
      gpaRequirement: 3.0,
      description: "",
      skills: [],
      duration: "",
      deadline: "",
      maxStudents: 2,
      companyName: currentUser.companyName,
      companyLogo: currentUser.companyLogo,
    })
    setSelectedSupervisor(null)
    setNewSkill("")
  }

  // Add a skill to the project form
  const addSkill = () => {
    if (newSkill && !projectForm.skills?.includes(newSkill)) {
      setProjectForm({
        ...projectForm,
        skills: [...(projectForm.skills || []), newSkill],
      })
      setNewSkill("")
    }
  }

  // Remove a skill from the project form
  const removeSkill = (skill: string) => {
    setProjectForm({
      ...projectForm,
      skills: projectForm.skills?.filter((s) => s !== skill) || [],
    })
  }

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
                  className="flex items-center space-x-2 text-blue-700 w-full"
                  onClick={() => navigateTo("/recruiter/dashboard")}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700 w-full"
                  onClick={() => navigateTo("/recruiter/chat")}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700 w-full"
                  onClick={() => navigateTo("/recruiter/applications")}
                >
                  <Users className="h-5 w-5" />
                  <span>Student Applications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700 w-full"
                  onClick={() => navigateTo("/recruiter/past-fyps")}
                >
                  <History className="h-5 w-5" />
                  <span>Past FYPs Offered</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center space-x-2 text-blue-700 w-full" isActive>
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
              <h1 className="text-2xl font-bold text-blue-800">Projects</h1>
              <p className="text-blue-600">{currentUser.companyName}</p>
            </div>
            <SidebarTrigger className="md:hidden" />
          </header>

          {/* Search and Add */}
          <div className="bg-white p-4 border-b border-blue-200 flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
              <Input
                placeholder="Search projects..."
                className="pl-10 border-blue-200 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              className="ml-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                resetProjectForm()
                setNewProjectDialogOpen(true)
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Projects Grid */}
            <div className={`${selectedProject ? "w-1/2 border-r border-blue-200" : "w-full"} bg-white overflow-auto`}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="border-blue-200 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.companyLogo} alt={project.companyName} />
                          <AvatarFallback>{project.companyName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          GPA {project.gpaRequirement}+
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-bold text-blue-800 mt-2 line-clamp-2">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">{project.domain}</Badge>
                      <p className="text-sm text-blue-600 mt-2 line-clamp-2">{project.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-0">
                      <span className="text-xs text-blue-500">Posted: {project.postedDate}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 p-0"
                        onClick={() => setSelectedProject(project)}
                      >
                        Open in full <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Project Details */}
            {selectedProject && (
              <div className="w-1/2 bg-white overflow-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={selectedProject.companyLogo} alt={selectedProject.companyName} />
                        <AvatarFallback>{selectedProject.companyName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold text-blue-800">{selectedProject.title}</h2>
                        <p className="text-blue-600">{selectedProject.companyName}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => initEditForm(selectedProject)}>
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600"
                        onClick={() => {
                          setProjectToDelete(selectedProject)
                          setDeleteAlertOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 flex items-center">
                        <Tag className="mr-2 h-5 w-5" /> Domain
                      </h3>
                      <Badge className="mt-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
                        {selectedProject.domain}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5" /> Requirements
                      </h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <span className="font-medium text-blue-800 w-32">GPA Requirement:</span>
                          <Badge className="bg-blue-100 text-blue-800">{selectedProject.gpaRequirement}+</Badge>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-blue-800 w-32">Max Students:</span>
                          <span>{selectedProject.maxStudents}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 flex items-center">
                        <Calendar className="mr-2 h-5 w-5" /> Timeline
                      </h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <span className="font-medium text-blue-800 w-32">Duration:</span>
                          <span>{selectedProject.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-blue-800 w-32">Application Deadline:</span>
                          <span>{selectedProject.deadline}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-blue-800 w-32">Posted Date:</span>
                          <span>{selectedProject.postedDate}</span>
                        </div>
                      </div>
                    </div>

                    {selectedProject.collaboratingSupervisor && (
                      <div>
                        <h3 className="text-lg font-semibold text-blue-700 flex items-center">
                          <Briefcase className="mr-2 h-5 w-5" /> Collaborating Supervisor
                        </h3>
                        <div className="mt-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src={selectedProject.collaboratingSupervisor.avatar}
                                alt={selectedProject.collaboratingSupervisor.name}
                              />
                              <AvatarFallback>{selectedProject.collaboratingSupervisor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-blue-800">
                                {selectedProject.collaboratingSupervisor.name}
                              </p>
                              <p className="text-sm text-blue-600">
                                {selectedProject.collaboratingSupervisor.department}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-blue-700">Description</h3>
                      <p className="mt-2 text-blue-800 whitespace-pre-line">{selectedProject.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-blue-700">Required Skills</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedProject.skills.map((skill, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex space-x-4">
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => initEditForm(selectedProject)}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit Project
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => {
                          setProjectToDelete(selectedProject)
                          setDeleteAlertOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Project Dialog */}
      <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Post a New Project</DialogTitle>
            <DialogDescription>Fill in the details below to post a new final year project.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectTitle" className="text-blue-700">
                  Project Title *
                </Label>
                <Input
                  id="projectTitle"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="Enter project title"
                  className="border-blue-200 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain" className="text-blue-700">
                  Domain/Area *
                </Label>
                <Select
                  onValueChange={(value) => setProjectForm({ ...projectForm, domain: value })}
                  value={projectForm.domain}
                >
                  <SelectTrigger id="domain" className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="AR/VR">AR/VR</SelectItem>
                    <SelectItem value="IoT">IoT</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-blue-700">
                Project Description *
              </Label>
              <Textarea
                id="description"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                placeholder="Provide a detailed description of the project"
                className="border-blue-200 focus:border-blue-500 min-h-[120px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gpaRequirement" className="text-blue-700">
                  GPA Requirement
                </Label>
                <Select
                  onValueChange={(value) =>
                    setProjectForm({ ...projectForm, gpaRequirement: Number.parseFloat(value) })
                  }
                  value={projectForm.gpaRequirement?.toString()}
                >
                  <SelectTrigger id="gpaRequirement" className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select GPA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2.5">2.5+</SelectItem>
                    <SelectItem value="3.0">3.0+</SelectItem>
                    <SelectItem value="3.2">3.2+</SelectItem>
                    <SelectItem value="3.5">3.5+</SelectItem>
                    <SelectItem value="3.7">3.7+</SelectItem>
                    <SelectItem value="4.0">4.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxStudents" className="text-blue-700">
                  Maximum Students
                </Label>
                <Select
                  onValueChange={(value) => setProjectForm({ ...projectForm, maxStudents: Number.parseInt(value) })}
                  value={projectForm.maxStudents?.toString()}
                >
                  <SelectTrigger id="maxStudents" className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select max students" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-blue-700">
                  Project Duration
                </Label>
                <Input
                  id="duration"
                  value={projectForm.duration}
                  onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                  placeholder="e.g., 4-6 months"
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-blue-700">
                  Application Deadline
                </Label>
                <Input
                  id="deadline"
                  value={projectForm.deadline}
                  onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })}
                  placeholder="e.g., December 15, 2023"
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Required Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {projectForm.skills?.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center">
                    {skill}
                    <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => removeSkill(skill)}>
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="border-blue-200 focus:border-blue-500"
                />
                <Button type="button" onClick={addSkill}>
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Collaborating Supervisor (Optional)</Label>
              <Select onValueChange={setSelectedSupervisor} value={selectedSupervisor || ""}>
                <SelectTrigger className="border-blue-200 focus:border-blue-500">
                  <SelectValue placeholder="Select a supervisor (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {mockSupervisors.map((supervisor) => (
                    <SelectItem key={supervisor.id} value={supervisor.id}>
                      {supervisor.name} - {supervisor.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setNewProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProject}>Post Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={editProjectDialogOpen} onOpenChange={setEditProjectDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update the details of your project.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editProjectTitle" className="text-blue-700">
                  Project Title *
                </Label>
                <Input
                  id="editProjectTitle"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="Enter project title"
                  className="border-blue-200 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editDomain" className="text-blue-700">
                  Domain/Area *
                </Label>
                <Select
                  onValueChange={(value) => setProjectForm({ ...projectForm, domain: value })}
                  value={projectForm.domain}
                >
                  <SelectTrigger id="editDomain" className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="AR/VR">AR/VR</SelectItem>
                    <SelectItem value="IoT">IoT</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editDescription" className="text-blue-700">
                Project Description *
              </Label>
              <Textarea
                id="editDescription"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                placeholder="Provide a detailed description of the project"
                className="border-blue-200 focus:border-blue-500 min-h-[120px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editGpaRequirement" className="text-blue-700">
                  GPA Requirement
                </Label>
                <Select
                  onValueChange={(value) =>
                    setProjectForm({ ...projectForm, gpaRequirement: Number.parseFloat(value) })
                  }
                  value={projectForm.gpaRequirement?.toString()}
                >
                  <SelectTrigger id="editGpaRequirement" className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select GPA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2.5">2.5+</SelectItem>
                    <SelectItem value="3.0">3.0+</SelectItem>
                    <SelectItem value="3.2">3.2+</SelectItem>
                    <SelectItem value="3.5">3.5+</SelectItem>
                    <SelectItem value="3.7">3.7+</SelectItem>
                    <SelectItem value="4.0">4.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editMaxStudents" className="text-blue-700">
                  Maximum Students
                </Label>
                <Select
                  onValueChange={(value) => setProjectForm({ ...projectForm, maxStudents: Number.parseInt(value) })}
                  value={projectForm.maxStudents?.toString()}
                >
                  <SelectTrigger id="editMaxStudents" className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select max students" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editDuration" className="text-blue-700">
                  Project Duration
                </Label>
                <Input
                  id="editDuration"
                  value={projectForm.duration}
                  onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                  placeholder="e.g., 4-6 months"
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editDeadline" className="text-blue-700">
                  Application Deadline
                </Label>
                <Input
                  id="editDeadline"
                  value={projectForm.deadline}
                  onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })}
                  placeholder="e.g., December 15, 2023"
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Required Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {projectForm.skills?.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center">
                    {skill}
                    <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => removeSkill(skill)}>
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="border-blue-200 focus:border-blue-500"
                />
                <Button type="button" onClick={addSkill}>
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Collaborating Supervisor (Optional)</Label>
              <Select onValueChange={setSelectedSupervisor} value={selectedSupervisor || ""}>
                <SelectTrigger className="border-blue-200 focus:border-blue-500">
                  <SelectValue placeholder="Select a supervisor (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {mockSupervisors.map((supervisor) => (
                    <SelectItem key={supervisor.id} value={supervisor.id}>
                      {supervisor.name} - {supervisor.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProject}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Alert */}
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteProject}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  )
}

