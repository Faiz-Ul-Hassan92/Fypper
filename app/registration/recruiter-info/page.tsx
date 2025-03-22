"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Upload, Building, Briefcase, FileText, Link } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RecruiterInfoPage() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState("")
  const [companyWebsite, setCompanyWebsite] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [companyDescription, setCompanyDescription] = useState("")
  const [fieldsOfInterest, setFieldsOfInterest] = useState<string[]>([])
  const [linkedinProfile, setLinkedinProfile] = useState("")
  const [picture, setPicture] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Recruiter info submitted:", {
      companyName,
      companyWebsite,
      jobTitle,
      companyAddress,
      companyDescription,
      fieldsOfInterest,
      linkedinProfile,
      picture,
    })

    // Redirect to waiting approval page instead of dashboard
    router.push("/registration/waiting-approval")
  }

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPicture(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-blue-800">Complete Your Recruiter Profile</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Company Information */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <Building className="mr-2" /> Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-blue-600">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    required
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite" className="text-blue-600">
                    Company Website
                  </Label>
                  <Input
                    id="companyWebsite"
                    type="url"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="https://www.example.com"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress" className="text-blue-600">
                    Company Address
                  </Label>
                  <Input
                    id="companyAddress"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    placeholder="Enter company address"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recruiter Information */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <Briefcase className="mr-2" /> Recruiter Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-blue-600">
                    Job Title/Position *
                  </Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., HR Manager, Talent Acquisition"
                    required
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedinProfile" className="text-blue-600">
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedinProfile"
                    type="url"
                    value={linkedinProfile}
                    onChange={(e) => setLinkedinProfile(e.target.value)}
                    placeholder="https://www.linkedin.com/in/yourprofile"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="picture" className="text-blue-600">
                    Profile Picture
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="picture"
                      type="file"
                      onChange={handlePictureChange}
                      className="border-blue-200 focus:border-blue-500"
                      accept="image/*"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Description */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <FileText className="mr-2" /> Company Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="companyDescription"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  placeholder="Brief overview of your company"
                  className="border-blue-200 focus:border-blue-500 h-32"
                />
              </CardContent>
            </Card>

            {/* Fields of Interest */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center">
                  <Link className="mr-2" /> Fields of Interest
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(value) => setFieldsOfInterest(value.split(","))}>
                  <SelectTrigger className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select fields" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI">Artificial Intelligence</SelectItem>
                    <SelectItem value="SE">Software Engineering</SelectItem>
                    <SelectItem value="DS">Data Science</SelectItem>
                    <SelectItem value="CS">Cybersecurity</SelectItem>
                    <SelectItem value="ML">Machine Learning</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Information
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

