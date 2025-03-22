"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to registration page
    router.push("/recruiter/dashboard")
  }, [router])

  return null
}

