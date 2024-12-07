"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { TaskManagementApp } from "@src/components/core/TaskManagementApp"
import { Auth } from "@src/components/auth/Auth"
import { Loader2 } from "lucide-react"
import Link from "next/link"

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
      {!session && (
        <div className="flex justify-center mt-4">
          <Link href="/auth/signin" className="mr-4 text-blue-500">サインイン</Link>
          <Link href="/auth/signup" className="text-green-500">サインアップ</Link>
        </div>
      )}
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