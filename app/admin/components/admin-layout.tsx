"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import AdminSidebar from "./admin-sidebar"
import { useMobile } from "@/hooks/use-mobile"

interface AdminLayoutProps {
  children: React.ReactNode
  activePage: string
}

export default function AdminLayout({ children, activePage }: AdminLayoutProps) {
  const isMobile = useMobile()
  const pathname = usePathname()

  return (
    <div className="h-screen overflow-hidden flex">
      <AdminSidebar activePage={activePage} />

      <main className={`flex-1 overflow-auto transition-all duration-200 ease-in-out ${isMobile ? "ml-0" : "ml-64"}`}>
        {children}
      </main>
    </div>
  )
}

