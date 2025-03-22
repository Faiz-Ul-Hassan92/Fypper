"use client"

import type React from "react"

import SupervisorSidebar from "./supervisor-sidebar"
import { usePathname } from "next/navigation"

interface SupervisorLayoutProps {
  children: React.ReactNode
}

export default function SupervisorLayout({ children }: SupervisorLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen overflow-hidden">
      <SupervisorSidebar activePath={pathname} />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}

