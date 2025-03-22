"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GraduationCap,
  MessageSquare,
  MessageCircle,
  LogOut,
  Menu,
  X,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface AdminSidebarProps {
  activePage: string
}

export default function AdminSidebar({ activePage }: AdminSidebarProps) {
  const router = useRouter()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    router.push("/registration/login")
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Manage Students", href: "/admin/manage-students", icon: <Users className="h-5 w-5" /> },
    { name: "Manage Recruiters", href: "/admin/manage-recruiters", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Manage Supervisors", href: "/admin/manage-supervisors", icon: <GraduationCap className="h-5 w-5" /> },
    { name: "Chat Complaints", href: "/admin/chat-complaints", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Forum Complaints", href: "/admin/forum-complaints", icon: <MessageCircle className="h-5 w-5" /> },
    { name: "Manage Bots", href: "/admin/bots", icon: <Bot className="h-5 w-5" /> },
  ]

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50",
        "w-64 bg-white border-r border-gray-200",
        "flex flex-col",
        isMobile && !isOpen && "-translate-x-full",
        "transition-transform duration-200 ease-in-out",
      )}
    >
      {isMobile && (
        <Button variant="ghost" size="icon" className="absolute -right-12 top-4" onClick={toggleSidebar}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
        <p className="text-sm text-gray-500">Manage your platform</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
              activePage === item.name.toLowerCase().replace(/\s+/g, "-")
                ? "bg-primary text-primary-foreground"
                : "text-gray-700 hover:bg-gray-100",
            )}
            onClick={() => isMobile && setIsOpen(false)}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>

      {isMobile && isOpen && <div className="fixed inset-0 bg-black/50 -z-10" onClick={() => setIsOpen(false)} />}
    </aside>
  )
}

