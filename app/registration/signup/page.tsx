"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowRight, Github, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("student")

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        userType,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      console.log("User signed up successfully:", data)
      if (userType === "recruiter") {
        router.push("/registration/recruiter-info")
      } else if (userType === "supervisor") {
        router.push("/registration/supervisor-profile")
      } else {
        router.push("/registration/student-profile")
      }
    } else {
      alert(data.error || "Signup failed!")
    }
  } catch (error) {
    console.error("Error signing up:", error)
    alert("Something went wrong. Please try again!")
  }
}


  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Image Section */}
      <div className="relative hidden w-full md:flex md:w-1/2 items-center justify-center">
        <Image
          src="/placeholder.svg?height=600&width=600"
          alt="Students and supervisors collaborating"
          width={600}
          height={600}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/80 to-blue-500/20" />
        <div className="absolute bottom-12 left-12 z-20 text-white">
          <h1 className="text-3xl font-bold">Connect & Collaborate</h1>
          <p className="mt-2 text-lg">Find the perfect match for your final year project</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex w-full items-center justify-center md:w-1/2 p-8">
        <Card className="w-full max-w-md p-8 shadow-lg bg-white">
          <div className="mb-8 flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold text-blue-800">Create your account</h1>
            <p className="text-sm text-blue-600">Sign up to find the perfect match for your final year project</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-blue-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                required
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">I am a:</Label>
              <RadioGroup value={userType} onValueChange={setUserType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="text-blue-600">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="supervisor" id="supervisor" />
                  <Label htmlFor="supervisor" className="text-blue-600">
                    Supervisor
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label htmlFor="recruiter" className="text-blue-600">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full border-blue-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-blue-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-blue-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/registration/login")}
              className="font-medium text-blue-700 underline-offset-4 hover:underline"
            >
              Log in
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

