"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function WaitingApprovalPage() {
  const router = useRouter()

  // In a real application, you would get this from the user's session or context
  const userType = "student" // Could be "student", "supervisor", or "recruiter"

  const userTypeMessages = {
    student: {
      title: "Student Account Pending Approval",
      description:
        "Your student account is currently under review by the university administration. This process typically takes 1-2 business days.",
      whatNext:
        "Once approved, you'll be able to access the student dashboard, form groups, and browse available FYP topics.",
    },
    supervisor: {
      title: "Supervisor Account Pending Approval",
      description:
        "Your supervisor account is currently under review by the department administration. This process typically takes 1-2 business days.",
      whatNext: "Once approved, you'll be able to post FYP topics, manage student proposals, and supervise projects.",
    },
    recruiter: {
      title: "Recruiter Account Pending Approval",
      description:
        "Your recruiter account is currently under review by our team. This process typically takes 1-2 business days.",
      whatNext:
        "Once approved, you'll be able to browse student projects, connect with talented students, and post job opportunities.",
    },
  }

  const { title, description, whatNext } = userTypeMessages[userType]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-lg bg-white">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="rounded-full bg-blue-100 p-3">
            <Clock className="h-12 w-12 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-blue-800">{title}</h1>

          <div className="space-y-4">
            <p className="text-blue-600">{description}</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-700 mb-2">What happens next?</h3>
              <p className="text-blue-600 text-sm">{whatNext}</p>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>You'll receive an email notification once your account is approved</span>
            </div>
          </div>

          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Waiting for approval illustration"
            width={200}
            height={200}
            className="my-4"
          />

          <div className="w-full pt-4 border-t border-blue-100">
            <Button
              onClick={() => router.push("/registration/login")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

