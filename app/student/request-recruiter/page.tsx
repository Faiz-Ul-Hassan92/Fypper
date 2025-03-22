import { StudentLayout } from "../components/student-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function RequestRecruiter() {
  return (
    <StudentLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Request Recruiter</h1>
        <p className="text-muted-foreground mb-6">Connect with industry recruiters interested in FYP projects.</p>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recruiters by company, industry, or job roles..."
              className="pl-8"
            />
          </div>
          <Button>Search</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Recruiter cards would go here */}
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-1">TechInnovate Solutions</h3>
            <p className="text-sm text-muted-foreground mb-2">Software Development</p>
            <p className="text-sm mb-4">
              Looking for talented graduates with experience in web development and cloud technologies.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                View Profile
              </Button>
              <Button size="sm" className="ml-2">
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}

