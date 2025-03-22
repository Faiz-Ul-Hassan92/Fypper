"use client"

import type React from "react"
import { useState } from "react"
import SupervisorLayout from "../components/supervisor-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Users, Briefcase, Clock } from "lucide-react"
import {
  acceptStudentProposal,
  rejectStudentProposal,
  acceptRecruiterProposal,
  rejectRecruiterProposal,
  scheduleGroupMeeting,
  proposeToStudents,
} from "./actions"
import { useToast } from "@/hooks/use-toast"
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

export default function ManageProposals() {
  const { toast } = useToast()
  const [isAccepting, setIsAccepting] = useState<string | null>(null)
  const [isRejecting, setIsRejecting] = useState<string | null>(null)
  const [isScheduling, setIsScheduling] = useState(false)
  const [isProposing, setIsProposing] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [proposalType, setProposalType] = useState<"student" | "recruiter" | null>(null)
  const [meetingData, setMeetingData] = useState({
    groupId: "",
    date: "",
    time: "",
    location: "",
    agenda: "",
  })
  const [proposalData, setProposalData] = useState({
    title: "",
    description: "",
    type: "research",
    students: [],
    deadline: "",
  })

  const handleAcceptStudentProposal = async (proposalId: string) => {
    setIsAccepting(proposalId)
    try {
      await acceptStudentProposal({ proposalId })
      toast({
        title: "Proposal accepted",
        description: "The student proposal has been accepted successfully.",
      })
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error accepting the proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAccepting(null)
    }
  }

  const handleRejectStudentProposal = async (proposalId: string) => {
    setIsRejecting(proposalId)
    try {
      await rejectStudentProposal({
        proposalId,
        reason: rejectionReason,
      })
      toast({
        title: "Proposal rejected",
        description: "The student proposal has been rejected.",
      })
      setRejectionReason("")
      setShowRejectionDialog(false)
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error rejecting the proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRejecting(null)
    }
  }

  const handleAcceptRecruiterProposal = async (proposalId: string) => {
    setIsAccepting(proposalId)
    try {
      await acceptRecruiterProposal({ proposalId })
      toast({
        title: "Proposal accepted",
        description: "The recruiter proposal has been accepted successfully.",
      })
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error accepting the proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAccepting(null)
    }
  }

  const handleRejectRecruiterProposal = async (proposalId: string) => {
    setIsRejecting(proposalId)
    try {
      await rejectRecruiterProposal({
        proposalId,
        reason: rejectionReason,
      })
      toast({
        title: "Proposal rejected",
        description: "The recruiter proposal has been rejected.",
      })
      setRejectionReason("")
      setShowRejectionDialog(false)
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error rejecting the proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRejecting(null)
    }
  }

  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsScheduling(true)
    try {
      await scheduleGroupMeeting(meetingData)
      toast({
        title: "Meeting scheduled",
        description: "The meeting has been scheduled successfully.",
      })
      // Reset form
      setMeetingData({
        groupId: "",
        date: "",
        time: "",
        location: "",
        agenda: "",
      })
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error scheduling the meeting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsScheduling(false)
    }
  }

  const handleProposeToStudents = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProposing(true)
    try {
      await proposeToStudents(proposalData)
      toast({
        title: "Proposal sent",
        description: "Your proposal has been sent to the selected students.",
      })
      // Reset form
      setProposalData({
        title: "",
        description: "",
        type: "research",
        students: [],
        deadline: "",
      })
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error sending the proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProposing(false)
    }
  }

  const openRejectionDialog = (proposalId: string, type: "student" | "recruiter") => {
    setSelectedProposal(proposalId)
    setProposalType(type)
    setShowRejectionDialog(true)
  }

  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Proposals</h1>
          <p className="text-muted-foreground mt-1">Review and manage FYP proposals from students and recruiters</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Pending: 8</span>
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              <span>Accepted: 4</span>
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 bg-red-50 text-red-700 border-red-200">
              <XCircle className="h-3 w-3 mr-1" />
              <span>Rejected: 2</span>
            </Badge>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Propose to Students
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <form onSubmit={handleProposeToStudents}>
                <DialogHeader>
                  <DialogTitle>Propose Project to Students</DialogTitle>
                  <DialogDescription>Create a new project proposal for students.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={proposalData.title}
                      onChange={(e) => setProposalData({ ...proposalData, title: e.target.value })}
                      placeholder="Enter project title"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="type">Project Type</Label>
                    <Select
                      value={proposalData.type}
                      onValueChange={(value) => setProposalData({ ...proposalData, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      value={proposalData.description}
                      onChange={(e) => setProposalData({ ...proposalData, description: e.target.value })}
                      placeholder="Describe the project and its objectives"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="students">Select Students</Label>
                    <Select>
                      <SelectTrigger id="students">
                        <SelectValue placeholder="Select students" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group1">AI Health Monitoring Team</SelectItem>
                        <SelectItem value="group2">Blockchain Supply Chain Group</SelectItem>
                        <SelectItem value="student1">John Smith</SelectItem>
                        <SelectItem value="student2">Emily Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Response Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={proposalData.deadline}
                      onChange={(e) => setProposalData({ ...proposalData, deadline: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isProposing}>
                    {isProposing ? "Sending..." : "Send Proposal"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Proposals</CardTitle>
                <CardDescription>Proposals from student groups requesting your supervision</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    id: "SP001",
                    title: "AI-Powered Health Monitoring System",
                    students: ["John Smith", "Emily Chen", "Michael Brown"],
                    date: "Mar 15, 2023",
                    type: "Development",
                  },
                  {
                    id: "SP002",
                    title: "Blockchain for Supply Chain Management",
                    students: ["Sarah Davis", "David Wilson"],
                    date: "Mar 12, 2023",
                    type: "Research",
                  },
                  {
                    id: "SP003",
                    title: "AR Navigation System for Campus",
                    students: ["Kevin Martin", "Sophia Thompson", "Ryan Taylor"],
                    date: "Mar 10, 2023",
                    type: "Development",
                  },
                ].map((proposal, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{proposal.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {proposal.id} • {proposal.date}
                        </p>
                      </div>
                      <Badge variant={proposal.type === "Research" ? "secondary" : "default"}>{proposal.type}</Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{proposal.students.join(", ")}</span>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{proposal.title}</DialogTitle>
                            <DialogDescription>Proposal details</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <h4 className="text-sm font-medium">Students</h4>
                              <p className="text-sm">{proposal.students.join(", ")}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Project Type</h4>
                              <p className="text-sm">{proposal.type}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Submission Date</h4>
                              <p className="text-sm">{proposal.date}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Project Description</h4>
                              <p className="text-sm">
                                This project aims to develop an innovative solution that addresses real-world challenges
                                in the domain. The team has demonstrated strong technical skills and a clear
                                understanding of the problem space.
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => openRejectionDialog(proposal.id, "student")}>
                              Reject
                            </Button>
                            <Button onClick={() => handleAcceptStudentProposal(proposal.id)}>Accept</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => openRejectionDialog(proposal.id, "student")}
                        disabled={isRejecting === proposal.id}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        {isRejecting === proposal.id ? "Rejecting..." : "Reject"}
                      </Button>

                      <Button
                        size="sm"
                        className="text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700"
                        onClick={() => handleAcceptStudentProposal(proposal.id)}
                        disabled={isAccepting === proposal.id}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {isAccepting === proposal.id ? "Accepting..." : "Accept"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recruiter Proposals</CardTitle>
                <CardDescription>Proposals from industry recruiters for collaboration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    id: "RP001",
                    title: "Smart Home Automation System",
                    company: "TechCorp",
                    contact: "Lisa Wong",
                    date: "Mar 14, 2023",
                    type: "Development",
                  },
                  {
                    id: "RP002",
                    title: "Machine Learning for Predictive Maintenance",
                    company: "IndustrialTech",
                    contact: "James Miller",
                    date: "Mar 11, 2023",
                    type: "Research",
                  },
                ].map((proposal, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{proposal.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {proposal.id} • {proposal.date}
                        </p>
                      </div>
                      <Badge variant={proposal.type === "Research" ? "secondary" : "default"}>{proposal.type}</Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {proposal.company} • Contact: {proposal.contact}
                      </span>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{proposal.title}</DialogTitle>
                            <DialogDescription>Proposal from {proposal.company}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <h4 className="text-sm font-medium">Company</h4>
                              <p className="text-sm">{proposal.company}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Contact Person</h4>
                              <p className="text-sm">{proposal.contact}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Project Type</h4>
                              <p className="text-sm">{proposal.type}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Submission Date</h4>
                              <p className="text-sm">{proposal.date}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Project Description</h4>
                              <p className="text-sm">
                                This industry collaboration project aims to develop innovative solutions with real-world
                                applications. The company has a strong track record and is offering resources and
                                mentorship for students.
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => openRejectionDialog(proposal.id, "recruiter")}>
                              Reject
                            </Button>
                            <Button onClick={() => handleAcceptRecruiterProposal(proposal.id)}>Accept</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => openRejectionDialog(proposal.id, "recruiter")}
                        disabled={isRejecting === proposal.id}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        {isRejecting === proposal.id ? "Rejecting..." : "Reject"}
                      </Button>

                      <Button
                        size="sm"
                        className="text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700"
                        onClick={() => handleAcceptRecruiterProposal(proposal.id)}
                        disabled={isAccepting === proposal.id}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {isAccepting === proposal.id ? "Accepting..." : "Accept"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Proposals</CardTitle>
                <CardDescription>Proposals you have declined</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    id: "RP003",
                    title: "Virtual Reality Training Platform",
                    type: "Student",
                    submitter: "Kevin Martin, Sophia Thompson",
                    date: "Feb 28, 2023",
                    reason: "Project scope too broad",
                  },
                  {
                    id: "RP004",
                    title: "E-commerce Analytics Dashboard",
                    type: "Recruiter",
                    submitter: "ShopTech Inc.",
                    date: "Feb 25, 2023",
                    reason: "Not aligned with research interests",
                  },
                ].map((rejected, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{rejected.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {rejected.id} • {rejected.date}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Rejected
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                      {rejected.type === "Student" ? (
                        <Users className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm">
                        {rejected.type}: {rejected.submitter}
                      </span>
                    </div>

                    <div className="bg-red-50 p-3 rounded-md">
                      <p className="text-sm text-red-700">
                        <strong>Reason:</strong> {rejected.reason}
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Reconsider</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rejection Reason Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Proposal</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this proposal.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter rejection reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedProposal && proposalType === "student") {
                  handleRejectStudentProposal(selectedProposal)
                } else if (selectedProposal && proposalType === "recruiter") {
                  handleRejectRecruiterProposal(selectedProposal)
                }
              }}
            >
              Reject Proposal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SupervisorLayout>
  )
}

