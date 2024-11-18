"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { TaskManagementApp } from "@src/components/core/TaskManagementApp"
import { Auth } from "@src/components/core/Auth"
import { Loader2 } from "lucide-react"
function AppContent() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  return (
    <>
      {session ? <TaskManagementApp /> : <Auth />}
    </>
  )
}

export default function Page() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  )
}