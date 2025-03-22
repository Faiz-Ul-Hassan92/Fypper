"use client"

import { useState, useRef, useEffect } from "react"
import SupervisorLayout from "../components/supervisor-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Paperclip, Video, Phone, MoreVertical, Users, User, Calendar, MessageSquare } from "lucide-react"

// Types
interface ChatUser {
  id: string
  name: string
  avatar: string
  lastMessage?: string
  time?: string
  unread?: number
  group?: string
  members?: number
  type: "group" | "individual"
}

interface Message {
  id: string
  senderId: string
  senderName: string
  text: string
  timestamp: string
  isRead: boolean
}

// Mock data
const mockChats: ChatUser[] = [
  {
    id: "g1",
    name: "AI Health Monitoring Team",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "We've completed the data collection phase",
    time: "10:30 AM",
    unread: 3,
    members: 3,
    type: "group",
  },
  {
    id: "g2",
    name: "Blockchain Supply Chain Group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can we schedule a meeting to discuss the architecture?",
    time: "Yesterday",
    members: 2,
    type: "group",
  },
  {
    id: "i1",
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for the feedback on my report",
    time: "11:45 AM",
    unread: 1,
    group: "AI Health Monitoring Team",
    type: "individual",
  },
  {
    id: "i2",
    name: "Emily Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've updated the project timeline",
    time: "Yesterday",
    group: "Blockchain Supply Chain Group",
    type: "individual",
  },
]

const mockMessages: Record<string, Message[]> = {
  g1: [
    {
      id: "1",
      senderId: "student1",
      senderName: "John Smith",
      text: "We've completed the data collection phase for the health monitoring system. Here's the summary of what we've gathered so far.",
      timestamp: "10:30 AM",
      isRead: true,
    },
    {
      id: "2",
      senderId: "student2",
      senderName: "Emily Chen",
      text: "I can make it at 2 PM as well. I'll focus on explaining the data preprocessing steps we've implemented.",
      timestamp: "11:20 AM",
      isRead: true,
    },
  ],
  g2: [
    {
      id: "3",
      senderId: "student3",
      senderName: "Sarah Davis",
      text: "I've shared the blockchain implementation document for review.",
      timestamp: "Yesterday, 3:45 PM",
      isRead: true,
    },
    {
      id: "4",
      senderId: "supervisor",
      senderName: "Dr. Robert Chen",
      text: "Great work! Let's discuss this in our next meeting.",
      timestamp: "Yesterday, 4:00 PM",
      isRead: true,
    },
  ],
  i1: [
    {
      id: "5",
      senderId: "student1",
      senderName: "John Smith",
      text: "Thank you for the feedback on my report.",
      timestamp: "11:45 AM",
      isRead: false,
    },
  ],
  i2: [
    {
      id: "6",
      senderId: "student2",
      senderName: "Emily Chen",
      text: "I've updated the project timeline as requested.",
      timestamp: "Yesterday",
      isRead: true,
    },
  ],
}

export default function SupervisorChat() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null)
  const [currentMessage, setCurrentMessage] = useState("")
  const [activeTab, setActiveTab] = useState<"groups" | "individual">("groups")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter chats based on search query and active tab
  const filteredChats = mockChats.filter(
    (chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()) && chat.type === activeTab,
  )

  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    scrollToBottom()
  }, [selectedChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedChat) return

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: "supervisor",
      senderName: "Dr. Robert Chen",
      text: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
    }

    mockMessages[selectedChat.id] = [...(mockMessages[selectedChat.id] || []), newMessage]
    setCurrentMessage("")
    setTimeout(scrollToBottom, 100)
  }

  return (
    <SupervisorLayout>
      <div className="h-[calc(100vh-2rem)] flex flex-col">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Chat</h1>
          <p className="text-muted-foreground mt-1">Communicate with your students and groups</p>
        </div>

        <div className="flex-1 flex overflow-hidden rounded-lg border">
          {/* Chat List */}
          <div className="w-80 border-r bg-white flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "groups" | "individual")}
              className="flex-1 flex flex-col"
            >
              <TabsList className="grid grid-cols-2 px-4 py-2">
                <TabsTrigger value="groups">
                  <Users className="h-4 w-4 mr-2" />
                  Groups
                </TabsTrigger>
                <TabsTrigger value="individual">
                  <User className="h-4 w-4 mr-2" />
                  Individual
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer border-b ${
                      selectedChat?.id === chat.id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <Avatar>
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread && <Badge className="ml-2">{chat.unread}</Badge>}
                      </div>
                      {chat.type === "group" ? (
                        <div className="flex items-center mt-1">
                          <Users className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{chat.members} members</span>
                        </div>
                      ) : (
                        <div className="flex items-center mt-1">
                          <Users className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{chat.group}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedChat.name}</h3>
                      <div className="flex items-center">
                        {selectedChat.type === "group" ? (
                          <>
                            <Users className="h-3 w-3 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">
                              {selectedChat.members} members • Active now
                            </span>
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground">{selectedChat.group}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Calendar className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {mockMessages[selectedChat.id]?.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "supervisor" ? "justify-end" : "justify-start"}`}
                      >
                        {message.senderId !== "supervisor" && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={message.senderName} />
                            <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.senderId === "supervisor" ? "bg-primary text-primary-foreground" : "bg-gray-100"
                          }`}
                        >
                          {message.senderId !== "supervisor" && (
                            <p className="text-xs font-medium mb-1">{message.senderName}</p>
                          )}
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.senderId === "supervisor" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                        {message.senderId === "supervisor" && (
                          <Avatar className="h-8 w-8 ml-2">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Robert Chen" />
                            <AvatarFallback>RC</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      className="rounded-full"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button size="icon" className="rounded-full" onClick={handleSendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
                <MessageSquare size={64} className="text-blue-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">No conversation selected</h3>
                <p className="text-gray-600 max-w-md">Select a conversation from the list to begin chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SupervisorLayout>
  )
}

