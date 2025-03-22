"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { StudentSidebar } from "./student-sidebar"
import { useMobile } from "@/hooks/use-mobile"

interface StudentLayoutProps {
  children: React.ReactNode
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobile()

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`${isMobile ? "hidden" : "w-64"} shrink-0`}>
        <StudentSidebar pathname={pathname} />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

