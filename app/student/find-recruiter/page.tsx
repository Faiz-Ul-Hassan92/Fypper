import { StudentLayout } from "../components/student-layout"
import { Search, Filter, Building2, MapPin, Briefcase, Eye, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function FindRecruiter() {
  return (
    <StudentLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Find Recruiter</h1>
        <p className="text-muted-foreground mb-6">
          Connect with industry recruiters interested in FYP projects and potential hires.
        </p>

        <div className="flex flex-col gap-6">
          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by company, industry, or job roles..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Results section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Recruiter Card 1 */}
            <Card className="h-[360px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="TechInnovate" />
                    <AvatarFallback>TI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>TechInnovate</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" /> Software Development
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Location
                    </h4>
                    <p className="text-sm">San Francisco, CA (Remote Available)</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      Hiring For
                    </h4>
                    <p className="text-sm line-clamp-2">Software Engineers, UX Designers, Product Managers</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">AI</Badge>
                      <Badge variant="secondary">Web Development</Badge>
                      <Badge variant="secondary">Mobile Apps</Badge>
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

            {/* Recruiter Card 2 */}
            <Card className="h-[360px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="DataSphere" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>DataSphere</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" /> Data Analytics
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Location
                    </h4>
                    <p className="text-sm">London, UK</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      Hiring For
                    </h4>
                    <p className="text-sm line-clamp-2">Data Scientists, ML Engineers, Data Analysts</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Big Data</Badge>
                      <Badge variant="secondary">Machine Learning</Badge>
                      <Badge variant="secondary">Data Visualization</Badge>
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

            {/* Recruiter Card 3 */}
            <Card className="h-[360px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="SecureNet" />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>SecureNet</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" /> Cybersecurity
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Location
                    </h4>
                    <p className="text-sm">Toronto, Canada</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      Hiring For
                    </h4>
                    <p className="text-sm line-clamp-2">Security Analysts, Network Engineers, Penetration Testers</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Network Security</Badge>
                      <Badge variant="secondary">Penetration Testing</Badge>
                      <Badge variant="secondary">Security Architecture</Badge>
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

