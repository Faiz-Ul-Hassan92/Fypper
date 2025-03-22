"use client"

import type React from "react"
import { useState, useEffect } from "react"
import SupervisorLayout from "../components/supervisor-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Star, Plus, FileText, Calendar } from "lucide-react"
import { submitReference, saveReferenceDraft, getPreviousReferences, searchStudent } from "./actions"
import { useToast } from "@/hooks/use-toast"

export default function GiveReference() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [rating, setRating] = useState(8)
  const [skills, setSkills] = useState(["Programming", "Problem Solving", "Team Work", "Communication", "Leadership"])
  const [newSkill, setNewSkill] = useState("")
  const [recommendation, setRecommendation] = useState(
    "Sarah has been an exceptional student throughout her academic journey. Her dedication to learning and problem-solving abilities are commendable. She has consistently demonstrated strong analytical skills and a keen interest in artificial intelligence and machine learning.",
  )
  const [student, setStudent] = useState({
    id: "STU-2023-0042",
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    program: "Computer Science",
    year: "Final Year",
    gpa: "3.8/4.0",
    image: "/placeholder.svg?height=200&width=200",
  })
  const [previousReferences, setPreviousReferences] = useState([
    { name: "John Smith", date: "Mar 15, 2023", program: "Computer Science", rating: 9 },
    { name: "Emily Chen", date: "Jan 22, 2023", program: "Data Science", rating: 10 },
    { name: "Michael Brown", date: "Nov 10, 2022", program: "Software Engineering", rating: 8 },
  ])

  // Fetch previous references on component mount
  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const data = await getPreviousReferences()
        setPreviousReferences(
          data.map((ref) => ({
            name: ref.studentName,
            date: new Date(ref.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            program: ref.department,
            rating: ref.rating,
          })),
        )
      } catch (error) {
        console.error("Failed to fetch previous references:", error)
      }
    }

    fetchReferences()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      const studentData = await searchStudent(searchQuery)
      setStudent(studentData)
      toast({
        title: "Student found",
        description: `Found student: ${studentData.name}`,
      })
    } catch (error) {
      toast({
        title: "Student not found",
        description: "No student found with the provided information.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault()
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()])
      }
      setNewSkill("")
    }
  }

  const handleAddSkillButton = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSubmitReference = async () => {
    setIsSubmitting(true)
    try {
      await submitReference({
        studentId: student.id,
        rating: rating,
        skills,
        recommendationLetter: recommendation,
      })
      toast({
        title: "Reference submitted",
        description: `Reference for ${student.name} has been submitted successfully.`,
      })

      // Refresh previous references
      const references = await getPreviousReferences()
      setPreviousReferences(
        references.map((ref) => ({
          name: ref.studentName,
          date: new Date(ref.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          program: ref.department,
          rating: ref.rating,
        })),
      )

      // Reset form (optional)
      // setRating(8);
      // setSkills(["Programming", "Problem Solving", "Team Work", "Communication", "Leadership"]);
      // setRecommendation("");
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting the reference. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    try {
      await saveReferenceDraft({
        studentId: student.id,
        rating: rating,
        skills,
        recommendationLetter: recommendation,
      })
      toast({
        title: "Draft saved",
        description: `Reference draft for ${student.name} has been saved.`,
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: "There was an error saving the draft. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Give Reference</h1>
          <p className="text-muted-foreground mt-1">Provide recommendations and ratings for students</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Student</CardTitle>
            <CardDescription>Find a student to write a recommendation for</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-1 top-1 h-8" size="sm" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Details of the selected student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
                  <img
                    src={student.image || "/placeholder.svg?height=200&width=200"}
                    alt="Student profile"
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="md:w-3/4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <div className="font-medium">{student.name}</div>
                  </div>
                  <div>
                    <Label>Student ID</Label>
                    <div className="font-medium">{student.id}</div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div className="font-medium">{student.email}</div>
                  </div>
                  <div>
                    <Label>Program</Label>
                    <div className="font-medium">{student.program}</div>
                  </div>
                  <div>
                    <Label>Year</Label>
                    <div className="font-medium">{student.year}</div>
                  </div>
                  <div>
                    <Label>GPA</Label>
                    <div className="font-medium">{student.gpa}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (out of 10)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">/ 10</span>
                </div>
              </div>

              <div>
                <Label htmlFor="skills" className="block mb-2">
                  Key Skills
                </Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex items-center space-x-1 bg-primary/10 px-3 py-1 rounded-full">
                      <Star className="h-3 w-3" />
                      <span className="text-sm">{skill}</span>
                      <button
                        type="button"
                        className="h-3 w-3 rounded-full text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-1 border px-3 py-1 rounded-full">
                    <Plus className="h-3 w-3" />
                    <input
                      type="text"
                      className="text-sm bg-transparent border-none focus:outline-none w-24"
                      placeholder="Add skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={handleAddSkill}
                    />
                    <button
                      type="button"
                      className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground"
                      onClick={handleAddSkillButton}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="recommendation" className="block mb-2">
                  Recommendation Letter
                </Label>
                <Textarea
                  id="recommendation"
                  placeholder="Write your recommendation here..."
                  className="min-h-[200px]"
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save as Draft"}
            </Button>
            <div className="space-x-2">
              <Button variant="outline">Preview</Button>
              <Button onClick={handleSubmitReference} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Reference"}
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Previous References</CardTitle>
            <CardDescription>References you have provided in the past</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {previousReferences.map((ref, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{ref.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {ref.program} •{" "}
                        <span className="flex items-center inline-flex">
                          <Calendar className="h-3 w-3 mr-1" />
                          {ref.date}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="font-medium mr-1">{ref.rating}</span>
                      <span className="text-sm text-muted-foreground">/10</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SupervisorLayout>
  )
}

