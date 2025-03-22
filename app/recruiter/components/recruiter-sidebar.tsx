"use client"

import { useRouter } from "next/navigation"
import { Home, MessageSquare, Users, History, FileText, Building, LogOut, Lock, Bot } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface RecruiterSidebarProps {
  activePath?: string
  onPasswordChange?: () => void
}

export default function RecruiterSidebar({
  activePath = "/recruiter/dashboard",
  onPasswordChange,
}: RecruiterSidebarProps) {
  const router = useRouter()

  // Navigation handlers
  const navigateTo = (path: string) => {
    router.push(path)
  }

  // Handle sign out
  const handleSignOut = () => {
    // Here you would implement sign out logic
    console.log("Sign out requested")
    // Redirect to login page or clear session
    router.push("/registration/login")
  }

  // Handle password change dialog
  const handlePasswordChange = () => {
    if (onPasswordChange) {
      onPasswordChange()
    }
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-blue-200 w-64 fixed left-0 top-0 h-screen z-30 bg-white">
        <SidebarHeader className="border-b border-blue-200 p-4">
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-800">FYP Connect</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex items-center space-x-2 text-blue-700 w-full py-3 px-4 text-base font-medium"
                isActive={activePath === "/recruiter/dashboard"}
                onClick={() => navigateTo("/recruiter/dashboard")}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex items-center space-x-2 text-blue-700 w-full py-3 px-4 text-base font-medium"
                isActive={activePath === "/recruiter/chat"}
                onClick={() => navigateTo("/recruiter/chat")}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex items-center space-x-2 text-blue-700 w-full py-3 px-4 text-base font-medium"
                isActive={activePath === "/recruiter/applications"}
                onClick={() => navigateTo("/recruiter/applications")}
              >
                <Users className="h-5 w-5" />
                <span>Student Applications</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex items-center space-x-2 text-blue-700 w-full py-3 px-4 text-base font-medium"
                isActive={activePath === "/recruiter/past-fyps"}
                onClick={() => navigateTo("/recruiter/past-fyps")}
              >
                <History className="h-5 w-5" />
                <span>Past FYPs Offered</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex items-center space-x-2 text-blue-700 w-full py-3 px-4 text-base font-medium"
                isActive={activePath === "/recruiter/projects"}
                onClick={() => navigateTo("/recruiter/projects")}
              >
                <FileText className="h-5 w-5" />
                <span>Post Projects</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="flex items-center space-x-2 text-blue-700 w-full py-3 px-4 text-base font-medium"
                isActive={activePath === "/recruiter/bots"}
                onClick={() => navigateTo("/recruiter/bots")}
              >
                <Bot className="h-5 w-5" />
                <span>Bots</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-blue-200 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=200&width=200" alt="Jane Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-blue-800">Jane Smith</p>
                  <p className="text-xs text-blue-600">Recruiter</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

