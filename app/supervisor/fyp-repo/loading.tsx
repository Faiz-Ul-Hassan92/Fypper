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
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64 mb-4" />
          </div>
          <Skeleton className="h-10 w-full mb-4" />
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-32" />

                <div className="space-y-4 py-2">
                  <div className="flex items-start space-x-2">
                    <Skeleton className="h-4 w-4 mt-1" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Skeleton className="h-4 w-4 mt-1" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>

                <Skeleton className="h-10 w-full" />
              </div>
            ))}
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </SupervisorLayout>
  )
}

