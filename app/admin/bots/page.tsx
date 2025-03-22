"use client"

import { useState } from "react"
import { BotIcon, Pencil, Trash2, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import AdminLayout from "../components/admin-layout"

// Define bot type
interface Bot {
  id: string
  name: string
  voice: string
}

// Mock data for bots
const initialBots: Bot[] = [
  { id: "1", name: "Assistant Bot", voice: "Female (US)" },
  { id: "2", name: "Support Bot", voice: "Male (UK)" },
  { id: "3", name: "Guidance Bot", voice: "Female (AU)" },
  { id: "4", name: "Tutor Bot", voice: "Male (US)" },
]

// Voice options
const voiceOptions = [
  "Female (US)",
  "Female (UK)",
  "Female (AU)",
  "Female (IN)",
  "Male (US)",
  "Male (UK)",
  "Male (AU)",
  "Male (IN)",
]

export default function BotsPage() {
  const [bots, setBots] = useState<Bot[]>(initialBots)
  const [searchQuery, setSearchQuery] = useState("")
  const [newBotName, setNewBotName] = useState("")
  const [newBotVoice, setNewBotVoice] = useState(voiceOptions[0])
  const [editBot, setEditBot] = useState<Bot | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Filter bots based on search query
  const filteredBots = bots.filter((bot) => bot.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Add new bot
  const handleAddBot = () => {
    if (newBotName.trim() === "") return

    const newBot: Bot = {
      id: Date.now().toString(),
      name: newBotName,
      voice: newBotVoice,
    }

    setBots([...bots, newBot])
    setNewBotName("")
    setNewBotVoice(voiceOptions[0])
    setIsAddDialogOpen(false)
  }

  // Edit bot
  const handleEditBot = () => {
    if (!editBot || editBot.name.trim() === "") return

    setBots(bots.map((bot) => (bot.id === editBot.id ? editBot : bot)))

    setEditBot(null)
    setIsEditDialogOpen(false)
  }

  // Delete bot
  const handleDeleteBot = (id: string) => {
    setBots(bots.filter((bot) => bot.id !== id))
  }

  return (
    <AdminLayout activePage="manage-bots">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Manage Bots</h1>
            <p className="text-gray-500">Add, edit, and remove bots from your platform</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Bot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bot</DialogTitle>
                <DialogDescription>Create a new bot with a name and voice.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Bot Name</Label>
                  <Input
                    id="name"
                    value={newBotName}
                    onChange={(e) => setNewBotName(e.target.value)}
                    placeholder="Enter bot name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="voice">Bot Voice</Label>
                  <Select value={newBotVoice} onValueChange={setNewBotVoice}>
                    <SelectTrigger id="voice">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voiceOptions.map((voice) => (
                        <SelectItem key={voice} value={voice}>
                          {voice}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBot}>Add Bot</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search bots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredBots.length === 0 ? (
          <div className="text-center py-10">
            <BotIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No bots found</h3>
            <p className="mt-1 text-gray-500">
              {searchQuery ? "Try a different search term" : "Add your first bot to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBots.map((bot) => (
              <Card key={bot.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center gap-2">
                    <BotIcon className="h-5 w-5" />
                    {bot.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Voice:</span>
                      <span className="ml-2">{bot.voice}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <Dialog
                    open={isEditDialogOpen && editBot?.id === bot.id}
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open)
                      if (!open) setEditBot(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditBot(bot)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Bot</DialogTitle>
                        <DialogDescription>Update the bot's name and voice.</DialogDescription>
                      </DialogHeader>

                      {editBot && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-name">Bot Name</Label>
                            <Input
                              id="edit-name"
                              value={editBot.name}
                              onChange={(e) => setEditBot({ ...editBot, name: e.target.value })}
                              placeholder="Enter bot name"
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="edit-voice">Bot Voice</Label>
                            <Select
                              value={editBot.voice}
                              onValueChange={(value) => setEditBot({ ...editBot, voice: value })}
                            >
                              <SelectTrigger id="edit-voice">
                                <SelectValue placeholder="Select voice" />
                              </SelectTrigger>
                              <SelectContent>
                                {voiceOptions.map((voice) => (
                                  <SelectItem key={voice} value={voice}>
                                    {voice}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditBot(null)
                            setIsEditDialogOpen(false)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleEditBot}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Bot</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this bot? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteBot(bot.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

