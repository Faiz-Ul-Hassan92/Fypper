import { StudentLayout } from "../components/student-layout"
import { Search, Filter, Eye, Users, BookOpen, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function FindSupervisor() {
  return (
    <StudentLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Find Supervisor</h1>
        <p className="text-muted-foreground mb-6">Search for supervisors and request their guidance for your FYP.</p>

        <div className="flex flex-col gap-6">
          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, department, or research area..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Results section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Supervisor Card 1 */}
            <Card className="h-[360px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Dr. Sarah Johnson" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Dr. Sarah Johnson</CardTitle>
                    <CardDescription>Computer Science Department</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Specialization
                    </h4>
                    <p className="text-sm line-clamp-2">
                      AI, Machine Learning, and Data Science with a focus on neural networks.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      Research Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">AI</Badge>
                      <Badge variant="secondary">Machine Learning</Badge>
                      <Badge variant="secondary">Data Science</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Current Projects
                    </h4>
                    <p className="text-sm">Currently supervising 3 projects</p>
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

            {/* Supervisor Card 2 */}
            <Card className="h-[360px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Prof. Michael Chen" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Prof. Michael Chen</CardTitle>
                    <CardDescription>Software Engineering Department</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Specialization
                    </h4>
                    <p className="text-sm line-clamp-2">
                      Software Architecture, Cloud Computing, and DevOps with extensive industry experience.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      Research Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Software Architecture</Badge>
                      <Badge variant="secondary">Cloud Computing</Badge>
                      <Badge variant="secondary">DevOps</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Current Projects
                    </h4>
                    <p className="text-sm">Currently supervising 2 projects</p>
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

            {/* Supervisor Card 3 */}
            <Card className="h-[360px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Dr. Emily Rodriguez" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Dr. Emily Rodriguez</CardTitle>
                    <CardDescription>Cybersecurity Department</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Specialization
                    </h4>
                    <p className="text-sm line-clamp-2">
                      Network Security, Cryptography, and Ethical Hacking with a PhD in Advanced Cryptographic
                      Protocols.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      Research Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Network Security</Badge>
                      <Badge variant="secondary">Cryptography</Badge>
                      <Badge variant="secondary">Ethical Hacking</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Current Projects
                    </h4>
                    <p className="text-sm">Currently supervising 4 projects</p>
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

