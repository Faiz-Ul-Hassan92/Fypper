import type React from "react"
import SupervisorLayout from "../components/supervisor-layout"

export default function BotsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SupervisorLayout activePath="/supervisor/bots">{children}</SupervisorLayout>
}

