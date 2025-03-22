"use client"

import type React from "react"
import { useState } from "react"
import SupervisorLayout from "../components/supervisor-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, Clock, FileText, MessageSquare, AlertTriangle, CheckCircle, BookOpen } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { scheduleMeeting, updateProjectStatus } from "./actions"
import { useToast } from "@/hooks/use-toast"

export default function CurrentFYPs() {
  const { toast } = useToast()
  const [isScheduling, setIsScheduling] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [meetingData, setMeetingData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    agenda: "",
  })

  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) return

    setIsScheduling(true)
    try {
      await scheduleMeeting({
        projectId: selectedProject,
        ...meetingData,
      })
      toast({
        title: "Meeting scheduled",
        description: "The meeting has been successfully scheduled.",
      })

      // Reset form
      setMeetingData({
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        agenda: "",
      })

      // Close dialog (would be handled by state in a real implementation)
    } catch (error) {
      toast({
        title: "Failed to schedule meeting",
        description: "There was an error scheduling the meeting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsScheduling(false)
    }
  }

  const handleUpdateStatus = async (projectId: string, status: string) => {
    try {
      await updateProjectStatus(projectId, status)
      toast({
        title: "Status updated",
        description: `Project status has been updated to ${status}.`,
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating the project status. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Current FYPs</h1>
            <p className="text-muted-foreground mt-1">Manage your currently supervised Final Year Projects</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-md flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>Supervising 4 of 6 allowed projects</span>
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6 mt-6">
            {[
              {
                id: "FYP001",
                title: "AI-Powered Health Monitoring System",
                type: "Research",
                students: [
                  { name: "John Smith", id: "STU001", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Emily Chen", id: "STU002", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Michael Brown", id: "STU003", avatar: "/placeholder.svg?height=40&width=40" },
                ],
                startDate: "Jan 15, 2023",
                endDate: "Jun 30, 2023",
                nextMeeting: "Mar 20, 2023, 2:00 PM",
                lastSubmission: "Mar 10, 2023",
                status: "On Track",
              },
              {
                id: "FYP002",
                title: "Blockchain for Supply Chain Management",
                type: "Development",
                students: [
                  { name: "Sarah Davis", id: "STU004", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "David Wilson", id: "STU005", avatar: "/placeholder.svg?height=40&width=40" },
                ],
                startDate: "Feb 01, 2023",
                endDate: "Jul 15, 2023",
                nextMeeting: "Mar 18, 2023, 10:00 AM",
                lastSubmission: "Mar 05, 2023",
                status: "Needs Attention",
              },
              {
                id: "FYP003",
                title: "Smart Home Automation System",
                type: "Hybrid",
                students: [
                  { name: "Jessica Lee", id: "STU006", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Thomas White", id: "STU007", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Amanda Garcia", id: "STU008", avatar: "/placeholder.svg?height=40&width=40" },
                ],
                startDate: "Dec 10, 2022",
                endDate: "May 30, 2023",
                nextMeeting: "Mar 22, 2023, 3:30 PM",
                lastSubmission: "Mar 12, 2023",
                status: "On Track",
              },
              {
                id: "FYP004",
                title: "AR Navigation System for Campus",
                type: "Development",
                students: [
                  { name: "Ryan Taylor", id: "STU009", avatar: "/placeholder.svg?height=40&width=40" },
                  { name: "Sophia Thompson", id: "STU010", avatar: "/placeholder.svg?height=40&width=40" },
                ],
                startDate: "Jan 20, 2023",
                endDate: "Jun 15, 2023",
                nextMeeting: "Mar 25, 2023, 1:00 PM",
                lastSubmission: "Feb 28, 2023",
                status: "Delayed",
              },
            ].map((project, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge variant="outline">{project.type}</Badge>
                      </div>
                      <CardDescription>ID: {project.id}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        project.status === "On Track"
                          ? "outline"
                          : project.status === "Needs Attention"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        project.status === "On Track"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : project.status === "Needs Attention"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex -space-x-2">
                      {project.students.map((student, j) => (
                        <Avatar key={j} className="border-2 border-background">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      <div className="ml-4">
                        <p className="text-sm font-medium">{project.students.map((s) => s.name).join(", ")}</p>
                        <p className="text-xs text-muted-foreground">
                          {project.students.length} student{project.students.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {project.startDate} - {project.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <Select
                        defaultValue={project.status.toLowerCase().replace(/\s+/g, "-")}
                        onValueChange={(value) => handleUpdateStatus(project.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="on-track">On Track</SelectItem>
                          <SelectItem value="needs-attention">Needs Attention</SelectItem>
                          <SelectItem value="delayed">Delayed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Next Meeting</p>
                        <p className="text-xs text-muted-foreground">{project.nextMeeting}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Last Submission</p>
                        <p className="text-xs text-muted-foreground">{project.lastSubmission}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Time Remaining</p>
                        <p className="text-xs text-muted-foreground">{project.endDate.split(", ")[0]} (3 months)</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Documents
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedProject(project.id)}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Meeting
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <form onSubmit={handleScheduleMeeting}>
                          <DialogHeader>
                            <DialogTitle>Schedule Meeting</DialogTitle>
                            <DialogDescription>Schedule a meeting with the project group.</DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="date">Date</Label>
                              <Input
                                id="date"
                                type="date"
                                value={meetingData.date}
                                onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="start-time">Start Time</Label>
                                <Input
                                  id="start-time"
                                  type="time"
                                  value={meetingData.startTime}
                                  onChange={(e) => setMeetingData({ ...meetingData, startTime: e.target.value })}
                                  required
                                />
                              </div>

                              <div className="grid gap-2">
                                <Label htmlFor="end-time">End Time</Label>
                                <Input
                                  id="end-time"
                                  type="time"
                                  value={meetingData.endTime}
                                  onChange={(e) => setMeetingData({ ...meetingData, endTime: e.target.value })}
                                  required
                                />
                              </div>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                placeholder="Room number or online meeting link"
                                value={meetingData.location}
                                onChange={(e) => setMeetingData({ ...meetingData, location: e.target.value })}
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="agenda">Agenda</Label>
                              <Textarea
                                id="agenda"
                                placeholder="Enter meeting agenda items"
                                value={meetingData.agenda}
                                onChange={(e) => setMeetingData({ ...meetingData, agenda: e.target.value })}
                                required
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button type="submit" disabled={isScheduling}>
                              {isScheduling ? "Scheduling..." : "Schedule Meeting"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat with Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: "FYP101",
                  title: "Neural Network for Image Recognition",
                  type: "Research",
                  students: ["Amanda Garcia", "Noah Anderson", "Olivia Clark"],
                  completionDate: "Dec 15, 2022",
                  grade: "A",
                  status: "Excellent",
                },
                {
                  id: "FYP102",
                  title: "E-commerce Analytics Dashboard",
                  type: "Development",
                  students: ["Kevin Martin", "Sophia Thompson"],
                  completionDate: "Dec 10, 2022",
                  grade: "B+",
                  status: "Good",
                },
              ].map((project, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>ID: {project.id}</CardDescription>
                      </div>
                      <Badge className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{project.students.join(", ")}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Date</p>
                        <p className="font-medium">{project.completionDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Final Grade</p>
                        <p className="font-medium">{project.grade}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Project Type</p>
                        <p className="font-medium">{project.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium">{project.status}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Add to Repository
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archived" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: "FYP201",
                  title: "Virtual Reality Training Platform",
                  type: "Development",
                  year: "2021",
                  students: ["Ryan Taylor", "Jessica Lee"],
                  status: "Completed",
                },
                {
                  id: "FYP202",
                  title: "Sustainable Energy Management",
                  type: "Research",
                  year: "2021",
                  students: ["Thomas White", "Sarah Davis"],
                  status: "Completed",
                },
                {
                  id: "FYP203",
                  title: "Cybersecurity Framework",
                  type: "Hybrid",
                  year: "2020",
                  students: ["Michael Brown", "Emily Chen"],
                  status: "Completed",
                },
              ].map((project, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      ID: {project.id} • {project.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{project.students.join(", ")}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{project.type}</Badge>
                      <Badge variant="outline" className="bg-gray-50">
                        Archived
                      </Badge>
                    </div>

                    <Button size="sm" variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SupervisorLayout>
  )
}

