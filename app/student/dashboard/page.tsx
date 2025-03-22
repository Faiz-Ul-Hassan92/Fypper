import { StudentLayout } from "../components/student-layout"

export default function StudentDashboard() {
  return (
    <StudentLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Welcome to your student portal. View your FYP progress and upcoming tasks.
        </p>

        {/* Dashboard content would go here */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Dashboard cards would go here */}</div>
      </div>
    </StudentLayout>
  )
}

