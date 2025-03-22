import type React from "react"
import { StudentLayout } from "../components/student-layout"

export default function BotsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <StudentLayout>{children}</StudentLayout>
}

