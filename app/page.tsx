"use client"

import { useAuth } from '@src/hooks/useAuth'
import { TaskManagementApp } from "@src/components/core/TaskManagementApp"
import { Auth } from "@src/components/auth/Auth"
import { Loader2 } from "lucide-react"
import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Page() {
  const { user, loading } = useAuth()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Current session:', session)
    }

    checkAuth()
  }, [supabase.auth])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  return user ? <TaskManagementApp /> : <Auth />
}