import { Skeleton } from "@/components/ui/skeleton"
import { StudentLayout } from "../components/student-layout"

export default function DashboardLoading() {
  return (
    <StudentLayout>
      <div className="p-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-full max-w-md mb-6" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>
    </StudentLayout>
  )
}

