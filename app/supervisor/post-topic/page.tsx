"use client"

import type React from "react"
import { useState, useEffect } from "react"
import SupervisorLayout from "../components/supervisor-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createTopic, saveTopicDraft, deleteTopic, closeApplications, reopenApplications } from "./actions"

export default function PostTopicPage() {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [type, setType] = useState("research")
  const [department, setDepartment] = useState("cs")
  const [duration, setDuration] = useState("1-semester")
  const [description, setDescription] = useState("")
  const [prerequisites, setPrerequisites] = useState("")
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState("")
  const [maxStudents, setMaxStudents] = useState("1")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [topics, setTopics] = useState<any[]>([
    {
      id: "FYP001",
      title: "AI-Powered Student Attendance System",
      type: "development",
      department: "cs",
      duration: "2-semester",
      description:
        "Develop an attendance system using facial recognition and machine learning to automate student attendance tracking in classrooms.",
      prerequisites: "Machine Learning, Computer Vision, Web/Mobile Development",
      keywords: ["AI", "Computer Vision", "Web Development"],
      maxStudents: "2",
      status: "open",
    },
    {
      id: "FYP002",
      title: "Blockchain-based Academic Credential Verification",
      type: "research",
      department: "cs",
      duration: "1-semester",
      description:
        "Research and implement a blockchain solution for verifying academic credentials to prevent fraud and simplify verification processes.",
      prerequisites: "Blockchain, Cryptography, Database Systems",
      keywords: ["Blockchain", "Security", "Verification"],
      maxStudents: "1",
      status: "closed",
    },
  ])
  const [editingTopic, setEditingTopic] = useState<any | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch topics on component mount
  useEffect(() => {
    // In a real application, you would fetch topics from the server
    // For now, we're using the mock data initialized above
  }, [])

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const topicData = {
        title,
        type,
        department,
        duration,
        description,
        prerequisites,
        keywords,
        maxStudents,
      }

      const result = await createTopic(topicData)

      toast({
        title: "Topic created",
        description: `Your FYP topic has been successfully created with ID: ${result.id}.`,
      })

      // Reset form
      setTitle("")
      setType("research")
      setDepartment("cs")
      setDuration("1-semester")
      setDescription("")
      setPrerequisites("")
      setKeywords([])
      setMaxStudents("1")
      setEditingTopic(null)

      // Add the new topic to the list (in a real app, you'd refetch from the server)
      setTopics([
        ...topics,
        {
          id: result.id,
          ...topicData,
          status: "open",
        },
      ])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save topic. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    if (!title) {
      toast({
        title: "Missing title",
        description: "Please provide at least a title for your draft.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const result = await saveTopicDraft({
        title,
        type,
        department,
        duration,
        description,
        prerequisites,
        keywords,
        maxStudents,
      })

      toast({
        title: "Draft saved",
        description: `Your FYP topic draft has been saved with ID: ${result.id}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (topic: any) => {
    setEditingTopic(topic)
    setTitle(topic.title)
    setType(topic.type)
    setDepartment(topic.department)
    setDuration(topic.duration)
    setDescription(topic.description)
    setPrerequisites(topic.prerequisites)
    setKeywords(topic.keywords)
    setMaxStudents(topic.maxStudents)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTopic(id)

      toast({
        title: "Topic deleted",
        description: "The FYP topic has been successfully deleted.",
      })

      // Remove the topic from the list
      setTopics(topics.filter((topic) => topic.id !== id))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete topic. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleToggleApplications = async (id: string, currentStatus: string) => {
    try {
      if (currentStatus === "open") {
        await closeApplications(id)
        // Update the topic status in the list
        setTopics(topics.map((topic) => (topic.id === id ? { ...topic, status: "closed" } : topic)))
        toast({
          title: "Applications closed",
          description: "Applications for this topic have been closed.",
        })
      } else {
        await reopenApplications(id)
        // Update the topic status in the list
        setTopics(topics.map((topic) => (topic.id === id ? { ...topic, status: "open" } : topic)))
        toast({
          title: "Applications reopened",
          description: "Applications for this topic have been reopened.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setEditingTopic(null)
    setTitle("")
    setType("research")
    setDepartment("cs")
    setDuration("1-semester")
    setDescription("")
    setPrerequisites("")
    setKeywords([])
    setMaxStudents("1")
  }

  const getDepartmentLabel = (code: string) => {
    const departments: Record<string, string> = {
      cs: "Computer Science",
      ee: "Electrical Engineering",
      me: "Mechanical Engineering",
      ce: "Civil Engineering",
      se: "Software Engineering",
      is: "Information Systems",
      ds: "Data Science",
    }
    return departments[code] || code
  }

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      research: "Research",
      development: "Development",
      design: "Design",
      analysis: "Analysis",
    }
    return types[type] || type
  }

  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Post FYP Topics</h1>
          <p className="text-muted-foreground">Create and manage Final Year Project topics for students.</p>
        </div>

        <Tabs defaultValue="create" className="space-y-4">
          <TabsList>
            <TabsTrigger value="create">Create Topic</TabsTrigger>
            <TabsTrigger value="manage">Manage Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{editingTopic ? "Edit Topic" : "Create New Topic"}</CardTitle>
                <CardDescription>
                  {editingTopic
                    ? "Update the details of your existing FYP topic."
                    : "Fill in the details to create a new FYP topic for students."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Topic Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., AI-Powered Student Attendance System"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Project Type</Label>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="analysis">Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="ee">Electrical Engineering</SelectItem>
                          <SelectItem value="me">Mechanical Engineering</SelectItem>
                          <SelectItem value="ce">Civil Engineering</SelectItem>
                          <SelectItem value="se">Software Engineering</SelectItem>
                          <SelectItem value="is">Information Systems</SelectItem>
                          <SelectItem value="ds">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-semester">1 Semester</SelectItem>
                          <SelectItem value="2-semester">2 Semesters</SelectItem>
                          <SelectItem value="summer">Summer Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxStudents">Max Students</Label>
                      <Select value={maxStudents} onValueChange={setMaxStudents}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select max students" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Student</SelectItem>
                          <SelectItem value="2">2 Students</SelectItem>
                          <SelectItem value="3">3 Students</SelectItem>
                          <SelectItem value="4">4 Students</SelectItem>
                          <SelectItem value="5">5+ Students</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide a detailed description of the project..."
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prerequisites">Prerequisites</Label>
                    <Textarea
                      id="prerequisites"
                      value={prerequisites}
                      onChange={(e) => setPrerequisites(e.target.value)}
                      placeholder="List any prerequisites or required skills..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="keywords"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        placeholder="Add a keyword and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddKeyword()
                          }
                        }}
                      />
                      <Button type="button" size="sm" onClick={handleAddKeyword}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="gap-x-1.5">
                          {keyword}
                          <button
                            type="button"
                            className="ml-1 rounded-full text-muted-foreground hover:text-foreground"
                            onClick={() => handleRemoveKeyword(keyword)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="justify-between">
                {editingTopic ? (
                  <Button type="button" variant="ghost" onClick={handleCancel}>
                    Cancel
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={isSubmitting}>
                    {isSaving ? "Saving..." : "Save as Draft"}
                  </Button>
                )}
                <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : editingTopic ? "Update Topic" : "Create Topic"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage Topics</CardTitle>
                <CardDescription>View, edit, and delete your existing FYP topics.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topics.length === 0 ? (
                  <p>No topics found. Create one to get started!</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {topics.map((topic) => (
                      <Card key={topic.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{topic.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {getTypeLabel(topic.type)} • {getDepartmentLabel(topic.department)}
                              </CardDescription>
                            </div>
                            <Badge variant={topic.status === "open" ? "default" : "secondary"}>
                              {topic.status === "open" ? "Open" : "Closed"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground pb-2">
                          <p className="line-clamp-3">{topic.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {topic.keywords.map((keyword: string) => (
                              <Badge key={keyword} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(topic)}>
                              <Edit className="mr-1 h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant={topic.status === "open" ? "secondary" : "default"}
                              size="sm"
                              onClick={() => handleToggleApplications(topic.id, topic.status)}
                            >
                              {topic.status === "open" ? "Close" : "Reopen"}
                            </Button>
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(topic.id)}>
                            <Trash2 className="mr-1 h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SupervisorLayout>
  )
}

