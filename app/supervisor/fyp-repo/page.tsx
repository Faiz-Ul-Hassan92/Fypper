"use client"

import type React from "react"
import { useState } from "react"
import SupervisorLayout from "../components/supervisor-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, BookOpen, Users, FileText } from "lucide-react"
import { searchProjects, getProjectDetails, downloadDocument } from "./actions"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function FypRepo() {
  const { toast } = useToast()
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    type: "all",
    department: "all",
    year: "all",
  })
  const [projects, setProjects] = useState([
    {
      title: "AI-Powered Health Monitoring System",
      type: "Development",
      year: "2023",
      department: "Computer Science",
      students: ["John Smith", "Emily Chen"],
      supervisor: "Dr. Robert Johnson",
      tags: ["AI", "Healthcare", "IoT"],
    },
    {
      title: "Blockchain for Supply Chain Management",
      type: "Research",
      year: "2022",
      department: "Computer Science",
      students: ["Michael Brown", "Sarah Davis"],
      supervisor: "Dr. Lisa Wong",
      tags: ["Blockchain", "Supply Chain", "Security"],
    },
    {
      title: "Smart Home Automation System",
      type: "Development",
      year: "2023",
      department: "Electrical Engineering",
      students: ["David Wilson", "Jessica Lee"],
      supervisor: "Dr. James Miller",
      tags: ["IoT", "Automation", "Embedded Systems"],
    },
    {
      title: "Machine Learning for Predictive Maintenance",
      type: "Research",
      year: "2021",
      department: "Mechanical Engineering",
      students: ["Ryan Taylor", "Amanda Garcia"],
      supervisor: "Dr. Maria Rodriguez",
      tags: ["Machine Learning", "Maintenance", "Industry 4.0"],
    },
    {
      title: "AR Navigation System for Campus",
      type: "Development",
      year: "2022",
      department: "Computer Science",
      students: ["Kevin Martin", "Sophia Thompson"],
      supervisor: "Dr. Robert Johnson",
      tags: ["AR", "Navigation", "Mobile"],
    },
    {
      title: "Sustainable Energy Management Platform",
      type: "Research",
      year: "2021",
      department: "Electrical Engineering",
      students: ["Olivia Clark", "Noah Anderson"],
      supervisor: "Dr. Thomas White",
      tags: ["Renewable Energy", "Sustainability", "IoT"],
    },
  ])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isLoadingProject, setIsLoadingProject] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    try {
      const results = await searchProjects({
        query: searchQuery,
        type: filters.type !== "all" ? filters.type : undefined,
        department: filters.department !== "all" ? filters.department : undefined,
        year: filters.year !== "all" ? filters.year : undefined,
      })

      setProjects(results)
      toast({
        title: "Search completed",
        description: `Found ${results.length} projects matching your criteria.`,
      })
    } catch (error) {
      toast({
        title: "Search failed",
        description: "There was an error searching for projects. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleViewProject = async (project: any) => {
    setIsLoadingProject(true)

    try {
      // In a real app, we would fetch the project details by ID
      const projectDetails = await getProjectDetails(project.title)
      setSelectedProject(projectDetails)
    } catch (error) {
      toast({
        title: "Failed to load project",
        description: "There was an error loading the project details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingProject(false)
    }
  }

  const handleDownloadDocument = async (documentId: string) => {
    if (!selectedProject) return

    try {
      const result = await downloadDocument(selectedProject.id, documentId)

      if (result.success) {
        // In a real app, this would trigger the download
        toast({
          title: "Download started",
          description: "Your document download has started.",
        })
      }
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading the document. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">FYP Repository</h1>
          <p className="text-muted-foreground mt-1">Browse and search through all previous Final Year Projects</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Projects</CardTitle>
            <CardDescription>Find projects by title, keywords, or student names</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Project Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.department}
                    onValueChange={(value) => setFilters({ ...filters, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.year} onValueChange={(value) => setFilters({ ...filters, year: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="shrink-0" disabled={isSearching}>
                  <Filter className="h-4 w-4 mr-2" />
                  {isSearching ? "Searching..." : "Apply Filters"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Card key={i} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant={project.type === "Research" ? "secondary" : "default"}>{project.type}</Badge>
                  <Badge variant="outline">{project.year}</Badge>
                </div>
                <CardTitle className="mt-2">{project.title}</CardTitle>
                <CardDescription>{project.department}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-start space-x-2">
                  <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Students</p>
                    <p className="text-sm text-muted-foreground">{project.students.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <BookOpen className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Supervisor</p>
                    <p className="text-sm text-muted-foreground">{project.supervisor}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, j) => (
                    <Badge key={j} variant="outline" className="bg-primary/5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 pt-0 mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" onClick={() => handleViewProject(project)}>
                      <Download className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    {isLoadingProject ? (
                      <div className="flex justify-center items-center h-40">
                        <p>Loading project details...</p>
                      </div>
                    ) : selectedProject ? (
                      <>
                        <DialogHeader>
                          <DialogTitle>{selectedProject.title}</DialogTitle>
                          <DialogDescription>
                            {selectedProject.department} • {selectedProject.year}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          <div className="flex justify-between">
                            <Badge variant={selectedProject.type === "Research" ? "secondary" : "default"}>
                              {selectedProject.type}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{selectedProject.students.join(", ")}</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">Abstract</h4>
                            <p className="text-sm text-muted-foreground">{selectedProject.abstract}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.technologies.map((tech: string, j: number) => (
                                <Badge key={j} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">Outcomes</h4>
                            <p className="text-sm text-muted-foreground">{selectedProject.outcomes}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Documents</h4>
                            <div className="space-y-2">
                              {selectedProject.documents.map((doc: any, j: number) => (
                                <div key={j} className="flex items-center justify-between p-2 border rounded-md">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <div>
                                      <p className="text-sm font-medium">{doc.title}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {doc.type.toUpperCase()} • {doc.size}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDownloadDocument(j.toString())}
                                  >
                                    <Download className="h-3 w-3 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-center items-center h-40">
                        <p>No project selected</p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline">Load More Projects</Button>
        </div>
      </div>
    </SupervisorLayout>
  )
}

