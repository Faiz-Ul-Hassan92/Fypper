import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "../components/admin-layout"

export default function Loading() {
  return (
    <AdminLayout activePage="manage-bots">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>

        <Skeleton className="h-10 w-full mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <Skeleton className="h-6 w-3/4" />
                </div>
                <div className="p-6">
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="p-4 border-t flex justify-between">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </AdminLayout>
  )
}

