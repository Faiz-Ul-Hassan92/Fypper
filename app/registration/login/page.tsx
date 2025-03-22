"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Github, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log("Components loaded")
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid email or password",
          variant: "destructive",
        })
      } else {
        toast({ title: "Login Successful", description: "Redirecting..." })

        // Redirect based on user type
        switch (data.userType) {
          case "student":
            router.push("/student/dashboard")
            break
          case "supervisor":
            router.push("/supervisor/dashboard")
            break
          default:
            router.push("/recruiter/dashboard")
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-blue-50 to-blue-100">
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
        <div className="absolute bottom-12 left-12 text-white">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-lg">Log in to continue your journey</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center md:w-1/2 p-8">
        <Card className="w-full max-w-md p-8 shadow-lg bg-white">
          <h1 className="text-2xl font-bold text-blue-800 text-center mb-4">Log in to your account</h1>
          <p className="text-sm text-blue-600 text-center mb-8">Access your account by entering your credentials</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-blue-700">Password</Label>
                <button
                  type="button"
                  onClick={() => router.push("/registration/forgot-password")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <Separator className="my-6 border-blue-200" />

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
            <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-blue-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/registration/signup")}
              className="font-medium text-blue-700 hover:underline"
            >
              Sign up
            </button>
          </p>
        </Card>
      </div>
    </div>
  )
}
