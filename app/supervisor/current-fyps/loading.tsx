import { Skeleton } from "@/components/ui/skeleton"
import SupervisorLayout from "../components/supervisor-layout"

export default function Loading() {
  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-96 mt-1" />
          </div>
          <Skeleton className="h-10 w-64" />
        </div>

        <Skeleton className="h-10 w-[400px] mb-6" />

        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 space-y-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-32 mt-1" />
                </div>
                <Skeleton className="h-6 w-32 rounded-full" />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {Array(3)
                      .fill(0)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-10 w-10 rounded-full border-2 border-background" />
                      ))}
                  </div>
                  <div className="ml-4">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24 mt-1" />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array(3)
                  .fill(0)
                  .map((_, j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32 mt-1" />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-40" />
                <Skeleton className="h-9 w-36" />
              </div>
            </div>
          ))}
      </div>
    </SupervisorLayout>
  )
}

