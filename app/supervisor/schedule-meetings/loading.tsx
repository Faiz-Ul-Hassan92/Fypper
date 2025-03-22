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
          <Skeleton className="h-10 w-40" />
        </div>

        <Skeleton className="h-10 w-[400px] mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-6 w-64 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-48" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-40" />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Skeleton className="h-4 w-4 mt-1" />
                    <div>
                      <Skeleton className="h-4 w-40 mb-1" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Skeleton className="h-9 w-40" />
                    <Skeleton className="h-9 w-40" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </SupervisorLayout>
  )
}

