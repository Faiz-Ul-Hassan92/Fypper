import { Skeleton } from "@/components/ui/skeleton"
import SupervisorLayout from "../components/supervisor-layout"

export default function Loading() {
  return (
    <SupervisorLayout>
      <div className="h-[calc(100vh-2rem)] flex flex-col">
        <div className="mb-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-96 mt-1" />
        </div>

        <div className="flex-1 flex overflow-hidden rounded-lg border">
          <div className="w-80 border-r bg-white flex flex-col">
            <div className="p-4 border-b">
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="p-4">
              <Skeleton className="h-10 w-full mb-4" />

              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-10" />
                        </div>
                        <Skeleton className="h-3 w-full mt-1" />
                        <Skeleton className="h-3 w-20 mt-1" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-3 w-24 mt-1" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={`flex items-end ${i % 2 === 1 ? "justify-end" : ""} space-x-2`}>
                    {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                    <div className={`${i % 2 === 1 ? "bg-primary" : "bg-gray-100"} rounded-lg p-3 max-w-[80%]`}>
                      <Skeleton className={`h-4 w-full ${i % 2 === 1 ? "bg-primary-foreground/20" : ""}`} />
                      <Skeleton className={`h-4 w-3/4 mt-1 ${i % 2 === 1 ? "bg-primary-foreground/20" : ""}`} />
                      <Skeleton className={`h-3 w-20 mt-2 ${i % 2 === 1 ? "bg-primary-foreground/20" : ""}`} />
                    </div>
                    {i % 2 === 1 && <Skeleton className="h-8 w-8 rounded-full" />}
                  </div>
                ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 flex-1 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SupervisorLayout>
  )
}

