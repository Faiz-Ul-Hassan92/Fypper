"use client"

import { useState } from "react"
import { Volume2, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function StudentBotsPage() {
  const [botsActive, setBotsActive] = useState(false)
  const [selectedBot, setSelectedBot] = useState<string | null>(null)
  const [testingBot, setTestingBot] = useState<string | null>(null)

  const bots = [
    {
      id: "bot1",
      name: "Study Assistant",
      voice: "Female (US)",
      avatar: "/placeholder.svg?height=80&width=80",
      description: "Helps with research, study planning, and academic questions.",
    },
    {
      id: "bot2",
      name: "Project Guide",
      voice: "Male (UK)",
      avatar: "/placeholder.svg?height=80&width=80",
      description: "Provides guidance on FYP development and technical implementation.",
    },
    {
      id: "bot3",
      name: "Career Advisor",
      voice: "Female (AU)",
      avatar: "/placeholder.svg?height=80&width=80",
      description: "Offers advice on career paths, resume building, and interview preparation.",
    },
    {
      id: "bot4",
      name: "Collaboration Helper",
      voice: "Male (US)",
      avatar: "/placeholder.svg?height=80&width=80",
      description: "Facilitates group work, task distribution, and conflict resolution.",
    },
  ]

  const handleSelectBot = (botId: string) => {
    setSelectedBot(botId)
  }

  const handleTestBot = (botId: string) => {
    setTestingBot(botId)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Bots</h1>
          <p className="text-muted-foreground mt-1">Configure and select AI assistants to help with your studies</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 bg-muted p-4 rounded-lg">
        <Switch id="activate-bots" checked={botsActive} onCheckedChange={setBotsActive} />
        <Label htmlFor="activate-bots" className="font-medium">
          Activate Bots
        </Label>
        <p className="text-sm text-muted-foreground ml-2">
          {botsActive ? "Bots are currently active and available for assistance" : "Bots are currently disabled"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {bots.map((bot) => (
          <Card key={bot.id} className={`overflow-hidden ${!botsActive ? "opacity-50" : ""}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={bot.avatar} alt={bot.name} />
                  <AvatarFallback>{bot.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {selectedBot === bot.id && (
                  <Badge variant="default" className="bg-green-600">
                    <Check className="h-3 w-3 mr-1" /> Selected
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl mt-2">{bot.name}</CardTitle>
              <CardDescription className="flex items-center">
                <Volume2 className="h-3 w-3 mr-1" /> {bot.voice}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{bot.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={!botsActive} onClick={() => handleTestBot(bot.id)}>
                    Test
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Testing {bot.name}</DialogTitle>
                    <DialogDescription>Listen to a sample of this bot's voice and responses.</DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-4 py-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={bot.avatar} alt={bot.name} />
                      <AvatarFallback>{bot.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{bot.name}</h3>
                      <p className="text-sm text-muted-foreground">{bot.voice}</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm italic">
                      "Hello, I'm {bot.name}. I'm here to assist you with your studies and FYP project. How can I help
                      you today?"
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setTestingBot(null)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant={selectedBot === bot.id ? "default" : "secondary"}
                size="sm"
                disabled={!botsActive}
                onClick={() => handleSelectBot(bot.id)}
              >
                {selectedBot === bot.id ? "Selected" : "Select"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

