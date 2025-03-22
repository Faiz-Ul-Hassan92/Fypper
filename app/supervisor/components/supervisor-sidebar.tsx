"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Home,
  FileText,
  BookOpen,
  Users,
  PenTool,
  Briefcase,
  MessageSquare,
  Calendar,
  Menu,
  X,
  LogOut,
  Lock,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"

interface SupervisorSidebarProps {
  activePath?: string
  onPasswordChange?: () => void
}

export default function SupervisorSidebar({
  activePath = "/supervisor/dashboard",
  onPasswordChange,
}: SupervisorSidebarProps) {
  const router = useRouter()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(!isMobile)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleSignOut = () => {
    router.push("/registration/login")
  }

  const handlePasswordChange = () => {
    if (onPasswordChange) {
      onPasswordChange()
    }
  }

  const navItems = [
    { name: "Dashboard", href: "/supervisor/dashboard", icon: <Home className="mr-2 h-5 w-5" /> },
    { name: "Give Reference", href: "/supervisor/give-reference", icon: <FileText className="mr-2 h-5 w-5" /> },
    { name: "View FYP Repo", href: "/supervisor/fyp-repo", icon: <BookOpen className="mr-2 h-5 w-5" /> },
    { name: "Manage Proposals", href: "/supervisor/manage-proposals", icon: <Users className="mr-2 h-5 w-5" /> },
    { name: "Post FYP Topics", href: "/supervisor/post-topic", icon: <PenTool className="mr-2 h-5 w-5" /> },
    { name: "Current FYPs", href: "/supervisor/current-fyps", icon: <Briefcase className="mr-2 h-5 w-5" /> },
    { name: "Chat", href: "/supervisor/chat", icon: <MessageSquare className="mr-2 h-5 w-5" /> },
    { name: "Schedule Meetings", href: "/supervisor/schedule-meetings", icon: <Calendar className="mr-2 h-5 w-5" /> },
    { name: "Bots", href: "/supervisor/bots", icon: <Bot className="mr-2 h-5 w-5" /> },
  ]

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      <div
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg 
                    transition-transform duration-300 ease-in-out md:translate-x-0
                    flex flex-col h-full`}
      >
        <div className="p-4 border-b shrink-0">
          <h2 className="text-xl font-bold">Supervisor Portal</h2>
        </div>

        <ScrollArea className="flex-1">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activePath === item.href ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t mt-auto shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Robert Chen" />
                  <AvatarFallback>RC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-800">Dr. Robert Chen</p>
                  <p className="text-xs text-gray-600">Supervisor</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handlePasswordChange}>
                <Lock className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

