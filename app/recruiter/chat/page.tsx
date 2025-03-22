"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  MessageSquare,
  Users,
  History,
  FileText,
  Search,
  MoreVertical,
  Send,
  Flag,
  Paperclip,
  Building,
  Pin,
  Trash2,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

// Types for our data
type UserType = "student" | "supervisor" | "recruiter"

interface User {
  id: string
  name: string
  avatar: string
  type: UserType
  lastSeen?: string
  isPinned?: boolean
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  isRead: boolean
}

interface Conversation {
  id: string
  participants: User[]
  messages: Message[]
  lastMessageTime: string
}

// Mock data
const currentUser: User = {
  id: "user1",
  name: "Jane Smith",
  avatar: "/placeholder.svg?height=200&width=200",
  type: "recruiter",
}

const mockUsers: User[] = [
  {
    id: "user2",
    name: "Dr. Robert Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "supervisor",
    lastSeen: "2 min ago",
    isPinned: true,
  },
  {
    id: "user3",
    name: "Prof. Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "supervisor",
    lastSeen: "1 hour ago",
  },
  {
    id: "user4",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "student",
    lastSeen: "3 hours ago",
  },
  {
    id: "user5",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "student",
    lastSeen: "5 min ago",
    isPinned: true,
  },
  {
    id: "user6",
    name: "Dr. James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "supervisor",
    lastSeen: "Just now",
  },
  {
    id: "user7",
    name: "Sophia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "student",
    lastSeen: "Yesterday",
  },
  {
    id: "user8",
    name: "Prof. David Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "supervisor",
    lastSeen: "2 days ago",
  },
]

const mockConversations: Record<string, Conversation> = {
  user2: {
    id: "conv1",
    participants: [currentUser, mockUsers[0]],
    lastMessageTime: "10:42 AM",
    messages: [
      {
        id: "msg1",
        senderId: "user2",
        text: "Hello, I'm interested in supervising projects related to AI and machine learning.",
        timestamp: "Yesterday, 2:30 PM",
        isRead: true,
      },
      {
        id: "msg2",
        senderId: "user1",
        text: "That's great! We have several students looking for supervisors in that area.",
        timestamp: "Yesterday, 3:15 PM",
        isRead: true,
      },
      {
        id: "msg3",
        senderId: "user2",
        text: "Could you share some project proposals with me?",
        timestamp: "Yesterday, 4:00 PM",
        isRead: true,
      },
      {
        id: "msg4",
        senderId: "user1",
        text: "Of course! I'll compile a list and send it to you by tomorrow.",
        timestamp: "Yesterday, 4:30 PM",
        isRead: true,
      },
      {
        id: "msg5",
        senderId: "user2",
        text: "Thank you. I'm particularly interested in natural language processing projects.",
        timestamp: "Today, 9:15 AM",
        isRead: true,
      },
      {
        id: "msg6",
        senderId: "user1",
        text: "I'll make sure to include those. We have a few promising students working on NLP.",
        timestamp: "Today, 10:42 AM",
        isRead: false,
      },
    ],
  },
  user4: {
    id: "conv2",
    participants: [currentUser, mockUsers[2]],
    lastMessageTime: "Yesterday",
    messages: [
      {
        id: "msg7",
        senderId: "user4",
        text: "Hi, I'm looking for internship opportunities in software development.",
        timestamp: "2 days ago, 11:20 AM",
        isRead: true,
      },
      {
        id: "msg8",
        senderId: "user1",
        text: "Hello Michael! We have several companies looking for interns. What's your area of interest?",
        timestamp: "2 days ago, 12:05 PM",
        isRead: true,
      },
      {
        id: "msg9",
        senderId: "user4",
        text: "I'm interested in full-stack development, particularly with React and Node.js.",
        timestamp: "2 days ago, 1:30 PM",
        isRead: true,
      },
      {
        id: "msg10",
        senderId: "user1",
        text: "Great! I'll check our database and get back to you with some matches.",
        timestamp: "Yesterday, 9:00 AM",
        isRead: true,
      },
    ],
  },
}

