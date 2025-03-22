"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Upload, BookOpen, Briefcase, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function SupervisorProfilePage() {
  const router = useRouter()
  const [department, setDepartment] = useState("")
  const [designation, setDesignation] = useState("")
  const [researchInterests, setResearchInterests] = useState<string[]>([])
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [qualifications, setQualifications] = useState("")
  const [specializations, setSpecializations] = useState<string[]>([])
  const [publications, setPublications] = useState("")
  const [yearsOfExperience, setYearsOfExperience] = useState("")
  const [officeLocation, setOfficeLocation] = useState("")
  const [availableSlots, setAvailableSlots] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Supervisor profile submitted:", {
      department,
      designation,
      researchInterests,
      profileImage,
      qualifications,
      specializations,
      publications,
      yearsOfExperience,
      officeLocation,
      availableSlots,
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
          <h1 className="text-2xl font-bold text-blue-800">Complete Your Supervisor Profile</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <BookOpen className="mr-2" /> Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-blue-600">
                    Department *
                  </Label>
                  <Input
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Enter your department"
                    required
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="text-blue-600">
                    Designation *
                  </Label>
                  <Select onValueChange={setDesignation} required>
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Select your designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="assistant_professor">Assistant Professor</SelectItem>
                      <SelectItem value="lecturer">Lecturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualifications" className="text-blue-600">
                    Qualifications *
                  </Label>
                  <Input
                    id="qualifications"
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                    placeholder="e.g., PhD, MS"
                    required
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Research and Expertise */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <Briefcase className="mr-2" /> Research and Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-blue-600">Research Interests *</Label>
                  <div className="flex flex-wrap gap-2">
                    {["AI", "ML", "Software Engineering"].map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={researchInterests.includes(interest)}
                          onCheckedChange={(checked) => {
                            setResearchInterests(
                              checked
                                ? [...researchInterests, interest]
                                : researchInterests.filter((i) => i !== interest),
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
                  <Label htmlFor="specializations" className="text-blue-600">
                    Specializations
                  </Label>
                  <Input
                    id="specializations"
                    value={specializations.join(", ")}
                    onChange={(e) => setSpecializations(e.target.value.split(", "))}
                    placeholder="e.g., NLP, Computer Vision"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience" className="text-blue-600">
                    Years of Experience *
                  </Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    placeholder="Enter years of experience"
                    required
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Publications and Office Information */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <FileText className="mr-2" /> Publications and Office Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="publications" className="text-blue-600">
                    Publications
                  </Label>
                  <Textarea
                    id="publications"
                    value={publications}
                    onChange={(e) => setPublications(e.target.value)}
                    placeholder="Add links or titles of key papers"
                    className="border-blue-200 focus:border-blue-500 h-32"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officeLocation" className="text-blue-600">
                    Office Location
                  </Label>
                  <Input
                    id="officeLocation"
                    value={officeLocation}
                    onChange={(e) => setOfficeLocation(e.target.value)}
                    placeholder="Building/Room Number"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableSlots" className="text-blue-600">
                    Available Supervision Slots *
                  </Label>
                  <Input
                    id="availableSlots"
                    type="number"
                    value={availableSlots}
                    onChange={(e) => setAvailableSlots(e.target.value)}
                    placeholder="Enter number of available slots"
                    required
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Profile Image */}
            <Card className="col-span-1 md:col-span-2">
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

