import { Skeleton } from "@/components/ui/skeleton"
import SupervisorLayout from "../components/supervisor-layout"

export default function Loading() {
  return (
    <SupervisorLayout>
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-96 mt-1" />
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64 mb-6" />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-48 w-48 rounded-lg" />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <div className="flex space-x-2">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10 rounded-full" />
                  ))}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <div className="flex flex-wrap gap-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-8 w-24 rounded-full" />
                  ))}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>

          <div className="flex justify-between">
            <Skeleton className="h-10 w-32" />
            <div className="space-x-2">
              <Skeleton className="h-10 w-24 inline-block" />
              <Skeleton className="h-10 w-32 inline-block" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64 mb-4" />
          </div>

          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </SupervisorLayout>
  )
}

