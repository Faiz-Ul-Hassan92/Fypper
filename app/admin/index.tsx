"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminIndexPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to admin dashboard
    router.push("/admin/dashboard")
  }, [router])

  return null
}

