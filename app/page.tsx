"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { TaskManagementApp } from "@/components/core/TaskManagementApp"
import { Auth } from "@/components/core/Auth"

function AppContent() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>読み込み中...</p>
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