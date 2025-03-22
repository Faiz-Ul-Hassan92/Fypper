"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CalendarIcon, Video, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import SupervisorLayout from "../components/supervisor-layout"
import { scheduleMeeting, getMeetings, acceptMeeting, rejectMeeting } from "./actions"

export default function ScheduleMeetingsPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("14:00")
  const [duration, setDuration] = useState("30")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [meetingType, setMeetingType] = useState("video")
  const [student, setStudent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([])
  const [requestedMeetings, setRequestedMeetings] = useState<any[]>([])
  const [pastMeetings, setPastMeetings] = useState<any[]>([])

  useEffect(() => {
    // Fetch meetings data
    const fetchMeetings = async () => {
      const data = await getMeetings()
      setUpcomingMeetings(data.upcoming)
      setRequestedMeetings(data.requested)
      setPastMeetings(data.past)
    }

    fetchMeetings()
  }, [])

  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !time || !title || !student) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await scheduleMeeting({
        date: date.toISOString(),
        time,
        duration: Number.parseInt(duration),
        title,
        description,
        meetingType,
        studentId: student,
      })

      toast({
        title: "Meeting scheduled",
        description: "The meeting has been successfully scheduled.",
      })

      // Reset form
      setDate(new Date())
      setTime("14:00")
      setDuration("30")
      setTitle("")
      setDescription("")
      setMeetingType("video")
      setStudent("")

      // Refresh meetings data
      const data = await getMeetings()
      setUpcomingMeetings(data.upcoming)
      setRequestedMeetings(data.requested)
      setPastMeetings(data.past)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAcceptMeeting = async (meetingId: string) => {
    try {
      await acceptMeeting(meetingId)

      toast({
        title: "Meeting accepted",
        description: "The meeting request has been accepted.",
      })

      // Refresh meetings data
      const data = await getMeetings()
      setUpcomingMeetings(data.upcoming)
      setRequestedMeetings(data.requested)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept meeting. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRejectMeeting = async (meetingId: string) => {
    try {
      await rejectMeeting(meetingId)

      toast({
        title: "Meeting rejected",
        description: "The meeting request has been rejected.",
      })

      // Refresh meetings data
      const data = await getMeetings()
      setRequestedMeetings(data.requested)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject meeting. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Schedule Meetings</h1>
          <p className="text-muted-foreground">Schedule and manage meetings with your students.</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Meetings</TabsTrigger>
            <TabsTrigger value="requested">Requested Meetings</TabsTrigger>
            <TabsTrigger value="past">Past Meetings</TabsTrigger>
            <TabsTrigger value="schedule">Schedule New Meeting</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingMeetings.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No upcoming meetings scheduled.
                </CardContent>
              </Card>
            ) : (
              upcomingMeetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{meeting.title}</span>
                      <Button variant="outline" size="sm">
                        Join Meeting
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      With {meeting.student.name} • {meeting.meetingType === "video" ? "Video Call" : "In Person"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(meeting.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {meeting.time} ({meeting.duration} min)
                        </span>
                      </div>
                    </div>
                    {meeting.description && (
                      <div className="mt-2 text-sm text-muted-foreground">{meeting.description}</div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="requested" className="space-y-4">
            {requestedMeetings.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No meeting requests pending.
                </CardContent>
              </Card>
            ) : (
              requestedMeetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <CardTitle>{meeting.title}</CardTitle>
                    <CardDescription>
                      Requested by {meeting.student.name} •{" "}
                      {meeting.meetingType === "video" ? "Video Call" : "In Person"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(meeting.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {meeting.time} ({meeting.duration} min)
                        </span>
                      </div>
                    </div>
                    {meeting.description && (
                      <div className="mt-2 text-sm text-muted-foreground">{meeting.description}</div>
                    )}
                    <div className="mt-4 flex gap-2">
                      <Button onClick={() => handleAcceptMeeting(meeting.id)} className="w-full">
                        Accept
                      </Button>
                      <Button onClick={() => handleRejectMeeting(meeting.id)} variant="outline" className="w-full">
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastMeetings.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">No past meetings found.</CardContent>
              </Card>
            ) : (
              pastMeetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <CardTitle>{meeting.title}</CardTitle>
                    <CardDescription>
                      With {meeting.student.name} • {meeting.meetingType === "video" ? "Video Call" : "In Person"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(meeting.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {meeting.time} ({meeting.duration} min)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule a New Meeting</CardTitle>
                <CardDescription>Fill in the details to schedule a meeting with a student.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleScheduleMeeting} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        className="border rounded-md"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="90">1.5 hours</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meetingType">Meeting Type</Label>
                        <Select value={meetingType} onValueChange={setMeetingType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meeting type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">
                              <div className="flex items-center gap-2">
                                <Video className="h-4 w-4" />
                                <span>Video Call</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="inPerson">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>In Person</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student">Student</Label>
                        <Select value={student} onValueChange={setStudent}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select student" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">John Doe</SelectItem>
                            <SelectItem value="2">Jane Smith</SelectItem>
                            <SelectItem value="3">Bob Johnson</SelectItem>
                            <SelectItem value="4">Alice Williams</SelectItem>
                            <SelectItem value="5">Charlie Brown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Meeting Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., FYP Progress Discussion"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add any additional details about the meeting..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SupervisorLayout>
  )
}

