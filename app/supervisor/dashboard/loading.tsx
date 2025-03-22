import { Skeleton } from "@/components/ui/skeleton"
import SupervisorLayout from "../components/supervisor-layout"

export default function Loading() {
  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64 mb-6" />

            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-start space-x-4 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64 mb-6" />

            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                  <Skeleton className="h-3 w-16 ml-auto" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </SupervisorLayout>
  )
}

