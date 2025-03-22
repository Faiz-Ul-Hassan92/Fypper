import { StudentLayout } from "../components/student-layout"
import { Search, Filter, GraduationCap, Code, BookOpen, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function FindStudent() {
  return (
    <StudentLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Find Student</h1>
        <p className="text-muted-foreground mb-6">
          Connect with other students to collaborate on projects or form FYP groups.
        </p>

        <div className="flex flex-col gap-6">
          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, skills, or interests..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Results section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Student Card 1 */}
            <Card className="h-[360px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="James Wilson" />
                    <AvatarFallback>JW</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>James Wilson</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" /> Computer Science
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Code className="h-4 w-4 text-muted-foreground" />
                      Skills
                    </h4>
                    <p className="text-sm line-clamp-2">React, Node.js, Python, TypeScript, MongoDB</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Interests
                    </h4>
                    <p className="text-sm line-clamp-1">Web Development, AI, Mobile Apps</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      Status
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Looking for Group</Badge>
                      <Badge variant="outline">3.8 GPA</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex gap-2 p-4">
                <Button variant="outline" className="flex-1 flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button className="flex-1">Request</Button>
              </CardFooter>
            </Card>

            {/* Student Card 2 */}
            <Card className="h-[360px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Sophia Chen" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Sophia Chen</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" /> Data Science
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Code className="h-4 w-4 text-muted-foreground" />
                      Skills
                    </h4>
                    <p className="text-sm line-clamp-2">Python, R, TensorFlow, PyTorch, SQL, Data Analysis</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Interests
                    </h4>
                    <p className="text-sm line-clamp-1">Machine Learning, Data Visualization, NLP</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      Status
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Has Project Idea</Badge>
                      <Badge variant="outline">3.9 GPA</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex gap-2 p-4">
                <Button variant="outline" className="flex-1 flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button className="flex-1">Request</Button>
              </CardFooter>
            </Card>

            {/* Student Card 3 */}
            <Card className="h-[360px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Marcus Johnson" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Marcus Johnson</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" /> Cybersecurity
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Code className="h-4 w-4 text-muted-foreground" />
                      Skills
                    </h4>
                    <p className="text-sm line-clamp-2">Network Security, Ethical Hacking, Cryptography, C++, Python</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Interests
                    </h4>
                    <p className="text-sm line-clamp-1">Blockchain Security, IoT Security, Penetration Testing</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      Status
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Looking for Group</Badge>
                      <Badge variant="outline">3.7 GPA</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex gap-2 p-4">
                <Button variant="outline" className="flex-1 flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button className="flex-1">Request</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}

