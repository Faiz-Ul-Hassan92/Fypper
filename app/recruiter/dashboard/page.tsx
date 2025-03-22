"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Home,
  MessageSquare,
  Users,
  History,
  FileText,
  Edit,
  Building,
  Tag,
  User,
  LogOut,
  Lock,
  X,
  Save,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function RecruiterDashboard() {
  const router = useRouter()

  // Mock data - in a real application, this would come from your API/database
  const [recruiterData, setRecruiterData] = useState({
    personalInfo: {
      name: "Jane Smith",
      email: "jane.smith@techcorp.com",
      jobTitle: "Senior Talent Acquisition Specialist",
    },
    companyInfo: {
      companyName: "TechCorp Solutions",
      companyWebsite: "https://techcorp.com",
      companyAddress: "123 Innovation Drive, Tech City, TC 12345",
      companyDescription:
        "TechCorp Solutions is a leading technology company specializing in innovative software solutions for enterprise clients. We focus on AI, cloud computing, and cybersecurity solutions that help businesses transform their digital operations.",
    },
    fieldsOfInterest: ["AI", "Software Engineering", "Cloud Computing", "Cybersecurity"],
    linkedinProfile: "https://linkedin.com/in/janesmith",
    profileImage: "/placeholder.svg?height=200&width=200",
  })

  // State for password change dialog
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // States for editing sections
  const [editingPersonal, setEditingPersonal] = useState(false)
  const [editingCompany, setEditingCompany] = useState(false)
  const [editingFields, setEditingFields] = useState(false)
  const [editingImage, setEditingImage] = useState(false)

  // Temporary states for editing
  const [tempPersonal, setTempPersonal] = useState({ ...recruiterData.personalInfo })
  const [tempCompany, setTempCompany] = useState({ ...recruiterData.companyInfo })
  const [tempFields, setTempFields] = useState([...recruiterData.fieldsOfInterest])
  const [tempLinkedin, setTempLinkedin] = useState(recruiterData.linkedinProfile)
  const [newField, setNewField] = useState("")
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null)

  // Navigation handlers
  const navigateTo = (path: string) => {
    router.push(path)
  }

  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Validation
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match")
      return
    }

    // Here you would call your API to change the password
    console.log("Password change requested", { oldPassword, newPassword })

    // Reset form and close dialog
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setPasswordDialogOpen(false)
  }

  // Handle sign out
  const handleSignOut = () => {
    // Here you would implement sign out logic
    console.log("Sign out requested")
    // Redirect to login page or clear session
    router.push("/registration/login")
  }

  // Save personal info changes
  const savePersonalInfo = () => {
    setRecruiterData({
      ...recruiterData,
      personalInfo: tempPersonal,
      linkedinProfile: tempLinkedin,
    })
    setEditingPersonal(false)
  }

  // Save company info changes
  const saveCompanyInfo = () => {
    setRecruiterData({
      ...recruiterData,
      companyInfo: tempCompany,
    })
    setEditingCompany(false)
  }

  // Save fields of interest changes
  const saveFieldsOfInterest = () => {
    setRecruiterData({
      ...recruiterData,
      fieldsOfInterest: tempFields,
    })
    setEditingFields(false)
  }

  // Add a new field of interest
  const addField = () => {
    if (newField && !tempFields.includes(newField)) {
      setTempFields([...tempFields, newField])
      setNewField("")
    }
  }

  // Remove a field of interest
  const removeField = (field: string) => {
    setTempFields(tempFields.filter((f) => f !== field))
  }

  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfileImage(e.target.files[0])

      // In a real app, you would upload the file to your server
      // For this example, we'll create a local URL to display the image
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setRecruiterData({
            ...recruiterData,
            profileImage: event.target.result as string,
          })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // Cancel editing
  const cancelEditing = (section: "personal" | "company" | "fields" | "image") => {
    if (section === "personal") {
      setTempPersonal({ ...recruiterData.personalInfo })
      setTempLinkedin(recruiterData.linkedinProfile)
      setEditingPersonal(false)
    } else if (section === "company") {
      setTempCompany({ ...recruiterData.companyInfo })
      setEditingCompany(false)
    } else if (section === "fields") {
      setTempFields([...recruiterData.fieldsOfInterest])
      setEditingFields(false)
    } else if (section === "image") {
      setNewProfileImage(null)
      setEditingImage(false)
    }
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
                <SidebarMenuButton className="flex items-center space-x-2 text-blue-700" isActive>
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/chat")}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/applications")}
                >
                  <Users className="h-5 w-5" />
                  <span>Student Applications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/past-fyps")}
                >
                  <History className="h-5 w-5" />
                  <span>Past FYPs Offered</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/projects")}
                >
                  <FileText className="h-5 w-5" />
                  <span>Post Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-blue-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage src={recruiterData.profileImage} alt={recruiterData.personalInfo.name} />
                    <AvatarFallback>{recruiterData.personalInfo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-blue-800">{recruiterData.personalInfo.name}</p>
                    <p className="text-xs text-blue-600">Recruiter</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setPasswordDialogOpen(true)}>
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-800">Recruiter Dashboard</h1>
              <SidebarTrigger className="md:hidden" />
            </div>
          </header>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl text-blue-700 flex items-center">
                    <User className="mr-2 h-5 w-5" /> Personal Information
                  </CardTitle>
                  {!editingPersonal ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600"
                      onClick={() => setEditingPersonal(true)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => cancelEditing("personal")}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600" onClick={savePersonalInfo}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {!editingPersonal ? (
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="font-medium text-blue-800 w-24">Name:</span>
                        <span>{recruiterData.personalInfo.name}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-blue-800 w-24">Email:</span>
                        <span>{recruiterData.personalInfo.email}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-blue-800 w-24">Job Title:</span>
                        <span>{recruiterData.personalInfo.jobTitle}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-blue-800 w-24">LinkedIn:</span>
                        <a
                          href={recruiterData.linkedinProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-blue-700">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={tempPersonal.name}
                          onChange={(e) => setTempPersonal({ ...tempPersonal, name: e.target.value })}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-blue-700">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={tempPersonal.email}
                          onChange={(e) => setTempPersonal({ ...tempPersonal, email: e.target.value })}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle" className="text-blue-700">
                          Job Title
                        </Label>
                        <Input
                          id="jobTitle"
                          value={tempPersonal.jobTitle}
                          onChange={(e) => setTempPersonal({ ...tempPersonal, jobTitle: e.target.value })}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-blue-700">
                          LinkedIn Profile
                        </Label>
                        <Input
                          id="linkedin"
                          type="url"
                          value={tempLinkedin}
                          onChange={(e) => setTempLinkedin(e.target.value)}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Profile Image */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl text-blue-700 flex items-center">
                    <User className="mr-2 h-5 w-5" /> Profile Image
                  </CardTitle>
                  {!editingImage ? (
                    <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => setEditingImage(true)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => cancelEditing("image")}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600"
                        onClick={() => setEditingImage(false)}
                      >
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-200">
                    <Image
                      src={recruiterData.profileImage || "/placeholder.svg"}
                      alt={recruiterData.personalInfo.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {editingImage && (
                    <div className="mt-4 w-full">
                      <Label htmlFor="profileImage" className="text-blue-700">
                        Upload New Image
                      </Label>
                      <div className="flex items-center mt-2">
                        <Input
                          id="profileImage"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="border-blue-200 focus:border-blue-500"
                        />
                        <Button type="button" variant="outline" size="icon" className="ml-2">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Company Information */}
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl text-blue-700 flex items-center">
                    <Building className="mr-2 h-5 w-5" /> Company Information
                  </CardTitle>
                  {!editingCompany ? (
                    <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => setEditingCompany(true)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => cancelEditing("company")}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600" onClick={saveCompanyInfo}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {!editingCompany ? (
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="font-medium text-blue-800 w-24">Company:</span>
                        <span>{recruiterData.companyInfo.companyName}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-blue-800 w-24">Website:</span>
                        <a
                          href={recruiterData.companyInfo.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {recruiterData.companyInfo.companyWebsite}
                        </a>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-blue-800 w-24">Address:</span>
                        <span>{recruiterData.companyInfo.companyAddress}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-blue-800 w-24">Description:</span>
                        <p className="flex-1">{recruiterData.companyInfo.companyDescription}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-blue-700">
                          Company Name
                        </Label>
                        <Input
                          id="companyName"
                          value={tempCompany.companyName}
                          onChange={(e) => setTempCompany({ ...tempCompany, companyName: e.target.value })}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyWebsite" className="text-blue-700">
                          Company Website
                        </Label>
                        <Input
                          id="companyWebsite"
                          type="url"
                          value={tempCompany.companyWebsite}
                          onChange={(e) => setTempCompany({ ...tempCompany, companyWebsite: e.target.value })}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyAddress" className="text-blue-700">
                          Company Address
                        </Label>
                        <Input
                          id="companyAddress"
                          value={tempCompany.companyAddress}
                          onChange={(e) => setTempCompany({ ...tempCompany, companyAddress: e.target.value })}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyDescription" className="text-blue-700">
                          Company Description
                        </Label>
                        <Textarea
                          id="companyDescription"
                          value={tempCompany.companyDescription}
                          onChange={(e) => setTempCompany({ ...tempCompany, companyDescription: e.target.value })}
                          className="border-blue-200 focus:border-blue-500 h-32"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Fields of Interest */}
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl text-blue-700 flex items-center">
                    <Tag className="mr-2 h-5 w-5" /> Fields of Interest
                  </CardTitle>
                  {!editingFields ? (
                    <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => setEditingFields(true)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => cancelEditing("fields")}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600" onClick={saveFieldsOfInterest}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {!editingFields ? (
                    <div className="flex flex-wrap gap-2">
                      {recruiterData.fieldsOfInterest.map((field, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {tempFields.map((field, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center">
                            {field}
                            <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => removeField(field)}>
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          value={newField}
                          onChange={(e) => setNewField(e.target.value)}
                          placeholder="Add new field of interest"
                          className="border-blue-200 focus:border-blue-500"
                        />
                        <Button type="button" onClick={addField}>
                          Add
                        </Button>
                      </div>
                      <div>
                        <Label className="text-blue-700">Or select from common fields:</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {[
                            "Data Science",
                            "Machine Learning",
                            "Mobile Development",
                            "Web Development",
                            "DevOps",
                            "UI/UX Design",
                          ]
                            .filter((field) => !tempFields.includes(field))
                            .map((field, index) => (
                              <Badge
                                key={index}
                                className="bg-gray-100 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                onClick={() => {
                                  if (!tempFields.includes(field)) {
                                    setTempFields([...tempFields, field])
                                  }
                                }}
                              >
                                + {field}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to update your credentials.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordChange}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword" className="text-blue-700">
                  Current Password
                </Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-blue-700">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-blue-700">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setPasswordDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Change Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}

