"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RegistrationIndex() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page
    router.push("/registration/login")
  }, [router])

  return null
}

