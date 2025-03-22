"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RecruiterIndex() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard
    router.push("/recruiter/dashboard")
  }, [router])

  return null
}

