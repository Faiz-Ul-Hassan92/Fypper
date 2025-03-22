import { StudentLayout } from "../components/student-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function BrowseFYPs() {
  return (
    <StudentLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Browse FYPs</h1>
        <p className="text-muted-foreground mb-6">Search and explore available Final Year Projects.</p>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search projects by title, keywords, or supervisor..." className="pl-8" />
          </div>
          <Button>Search</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* FYP cards would go here */}</div>
      </div>
    </StudentLayout>
  )
}

