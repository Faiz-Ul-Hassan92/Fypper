import { Skeleton } from "@/components/ui/skeleton"
import { StudentLayout } from "../components/student-layout"

export default function ChatLoading() {
  return (
    <StudentLayout>
      <div className="flex h-full">
        <div className="w-64 border-r h-full">
          <div className="p-4 border-b">
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="p-4">
            <Skeleton className="h-8 w-full mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col h-full">
          <div className="p-4 border-b">
            <Skeleton className="h-5 w-40 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>

          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              <Skeleton className="h-16 w-2/3 ml-auto rounded-lg" />
              <Skeleton className="h-16 w-2/3 rounded-lg" />
              <Skeleton className="h-16 w-2/3 ml-auto rounded-lg" />
            </div>
          </div>

          <div className="p-4 border-t">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}

