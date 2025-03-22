"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Upload, GraduationCap, Book, Code, Briefcase, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// This is a simplified tag input component. You might want to use a more robust solution in a real application.
const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("")

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input) {
      e.preventDefault()
      setTags([...tags, { name: input, proficiency: "Beginner" }])
      setInput("")
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <div key={index} className="flex items-center bg-blue-100 rounded-full px-3 py-1">
          <span>{tag.name}</span>
          <Select
            value={tag.proficiency}
            onValueChange={(value) => {
              const newTags = [...tags]
              newTags[index].proficiency = value
              setTags(newTags)
            }}
          >
            <SelectTrigger className="border-none bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <button onClick={() => setTags(tags.filter((_, i) => i !== index))} className="ml-2 text-red-500">
            ×
          </button>
        </div>
      ))}
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a skill..."
        className="border-blue-200 focus:border-blue-500"
      />
    </div>
  )
}

export default function StudentProfilePage() {
  const router = useRouter()
  const [studentId, setStudentId] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [degreeProgram, setDegreeProgram] = useState("")
  const [currentSemester, setCurrentSemester] = useState("")
  const [fypInterests, setFypInterests] = useState<string[]>([])
  const [skills, setSkills] = useState<{ name: string; proficiency: string }[]>([])
  const [electivesTaken, setElectivesTaken] = useState("")
  const [projects, setProjects] = useState<{ title: string; description: string; techStack: string; type: string }[]>(
    [],
  )
  const [internships, setInternships] = useState<
    { company: string; role: string; duration: string; description: string }[]
  >([])
  const [competitions, setCompetitions] = useState<{ name: string; year: string; position: string }[]>([])
  const [preferredDomains, setPreferredDomains] = useState<string[]>([])
  const [preferredSupervisors, setPreferredSupervisors] = useState<string[]>([])
  const [portfolioLink, setPortfolioLink] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Student profile submitted:", {
      studentId,
      profileImage,
      degreeProgram,
      currentSemester,
      fypInterests,
      skills,
      electivesTaken,
      projects,
      internships,
      competitions,
      preferredDomains,
      preferredSupervisors,
      portfolioLink,
    })

    // Redirect to waiting approval page instead of dashboard
    router.push("/registration/waiting-approval")
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-blue-800">Complete Your Student Profile</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <GraduationCap className="mr-2" /> Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-blue-600">
                    Student ID *
                  </Label>
                  <Input
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter your student ID"
                    required
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degreeProgram" className="text-blue-600">
                    Degree Program *
                  </Label>
                  <Select onValueChange={setDegreeProgram} required>
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Select your degree program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bs_cs">BS Computer Science</SelectItem>
                      <SelectItem value="bs_se">BS Software Engineering</SelectItem>
                      {/* Add more degree programs as needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentSemester" className="text-blue-600">
                    Current Semester *
                  </Label>
                  <Input
                    id="currentSemester"
                    type="number"
                    value={currentSemester}
                    onChange={(e) => setCurrentSemester(e.target.value)}
                    placeholder="Enter your current semester"
                    required
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Profile Image */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <Upload className="mr-2" /> Profile Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input
                    id="profileImage"
                    type="file"
                    onChange={handleImageChange}
                    className="border-blue-200 focus:border-blue-500"
                    accept="image/*"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FYP Interests and Skills */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <Book className="mr-2" /> FYP Interests and Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-blue-600">FYP Interests *</Label>
                  <div className="flex flex-wrap gap-2">
                    {["AI", "Web Development", "Cloud Computing", "IoT", "Blockchain"].map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={fypInterests.includes(interest)}
                          onCheckedChange={(checked) => {
                            setFypInterests(
                              checked ? [...fypInterests, interest] : fypInterests.filter((i) => i !== interest),
                            )
                          }}
                        />
                        <label
                          htmlFor={interest}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-600">Skills</Label>
                  <TagInput tags={skills} setTags={setSkills} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="electivesTaken" className="text-blue-600">
                    Electives Taken
                  </Label>
                  <Textarea
                    id="electivesTaken"
                    value={electivesTaken}
                    onChange={(e) => setElectivesTaken(e.target.value)}
                    placeholder="List courses relevant to your FYP interests"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <Code className="mr-2" /> Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="space-y-2 border-b pb-4">
                    <Input
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...projects]
                        newProjects[index].title = e.target.value
                        setProjects(newProjects)
                      }}
                      placeholder="Project Title"
                      className="border-blue-200 focus:border-blue-500"
                    />
                    <Textarea
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...projects]
                        newProjects[index].description = e.target.value
                        setProjects(newProjects)
                      }}
                      placeholder="Project Description"
                      className="border-blue-200 focus:border-blue-500"
                    />
                    <Input
                      value={project.techStack}
                      onChange={(e) => {
                        const newProjects = [...projects]
                        newProjects[index].techStack = e.target.value
                        setProjects(newProjects)
                      }}
                      placeholder="Tech Stack"
                      className="border-blue-200 focus:border-blue-500"
                    />
                    <RadioGroup
                      value={project.type}
                      onValueChange={(value) => {
                        const newProjects = [...projects]
                        newProjects[index].type = value
                        setProjects(newProjects)
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id={`individual-${index}`} />
                        <Label htmlFor={`individual-${index}`}>Individual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="group" id={`group-${index}`} />
                        <Label htmlFor={`group-${index}`}>Group</Label>
                      </div>
                    </RadioGroup>
                    <Button
                      type="button"
                      onClick={() => setProjects(projects.filter((_, i) => i !== index))}
                      variant="destructive"
                    >
                      Remove Project
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    setProjects([...projects, { title: "", description: "", techStack: "", type: "individual" }])
                  }
                  variant="outline"
                >
                  Add Project
                </Button>
              </CardContent>
            </Card>

            {/* Internships and Competitions */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <Briefcase className="mr-2" /> Internships and Competitions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-blue-600">Internships</Label>
                  {internships.map((internship, index) => (
                    <div key={index} className="space-y-2 border-b pb-4">
                      <Input
                        value={internship.company}
                        onChange={(e) => {
                          const newInternships = [...internships]
                          newInternships[index].company = e.target.value
                          setInternships(newInternships)
                        }}
                        placeholder="Company"
                        className="border-blue-200 focus:border-blue-500"
                      />
                      <Input
                        value={internship.role}
                        onChange={(e) => {
                          const newInternships = [...internships]
                          newInternships[index].role = e.target.value
                          setInternships(newInternships)
                        }}
                        placeholder="Role"
                        className="border-blue-200 focus:border-blue-500"
                      />
                      <Input
                        value={internship.duration}
                        onChange={(e) => {
                          const newInternships = [...internships]
                          newInternships[index].duration = e.target.value
                          setInternships(newInternships)
                        }}
                        placeholder="Duration"
                        className="border-blue-200 focus:border-blue-500"
                      />
                      <Textarea
                        value={internship.description}
                        onChange={(e) => {
                          const newInternships = [...internships]
                          newInternships[index].description = e.target.value
                          setInternships(newInternships)
                        }}
                        placeholder="Description of tasks (optional)"
                        className="border-blue-200 focus:border-blue-500"
                      />
                      <Button
                        type="button"
                        onClick={() => setInternships(internships.filter((_, i) => i !== index))}
                        variant="destructive"
                      >
                        Remove Internship
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      setInternships([...internships, { company: "", role: "", duration: "", description: "" }])
                    }
                    variant="outline"
                  >
                    Add Internship
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-600">Competitions</Label>
                  {competitions.map((competition, index) => (
                    <div key={index} className="space-y-2 border-b pb-4">
                      <Input
                        value={competition.name}
                        onChange={(e) => {
                          const newCompetitions = [...competitions]
                          newCompetitions[index].name = e.target.value
                          setCompetitions(newCompetitions)
                        }}
                        placeholder="Competition Name"
                        className="border-blue-200 focus:border-blue-500"
                      />
                      <Input
                        value={competition.year}
                        onChange={(e) => {
                          const newCompetitions = [...competitions]
                          newCompetitions[index].year = e.target.value
                          setCompetitions(newCompetitions)
                        }}
                        placeholder="Year"
                        className="border-blue-200 focus:border-blue-500"
                      />
                      <Input
                        value={competition.position}
                        onChange={(e) => {
                          const newCompetitions = [...competitions]
                          newCompetitions[index].position = e.target.value
                          setCompetitions(newCompetitions)
                        }}
                        placeholder="Position/Rank"
                        className="border-blue-200 focus:border-blue-500"
                      />
                      <Button
                        type="button"
                        onClick={() => setCompetitions(competitions.filter((_, i) => i !== index))}
                        variant="destructive"
                      >
                        Remove Competition
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => setCompetitions([...competitions, { name: "", year: "", position: "" }])}
                    variant="outline"
                  >
                    Add Competition
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <Target className="mr-2" /> Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-blue-600">Preferred FYP Domains</Label>
                  <Select onValueChange={(value) => setPreferredDomains([...preferredDomains, value])}>
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Select domains" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="IoT">IoT</SelectItem>
                      <SelectItem value="Blockchain">Blockchain</SelectItem>
                      {/* Add more domains as needed */}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {preferredDomains.map((domain, index) => (
                      <div key={index} className="bg-blue-100 rounded-full px-3 py-1 flex items-center">
                        <span>{domain}</span>
                        <button
                          onClick={() => setPreferredDomains(preferredDomains.filter((_, i) => i !== index))}
                          className="ml-2 text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-600">Preferred Supervisors</Label>
                  <Select onValueChange={(value) => setPreferredSupervisors([...preferredSupervisors, value])}>
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Select supervisors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supervisor1">Dr. John Doe</SelectItem>
                      <SelectItem value="supervisor2">Prof. Jane Smith</SelectItem>
                      {/* Add more supervisors as needed */}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {preferredSupervisors.map((supervisor, index) => (
                      <div key={index} className="bg-blue-100 rounded-full px-3 py-1 flex items-center">
                        <span>{supervisor}</span>
                        <button
                          onClick={() => setPreferredSupervisors(preferredSupervisors.filter((_, i) => i !== index))}
                          className="ml-2 text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolioLink" className="text-blue-600">
                    Portfolio/Website Link
                  </Label>
                  <Input
                    id="portfolioLink"
                    type="url"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder="https://your-portfolio.com"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

