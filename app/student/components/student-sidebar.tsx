"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  Users,
  Search,
  MessageSquare,
  MessageCircle,
  UserPlus,
  Briefcase,
  ChevronDown,
  Settings,
  LogOut,
  UserSearch,
  Bot,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StudentSidebarProps {
  pathname: string
}

export function StudentSidebar({ pathname }: StudentSidebarProps) {
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      title: "Dashboard",
      href: "/student/dashboard",
      icon: Home,
    },
    {
      title: "Group Formation",
      href: "/student/group-formation",
      icon: Users,
    },
    {
      title: "Browse FYPs",
      href: "/student/browse-fyps",
      icon: Search,
    },
    {
      title: "Chat",
      href: "/student/chat",
      icon: MessageSquare,
    },
    {
      title: "Open Forum",
      href: "/student/open-forum",
      icon: MessageCircle,
    },
    {
      title: "Find Supervisor",
      href: "/student/find-supervisor",
      icon: UserPlus,
    },
    {
      title: "Find Recruiter",
      href: "/student/find-recruiter",
      icon: Briefcase,
    },
    {
      title: "Find Student",
      href: "/student/find-student",
      icon: UserSearch,
    },
    {
      title: "Bots",
      href: "/student/bots",
      icon: Bot,
    },
  ]

  return (
    <div className="flex flex-col h-full border-r bg-background">
      {/* Header */}
      <div className="px-6 py-5 border-b shrink-0">
        <h2 className="text-xl font-bold">Student Portal</h2>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                pathname === item.href ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* Footer with profile */}
      <div className="mt-auto border-t p-4 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start px-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Student" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">Alex Johnson</span>
                  <span className="text-xs text-muted-foreground">Computer Science</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Change Password</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