export default function ChatPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(mockUsers[0])
  const [currentMessage, setCurrentMessage] = useState("")
  const [conversations, setConversations] = useState(mockConversations)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportedMessage, setReportedMessage] = useState<Message | null>(null)
  const [reportReason, setReportReason] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Navigation handlers
  const navigateTo = (path: string) => {
    router.push(path)
  }

  // Filter users based on search query
  const filteredUsers = mockUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort users: pinned first, then by last message time
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    scrollToBottom()
    // Make sure we're showing the correct conversation for the selected user
    if (selectedUser && !conversations[selectedUser.id]) {
      // Initialize an empty conversation if none exists for this user
      setConversations((prev) => ({
        ...prev,
        [selectedUser.id]: {
          id: `conv${Date.now()}`,
          participants: [currentUser, selectedUser],
          messages: [],
          lastMessageTime: selectedUser.lastSeen || "No messages yet",
        },
      }))
    }
  }, [selectedUser])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedUser) return

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: currentUser.id,
      text: currentMessage,
      timestamp: `Today, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      isRead: false,
    }

    setConversations((prev) => {
      const updatedConversations = { ...prev }

      if (updatedConversations[selectedUser.id]) {
        updatedConversations[selectedUser.id] = {
          ...updatedConversations[selectedUser.id],
          messages: [...updatedConversations[selectedUser.id].messages, newMessage],
          lastMessageTime: "Just now",
        }
      } else {
        updatedConversations[selectedUser.id] = {
          id: `conv${Date.now()}`,
          participants: [currentUser, selectedUser],
          messages: [newMessage],
          lastMessageTime: "Just now",
        }
      }

      return updatedConversations
    })

    setCurrentMessage("")

    // Scroll to bottom after sending
    setTimeout(scrollToBottom, 100)
  }

  // Handle reporting a message
  const handleReportMessage = (message: Message) => {
    setReportedMessage(message)
    setReportDialogOpen(true)
  }

  // Submit report
  const submitReport = () => {
    if (!reportedMessage || !reportReason) return

    // Here you would send the report to your backend
    console.log("Reported message:", reportedMessage, "Reason:", reportReason)

    // Reset and close dialog
    setReportReason("")
    setReportedMessage(null)
    setReportDialogOpen(false)
  }

  // Pin a conversation
  const togglePinConversation = (user: User) => {
    const updatedUsers = mockUsers.map((u) => {
      if (u.id === user.id) {
        return { ...u, isPinned: !u.isPinned }
      }
      return u
    })
    // In a real app, you would update this in your backend
    console.log("Toggled pin for:", user.name)
  }

  // Delete a conversation
  const deleteConversation = (user: User) => {
    const updatedConversations = { ...conversations }
    delete updatedConversations[user.id]
    setConversations(updatedConversations)

    if (selectedUser?.id === user.id) {
      setSelectedUser(null)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Sidebar */}
        <Sidebar className="border-r border-blue-200">
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
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/dashboard")}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center space-x-2 text-blue-700" isActive>
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/applications")}
                >
                  <Users className="h-5 w-5" />
                  <span>Student Applications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/past-fyps")}
                >
                  <History className="h-5 w-5" />
                  <span>Past FYPs Offered</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center space-x-2 text-blue-700"
                  onClick={() => navigateTo("/recruiter/projects")}
                >
                  <FileText className="h-5 w-5" />
                  <span>Post Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-blue-200 p-4">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-blue-800">{currentUser.name}</p>
                <p className="text-xs text-blue-600">Recruiter</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Contacts List */}
          <div className="w-1/3 border-r border-blue-200 bg-white flex flex-col">
            <div className="p-4 border-b border-blue-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 border-blue-200 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              {sortedUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-50 border-b border-blue-100 relative ${
                    selectedUser?.id === user.id ? "bg-blue-100" : ""
                  } ${user.type === "supervisor" ? "bg-purple-50" : ""}`}
                  onClick={() => setSelectedUser(user)}
                >
                  {user.isPinned && (
                    <div className="absolute top-2 right-10 text-blue-500">
                      <Pin size={14} />
                    </div>
                  )}
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-blue-800 truncate">{user.name}</p>
                      <span className="text-xs text-blue-500">
                        {conversations[user.id]?.lastMessageTime || user.lastSeen}
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 truncate">
                      {user.type === "supervisor" ? "Supervisor" : "Student"}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => togglePinConversation(user)}>
                        <Pin className="mr-2 h-4 w-4" />
                        <span>{user.isPinned ? "Unpin" : "Pin"}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteConversation(user)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>View Profile</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-blue-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                      <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-blue-800">{selectedUser.name}</p>
                      <p className="text-xs text-blue-500">
                        {selectedUser.type === "supervisor" ? "Supervisor" : "Student"} • {selectedUser.lastSeen}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => togglePinConversation(selectedUser)}>
                        <Pin className="mr-2 h-4 w-4" />
                        <span>{selectedUser.isPinned ? "Unpin" : "Pin"}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteConversation(selectedUser)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete Conversation</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>View Profile</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedUser &&
                      conversations[selectedUser.id]?.messages.map((message) => {
                        const isCurrentUser = message.senderId === currentUser.id

                        return (
                          <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                            <div className="relative group">
                              <div
                                className={`max-w-xs sm:max-w-md rounded-lg p-3 ${
                                  isCurrentUser
                                    ? "bg-blue-600 text-white rounded-tr-none"
                                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                                }`}
                              >
                                <p>{message.text}</p>
                                <div className={`text-xs mt-1 ${isCurrentUser ? "text-blue-200" : "text-gray-500"}`}>
                                  {message.timestamp}
                                </div>
                              </div>

                              {/* Report button (only visible on hover and for messages not from current user) */}
                              {!isCurrentUser && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleReportMessage(message)}
                                >
                                  <Flag size={12} className="text-red-500" />
                                </Button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-blue-200">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Paperclip size={20} />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      className="border-blue-200 focus:border-blue-500"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button className="shrink-0 bg-blue-600 hover:bg-blue-700" size="icon" onClick={handleSendMessage}>
                      <Send size={20} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
                <MessageSquare size={64} className="text-blue-300 mb-4" />
                <h3 className="text-xl font-medium text-blue-800 mb-2">No conversation selected</h3>
                <p className="text-blue-600 max-w-md">
                  Select a conversation from the list or start a new one to begin chatting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Message Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Message</DialogTitle>
            <DialogDescription>
              Please provide a reason for reporting this message. Our team will review it.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-gray-100 p-3 rounded-md my-4">
            <p className="text-sm text-gray-800">{reportedMessage?.text}</p>
            <p className="text-xs text-gray-500 mt-1">{reportedMessage?.timestamp}</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="reportReason" className="text-sm font-medium text-blue-700">
              Reason for reporting
            </label>
            <textarea
              id="reportReason"
              className="w-full p-2 border border-blue-200 rounded-md focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
              placeholder="Please explain why you're reporting this message..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={submitReport}
              disabled={!reportReason.trim()}
            >
              Report Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}

