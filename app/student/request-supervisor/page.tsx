import { StudentLayout } from "../components/student-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function RequestSupervisor() {
  return (
    <StudentLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Request Supervisor</h1>
        <p className="text-muted-foreground mb-6">Search and request a supervisor for your Final Year Project.</p>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search supervisors by name, department, or research area..."
              className="pl-8"
            />
          </div>
          <Button>Search</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Supervisor cards would go here */}
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-1">Dr. Sarah Wilson</h3>
            <p className="text-sm text-muted-foreground mb-2">AI & Machine Learning</p>
            <p className="text-sm mb-4">Specializes in natural language processing and computer vision applications.</p>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                View Profile
              </Button>
              <Button size="sm" className="ml-2">
                Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}

